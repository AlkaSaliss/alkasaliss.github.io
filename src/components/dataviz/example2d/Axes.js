import React from 'react'
import Axis from './Axis'

const Axes = ({ axisProps }) => {
  const { xProps, yProps } = axisProps

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
}

export default Axes