import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextClassification from './TextClassification'


const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      {value === index && (
        <div className="p-3">
          {children}
        </div>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

const NLP = ({navBarHeight}) => {
  const [value, setValue] = useState(0)

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  return (
    <div className="w-full h-full bg-gray-800" style={{ paddingTop: navBarHeight }}>
      <div className="w-full relative">
        <nav className="flex justify-center">
          <button
            className={`px-4 py-2 focus:outline-none ${value === 0 ? 'border-b' : 'border-b border-slate-500'}`}
            onClick={() => handleChange(0)}
          >
            Zero shot classification
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${value === 1 ? 'border-b' : 'border-b border-slate-500'}`}
            onClick={() => handleChange(1)}
          >
            NLP2
          </button>
        </nav>
      </div>
      <div className="p-4">
        <TabPanel value={value} index={0}>
          <TextClassification />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>test2</div>
        </TabPanel>
      </div>
    </div>
  )
}

export default NLP