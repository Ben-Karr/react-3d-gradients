import { useEffect, useState } from 'react';

import { generatePoints, addNoise, mse, mk_quadratic, generateSurface } from './components/Utils'
import { Settings } from './components/Settings'
import { Curve } from './components/Curve'
import { Surface } from './components/Surface'

//const canvasWidth = 950;
//const canvasHeight = 700;
//const margin = {left: 0, top: 0, right: 0, bottom: 0};
//const innerWidth = canvasWidth - margin.left - margin.right;
//const innerHeight = canvasHeight - margin.top - margin.bottom;

const xStart = -10;
const xEnd = 10;
const nSteps = 100;

const xs = generatePoints(xStart, xEnd, nSteps);
const φ = x => 3 * Math.pow(x,2) + 2 * x ;
const ys = xs.map(x => addNoise(φ(x)));

const as = generatePoints(-1, 6, 30, false);
const bs = generatePoints(-4, 8, 30, false);

const ls = generateSurface(as, bs, xs, ys)

function App() {
  const [a, setA] = useState(1.1);
  const [b, setB] = useState(0);
  const [loss, setLoss] = useState(null);
  const [guessedYs, setGuessedYs] = useState(xs.map(x => mk_quadratic(a,b)(x)));

  useEffect(()=>{
    const points = xs.map(x => mk_quadratic(a,b)(x));
    setGuessedYs(points);
    setLoss(mse(ys, points));
  }, [a, b])

  return (
      <div className="container">
        <div className="settings">
          <Settings a={a} setA={setA} b={b} setB={setB} />
          <p> Change <code>a</code> and <code>b</code> in order to find the quadratic function with the smallest loss.</p>
          <h3>Current loss:</h3>
          <p>{Math.round(loss*100, 2)/100}</p>
        </div>
        <div className="plots">
          <Curve xs={xs} ys={ys} guessedYs={guessedYs} />
          <Surface a={a} b={b} loss={loss} as={as} bs={bs} ls={ls}/>
        </div>
      </div>
  )
}

export default App;