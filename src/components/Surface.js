import Plot from 'react-plotly.js'
import { scaleLinear } from 'd3'
import { Component } from 'react'

// Use scaled gradients to represent the changing magnitude while keeping it "in the picture"
const gradientScale = scaleLinear()
    .domain([0, 16000])
    .range([0.3, 2]);

export class Surface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { // loss surface | won't change so set data on init
                    x: props.as,
                    y: props.bs,
                    z: props.ls,
                    type: 'surface',
                    showscale: false,
                    name: 'Loss Surface',
                    opacity: 0.7,
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
                        color: 'darkgray',
                    },
                    showscale: false
                },
                { // gradients arrow head | inject data on render
                        type: "cone",
                        anchor: "tip",
                        hoverinfo: "none",
                        colorscale: [[0, "darkgray"], [1, "darkgray"]], // color all cones blue
                        showscale: false,
                },
                { // (a,b,loss) trace | inject data on render
                    type: 'scatter3d',
                    mode: 'lines+markers',
                    opacity: 0.1,
                    line: {
                        width: 5,
                        color: 'black',
                    },
                    marker: {
                        color: 'white',
                        size: 2,
                        symbol: 'circle',
                        line: {
                            color: 'black',
                            width: 1,
                        }
                    }
                }
            ],
            layout: {
                autosize: true,
                title: '3D plot of loss surface with current parameter point and gradient',
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
        const { pointAB, loss, gradients, lossTrace} = this.props;
        const [a,b] = pointAB;
        const [gradA, gradB] = gradients;

        const magnitude = Math.sqrt(Math.pow(gradA,2)+Math.pow(gradB, 2))
        const scalar = gradientScale(magnitude);
        const [normalGradA, normalGradB] = gradients.map(x=>x/magnitude);

        const new_data = [];
        new_data.push(traces[0]);
        new_data.push({...traces[1], // (a,b)
            x: [a],
            y: [b],
            z: [loss]});
        new_data.push({...traces[2], // gradients at (a,b)
            x: [a, a - scalar*normalGradA],
            y: [b, b - scalar*normalGradB],
            z: [loss ,loss]});
        new_data.push({...traces[3], // grdients "arrow head" || starts at new point and "goes back" in the direction of the gradient
            x: [a - scalar*normalGradA ],
            y: [b - scalar*normalGradB ],
            z: [loss],
            u: [-normalGradA],
            v: [-normalGradB],
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