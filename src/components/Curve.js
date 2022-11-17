import Plot from 'react-plotly.js';

export  function Curve({xs, ys, pointAB, guessedYs}) {
    const plot_layout = 
        {
            autosize: true,
            title: 'Data Points with approximation f<sub>a,b</sub>',
            xaxis: {
                title: 'x'
            },
            yaxis: {
                title: `f<sub>a,b</sub>(x)=${pointAB[0].toFixed(2)}·x<sup>2</sup> + ${pointAB[1].toFixed(2)}·x`,
            },
            showlegend: true,
            legend: {
                x: 0,
                y: 1,
                xanchor: 'left',
            },
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
            mode: 'markers+lines',
            marker: {
                color: 'red',
                opacity: 0.4,
                line: {
                    color: 'black',
                    width: 0.5,
                }
            },
            name: 'f<sub>a,b</sub>',
        }
    return <Plot data={[curveData, pointsData]} layout={plot_layout} config={{responsive: true}} className="plots--curve"/>
}