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
                { // won't change so set on init
                    x: props.as,
                    y: props.bs,
                    z: props.ls,
                    type: 'surface',
                    showscale: false,
                    name: 'Loss Surface',
                    opacity: 0.7,
                    colorscale: 'Picnic',
                },
                { // inject data on render
                    type: 'scatter3d',
                    marker: {
                        color: 'white', 
                        size:5, 
                        symbol: 'circle',  //cross, x
                        line: {
                            color: 'black',
                            width: 1,
                        },
                    },
                },   
                { // inject data on render
                    type: 'scatter3d',
                    mode: 'lines',
                    opacity: 1,
                    line: {
                        width: 6,
                        color: 'black'
                    },
                    showscale: false
                }],
            layout: {
                title: '3D plot of loss surface with current parameter point and gradient',
                height: 1000,
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
                autosize: false,
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
            config: {},
        };
    }

    update_data(traces){
        const { a, b, loss, gradients} = this.props;
        const magnitude = Math.sqrt(Math.pow(gradients[0],2)+Math.pow(gradients[1], 2))
        const scalar = gradientScale(magnitude);
        const new_data = [];
        new_data.push(traces[0]);
        new_data.push({...traces[1],
            x: [a],
            y: [b],
            z: [loss]});
        new_data.push({...traces[2],
            x: [a, a - scalar*gradients[0]/magnitude],
            y: [b, b - scalar*gradients[1]/magnitude],
            z: [loss ,loss]});
        return new_data;
    }

    render() {
        return (
            <Plot
                data={this.update_data(this.state.data)}
                layout={this.state.layout}
                frames={this.state.frames}
                config={this.state.config}
            />
        );
    }
}