## Premise:
The Data Points (_blue circles_) resemble some observed data. There are $m=100$ points $(x_i,y_i)$ with $x_i$ evenly distributed in $[-10, 10]$ and $y_i = 3\cdot x_i^2 + 2\cdot x_i \pm \epsilon_i$ where $\epsilon_i$ is some randomly generated noise. The goal here is to find values $a$ and $b$ such that the quadratic function $f_{a,b}$ (_red curve_) with $f_{a,b}(x) = a \cdot x^2 + b\cdot x$ "best" predicts the values $y_i$ at $x_i$.

* The Sliders for __a__ and __b__: The sliders control two things:
    * said  quadratic function $f_{a,b}$,
    * the point $(a,b)$ (_white circle_) in the 3D plot.
* The __critic__:
    * The critic measures the average distance from the targets $y_i$ to the predictions $\hat{y_i}=f_{a,b}(x_i)$.
    * The three critics that are availabel here are:
        * Mean Absolute Error: $$\text{mae}(y,\hat{y})=\frac{1}{m}\sum_{i=1}^{m}|y_i - \hat{y_i}|$$
        * Mean Square Error: $$\text{mse}(y,\hat{y})=\frac{1}{m} \sum_{i=1}^{m}(y_i - \hat{y_i})^2$$
        * Root Means Square Error: $$\text{rmse}(y,\hat{y})=\sqrt{\frac{1}{m}\sum_{i=1}^{m}(y_i - \hat{y_i})^2}$$
* The __Loss__:
    * For set $a$ and $b$, the loss is the result of:
    $$ 
        \text{critic}(y,f_{a,b}(x)) 
    $$ 
    where $\text{critic}$ is one of the three critics $\text{mae},\text{mse},\text{rmse}$. Given a critic, the loss function maps each point $(a,b)$ to its loss [^1]:
    $$
        \text{loss}(a,b) = \text{critic}(y, f_{a,b}(x)). 
    $$
* The __Loss Surface__:
    * Given a certain critic, we can calculate $\text{loss}(a,b)$ for each $a$ and each $b$. The resulting points $(a,b,\text{loss}(a,b))$ build a surface in the 3-dimensional space.
    * The surface is the graph of the loss function.
* The __Gradients__:
    * Something about gradient descent

[^1]: The function $\text{loss}$ is what we are going to determine the gradients of.