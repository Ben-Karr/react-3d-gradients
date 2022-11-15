import Select from 'react-select';
import HelpSharpIcon from '@mui/icons-material/HelpSharp'
import Tooltip from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';

const options = [
    {value: 'mae', label: 'Mean Average Error'},
    {value: 'mse', label: 'Mean Square Error'},
    {value: 'rmse', label: 'Root Mean Square Error'},
];

const tooltipInfo = "click for more info";

export function Sidebar({ pointAB, setPointAB, loss , lrExponent, setLrExponent, onStep, onClear, showTrace, setShowTrace, setCriticName, magnitude }) {
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
                <b>a:</b> {pointAB[0].toFixed(2)}
                <Slider
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    min={-1.}
                    max={6.-0.25}
                    step={0.01}
                    value={pointAB[0]}
                    onChange={(e,v) => {
                        setPointAB(prevAB => [Math.round(v*1000)/1000,prevAB[1]]);
                        onClear();
                    }}
                    />
                <b>b:</b> {pointAB[1].toFixed(2)}
                <Slider
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    min={-4.}
                    max={7.}
                    step={0.01}
                    value={pointAB[1]}
                    onChange={(e,v) => {
                        setPointAB(prevAB => [prevAB[0], Math.round(v*1000)/1000]);
                        onClear();
                    }}
                    />
            </div>
            <div className="sidebar--title">
                <h4>Current Loss:</h4>
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
                <p>{Math.round(loss*100, 2)/100}</p>
            </div>
            <div className="sidebar--title">
                <h4>Gradient Stepper:</h4>
                <Tooltip title={tooltipInfo}>
                    <HelpSharpIcon color="primary"/>
                </Tooltip>
            </div>
            <div className="sidebar--stepper">
                <div>
                    <b>Magnitude</b> of gradients vector: {Math.round(magnitude*100)/100}<br/>
                    <b>lr</b>: {Math.round(Math.pow(0.1,lrExponent-1)*10000, 2)/10000}<br/>
                    <b>Stepsize</b>: {Math.round(Math.pow(0.1,lrExponent-1) * magnitude * 10000)/10000}
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