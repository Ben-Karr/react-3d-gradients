import Plot from 'react-plotly.js'
import { scaleLinear } from 'd3'
import { useState } from 'react'

// Use scale gradients to represent the changing magnitude while keeping it on the scale of the surface
const gradientScale = scaleLinear()
    .domain([0, 16000])
    .range([0.3, 2]);

export function Surface({a, b, loss, as, bs, ls, gradients}) {
    const [camera, setCamera] = useState({
        center: { x: 0, y: 0, z: 0 },
        eye: { x: 1.2, y: 1.3, z: 1.2 },
        projection: { type: "perspective" },
        up: { x: 0, y: 0, z: 1 }
    });

    const plot_layout = 
        {
            title: '3D plot of loss surface with current parameter point and gradient',
            height: 1000,
            scene: {
                camera: camera,
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
        }

    const point_trace = 
        {
            x: [a],
            y: [b],
            z: [loss],
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
        }

      const surface_trace = 
        {
            x: as,
            y: bs,
            z: ls,
            type: 'surface',
            showscale: false,
            name: 'Loss Surface',
            opacity: 0.7,
            colorscale: 'Picnic',
        }
        const magnitude = Math.sqrt(Math.pow(gradients[0],2)+Math.pow(gradients[1], 2))
        const scalar = gradientScale(magnitude);
        const gradient_trace =
            {
                x: [a, a - scalar*gradients[0]/magnitude],
                y: [b, b - scalar*gradients[1]/magnitude],
                z: [loss ,loss],
                type: 'scatter3d',
                mode: 'lines',
                opacity: 1,
                line: {
                    width: 6,
                    color: 'black'
                },
                showscale: false
            }
    return <Plot 
        data={[point_trace, surface_trace, gradient_trace]} 
        layout={plot_layout}
        onRelayout={(figure) => {
            setCamera(figure["scene.camera"])
        }}
        />
}