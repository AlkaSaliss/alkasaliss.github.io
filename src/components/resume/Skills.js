import React from 'react'


const Skill = (props) => {
  const getSkillLabel = (progress) => {
    if (progress >= 75) return 'Expert'
    if (progress >= 50) return 'Advanced'
    if (progress >= 25) return 'Intermediate'
    return 'Beginner'
  }

  return (
    <div className="skill mb-4">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-4 text-right">
          <span>{props.skill}</span>
        </div>
        <div className="col-span-8 flex items-center">
          <span className="skill-label">{getSkillLabel(props.progress)}</span>
        </div>
      </div>
    </div>
  )
}

export default Skill
