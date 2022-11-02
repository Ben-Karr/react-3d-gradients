import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export function Settings({ pointAB, setPointAB, loss , lrExponent, setLrExponent, onStep, onClear, showTrace, setShowTrace }) {
    function handleChange(){
        setShowTrace(!showTrace);
    }
    // subtract a tiny margin (stepsize of a|b grid) to keep all values of the slider inside the surface
    return (
        <>
            <h3>Settings:</h3>
            <div className="settings--slide">
                <b>a:</b> {Math.round(pointAB[0]*1000)/1000}
                <Slider 
                    onChange={a => {
                        setPointAB(prevAB => [a,prevAB[1]]);
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
                <b>b:</b> {Math.round(pointAB[1]*1000)/1000}
                <Slider 
                    onChange={b => {
                        setPointAB(prevAB => [prevAB[0], b]);
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
            <p>What does changing (a,b) do?</p>
            <div className="settings--loss">
                <h4>Current Loss:</h4>
                <p>{Math.round(loss*100, 2)/100}</p>
                <h3>Gradient Stepper:</h3>
                <p>Whats does the stepper do?</p>
                <p>lr: {Math.round(Math.pow(0.1,lrExponent)*100000, 2)/10000}</p>
            </div>
            <div className="settings--slide stepper">
                <Slider 
                    onAfterChange={setLrExponent}
                    value={lrExponent}
                    min={0.9}
                    max={5}
                    marks={{ 1: '1', 2: '1E-2', 3: '1E-3', 4: '1E-4', 5: '1E-5'}}
                    reverse
                    step={null}
                    trackStyle={{ backgroundColor: 'transparent', height: 0 }}
                    /*railStyle={{ height: 10 }}
                    handleStyle={{
                        height: 28,
                        width: 28,
                        marginLeft: -14,
                        marginTop: -9,
                    }}*/
                />
            </div>
            <div className="settings--buttons">
                <button onClick={onStep}>Step</button>
                <div className="settings-trace">
                    <label>
                        <input type="checkbox" value={showTrace} onChange={handleChange}/>
                        Show Trace
                    </label>
                    <button onClick={onClear}>Clear Trace</button>
                </div>
            </div>
            <h3>Description:</h3>
            <p>What do the parts of the plots mean?</p>
            </>
    )
}