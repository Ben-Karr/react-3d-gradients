import { useEffect, useState } from 'react';

import { generatePoints, addNoise, mk_quadratic, generateSurface, debugYs} from './components/Utils'
import { getCritics } from './components/Critics'
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

const critics = getCritics(xs, ys);
const criticName = 'mse'
const critic = critics[criticName]

// Pre-calc initial values to avoid rerendering of the page
const initialAB = [1,1];
const initialGuess = xs.map(x => mk_quadratic(initialAB)(x));
const initialLoss = critic['lossFunc'](ys, initialGuess);
const initialGrads = critic['calcGrads'](initialAB)

const as = generatePoints(-1, 6, 30); // x-axis in surface plot
const bs = generatePoints(-4, 8, 30); // y-axis in surface plot
const ls = generateSurface(as, bs, xs, ys, critics[criticName]['lossFunc']) // height|z-axis in surface plot

function App() {
  const [pointAB, setPointAB]       = useState(initialAB);
  const [guessedYs, setGuessedYs]   = useState(initialGuess); // to plot guessed curve
  const [loss, setLoss]             = useState(initialLoss);
  const [gradients, setGradients]   = useState(initialGrads);
  const [lrExponent, setLrExponent] = useState(4);
  const [lossTrace, setLossTrace]   = useState([[initialAB[0], initialAB[1], initialLoss]]);
  const [addGrads, setAddGrads]     = useState(false);
  const [showTrace, setShowTrace]   = useState(false);
  
  useEffect(()=>{
    const points = xs.map(x => mk_quadratic(pointAB)(x));
    const newLoss = critic['lossFunc'](ys, points);
    setGuessedYs(points);
    setLoss(newLoss);
    setGradients(critic['calcGrads'](pointAB));
    if (addGrads) {
      setLossTrace(prevTrace => [...prevTrace, [pointAB[0], pointAB[1], newLoss]])
      setAddGrads(false);
    };
  }, [pointAB, addGrads])

  function onStep(){
    const [stepA, stepB] = gradients.map(x => x/Math.pow(10,lrExponent));
    setPointAB(prevAB => [prevAB[0] - stepA, prevAB[1] - stepB]);
    setAddGrads(true);
  }

  function onClear(){
    setLossTrace([[pointAB[0], pointAB[1], loss]]);
  }

  return (
      <div className="container">
        <aside className="settings">
          <Settings 
            pointAB={pointAB}
            setPointAB={setPointAB}
            loss={loss}
            lrExponent={lrExponent}
            setLrExponent={setLrExponent}
            gradients={gradients}
            onStep={onStep}
            onClear={onClear}
            showTrace={showTrace}
            setShowTrace={setShowTrace}
          />
        </aside>
        <div className="plots">
          <div className="plots--surface-wrapper">
            <Surface 
              pointAB={pointAB} 
              loss={loss} 
              as={as} 
              bs={bs} 
              ls={ls} 
              gradients={gradients} 
              lossTrace={(lossTrace.length > 1 && showTrace) ? lossTrace : []}
            />
          </div>
          <div className="plots--curve-wrapper">
            <Curve 
              xs={xs} 
              ys={ys} 
              guessedYs={guessedYs}
            />
          </div>
        </div>
      </div>
  )
}

export default App;