import Plot from 'react-plotly.js';

export  function Curve({xs, ys, guessedYs}) {
    const plot_layout = 
        {
            autosize: true,
            title: 'Data Plot with approximated origin function',
            xaxis: {
                title: 'x'
            },
            yaxis: {
                title: 'f(x)'
            },
            showlegend: false,
            margin: { // content to frame|space for axis titles
                l: 50,
                r: 0,
                b: 50,
                t: 50,
                pad: 0, // padding of axis labels
            }
        }
    const pointsData =
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
    return <Plot data={[pointsData, curveData]} layout={plot_layout} config={{responsive: true}} className="plots--curve"/>
}