import Plot from 'react-plotly.js'

export function Surface({a, b, loss, as, bs, ls, gradients}) {

    const plot_layout = 
        {
            title: '3D plot of loss surface with current parameter point and gradient',
            height: 800,
            scene: {
                //camera: {eye: {x: 1.2, y: 1.2, z: 1}},
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
            t: 100,
            pad: 0,
            },
            showlegend: false,          
        }
    
    const point_trace = 
        { // the point (a,b) in the loss surface
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
        { // loss surface
            x: as,
            y: bs,
            z: ls,
            type: 'surface',
            showscale: false,
            name: 'Loss Surface',
            opacity: 0.7,
        }

        const gradient_trace =
        { // the point (a,b) in the loss surface
            x: [a, a - gradients[0]],
            y: [b, b - gradients[1]],
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
    return <Plot data={[point_trace, surface_trace, gradient_trace]} layout={plot_layout} />
}