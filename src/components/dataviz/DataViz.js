import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IrisAnimated from './example2d/IrisAnimated'
import Iris3D from './example3d/Iris3DAnimated'
import IrisTsne from './exampletSNE/irisTsne'


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

const DataViz = () => {
  const [value, setValue] = useState(0)

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  return (
    <div className="w-full h-full bg-gray-800">
      <div className="w-full">
        <nav className="flex justify-center">
          <button
            className={`px-4 py-2 focus:outline-none ${value === 0 ? 'border-b' : 'border-b border-slate-500'}`}
            onClick={() => handleChange(0)}
          >
            Iris 2D Interactive
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${value === 1 ? 'border-b' : 'border-b border-slate-500'}`}
            onClick={() => handleChange(1)}
          >
            Iris 3D plot
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${value === 2 ? 'border-b' : 'border-b border-slate-500'}`}
            onClick={() => handleChange(2)}
          >
            IRIS t-SNE visualization
          </button>
        </nav>
      </div>
      <div className="p-4">
        <TabPanel value={value} index={0}>
          <IrisAnimated />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Iris3D />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <IrisTsne />
        </TabPanel>
      </div>
    </div>
  )
}

export default DataViz
