import {range} from 'd3'

export const xs_start = -10;
export const xs_end = 10;
const xs_steps = 100;
const xs_stepsize = (xs_end-xs_start) / xs_steps
export const xs = range(xs_start,xs_end,xs_stepsize);

export const φ = x => 3*Math.pow(x,2)+2*x;
export const φ_prime = x => 6*x + 2;