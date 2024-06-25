import React from 'react'
import * as d3 from 'd3'
import { rowProcessor } from '../../../utils/irisUtils'
import Scatter3D from './Scatter3D'


export default class Iris3D extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null,
      xColumn: 'PetalLengthCm',
      yColumn: 'PetalWidthCm',
      zColumn: 'SepalLengthCm',
      xScale: null,
      yScale: null,
      zScale: null,
      colorScale: null,
      clickedCategory: null
    }
  }

  componentDidMount() {
    d3.csv('/static/data/Iris.csv', rowProcessor).then(data => {
      const xExtent = d3.extent(data.map(d => d[this.state.xColumn]))
      const yExtent = d3.extent(data.map(d => d[this.state.yColumn]))
      const zExtent = d3.extent(data.map(d => d[this.state.zColumn]))
      const colorExtent = [...new Set(data.map(d => d.Species))]

      const xScale = d3.scaleLinear().domain(xExtent).range([-1, 1])
      const yScale = d3.scaleLinear().domain(yExtent).range([-1, 1])
      const zScale = d3.scaleLinear().domain(zExtent).range([-1, 1])
      const colorScale = d3.scaleOrdinal().domain(colorExtent).range(['red', 'steelblue', 'green'])
      this.setState({
        data,
        xScale,
        yScale,
        zScale,
        colorScale
      })
    }).then(() => {
      this.drawLegend(this.state.colorScale)
    })
  }

  componentDidUpdate() {
    this.drawLegend(this.state.colorScale)
  }

  handleXColumnChange = (event) => {
    if (event.target.value !== this.state.xColumn) {
      this.setState({ xColumn: event.target.value })
    }
  }

  handleYColumnChange = (event) => {
    if (event.target.value !== this.state.yColumn) {
      this.setState({ yColumn: event.target.value })
    }
  }

  handleZColumnChange = (event) => {
    if (event.target.value !== this.state.zColumn) {
      this.setState({ zColumn: event.target.value })
    }
  }

  setClickedCategory = (cat) => {
    this.setState((prevState) => ({
      clickedCategory: prevState.clickedCategory === cat ? null : cat
    }))
  }

  drawLegend = (colorScale) => {
    if (colorScale === null) {
      return
    }
    const legendRadius = 30
    const spacing = 30
    const legendYOffset = 50
    // console.log("-----------------------------")
    const n = colorScale.domain().length
    // console.log("*****************************")

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
      .attr('class', 'text-legend')
      .text(d => d)
      .attr('dy', '0.32em')
      .attr('x', 20)
  }

  render() {
    const listColumns = ['PetalLengthCm', 'PetalWidthCm', 'SepalLengthCm', 'SepalWidthCm']
    if (this.state.data) {
      const { xColumn, yColumn, zColumn, xScale, yScale, zScale, colorScale } = this.state

      return (
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap justify-around mb-4">
            <div className="form-control w-56">
              <label className="label">
                <span className="label-text">X Axis</span>
              </label>
              <select
                className="select select-bordered"
                value={xColumn}
                onChange={this.handleXColumnChange}
              >
                {listColumns.map(col => (
                  <option value={col} key={col}>{col}</option>
                ))}
              </select>
            </div>
            <div className="form-control w-56">
              <label className="label">
                <span className="label-text">Y Axis</span>
              </label>
              <select
                className="select select-bordered"
                value={yColumn}
                onChange={this.handleYColumnChange}
              >
                {listColumns.map(col => (
                  <option value={col} key={col}>{col}</option>
                ))}
              </select>
            </div>
            <div className="form-control w-56">
              <label className="label">
                <span className="label-text">Z Axis</span>
              </label>
              <select
                className="select select-bordered"
                value={zColumn}
                onChange={this.handleZColumnChange}
              >
                {listColumns.map(col => (
                  <option value={col} key={col}>{col}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex">
            <div className="w-3/4">
              <Scatter3D
                data={this.state.data}
                xScale={xScale}
                yScale={yScale}
                zScale={zScale}
                colorScale={colorScale}
                xColumn={xColumn}
                yColumn={yColumn}
                zColumn={zColumn}
              />
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

    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-around">
          <div className="form-control w-56">
            <label className="label">
              <span className="label-text">X Axis</span>
            </label>
            <select
              className="select select-bordered"
              value={this.state.xColumn}
              onChange={this.handleXColumnChange}
            >
              {listColumns.map(col => (
                <option value={col} key={col}>{col}</option>
              ))}
            </select>
          </div>
          <div className="form-control w-56">
            <label className="label">
              <span className="label-text">Y Axis</span>
            </label>
            <select
              className="select select-bordered"
              value={this.state.yColumn}
              onChange={this.handleYColumnChange}
            >
              {listColumns.map(col => (
                <option value={col} key={col}>{col}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )
  }
}
