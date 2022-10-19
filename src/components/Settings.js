import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export function Settings({ a, setA, b, setB }) {
    return (
        <>
            <h3>Settings:</h3>
            a: {a}
            <Slider onChange={setA} min={-1} max={6} value={a} step={0.01}/>
            b: {b}
            <Slider onChange={setB} min={-4} max={8} value={b} step={0.01} />
        </>
    )
}