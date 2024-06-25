import React from 'react'

const Experience = (props) => {
  return (
    <div className="experience mb-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <p className="text-lg">{props.startYear} - {props.endYear}</p>
        </div>
        <div className="col-span-8">
          <h4 className="text-lg mt-0">{props.jobName}</h4>
          <p><strong>Company: </strong>{props.company} | <strong>Team: </strong>{props.team}</p>
          <p><strong>Subject: </strong>{props.subject}</p>
          <p><strong>Methods: </strong>{props.methods}</p>
          <p><strong>Tools: </strong>{props.tools}</p>
          <p>{props.jobDescription}</p>
        </div>
      </div>
    </div>
  )
}

export default Experience
