import { curveNatural, line } from 'd3'

export  function Curve({points, xScale, yScale}) {
    return <path 
        d={line()
            .x(d=>xScale(d[0]))
            .y(d=>yScale(d[1]))
            .curve(curveNatural)
                (points)
        }
    />
}