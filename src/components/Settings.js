import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export function Settings({ pointAB, setPointAB, loss , lrExponent, setLrExponent, onStep, onClear}) {
    // subtract a tiny margin (stepsize of a|b grid) to keep all values of the slider inside the surface
    return (
        <>
            <h3>Settings:</h3>
            a: {pointAB[0]}
            <Slider 
                onChange={a => {
                    setPointAB(prevAB => [a,prevAB[1]]);
                    onClear();
                }}
                min={-1} 
                max={6-0.33333} 
                value={pointAB[0]} 
                step={0.01}
            /> 
            b: {pointAB[1]}
            <Slider 
                onChange={b => {
                    setPointAB(prevAB => [prevAB[0], b]);
                    onClear();
                }}
                min={-4} 
                max={8-0.4} 
                value={pointAB[1]} 
                step={0.01}
            />
            <p> Change <code>a</code> and <code>b</code> in order to find the quadratic function <code>a*x^2+b*x</code> with the smallest loss for the given data points.</p>
            <h4>Current Loss:</h4>
            <p>{Math.round(loss*100, 2)/100}</p>
            <h3>Gradient Stepper:</h3>
            <p>Pick a learning rate and step <code>(a,b)</code> in the direction of the negative gradient</p>
            lr: {Math.round(Math.pow(0.1,lrExponent)*100000, 2)/10000}
            <Slider onChange={setLrExponent} value={lrExponent} min={1} max={5} marks={{ 1: '1', 2: '1E-2', 3: '1E-3', 4: '1E-4', 5: '1E-5'}} step={null} />
            <button onClick={onStep}>Step</button>
            <button onClick={onClear}>Clear Trace</button>
            <h3>Description:</h3>
            </>
    )
}