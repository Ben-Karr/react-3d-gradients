
export function AxisLeft({ yScale }) {
    return yScale.ticks().map(tickValue => (
    <g className='axis' key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
      <line x1={0-10}/>
      <text 
        x={-3} 
        textAnchor='end' 
        dx="-10" 
        dy=".36em"
        >
        {tickValue}
    </text>
    </g>
  ))}

  export function AxisBottom({ xScale, innerHeight}) {
    return xScale.ticks().map(tickValue => (
        <g className='axis' key={tickValue} transform={`translate(${xScale(tickValue)}, 0)` }>
        <line
            y1={innerHeight+5} 
            y2={innerHeight}
            />
        <text 
            y={innerHeight+8} 
            textAnchor='middle' 
            dy=".71em"
            >
            {tickValue}
        </text>
        </g>
  ))
}