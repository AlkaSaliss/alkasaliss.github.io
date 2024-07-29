import React from 'react'

const Experience = (props) => {
  return (
    <div className="experience mb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <p className="text-base md:text-lg">{props.startYear} - {props.endYear}</p>
        </div>
        <div className="md:col-span-8">
          <h4 className="text-lg md:text-xl mt-0 underline italic">{props.jobName}</h4>
          <p className="text-sm md:text-base"><strong className='underline'>Company: </strong>{props.company} | <strong className='underline'>Team: </strong>{props.team}</p>
          <div>
            <strong className='underline'>Subject: </strong>
            {props.showSubjectList ? (
              <ul className="custom-list text-sm md:text-base">
                {props.subject.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <span className="text-sm md:text-base">{props.subject}</span>
            )}
          </div>
          <p className="text-sm md:text-base"><strong className='underline'>Methods: </strong>{props.methods}</p>
          <p className="text-sm md:text-base"><strong className='underline'>Tools: </strong>{props.tools}</p>
          <p className="text-sm md:text-base">{props.jobDescription}</p>
        </div>
      </div>
    </div>
  )
}

export default Experience