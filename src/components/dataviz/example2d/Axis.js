import React from 'react'
import * as d3 from 'd3'
import * as d3Axis from 'd3-axis'

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis()
  }

  componentDidUpdate(prevProps) {
    this.renderAxis(prevProps)
  }

  renderAxis = (prevProps) => {
    const orient = this.props.orient
    const scale = this.props.scale
    const axisLabel = this.props.axisLabel
    const axisLabelText = this.props.axisLabelText

    const axisClassPrefix = orient === 'Left' ? 'y' : 'x'
    if (prevProps && prevProps.axisLabel) {
      d3.selectAll(`text.${axisClassPrefix}axis-label-${prevProps.axisLabel}`).remove()
    }

    const allowedOrient = ['Left', 'Bottom']
    if (!allowedOrient.includes(orient)) {
      throw new Error("axisType must be 'Left' or 'Bottom'")
    }

    const axisType = `axis${orient}`
    const axis = d3Axis[axisType]()
      .scale(scale)
      .tickPadding([5])

    const selectedAxis = d3.select(this.axisGroup).call(axis)

    if (axisLabel) {
      let { axisLabelPositionX, axisLabelPositionY } = this.props.axisLabelPositions
      axisLabelPositionX = orient === 'Left' ? -axisLabelPositionX : axisLabelPositionX
      axisLabelPositionY = orient === 'Left' ? -axisLabelPositionY : axisLabelPositionY

      selectedAxis.append('text').attr('class', `${axisClassPrefix}axis-label-${axisLabel}`)

      let labelTextSelector = d3.selectAll(`text.${axisClassPrefix}axis-label-${axisLabel}`).data([null])

      const rotation = orient === 'Left' ? `rotate(-90)` : `rotate(0)`

      labelTextSelector.enter()
        .merge(labelTextSelector)
        .attr('y', axisLabelPositionY)
        .attr('x', axisLabelPositionX)
        .attr('fill', 'black')
        .text(axisLabelText)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '2vmin')
        .attr('transform', rotation)
        .exit()
        .remove()

      if (orient === 'Bottom') {
        const innerHeight = this.props.innerHeight
        selectedAxis.selectAll('g.tick line')
          .attr('y2', -innerHeight)
          .attr('opacity', 0.2)
      } else {
        const innerWidth = this.props.innerWidth
        selectedAxis.selectAll('g.tick line')
          .attr('x2', innerWidth)
          .attr('opacity', 0.2)
      }
    }

    const removeTickLine = this.props.removeTickLine
    if (removeTickLine) {
      selectedAxis.selectAll(removeTickLine).remove()
    }
  }

  render() {
    const translate = this.props.translate
    return (
      <g transform={translate} ref={e => this.axisGroup = e}></g>
    )
  }
}
