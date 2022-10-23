import Plot from 'react-plotly.js'

export function Surface({a, b, loss, as, bs, ls}) {

    const plot_layout = 
        {
            title: '3D plot of loss surface with current parameter point and gradient',
            uirevision: 'true', //rmv doesnt help
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
            }              
        }
    
    const point_trace = 
        { // the point (a,b) in the loss surface
            x: [a],
            y: [b],
            z: [loss],
            type: 'scatter3d',
            marker: {
            color: 'white', 
            size:10, 
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
    return <Plot data={[point_trace, surface_trace]} layout={plot_layout} />
}