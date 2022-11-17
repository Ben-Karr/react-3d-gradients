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
    console.log(showInfo);
    return (
        <>
            <div className="sidebar--container">

                <div className="sidebar--point">
                    <div className="sidebar--title">
                        <h4>Settings:</h4>
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
                        <i>Gradients Magnitude</i>: {magnitude.toFixed(2)}<br />
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
                Check <a href="https://github.com/ben-karr/react-3d-gradients" target="_blank" rel="noopener noreferrer">this</a> Github repo or <a href="https://forums.fast.ai" target="_blank" rel="noopener noreferrer">this</a> Fast.ai forums thread for more information about this application.
            </div>

            <Modal open={showInfo['point_info']} onClose={(e)=>switchInfoShow(e,'point_info')}>
                <div className='modal'>
                    Pick one of the three critics. The critic is used to determine how far away our current predictions are away from the acctuall values.
                    The loss is calculated by
                    <p>c(y, f<sub>a,b</sub>(x))</p>
                    <p> where f<sub>a,b</sub>(x)=a·x<sup>2</sup>+b·x</p>
                    <p> c is the critic. </p>
                </div>
            </Modal>
        </>
    )
}