import {range} from 'd3'

function generateNoise(scale) {
    return (Math.random()-0.5) * scale;
}

function addNoise(x, multScale=0.4, addScale=20) {
    return x * (1+generateNoise(multScale)) + generateNoise(addScale);
}

export function generatePoints(xStart, xEnd, nSteps, func, withNoise=true){
    const stepSize = (xEnd - xStart) / nSteps;
    const xs = range(xStart, xEnd, stepSize);
    return xs.map(x => [x, withNoise ? addNoise(func(x)) : func(x)])
}

export function DataPoints({points, xScale, yScale}) {
    return points.map(d => 
        <circle 
            className='data-points'
            key={d[0]} 
            cx={xScale(d[0])} 
            cy={yScale(d[1])} 
            r={3}
            />)
}