import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as d3Axis from 'd3-axis'

const Axis = (props) => {
  const axisGroupRef = useRef(null)

  const renderAxis = (prevProps) => {
    const { orient, scale, axisLabel, axisLabelText } = props
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

    const selectedAxis = d3.select(axisGroupRef.current).call(axis)

    if (axisLabel) {
      let { axisLabelPositionX, axisLabelPositionY } = props.axisLabelPositions
      axisLabelPositionX = orient === 'Left' ? -axisLabelPositionX : axisLabelPositionX
      axisLabelPositionY = orient === 'Left' ? -axisLabelPositionY : axisLabelPositionY

      selectedAxis.append('text').attr('class', `${axisClassPrefix}axis-label-${axisLabel} text-lg`)

      let labelTextSelector = d3.selectAll(`text.${axisClassPrefix}axis-label-${axisLabel}`).data([null])

      const rotation = orient === 'Left' ? `rotate(-90)` : `rotate(0)`

      labelTextSelector.enter()
        .merge(labelTextSelector)
        .attr('y', axisLabelPositionY)
        .attr('x', axisLabelPositionX)
        .attr('fill', 'black')
        .text(axisLabelText)
        .attr('font-family', 'sans-serif')
        .attr('fill', 'currentColor')
        .attr('transform', rotation)
        .exit()
        .remove()

      if (orient === 'Bottom') {
        const { innerHeight } = props
        selectedAxis.selectAll('g.tick line')
          .attr('y2', -innerHeight)
          .attr('opacity', 0.2)
      } else {
        const { innerWidth } = props
        selectedAxis.selectAll('g.tick line')
          .attr('x2', innerWidth)
          .attr('opacity', 0.2)
      }
    }

    const { removeTickLine } = props
    if (removeTickLine) {
      selectedAxis.selectAll(removeTickLine).remove()
    }
  }

  useEffect(() => {
    renderAxis()

    return () => {

    }
  }, [props])

  return (
    <g transform={props.translate} ref={axisGroupRef}></g>
  )
}

export default Axis
