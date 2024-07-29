import React from 'react'

const SkillBlock = (props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-2 font-bold text-base md:text-lg mb-2 md:mb-0">
        {props.blockName}
      </div>
      <div className="md:col-span-10">
        {props.children}
      </div>
    </div>
  )
}

export default SkillBlock
