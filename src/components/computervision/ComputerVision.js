import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DigitRecognizer from './DigitRecognizer'
import DemoClassi from './DemoClassi'


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

const ComputerVision = ({navBarHeight}) => {
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
            Digit Drawing Classifier
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${value === 1 ? 'border-b' : 'border-b border-slate-500'}`}
            onClick={() => handleChange(1)}
          >
            Visual Emotion Classifier
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${value === 2 ? 'border-b' : 'border-b border-slate-500'}`}
            onClick={() => handleChange(2)}
          >
            TBD
          </button>
        </nav>
      </div>
      <div className="p-4">
        <TabPanel value={value} index={0}>
          <DigitRecognizer />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DemoClassi />
        </TabPanel>
        <TabPanel value={value} index={2}>
        <div>TBD</div>
        </TabPanel>
      </div>
    </div>
  )
}

export default ComputerVision
