import React from 'react'
import * as d3 from 'd3'

export default ({
  data,
  columns,
  scales,
  id,
  innerHeight,
  setClickedCategory,
  clickedCategory
}) => {
  const { xColumn, yColumn, catColumn } = columns
  const { xScale, yScale, colorScale } = scales

  return (
    <g className='scatter-circles'>
      {data.map(d => (
        <circle
          key={d[id]}
          cx={xScale(d[xColumn])}
          cy={yScale(d[yColumn])}
          fill={clickedCategory === d[catColumn] ? 'yellow' : colorScale(d[catColumn])}
          r='5'
          onMouseOver={(e) => {
            const tip = d3.select('#tooltip')
            tip.transition().duration(200).style('opacity', 0.9)
            tip.html(`${xColumn}: ${d[xColumn]}<br/>${yColumn}: ${d[yColumn]}`)
              .style('left', `${e.pageX}px`)
              .style('top', `${e.pageY - 28}px`)
          }}
          onMouseOut={() => {
            d3.select('#tooltip').transition().duration(500).style('opacity', 0)
          }}
          onClick={() => setClickedCategory(d[catColumn])}
        />
      ))}
      <foreignObject width="100" height="50" x={xScale.range()[1] + 10} y="0">
        <div className="legend">
          {colorScale.domain().map(category => (
            <div
              key={category}
              onClick={() => setClickedCategory(category)}
              className={`flex items-center cursor-pointer ${clickedCategory === category ? 'bg-yellow-400' : ''}`}
            >
              <div className="w-4 h-4 mr-2" style={{ backgroundColor: colorScale(category) }}></div>
              <p>{category}</p>
            </div>
          ))}
        </div>
      </foreignObject>
      <div id="tooltip" className="absolute text-xs bg-white p-2 rounded shadow opacity-0 pointer-events-none"></div>
    </g>
  )
}
