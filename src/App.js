import { useEffect, useState } from 'react';

import { generatePoints, addNoise, mse, mk_quadratic, generateSurface, generateGradientCoeffs, calcGrads_mse, debugYs } from './components/Utils'
import { Settings } from './components/Settings'
import { Curve } from './components/Curve'
import { Surface } from './components/Surface'

const xStart = -10;
const xEnd = 10;
const nSteps = 100;

const xs = generatePoints(xStart, xEnd, nSteps);
const φ = x => 3 * Math.pow(x,2) + 2 * x ;
//const ys = xs.map(x => addNoise(φ(x))); 
// rmv {
xs.map(x => addNoise(φ(x)));
const ys = debugYs;
// } rmv

const as = generatePoints(-1, 6, 30); // x-axis in surface plot
const bs = generatePoints(-4, 8, 30); // y-axis in surface plot
const ls = generateSurface(as, bs, xs, ys) // height / z-axis in surface plot

const gradientCoeffs = generateGradientCoeffs(xs, ys);

// Pre-calc initial values to avoid rerendering of the page
const initialA = 1;
const initialB = 1;
const initialGuess = xs.map(x => mk_quadratic(initialA,initialB)(x));
const initialLoss = mse(ys, initialGuess);
const initialGrads = calcGrads_mse(initialA,initialB,gradientCoeffs)

function App() {
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);
  const [guessedYs, setGuessedYs] = useState(initialGuess); // to plot guessed curve
  const [loss, setLoss] = useState(initialLoss);
  const [gradients, setGradients] = useState(initialGrads);

  useEffect(()=>{
    const points = xs.map(x => mk_quadratic(a,b)(x));
    setGuessedYs(points);
    setLoss(mse(ys, points));
    setGradients(calcGrads_mse(a,b,gradientCoeffs));
  }, [a, b])

  return (
      <div className="container">
        <aside className="settings">
          <Settings a={a} setA={setA} b={b} setB={setB} />
          <p> Change <code>a</code> and <code>b</code> in order to find the quadratic function <code>a*x^2+b*x</code> with the smallest loss for the given data points.</p>
          <h3>Current MSE:</h3>
          <p>{Math.round(loss*100, 2)/100}</p>
        </aside>
        <div className="plots">
          <Curve xs={xs} ys={ys} guessedYs={guessedYs}/>
          <Surface a={a} b={b} loss={loss} as={as} bs={bs} ls={ls} gradients={gradients}/>
        </div>
      </div>
  )
}

export default App;