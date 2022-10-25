import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export function Settings({ a, setA, b, setB }) {
    // subtract a tiny margin (stepsize of a|b grid) to keep all values of the slider inside the surface
    return (
        <>
            <h3>Settings:</h3>
            a: {a}
            <Slider onChange={setA} min={-1} max={6-0.33333} value={a} step={0.01}/> 
            b: {b}
            <Slider onChange={setB} min={-4} max={8-0.4} value={b} step={0.01} />
        </>
    )
}