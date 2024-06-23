import React from 'react'

export default (props) => {
  return (
    <div className="skill mb-4">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-4 text-right">
          <span>{props.skill}</span>
        </div>
        <div className="col-span-8">
          <progress className="progress progress-primary w-3/4" value={props.progress} max="100"></progress>
        </div>
      </div>
    </div>
  )
}
