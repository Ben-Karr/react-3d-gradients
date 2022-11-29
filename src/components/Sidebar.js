import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import Tooltip from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Modals } from './Modals';
import { RadioSelector } from './RadioSelector';
import './Sidebar.css';

const tooltipInfo = "click for more info";

export function Sidebar({ pointAB, setPointAB, loss, lr, setLr, onStep, onClear, showTrace, setShowTrace, criticName, setCriticName, magnitude }) {
    const [showInfo, setShowInfo] = useState({'point_info': false, 'critic_info': false, 'stepper_info': false});

    function handleChange() {
        setShowTrace(!showTrace);
    }

    function handleCriticChange(e) {
        setCriticName(e.target.value);
        onClear();
    }

    function switchInfoShow(e, where) {
        setShowInfo(prevState => ({...prevState, [where]: !prevState[where]}));
    }

    return (
        <>
            <div className="sidebar--container">

                <div className="sidebar--point">
                    <div className="sidebar--title info">
                        <h4>Info:</h4>
                        <Tooltip title={tooltipInfo}>
                            <IconButton onClick={e => switchInfoShow(e,'point_info')} size="small">
                                <HelpSharpIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <span><b>a:</b> {pointAB[0].toFixed(2)}</span>
                    <div className="slider">
                        <Slider
                            min={-1.}
                            max={6. - 0.23} // subtract a tiny margin (stepsize of a|b grid) to keep all values of the slider inside the surface
                            step={0.01}
                            value={pointAB[0]}
                            onChange={(e, v) => {
                                onClear();
                                setPointAB(prevAB => [Math.round(v * 1000) / 1000, prevAB[1]]);
                            }}
                        />
                    </div>
                    <span><b>b:</b> {pointAB[1].toFixed(2)}</span>
                    <div className="slider">
                        <Slider
                            min={-4.}
                            max={8 - 0.4}
                            step={0.01}
                            value={pointAB[1]}
                            onChange={(e, v) => {
                                onClear();
                                setPointAB(prevAB => [prevAB[0], Math.round(v * 1000) / 1000]);
                            }}
                        />
                    </div>
                </div>
                <div className="sidebar--title">
                    <h4>Choose critic:</h4>
                    <Tooltip title={tooltipInfo}>
                    <IconButton onClick={e => switchInfoShow(e,'critic_info')} size="small">
                            <HelpSharpIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="sidebar--loss">
                <FormControl sx={{ m: 1}}>
                    <Select
                        value={criticName}
                        onChange={handleCriticChange}
                        >
                        <MenuItem value={'mae'}><small>Mean Absolute Error</small></MenuItem>
                        <MenuItem value={'mse'}><small>Mean Square Error</small></MenuItem>
                        <MenuItem value={'rmse'}><small>Root Mean Square Error</small></MenuItem>
                    </Select>
                </FormControl>
                    <p>Loss: {Math.round(loss * 100, 2) / 100}</p>
                </div>
                <div className="sidebar--title">
                    <h4>Gradient Stepper:</h4>
                    <Tooltip title={tooltipInfo}>
                    <IconButton onClick={e => switchInfoShow(e,'stepper_info')} size="small">
                            <HelpSharpIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="sidebar--stepper">
                    <div>
                        <i>Gradients Magnitude</i>:<br/>{magnitude.toFixed(2)}<br />
                        <i>Learning Rate:</i>
                        <RadioSelector lr={lr} setLr={setLr} />
                        <i>Stepsize</i>: {(lr * magnitude).toFixed(3)}
                    </div>
                    <div className="sidebar--buttons">
                        <button className="button-step" onClick={onStep}>Step</button>
                        <button className="button-clear" onClick={onClear}>Clear Trace</button>
                        <div className="sidebar--trace">
                            <input id="trace" type="checkbox" value={showTrace} onChange={handleChange} />
                            <label htmlFor="trace">Hide Trace</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar--footer">
                If you have any questions or improvements: you can get in touch via <a href="https://github.com/ben-karr/react-3d-gradients" target="_blank" rel="noopener noreferrer">Github</a> or the <a href="https://forums.fast.ai" target="_blank" rel="noopener noreferrer">Fast.ai</a> forums.
            </div>

            <Modals showInfo={showInfo} switchInfoShow={switchInfoShow}/>
        </>
    )
}