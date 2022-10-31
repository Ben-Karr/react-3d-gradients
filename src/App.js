import { useEffect, useState } from 'react';

import { generatePoints, addNoise, mse, mk_quadratic, generateSurface, generateGradientCoeffs, calcGrads_mse, debugYs } from './components/Utils'
import { Settings } from './components/Settings'
import { Curve } from './components/Curve'
import { Surface } from './components/Surface'

const DEBUG = true;

const xStart = -10;
const xEnd = 10;
const nSteps = 100;

const xs = generatePoints(xStart, xEnd, nSteps);
const φ = x => 3 * Math.pow(x,2) + 2 * x ;
const ys = DEBUG ? debugYs : xs.map(x => addNoise(φ(x))); 

const as = generatePoints(-1, 6, 30); // x-axis in surface plot
const bs = generatePoints(-4, 8, 30); // y-axis in surface plot
const ls = generateSurface(as, bs, xs, ys) // height / z-axis in surface plot

const gradientCoeffs = generateGradientCoeffs(xs, ys);

// Pre-calc initial values to avoid rerendering of the page
const initialAB = [1,1];
const initialGuess = xs.map(x => mk_quadratic(initialAB)(x));
const initialLoss = mse(ys, initialGuess);
const initialGrads = calcGrads_mse(initialAB, gradientCoeffs)

function App() {
  const [currentAB, setCurrentAB] = useState(initialAB);
  const [guessedYs, setGuessedYs] = useState(initialGuess); // to plot guessed curve
  const [loss, setLoss] = useState(initialLoss);
  const [gradients, setGradients] = useState(initialGrads);
  const [lrExponent, setLrExponent] = useState(4);
  const [lossTrace, setLossTrace] = useState([[initialAB[0], initialAB[1], initialLoss]]);
  const [addGrads, setAddGrads] = useState(false);
  
  useEffect(()=>{
    console.log('useEffect happens')
    const points = xs.map(x => mk_quadratic(currentAB)(x));
    const newLoss = (mse(ys, points));
    setGuessedYs(points);
    setLoss(newLoss);
    setGradients(calcGrads_mse(currentAB, gradientCoeffs));
    if (addGrads) {
      setLossTrace(prevTrace => [...prevTrace, [currentAB[0], currentAB[1], newLoss]])
      setAddGrads(false);
    };
  }, [currentAB, addGrads])

  function onStep(){
    const [stepA, stepB] = gradients.map(x => x/Math.pow(10,lrExponent));
    setCurrentAB(prevAB => [prevAB[0] - stepA, prevAB[1] - stepB]);
    setAddGrads(true);
  }

  function onClear(){
    setLossTrace([[currentAB[0], currentAB[1], loss]]);
  }

  return (
      <div className="container">
        <aside className="settings">
          <Settings currentAB={currentAB} setCurrentAB={setCurrentAB} loss={loss} lrExponent={lrExponent} setLrExponent={setLrExponent} gradients={gradients} onStep={onStep} onClear={onClear}/>
        </aside>
        <div className="plots">
          {/*<Curve xs={xs} ys={ys} guessedYs={guessedYs}/>*/}
          <Surface currentAB={currentAB} loss={loss} as={as} bs={bs} ls={ls} gradients={gradients} lossTrace={lossTrace.length>1 ? lossTrace: []}/>
        </div>
      </div>
  )
}

export default App;