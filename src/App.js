import { scaleLinear, max } from 'd3';
import { useEffect, useState } from 'react';

import { AxisBottom, AxisLeft } from './components/Axes'
import { Curve } from './components/Curve'
import { DataPoints, generatePoints } from './components/DataPoints'
import { Settings } from './components/Settings'

const canvasWidth = 950;
const canvasHeight = 500;
const margin = {left: 50, top: 40, right: 20, bottom: 50};
const innerWidth = canvasWidth - margin.left - margin.right;
const innerHeight = canvasHeight - margin.top - margin.bottom;

const φ = x => 3 * Math.pow(x,2) + 2 * x;

const xStart = -10;
const xEnd = 10;
const nSteps = 100;

const dataPoints = generatePoints(xStart, xEnd, nSteps, φ);

const xScale = scaleLinear()
  .domain([xStart, xEnd])
  .range([0, innerWidth])
  .nice();

const yScale = scaleLinear()
  .domain([0, max(dataPoints, x => x[1])])
  .range([innerHeight, 0])
  .nice();

function mse(targets, preds) {
  let loss = 0;
  for (let i=0; i<targets.length; i++){
    loss += Math.pow(targets[i][1] - preds[i][1], 2);
  }
  return Math.sqrt(loss);
}

function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [loss, setLoss] = useState(null);
  const [guessedPoints, setGuessedPoints] = useState(generatePoints(xStart, xEnd, nSteps, x => a * Math.pow(x,2) + b * x, false));

  useEffect(()=>{
    const points = generatePoints(xStart, xEnd, nSteps, x => a * Math.pow(x,2) + b * x, false);
    setGuessedPoints(points);
    setLoss(mse(dataPoints, points));
  }, [a, b])

  return (
    <div className="container">
      <div className="settings">
        <Settings 
          a={a} 
          setA={setA}
          b={b}
          setB={setB}
          />
        <p> Change <code>a</code> and <code>b</code> in order to find the quadratic function with the smallest loss.</p>
        <h3>Current loss:</h3>
        <p>{Math.round(loss*100, 2) / 100}</p>
      </div>
      <svg className="canvas" width={canvasWidth} height={canvasHeight}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight}/>
          <AxisLeft yScale={yScale}/>
          <Curve 
            points={guessedPoints}
            xScale={xScale} 
            yScale={yScale}
            />
          <DataPoints 
            points={dataPoints}
            xScale={xScale}
            yScale={yScale}
            />
          <text className="title" x={innerWidth/2} y={45} textAnchor='middle'>
            Approximate quadratic function
          </text>
        </g>
      </svg>
    </div>
  )
}

export default App;