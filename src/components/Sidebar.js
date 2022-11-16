import Select from 'react-select';
import HelpSharpIcon from '@mui/icons-material/HelpSharp'
import Tooltip from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';
import { RadioSelecter } from './RadioSelecter'

const options = [
    {value: 'mae', label: 'Mean Average Error'},
    {value: 'mse', label: 'Mean Square Error'},
    {value: 'rmse', label: 'Root Mean Square Error'},
];

const tooltipInfo = "click for more info";

export function Sidebar({ pointAB, setPointAB, loss , lr, setLr, onStep, onClear, showTrace, setShowTrace, setCriticName, magnitude }) {
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

            <div className="sidebar--title">
                <h4>Settings:</h4>
                <Tooltip title={tooltipInfo}>
                    <HelpSharpIcon color="primary"/>
                </Tooltip>
            </div>
            <div className="sidebar--point">
                <span><b>a:</b> {pointAB[0].toFixed(2)}</span>
                <div className="slider">
                    <Slider
                        min={-1.}
                        max={6.-0.23}
                        step={0.01}
                        value={pointAB[0]}
                        onChange={(e,v) => {
                            setPointAB(prevAB => [Math.round(v*1000)/1000,prevAB[1]]);
                        }}
                        onChangeCommitted={e=>{onClear()}}
                        />
                </div>
                <span><b>b:</b> {pointAB[1].toFixed(2)}</span>
                <div className="slider">
                    <Slider
                        min={-4.}
                        max={8-0.4}
                        step={0.01}
                        value={pointAB[1]}
                        onChange={(e,v) => {
                            setPointAB(prevAB => [prevAB[0], Math.round(v*1000)/1000]);
                            onClear();
                        }}
                        />
                </div>
            </div>
            <div className="sidebar--title">
                <h4>Choose critic:</h4>
                <Tooltip title={tooltipInfo}>
                    <HelpSharpIcon color="primary"/>
                </Tooltip>
            </div>
            <div className="sidebar--loss">
                <Select 
                    options={options}
                    defaultValue={options[1]}
                    onChange={handleCriticChange}
                />
                <p>Loss: {Math.round(loss*100, 2)/100}</p>
            </div>
            <div className="sidebar--title">
                <h4>Gradient Stepper:</h4>
                <Tooltip title={tooltipInfo}>
                    <HelpSharpIcon color="primary"/>
                </Tooltip>
            </div>
            <div className="sidebar--stepper">
                <div>
                    <i>Learning Rate:</i>
                    <RadioSelecter lr={lr} setLr={setLr}/>
                    <i>Gradients Magnitude</i>: {magnitude.toFixed(2)}<br/>
                    <i>Stepsize</i>: {(lr * magnitude).toFixed(3)}
                </div>
                <div className="sidebar--buttons">
                    <button onClick={onStep}>Step</button>
                    <button onClick={onClear}>Clear Trace</button>
                    <div className="sidebar--trace">
                        <input id="trace" type="checkbox" value={showTrace} onChange={handleChange}/>
                        <label htmlFor="trace">Hide Trace</label>
                    </div>
                </div>
            </div>
        </>
    )
}