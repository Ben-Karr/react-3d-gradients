import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export function Modals({showInfo, switchInfoShow}) {
    return (
        <>
            <Modal open={showInfo['point_info']} onClose={(e)=>switchInfoShow(e,'point_info')}>
                <div className='modal'>
                    <div className="close-modal">
                        <IconButton onClick={e => switchInfoShow(e,'point_info')} size="small">
                            <CloseIcon color="black" />
                        </IconButton>
                    </div>
                    <h4>The Setup:</h4>
                    <div>
                        Assume that we collected some data as input-output-pairs (<i>blue circles</i>) and we want to find a function that takes an input value and predicts the corresponding output. In this particular example we generated a hundret points <InlineMath math="(x_i,y_i)"/> such that <BlockMath math="y_i = 3 \cdot x_i^2 + 2 \cdot x_i + \epsilon_i"/> where the values <InlineMath math="x_i"/> are evenly distributed between <InlineMath math="-10"/> and <InlineMath math="10"/> and <InlineMath math="\epsilon_i"/> is some randomly generated noise (to resemble "natuarlly" collected data).
                        <br/><br/>
                        Since we know that the data has been generated by a quadratic function it makes sense to limit ourself to such functions. Thus the goal shall be to find <InlineMath math="a"/> and <InlineMath math="b"/> such that the quadratic <InlineMath math="f_{a,b}"/> (<i>red curve</i>) with <BlockMath math="f_{a,b}(x) = a\cdot x^2 + b\cdot x "/> <i>best predicts</i> the data points.
                    </div>
                    <h4>Basic Controls</h4>
                    <div>
                        We can use the sliders to change <b>a</b> and <b>b</b> and try to visually fit <InlineMath math="f_{a,b}"/> or use the <b>loss</b> value as an indicator of how good our prediction is — the lower the value the better. The function that maps a point <InlineMath math="(a,b)"/> to its loss value is called the <b>loss function</b> (see <b>Choose critic</b> for more details).
                        <br/><br/>
                        We can chose from different <b>critics</b>, which changes how the loss function measures the difference between the targets and the predictions. This also changes the magnitude of the loss value and likewise the shape of the <b>surface plot</b>, where each of the points on the surface is a point in <InlineMath math="3"/>-dimensional space consisting of some <InlineMath math="a"/>, <InlineMath math="b"/> and the loss of <InlineMath math="(a,b)"/>. In particular the point that is given by the current <InlineMath math="a, b"/> and their loss is highlighted as a <i>white circle</i>.
                    </div>
                    <h4>The Gradient Arrow</h4>
                    <div>
                        The 3D-plot also shows a representation of the negative gradient of the loss function at <InlineMath math="(a,b)"/> (<i>gray arrow</i>). The negative gradient is a vector in the (here <InlineMath math="2"/>-dimensional) parameter space which points into the direction of a local minimum. 
                        This means that if we — starting from some point <InlineMath math="(a,b)"/> — step into the direction of the negative gradient at <InlineMath math="(a,b)"/>: the loss decreases . There is one constraint to that: <b>The size of the step has to be small enough</b>. (Also see <b>Gradient Stepper</b> for more details).
                    </div>
                    <h4>The Gradient Stepper</h4>
                    <div>
                        The control pannel provides a value <b>Gradient Magnitude</b> which is the length of the gradient vector at the current point. This value might be very high, such that if we'd step the whole length of the gradient we'd overstep and walk off the surface rather than towards the minimum. We can scale the gradient vector by chosing an appropriate <b>Learning Rate</b> and the value <b>Stepsize</b> shows the result.
                        The appropriate learning rate can vary vastly by the critic we chose as well as on how far away or close the current point is to the minimum. If the loss diverged using the sliders moves the current point back on the surface.
                    </div>
                    <h4> Click Step and have fun! </h4>
                </div>
            </Modal>

            <Modal open={showInfo['critic_info']} onClose={(e)=>switchInfoShow(e,'critic_info')}>
                <div className='modal'>
                    <div className="close-modal">
                        <IconButton onClick={e => switchInfoShow(e,'critic_info')} size="small">
                            <CloseIcon color="black" />
                        </IconButton>
                    </div>
                    <h4>The Critic:</h4>
                    <div>
                        A critic measures the average distance from the targets <InlineMath math="y_i"/> to the predictions <InlineMath math="\hat{y_i}=f_{a,b}(x_i)"/>.
                        The three critics that are availabel are:
                        <ul>
                            <li> Mean Absolute Error: <BlockMath math="\text{mae}(y,\hat{y})=\frac{1}{m}\sum_{i=1}^{m}|y_i - \hat{y_i}|,"/></li>
                            <li> Mean Square Error: <BlockMath math="\text{mse}(y,\hat{y})=\frac{1}{m} \sum_{i=1}^{m}(y_i - \hat{y_i})^2,"/></li>
                            <li> Root Mean Square Error: <BlockMath math="\text{rmse}(y,\hat{y})=\sqrt{\frac{1}{m}\sum_{i=1}^{m}(y_i - \hat{y_i})^2,}"/></li>
                        </ul>
                        where <InlineMath math="m"/> is the number of observed instances (100 here).
                    </div>
                    <h4>The Loss:</h4>
                    <div>
                        If <InlineMath math="\text{critic}"/> is one of the critics above, then the loss of some <InlineMath math="a"/> and <InlineMath math="b"/> is: <InlineMath math="\text{critic}(y,f_{a,b}(x))"/> and the <b>loss function</b> maps each point <InlineMath math="(a,b)"/> to its loss: <BlockMath math="\text{loss}(a,b) = \text{critic}(y, f_{a,b}(x))."/>
                        The graph of the function <InlineMath math="\text{loss}"/> generates the loss surface in the 3D plot.
                    </div>
                    <br/>
                    <div>
                        <b>Note:</b> Finding values <InlineMath math="a,b"/> such that <InlineMath math="\text{loss}(a,b)"/> is minimal is what we mean by finding a quadratic function <InlineMath math="f_{a,b}"/> that <i>best predicts</i> the target values <InlineMath math="y_i"/>.
                    </div>
                </div>
            </Modal>

            <Modal open={showInfo['stepper_info']} onClose={(e)=>switchInfoShow(e,'stepper_info')}>
                <div className='modal'>
                    <div className="close-modal">
                        <IconButton onClick={e => switchInfoShow(e,'stepper_info')} size="small">
                            <CloseIcon color="black" />
                        </IconButton>
                    </div>
                    <h4>Gradient Stepper</h4>
                    <div>
                        The Gradient Stepper performs the steps of gradient descent with a chosen learning rate.
                    </div>
                    <h4>What was Gradient Descent again?</h4>
                    <div>
                        The goal of <a href="https://en.wikipedia.org/wiki/Gradient_descent#Description" target="_blank" rel="noopener noreferrer">Gradient Descent</a> is to find the local minimum of some (multi-variable, differentiable) function <InlineMath math="F"/>. The process can be described as:
                        <ul>
                            <li>Start with some non-specific guess, <InlineMath math="\alpha_0"/> say,</li>
                            <li>calculate the gradient of <InlineMath math="F"/> at <InlineMath math="\alpha_0" />: <InlineMath math="\nabla F(\alpha_0)"/>,</li>
                            <li>calculate the new guess as: <InlineMath math="\alpha_1=\alpha_0 - \gamma \cdot \nabla F(\alpha_0)"/>,</li>
                            <li>if <InlineMath math="0 < \gamma"/> is small enough then <InlineMath math="F(\alpha_1) < F(\alpha_0)"/>,</li>
                            <li>iterating that process converges to the local minimum.</li>
                        </ul>
                        <b>Note:</b> For our stepper <InlineMath math="\gamma"/> is given by <b>Learning Rate</b> and the initial value <InlineMath math="\alpha_0"/> is <InlineMath math="(1,1)"/> by default. So the first step would calculate the gradient of <InlineMath math="\text{loss}"/> at <InlineMath math="(1,1)"/> which is: <InlineMath math="\nabla \text{loss}(1,1)"/>.
                    </div>
                    <h4>And what was the Gradient again?</h4>
                    <div>
                        In the case of a multi-variable function as here, the <a href="https://en.wikipedia.org/wiki/Gradient" target="_blank" rel="noopener noreferrer">gradient</a> of a function at some point is the vector of <a href="https://en.wikipedia.org/wiki/Partial_derivative" target="_blank" rel="noopener noreferrer">partial derivates</a> at that point. Lets pick <InlineMath math="\text{mse}"/> as our critic then the gradient of <InlineMath math="\text{loss}"/> at <InlineMath math="(1,1)"/> would be:
                        <BlockMath math="
                            \nabla \text{loss} (1,1) = \begin{pmatrix} \frac{\partial \text{loss}}{\partial a}(1,1) \\ \frac{\partial \text{loss}}{\partial b}(1,1) \end{pmatrix} \approx \begin{pmatrix} -7910.767 \\ -15.146 \end{pmatrix},
                        "/>
                        so a vector in the <InlineMath math="2"/>-dimensional parameter space. 
                    </div>
                    <h4>The importance of the learning rate</h4>
                    <div>
                        If we follow that example it gets quiet obvious why we need <InlineMath math="\gamma"/>. Assume we don't scale the gradient (set <InlineMath math="\gamma = 1"/>) our second guess would be 
                        <BlockMath math="\begin{pmatrix} 1 \\ 1 \end{pmatrix} - 1 \cdot \nabla \text{loss} (1,1) \approx \begin{pmatrix} 1 \\ 1 \end{pmatrix} - \begin{pmatrix} -7910.767 \\ -15.146 \end{pmatrix} = \begin{pmatrix} -7909.767 \\ -14.146 \end{pmatrix},"/>
                        which is clearly no improvement. So it's crutial to understand that the gradient only provides the direction into we have to step but not how big or small our step should be. Using a learning rate of 1E-4<InlineMath math="=0.0001"/> the first step produces:
                        <BlockMath math="\begin{align*} \begin{pmatrix} 1 \\ 1 \end{pmatrix} - \gamma \cdot \nabla\text{loss}(1,1) &= \begin{pmatrix} 1 \\ 1 \end{pmatrix} - 0.0001 \cdot \begin{pmatrix} -7910.767 \\ -15.146 \end{pmatrix}   = \begin{pmatrix} 1.7910767 \\ 1.0015146 \end{pmatrix} \end{align*}"/> which works out much better. On the other hand: using a different critic, say <InlineMath math="\text{rmse}"/>, results in way smaller loss values, thus in smaller gradients and hence a bigger learning rate should be used to get reasonable step sizes.
                    </div>
                </div>
            </Modal>
        </>
    )
}