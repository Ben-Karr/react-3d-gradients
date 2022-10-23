import {range} from 'd3'

export function generatePoints(xStart, xEnd, nSteps){
    const stepSize = (xEnd - xStart) / nSteps;
    return range(xStart, xEnd, stepSize);
}

export function mk_quadratic(a, b) {
    return (x) => a*Math.pow(x, 2) + b*x
}

function generateNoise(scale) {
    return (Math.random()-0.5) * scale;
}

export function addNoise(x, multScale=0.4, addScale=20) {
    return x * (1+generateNoise(multScale)) + generateNoise(addScale);
}

export function mse(targets, preds) {
    let loss = 0;
    for (let i=0; i<targets.length; i++){
      loss += Math.pow(targets[i] - preds[i], 2);
    }
    return Math.sqrt(loss);
  }

export function generateSurface(as, bs, xs, ys){
    const ls = [] // needs to be y-rows \times x-cols for Plotly
    for (let j=0; j<bs.length; j++){
        const row = []
        for (let i=0; i<as.length; i++){
            row.push(mse(ys, xs.map(x => mk_quadratic(as[i], bs[j])(x))));
        }
        ls.push(row)
    }
    return ls
}