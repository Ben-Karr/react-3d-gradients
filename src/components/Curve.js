import Plot from 'react-plotly.js';

export  function Curve({xs, ys, guessedYs}) {
    const plot_layout = 
        {
            title: 'Data Plot with approximated origin function',
            height: 1000,
            width: 600,
            xaxis: {
                title: 'x'
            },
            yaxis: {
                title: 'f(x)'
            },
            showlegend: false,
            margin: { // content to frame / space for axis titles
                l: 50,
                r: 0,
                b: 50,
                t: 50,
                pad: 0, // padding of axis labels
            }
        }
    const scatterData =
        {
            x: xs,
            y: ys,
            type: 'scatter',
            mode: 'markers',
            marker: {color: 'blue'},
            name: 'Data Points',
        }
    const curveData =
        {
            x: xs,
            y: guessedYs,
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'red'},
            name: 'Approximation',
        }
    return <Plot data={[scatterData, curveData]} layout={plot_layout} className="curve"/>
}