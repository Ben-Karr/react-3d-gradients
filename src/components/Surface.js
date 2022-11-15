import Plot from 'react-plotly.js'
import { scaleLinear } from 'd3'
import { Component } from 'react'

const magnitudeMins = {'mae': 27, 'mse': 90,'rmse': 2}
const magnitudeMaxs = {'mae': 3300, 'mse': 16000, 'rmse': 43}

export class Surface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { // loss surface | won't change so set data on init
                    x: props.as,
                    y: props.bs,
                    type: 'surface',
                    showscale: false,
                    name: 'Loss Surface',
                    opacity: 0.7,
                    hovertemplate: "a: %{x:.2f} b: %{y:.2f}<br>loss: %{z:,.2f} <extra></extra>",
                    contours: {
                        x: {
                            highlight: false,
                            show: false,
                            size: 0,
                        },
                        y: {
                            highlight: false,
                            show: false,
                            size: 0,
                        },
                        z: {
                            highlight: false,
                            show: false,
                            size: 0,
                        },
                    },
                    colorscale: 'Picnic',
                },
                { // current point (a,b) | inject data on render
                    type: 'scatter3d',
                    marker: {
                        color: 'white', 
                        size:3, 
                        symbol: 'circle',  //cross, x
                        line: {
                            color: 'black',
                            width: 1,
                        },
                    },
                },   
                { // loss's gradients at (a,b) | inject data on render
                    type: 'scatter3d',
                    mode: 'lines',
                    opacity: 1,
                    line: {
                        width: 6,
                        color: 'lightslategray',
                    },
                    showscale: false
                },
                { // gradients arrow head | inject data on render
                        type: "cone",
                        anchor: "tip",
                        hoverinfo: "none",
                        colorscale: [[0, "lightslategray"], [1, "lightslategray"]], // color all cones blue
                        showscale: false,
                },
                { // (a,b,loss) trace | inject data on render
                    type: 'scatter3d',
                    mode: 'lines+markers',
                    opacity: 0.2,
                    line: {
                        width: 2,
                        color: 'black',
                    },
                    marker: {
                        color: 'white',
                        size: 2,
                        symbol: 'circle',
                        line: {
                            color: 'black',
                            width: 0.5
                        }
                    }
                }
            ],
            layout: {
                autosize: true,
                title: 'Loss surface',
                scene: {
                    xaxis: {
                        title: 'a'
                    },
                    yaxis: {
                        title: 'b'
                    },
                    zaxis: {
                        title: 'loss'
                    },
                },
                margin: {
                l: 0,
                r: 0,
                b: 0,
                t: 50,
                pad: 0,
                },
                showlegend: false,       
            },
            frames: [],
            config: {responsive: true},
        };
    }

    update_data(traces){
        const { pointAB, loss, gradients, lossTrace, ls, magnitude, criticName} = this.props;
        const [a,b] = pointAB;

        // Use scaled gradients to represent the changing magnitude while keeping it "in the picture"
        const gradientScale = scaleLinear()
            .domain([magnitudeMins[criticName], magnitudeMaxs[criticName]])
            .range([0.5 , 2]);
        const scalar = gradientScale(magnitude);
        const [normalGradA, normalGradB] = gradients.map(x=>x/magnitude);

        const new_data = [];
        new_data.push({...traces[0], 
            z: ls,
        });
        new_data.push({...traces[1], // (a,b)
            x: [a],
            y: [b],
            z: [loss]});
        new_data.push({...traces[2], // gradients at (a,b)
            x: [a, a - scalar*0.95*normalGradA],
            y: [b, b - scalar*0.95*normalGradB],
            z: [loss ,loss]});
        new_data.push({...traces[3], // gradients "arrow head" || starts at new point and "goes back" in the direction of the gradient
            x: [a - scalar*normalGradA ],
            y: [b - scalar*normalGradB ],
            z: [loss],
            u: [-scalar/2*normalGradA],
            v: [-scalar/2*normalGradB],
            w: [0],
        });
        new_data.push({...traces[4], // (a,b,loss) trace
            x: lossTrace.map(x => x[0]),
            y: lossTrace.map(x => x[1]),
            z: lossTrace.map(x => x[2]),
        })
        return new_data;
    }

    render() {
        return (
            <Plot
                data={this.update_data(this.state.data)}
                layout={this.state.layout}
                frames={this.state.frames}
                config={this.state.config}
                className="plots--surface"
            />
        );
    }
}