import React from 'react'
import * as d3 from 'd3'
import Axes from './Axes'
import ScatterCircles from './ScatterCircles'
import { rowProcessor } from '../../../utils/irisUtils'


const getDimensions = () => {
  const width = window.innerWidth * 0.9
  const height = window.innerHeight * 0.55
  const margins = { left: width * 0.07, right: width * 0.12, top: height * 0.084, bottom: height * 0.084 }
  const innerWidth = width - margins.left - margins.right
  const innerHeight = height - margins.top - margins.bottom

  return {
    width,
    height,
    margins,
    innerWidth,
    innerHeight
  }
}

export default class IrisAnimated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      xColumn: 'PetalLengthCm',
      yColumn: 'PetalWidthCm',
      clickedCategory: null,
      dimensions: getDimensions()
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    d3.csv('/static/data/Iris.csv', rowProcessor).then(data => {
      this.setState({ data })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({ dimensions: getDimensions() })
  }

  handleXColumnChange = (event) => {
    this.setState({ xColumn: event.target.value })
  }

  handleYColumnChange = (event) => {
    this.setState({ yColumn: event.target.value })
  }

  setClickedCategory = (cat) => {
    this.setState((prevState) => ({
      clickedCategory: prevState.clickedCategory === cat ? null : cat
    }))
  }

  render() {
    const listColumns = ['PetalLengthCm', 'PetalWidthCm', 'SepalLengthCm', 'SepalWidthCm']
    const { data, dimensions, xColumn, yColumn, clickedCategory } = this.state

    if (data) {
      const xExtent = d3.extent(data.map(d => d[xColumn]))
      const yExtent = d3.extent(data.map(d => d[yColumn]))
      const colorExtent = [...new Set(data.map(d => d.Species))]

      const xScale = d3.scaleLinear().domain(xExtent).range([0, dimensions.innerWidth]).nice()
      const yScale = d3.scaleLinear().domain(yExtent).range([dimensions.innerHeight, 0]).nice()
      const colorScale = d3.scaleOrdinal().domain(colorExtent).range(['red', 'steelblue', 'green'])

      const xProps = {
        orient: 'Bottom',
        scale: xScale,
        axisLabel: xColumn,
        axisLabelText: xColumn,
        axisLabelPositions: { axisLabelPositionX: dimensions.innerWidth / 2, axisLabelPositionY: dimensions.innerHeight / 11 },
        innerHeight: dimensions.innerHeight,
        removeTickLine: '.domain',
        translate: `translate(0, ${dimensions.innerHeight})`
      }

      const yProps = {
        orient: 'Left',
        scale: yScale,
        axisLabel: yColumn,
        axisLabelText: yColumn,
        axisLabelPositions: { axisLabelPositionX: dimensions.innerWidth / 6, axisLabelPositionY: dimensions.innerHeight / 11 },
        innerWidth: dimensions.innerWidth,
        removeTickLine: '.domain',
        translate: `translate(0, 0)`
      }

      return (
        <div className="flex flex-col items-center">
          <div className="text-center mb-2">
            <p className="text-base">
              Change interactively X or Y axis using dropdown Menus. Hover on a given point to display (x, y) values. Click on any point from plot or legend to highlight all points from the same color. Click again to unselect.
            </p>
          </div>
          <div className="flex justify-center mb-4">
            <div className="form-control w-full max-w-xs mx-4">
              <label className="label" htmlFor="x-axis-select">X Axis</label>
              <select className="select select-bordered" id="x-axis-select" value={xColumn} onChange={this.handleXColumnChange}>
                {listColumns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
            <div className="form-control w-full max-w-xs mx-4">
              <label className="label" htmlFor="y-axis-select">Y Axis</label>
              <select className="select select-bordered" id="y-axis-select" value={yColumn} onChange={this.handleYColumnChange}>
                {listColumns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            {data && (
              <svg width={dimensions.width} height={dimensions.height}>
                <g transform={`translate(${dimensions.margins.left}, ${dimensions.margins.top})`}>
                  <Axes axisProps={{ xProps, yProps }} />
                  <text x={dimensions.width * 0.25} y={-dimensions.height / 27} className='text-2xl' fill='currentColor'>
                    Iris Flower Data Visualizer
                  </text>
                  <ScatterCircles
                    data={data}
                    columns={{ xColumn, yColumn, catColumn: 'Species' }}
                    scales={{ xScale, yScale, colorScale }}
                    id='Id'
                    innerWidth={dimensions.innerWidth}
                    innerHeight={dimensions.innerHeight}
                    setClickedCategory={this.setClickedCategory}
                    clickedCategory={clickedCategory}
                  />
                </g>
              </svg>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        <p className="text-lg">Loading...</p>
      </div>
    )
  }
}
