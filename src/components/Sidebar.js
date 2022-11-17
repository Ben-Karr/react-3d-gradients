import Select from 'react-select';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import Tooltip from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';
import { RadioSelector } from './RadioSelector'
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

import './Sidebar.css';

const options = [
    { value: 'mae', label: 'Mean Average Error' },
    { value: 'mse', label: 'Mean Square Error' },
    { value: 'rmse', label: 'Root Mean Square Error' },
];

const tooltipInfo = "click for more info";

export function Sidebar({ pointAB, setPointAB, loss, lr, setLr, onStep, onClear, showTrace, setShowTrace, setCriticName, magnitude }) {
    const [showInfo, setShowInfo] = useState({'point_info': false, 'critic_info': false, 'stepper_info': false});

    function handleChange() {
        setShowTrace(!showTrace);
    }

    function handleCriticChange(e) {
        setCriticName(e.value);
        onClear();
    }

    function switchInfoShow(e, where) {
        setShowInfo(prevState => ({...prevState, [where]: !prevState[where]}));
    }

    return (
        <>
            <div className="sidebar--container">

                <div className="sidebar--point">
                    <div className="sidebar--title">
                        <h4>Change:</h4>
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
                    <Select
                        options={options}
                        defaultValue={options[1]}
                        onChange={handleCriticChange}
                    />
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
                        <i>Learning Rate:</i>
                        <RadioSelector lr={lr} setLr={setLr} />
                        <i>Gradients Magnitude</i>:<br/>{magnitude.toFixed(2)}<br />
                        <i>Stepsize</i>: {(lr * magnitude).toFixed(3)}
                    </div>
                    <div className="sidebar--buttons">
                        <button onClick={onStep}>Step</button>
                        <button onClick={onClear}>Clear Trace</button>
                        <div className="sidebar--trace">
                            <input id="trace" type="checkbox" value={showTrace} onChange={handleChange} />
                            <label htmlFor="trace">Hide Trace</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar--footer">
                If you have any questions or improvements: get in touch via <a href="https://github.com/ben-karr/react-3d-gradients" target="_blank" rel="noopener noreferrer">Github</a> or the <a href="https://forums.fast.ai" target="_blank" rel="noopener noreferrer">Fast.ai</a> forums.
            </div>

            <Modal open={showInfo['point_info']} onClose={(e)=>switchInfoShow(e,'point_info')}>
                <div className='modal'>
                    In the first plot you see 100 blue points. Those can be assumed as some observed data points (x<sub>i</sub>,y<sub>i</sub>), and our goal is to find a quadratic function f(x)=a·x<sup>2</sup>+b·x that "best" predicts the values y<sub>i</sub> at the points x<sub>i</sub>. The quadratic f is the red curve in that plot and can be changed by moving the sliders for a and b.
                </div>
            </Modal>
            <Modal open={showInfo['critic_info']} onClose={(e)=>switchInfoShow(e,'critic_info')}>
                <div className='modal'>
                    Since we want to find the "best" quadratic function that predicts the "observed" points we have to think about what "best" means. Most likely it makes sense to measure the distance of each given point to the predicted one and summerize the results to one single value. The three different options -- called critics -- here are <b>Mean Absolute Error</b>(<i>MAE</i>)<br/>
                    <i>MAE(f(x<sub>i</sub>),y<sub>i</sub>) = 1/100 Σ |f(x<sub>i</sub>)-y<sub>i</sub>|</i>
                </div>
            </Modal>
            <Modal open={showInfo['stepper_info']} onClose={(e)=>switchInfoShow(e,'stepper_info')}>
                <div className='modal'>
                    What does the stepper do?
                </div>
            </Modal>
        </>
    )
}