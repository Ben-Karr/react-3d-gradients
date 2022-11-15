import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from 'react-select';
import HelpSharpIcon from '@mui/icons-material/HelpSharp'

const options = [
    {value: 'mae', label: 'Mean Average Error'},
    {value: 'mse', label: 'Mean Square Error'},
    {value: 'rmse', label: 'Root Mean Square Error'},
]

export function Settings({ pointAB, setPointAB, loss , lrExponent, setLrExponent, onStep, onClear, showTrace, setShowTrace, setCriticName, magnitude }) {
    function handleChange(){
        setShowTrace(!showTrace);
    }

    function handleCriticChange(e) {
        setCriticName(e.value);
        onClear();
    }
    // subtract a tiny margin (stepsize of a|b grid) to keep all values of the slider inside the surface
    return (
        <>
            <div className="settings--title">
                <h4>Settings:</h4>
                <HelpSharpIcon color="primary"/>
            </div>
            <div className="settings--slide">
                <b>a:</b> {pointAB[0].toFixed(2)}
                <Slider 
                    onChange={a => {
                        setPointAB(prevAB => [Math.round(a*1000)/1000,prevAB[1]]);
                        onClear();
                    }}
                    min={-1} 
                    max={6-0.33333} 
                    value={pointAB[0]} 
                    step={0.01}
                    trackStyle={{ height: 8 }}
                    handleStyle={{
                        height: 28,
                        width: 28,
                        marginTop: -9,
                    }}
                    railStyle={{ height: 8 }}
                /> 
                <b>b:</b> {pointAB[1].toFixed(2)}
                <Slider 
                    onChange={b => {
                        setPointAB(prevAB => [Math.round(prevAB[0]*1000)/1000, b]);
                        onClear();
                    }}
                    min={-4} 
                    max={8-0.4} 
                    value={pointAB[1]} 
                    step={0.01}
                    trackStyle={{ height: 10 }}
                    handleStyle={{
                        height: 28,
                        width: 28,
                        marginLeft: -14,
                        marginTop: -9,
                    }}
                    railStyle={{ height: 10 }}
                />
            </div>
            <div className="settings--loss">
                <div className="settings--title">
                    <h4>Current Loss:</h4>
                    <HelpSharpIcon color="primary"/>
                </div>
                <Select 
                    options={options}
                    defaultValue={options[1]}
                    onChange={handleCriticChange}
                />
                <p>{Math.round(loss*100, 2)/100}</p>
            </div>
            <div className="settings--title">
                    <h4>Gradient Stepper:</h4>
                    <HelpSharpIcon color="primary"/>
            </div>
            <p>Magnitude of gradients vector: {Math.round(magnitude*100)/100}</p>
            <p>lr: {Math.round(Math.pow(0.1,lrExponent-1)*10000, 2)/10000}</p>
            <p>Stepsize: {Math.round(Math.pow(0.1,lrExponent-1) * magnitude * 10000)/10000}</p>
            <div className="settings--slide stepper">
                <Slider 
                    onAfterChange={setLrExponent}
                    value={lrExponent}
                    min={1.9}
                    max={6}
                    marks={{2: '1E-2', 3: '1E-3', 4: '1E-4', 5: '1E-5', 6: '1E-6'}}
                    reverse
                    step={null}
                    trackStyle={{ backgroundColor: 'transparent', height: 0 }}
                />
            </div>
            <div className="settings--buttons">
                <button onClick={onStep}>Step</button>
                <button onClick={onClear}>Clear Trace</button>
                <div className="settings--trace">
                    <input id="trace" type="checkbox" value={showTrace} onChange={handleChange}/>
                    <label for="trace">Hide Trace</label>
                </div>
            </div>
            </>
    )
}