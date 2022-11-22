import Modal from '@mui/material/Modal';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export function Modals({showInfo, switchInfoShow}) {
    return (
        <>
            <Modal open={showInfo['point_info']} onClose={(e)=>switchInfoShow(e,'point_info')}>
                <div className='modal'>
                <h4>Premise:</h4>
                The Data Points (<i>blue circles</i>) resemble some observed data. There are <InlineMath math="m=100"/> points <InlineMath math="(x_i,y_i)"/> with <InlineMath math="x_i"/> evenly distributed in <InlineMath math="[-10, 10]"/> and <InlineMath math="y_i = 3\cdot x_i^2 + 2\cdot x_i \pm \epsilon_i"/> where <InlineMath math="\epsilon_i"/> is some randomly generated noise. The goal here is to find values <InlineMath math="a"/> and <InlineMath math="b"/> such that the quadratic function <InlineMath math="f_{a,b}"/> (<i>red curve</i>) with <InlineMath math="f_{a,b}(x) = a \cdot x^2 + b\cdot x"/> "best" predicts the values <InlineMath math="y_i"/> at <InlineMath math="x_i"/>.
                <h4>The Sliders for a and b:</h4>
                The sliders control two things:
                <ul>
                    <li> said  quadratic function <InlineMath math="f_{a,b}"/>, </li>
                    <li> the point <InlineMath math="(a,b)"/> in the 3D plot (<i>white circle</i>).</li>
                </ul>
                </div>
            </Modal>
            <Modal open={showInfo['critic_info']} onClose={(e)=>switchInfoShow(e,'critic_info')}>
                <div className='modal'>
                    <h4>The critic:</h4>
                        The critic measures the average distance from the targets <InlineMath math="y_i"/> to the predictions <InlineMath math="\hat{y_i}=f_{a,b}(x_i)"/>.
                        The three critics that are availabel here are:
                        <ul>
                            <li> Mean Absolute Error: <BlockMath math="\text{mae}(y,\hat{y})=\frac{1}{m}\sum_{i=1}^{m}|y_i - \hat{y_i}|"/></li>
                            <li> Mean Square Error: <BlockMath math="\text{mse}(y,\hat{y})=\frac{1}{m} \sum_{i=1}^{m}(y_i - \hat{y_i})^2"/> </li>
                            <li> Root Means Square Error: <BlockMath math="\text{rmse}(y,\hat{y})=\sqrt{\frac{1}{m}\sum_{i=1}^{m}(y_i - \hat{y_i})^2}"/></li>
                        </ul>
                    <h4>The Loss:</h4>
                    The loss of some <InlineMath math="a"/> and <InlineMath math="b"/> is: <InlineMath math="\text{critic}(y,f_{a,b}(x))"/> where <InlineMath math="\text{critic}"/> is one of the three critics above. The loss function maps each point <InlineMath math="(a,b)"/> to its loss: <BlockMath math="\text{loss}(a,b) = \text{critic}(y, f_{a,b}(x))."/>
                    <b>Note:</b> Finding the values <InlineMath math="a,b"/> such that <InlineMath math="\text{loss}(a,b)"/> is minimal is the same as finding <InlineMath math="f_{a,b}"/> that "best" predicts the target values <InlineMath math="y_i"/>.
                </div>
            </Modal>
            <Modal open={showInfo['stepper_info']} onClose={(e)=>switchInfoShow(e,'stepper_info')}>
                <div className='modal'>
                    <h4>What was Gradient Descent again?</h4>
                </div>
            </Modal>
        </>
    )
}