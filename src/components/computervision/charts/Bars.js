import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'


const Bars = ({ data, columns, scales, id }) => {

  const gRef = useRef(null)
  const { xColumn, yColumn } = columns
  const { xScale, yScale } = scales

  useEffect(() => {

    const gSelect = d3.select(gRef.current)

    const rects = gSelect
      .selectAll('rect')
      .data(data)

    rects
      .enter().append('rect')
      .attr('class', 'rect-prob-class color-')
      .attr('y', d => yScale(d[yColumn]))
      .attr('height', yScale.bandwidth())
      .attr('width', 0)
      .attr('key', d => d[id])
      .style('fill', 'currentColor')
      .merge(rects)
      .transition().duration(1000)
      .delay((d, i) => i * 10)
      .attr('y', d => yScale(d[yColumn]))
      .attr('height', yScale.bandwidth())
      .attr('width', d => xScale(d[xColumn]))
      .attr('key', d => d[id])
      .style('fill', 'currentColor')
  })

  return (
    <g ref={gRef}>
    </g>
  )
}


export default Bars