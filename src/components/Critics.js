// Mean Absolute Error
function mae(targets, preds) {
    let loss = 0;
    for (let i=0; i<targets.length; i++){
        loss += Math.abs(targets[i]-preds[i]);
    }
    return loss/targets.length;
}

 function calcGrads_mae(ab,xs,ys){
    const [a,b] = ab;
    let sumA = 0;
    let sumB = 0;
    for (let i=0; i<xs.length; i++){
        let sign = Math.sign(ys[i]-a*Math.pow(xs[i], 2)-b*xs[i]);
        sumA += -Math.pow(xs[i],2)*sign;
        sumB += -xs[i]*sign;
    }
    return [sumA, sumB].map(x=>x/xs.length);
}

// Mean Square Error
 function mse(targets, preds) {
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

 function calcGradientCoeffs(xs, ys){
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

 function calcGrads_mse(ab, coeffs) {
    const [a,b] = ab;
    const grad_a = gradA_mse(a,b,coeffs);
    const grad_b = gradB_mse(a,b,coeffs);
    return [grad_a, grad_b];
}

// Root Mean Square Error
 function rmse(targets, preds){
    return Math.sqrt(mse(targets, preds));
}

 function calcGrads_rmse(ab, xs, ys, coeffs){
    const [a,b] = ab;
    let sum = 0;
    for (let i=0;i<xs.length;i++){
      sum += Math.pow(ys[i] - a*Math.pow(xs[i],2) - b*xs[i], 2);
    }
    return calcGrads_mse(ab,coeffs).map(x => x/(2* Math.sqrt(sum/xs.length)));
}

export function getCritics(xs, ys){
    const coeffs = calcGradientCoeffs(xs,ys);
    return {
        'mae': {
            'lossFunc': mae,
            'calcGrads': (ab) => calcGrads_mae(ab,xs,ys),
        },
        'mse': {
            'lossFunc': mse,
            'calcGrads': (ab) => calcGrads_mse(ab,coeffs),
        },
        'rmse': {
            'lossFunc': rmse,
            'calcGrads': (ab) => calcGrads_rmse(ab, xs, ys, coeffs),
        },
    }
}