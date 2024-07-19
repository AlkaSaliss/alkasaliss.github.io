import React, { useState, useEffect, useCallback } from 'react'
import * as d3 from 'd3'
import { rowProcessor } from '../../../utils/irisUtils'
import Scatter3D from './Scatter3D'

const Iris3D = () => {
  const [data, setData] = useState(null)
  const [xColumn, setXColumn] = useState('PetalLengthCm')
  const [yColumn, setYColumn] = useState('PetalWidthCm')
  const [zColumn, setZColumn] = useState('SepalLengthCm')
  const [xScale, setXScale] = useState(null)
  const [yScale, setYScale] = useState(null)
  const [zScale, setZScale] = useState(null)
  const [colorScale, setColorScale] = useState(null)

  useEffect(() => {
    d3.csv('/static/data/Iris.csv', rowProcessor).then(data => {
      const xExtent = d3.extent(data.map(d => d[xColumn]))
      const yExtent = d3.extent(data.map(d => d[yColumn]))
      const zExtent = d3.extent(data.map(d => d[zColumn]))
      const colorExtent = [...new Set(data.map(d => d.Species))]

      const xScale = d3.scaleLinear().domain(xExtent).range([-1, 1])
      const yScale = d3.scaleLinear().domain(yExtent).range([-1, 1])
      const zScale = d3.scaleLinear().domain(zExtent).range([-1, 1])
      const colorScale = d3.scaleOrdinal().domain(colorExtent).range(['red', 'steelblue', 'green'])
      setData(prevData => data)
      setXScale(prevXScale => xScale)
      setYScale(prevYScale => yScale)
      setZScale(prevZScale => zScale)
      setColorScale(prevColorScale => colorScale)
    })
  }, [xColumn, yColumn, zColumn])

  useEffect(() => {
    if (colorScale) {
      drawLegend(colorScale)
    }
  }, [colorScale])

  const drawLegend = (colorScale) => {
    if (!colorScale) {
      return
    }
    const legendRadius = 30
    const spacing = 30
    const legendYOffset = 50
    const n = colorScale.domain().length

    const legendGroup = d3.select('.legend-group-3d').selectAll('rect').data([null])
    legendGroup.enter().append('rect')
      .merge(legendGroup)
      .attr('x', -legendRadius * 2)
      .attr('y', -legendRadius * 2)
      .attr('rx', 10)
      .attr('width', 135)
      .attr('height', spacing * n + legendRadius * 0.7)
      .attr('fill', 'black')
      .attr('opacity', 0.1)
      .attr('transform', `translate(60, ${legendYOffset + 20})`)

    let legendCircles = d3.select('.legend-group-3d').selectAll('.circle-tick-3d').data(colorScale.domain())
    legendCircles.exit().remove()

    let legendCirclesEnter = legendCircles.enter()
      .append('g')
      .attr('class', 'circle-tick-3d')
      .attr('transform', (d, i) => `translate(12, ${i * spacing + legendYOffset - 17})`)

    legendCircles = legendCircles.merge(legendCirclesEnter)

    legendCirclesEnter.append('circle')
      .attr('r', 10)
      .attr('fill', colorScale)
      .attr('opacity', 0.8)

    legendCirclesEnter.append('text')
      .attr('class', 'text-legend text-sm')
      .attr('fill', 'currentColor')
      .text(d => d)
      .attr('dy', '0.32em')
      .attr('x', 20)
  }

  const handleXColumnChange = useCallback((event) => {
    setXColumn(event.target.value)
  }, [])

  const handleYColumnChange = useCallback((event) => {
    setYColumn(event.target.value)
  }, [])

  const handleZColumnChange = useCallback((event) => {
    setZColumn(event.target.value)
  }, [])

  const listColumns = ['PetalLengthCm', 'PetalWidthCm', 'SepalLengthCm', 'SepalWidthCm']
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-around mb-4">
        <div className="form-control w-56">
          <label className="label">
            <span className="label-text">X</span>
          </label>
          <select
            className="select select-bordered"
            value={xColumn}
            onChange={handleXColumnChange}
          >
            {listColumns.map(col => (
              <option value={col} key={col}>{col}</option>
            ))}
          </select>
        </div>
        <div className="form-control w-56">
          <label className="label">
            <span className="label-text">Y</span>
          </label>
          <select
            className="select select-bordered"
            value={yColumn}
            onChange={handleYColumnChange}
          >
            {listColumns.map(col => (
              <option value={col} key={col}>{col}</option>
            ))}
          </select>
        </div>
        <div className="form-control w-56">
          <label className="label">
            <span className="label-text">Z</span>
          </label>
          <select
            className="select select-bordered"
            value={zColumn}
            onChange={handleZColumnChange}
          >
            {listColumns.map(col => (
              <option value={col} key={col}>{col}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex">
        <div className="w-3/4">
          {data && (
            <Scatter3D
              data={data}
              xScale={xScale}
              yScale={yScale}
              zScale={zScale}
              colorScale={colorScale}
              xColumn={xColumn}
              yColumn={yColumn}
              zColumn={zColumn}
            />
          )}
        </div>
        <div className="w-1/4">
          <svg height={150} width={300}>
            <g className="legend-group-3d"></g>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Iris3D
