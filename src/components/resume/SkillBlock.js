import React from 'react'

const SkillBlock = (props) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-2 font-bold text-lg">
        {props.blockName}
      </div>
      <div className="col-span-10">
        {props.children}
      </div>
    </div>
  )
}

export default SkillBlock