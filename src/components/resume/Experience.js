import React from 'react'

const Experience = (props) => {
  return (
    <div className="experience mb-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <p className="text-lg">{props.startYear} - {props.endYear}</p>
        </div>
        <div className="col-span-8">
          <h4 className="text-xl mt-0 underline italic">{props.jobName}</h4>
          <p><strong className='underline'>Company: </strong>{props.company} | <strong className='underline'>Team: </strong>{props.team}</p>
          <div>
            <strong className='underline'>Subject: </strong>
            {props.showSubjectList ? (
              <ul className="custom-list">
                {props.subject.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <span>{props.subject}</span>
            )}
          </div>
          <p><strong className='underline'>Methods: </strong>{props.methods}</p>
          <p><strong className='underline'>Tools: </strong>{props.tools}</p>
          <p>{props.jobDescription}</p>
        </div>
      </div>
    </div>
  )
}

export default Experience
