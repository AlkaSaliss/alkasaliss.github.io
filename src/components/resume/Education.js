import React from 'react'

const Education = (props) => {
  return (
    <div className="education p-2 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <p className="text-base md:text-lg">{props.startYear} - {props.endYear}</p>
        </div>
        <div className="md:col-span-8">
          <h4 className="text-lg md:text-xl mt-0 underline italic">{props.degree}</h4>
          <p className="text-sm md:text-base"><strong className='underline'>School: </strong>{props.schoolName}</p>
          <p className="text-sm md:text-base"><strong className='underline'>Major: </strong>{props.major}</p>
        </div>
      </div>
    </div>
  )
}

export default Education