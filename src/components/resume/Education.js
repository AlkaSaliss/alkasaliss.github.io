import React from 'react'

const Education = (props) => {
  return (
    <div className="education p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <p className="text-lg">{props.startYear} - {props.endYear}</p>
        </div>
        <div className="col-span-8">
          <h4 className="text-xl mt-0 underline italic">{props.degree}</h4>
          <p><strong className='underline'>School: </strong>{props.schoolName}</p>
          <p><strong className='underline'>Major: </strong>{props.major}</p>
        </div>
      </div>
    </div>
  )
}

export default Education