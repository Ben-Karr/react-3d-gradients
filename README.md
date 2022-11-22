# 3D Gradients

## Whats the purpose of this app?

This app visualizes the  gradients of a loss function and aims to help in understanding what the gradients are. It also tries to show the process of gradient descent and the impact of a learning rate which both are commonly used in machine learning models, in particular when learning neural nets.

## What can can I see here?
The main part of the application are the two plots, which can be controlled by the interface on the left. In particular, you can find the following things:
* __Data Points__ | _the blue circles in the "Data Points with approx." plot._ 
    * Each point represents a pair of (input, output) values; a famous example would be $(\text{"houses sqft"},\text{"houses \$"})$
    * There are 100 points $(x_i,y_i)$ with $x_i$ evenly distributed in $[-10, 10]$ and $y_i = φ(x_i) + ε_i$ where $φ(x) = 3\cdot x^2 + 2\cdot x$ and $ε_i$ some randomly generated noise.
* __Approximation function__ | _the red curve in the "Data Points with approx." plot._
    * The red curve $f_{a,b}$ is defined as $x \mapsto a\cdot x^2 + b\cdot x$, where $a$ and $b$ can be changed with the sliders on the left.
    * The goal is to find $a$ and $b$ such that $f_{a,b}$ "best" predicts the data points $y_i$, where "best" has to be specified (see _critic_).
* You can hide both parts by clicking the label in the legend.
* __Loss__ | _Loss value in the left control panel._
    * As mentioned the loss tries to measure or quantify how "good" a function $f_{a,b}$ predicts the points $(x_i,y_i)$ in particular it measures how "far away" the prediction $f_{a,b}(x_i)$ is from the target $y_i$ and takes "an average" over all 100 $i$`s.
    * What exactly "far away" and "an average" mean is determined by the critic.
* Critic | _Dropdown in the left control panel._
    * There are 3 different critics to pick out of, which measure the average distance of $m$ predictions $\hat{y_1},\cdots,\hat{y_m}$ to the targets $y_1,\cdots,y_m$.
    * Mean Absolute Error: _the mean over the absolute errors:_ 
        $$\frac{1}{m}\sum_{i=1}^{m}|\hat{y_i}- y_i|$$
    * Mean Square Error: _the mean over the square errors:_ 
        $$\frac{1}{m}\sum_{i=1}^{m}(\hat{y_i}- y_i)^2$$
    * Root Mean Square Error: _the squre root of the mean over the square errors:_ 
        $$\sqrt{\frac{1}{m}\sum_{i=1}^{m}(\hat{y_i}- y_i)^2}.$$
* __Loss Surface__ | _The surface in the "Loss surface with gradients…"._
    * The surface is generated in the following way: For each point $(a,b)$ mark the loss of the function $f_{a,b}$ as the height of that point in the 3D plot.