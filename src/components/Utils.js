import {range} from 'd3'

export function generatePoints(xStart, xEnd, nSteps){
    const stepSize = (xEnd - xStart) / nSteps;
    return range(xStart, xEnd, stepSize);
}

export function mk_quadratic(ab) {
    const [a,b] = ab;
    return (x) => a*Math.pow(x, 2) + b*x
}

function generateNoise(scale) {
    return (Math.random()-0.5) * scale;
}

export function addNoise(x, multScale=1.2, addScale=25) {
    return x * (1+generateNoise(multScale)) + generateNoise(addScale);
}

export function mse(targets, preds) {
    let loss = 0;
    for (let i=0; i<targets.length; i++){
      loss += Math.pow(targets[i] - preds[i], 2);
    }
    return loss/targets.length;
  }

function sumPowX(xs, e) {
    return xs.reduce((partialSum, x) => partialSum + Math.pow(x,e), 0);
}

function sumPowXY(xs, ys, e) {
    let sum = 0;
    for (let i = 0; i<xs.length; i++){
        sum += Math.pow(xs[i],e) * ys[i];
    }
    return sum;
}

export function generateGradientCoeffs(xs, ys){
    return {
        'm':   xs.length,
        'x2y': sumPowXY(xs, ys, 2),
        'x4':  sumPowX (xs, 4),
        'x3':  sumPowX (xs, 3),
        'xy':  sumPowXY(xs, ys, 1),
        'x2':  sumPowX (xs, 2),
    }
}

function gradA_mse(a,b,coeffs){
    return -2/coeffs.m*(-a*coeffs.x4 + coeffs.x2y - b*coeffs.x3);
}

function gradB_mse(a,b,coeffs){
    return -2/coeffs.m*(coeffs.xy - a*coeffs.x3 - b*coeffs.x2);
}

export function calcGrads_mse(ab, coeffs) {
    const [a,b] = ab;
    const grad_a = gradA_mse(a,b,coeffs);
    const grad_b = gradB_mse(a,b,coeffs);
    return [grad_a, grad_b];
}

export function generateSurface(as, bs, xs, ys){
    const ls = [] // needs to be y-rows \times x-cols (ascending) for Plotly
    for (let j=0; j<bs.length; j++){
        const row = []
        for (let i=0; i<as.length; i++){
            row.push(mse(ys, xs.map(x => mk_quadratic([as[i], bs[j]])(x))));
        }
        ls.push(row)
    }
    return ls
}


export const debugYs = [
    291.88594759577836,
    272.26077785428146,
    276.96684415238724,
    238.04866773009633,
    249.8702831117894,
    199.75589370030414,
    196.70270977535202,
    180.90544830043353,
    208.7522049041037,
    155.63138148031882,
    208.98876004826178,
    142.5605916493083,
    186.00307267888735,
    149.29707323786673,
    149.48856330570177,
    126.01337695392719,
    115.3896246414428,
    117.35507082393693,
    123.13200266771179,
    104.54928054848627,
    94.1180177067686,
    92.10087115561178,
    85.20725972859483,
    83.44982085810989,
    81.95946797437455,
    64.01637998242796,
    53.016757244833784,
    47.373276510958355,
    47.50591785649498,
    44.71167198725492,
    34.36424428600847,
    45.530994396354416,
    36.64079729115673,
    35.761616927347745,
    24.925937664657585,
    26.152849820525795,
    9.039317616751276,
    4.857496862831233,
    13.825448919880472,
    11.516690295893666,
    15.893374354891524,
    2.801131909935104,
    8.964948272584522,
    11.848479241962618,
    -7.331702170776653,
    -4.212184767022399,
    -9.239966252780963,
    -9.842637117514958,
    1.8248351663620939,
    7.387641606136715,
    6.61578416590382,
    -3.000452932055363,
    5.337967706633455,
    0.25223654926536865,
    3.28377805726086,
    5.612243557388906,
    11.740373801882457,
    11.16192939913838,
    15.188571106842744,
    10.334175524450064,
    27.21445919959151,
    10.141565314307638,
    31.744042346978226,
    30.518484695149844,
    19.902496797483085,
    35.61603808933079,
    30.83189289920963,
    38.59384014538247,
    57.87843416528941,
    52.02743767372757,
    46.827962581399774,
    60.08500704749528,
    69.52764072503291,
    64.06567699593484,
    86.64303887160305,
    70.87442035460359,
    93.48381293789906,
    103.20879276904009,
    108.81447449694352,
    121.73730212971354,
    130.63564541918052,
    136.2425622820988,
    151.36511841513814,
    125.34500849225091,
    168.88680789026654,
    122.7587988097847,
    177.52802758542802,
    177.9981044511224,
    192.05132042401215,
    181.05880002897422,
    214.46368176055688,
    177.7756950742002,
    202.08814655511406,
    206.06392025678628,
    262.74571956303555,
    257.40380070639856,
    267.73661365730356,
    330.389123703504,
    300.59121384606743,
    289.7773670438211,
    ]