//App.js

import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/Home/NavBar'
import HomePage from './components/Home/HomePage'
import Resume from './components/resume/Resume'
import DataViz from './components/dataviz/DataViz'
import ComputerVision from './components/computervision/ComputerVision'
import NLP from './components/nlp/NLP'

function App() {

    const [navBarHeight, setNavBarHeight] = useState(0)

    return (
        <div className="app-container">
            <Router>
                <NavBar setNavBarHeight={setNavBarHeight}/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/resume" element={<Resume navBarHeight={navBarHeight}/>} />
                    <Route path="/projects/dataviz" element={<DataViz navBarHeight={navBarHeight}/>} />
                    <Route path="/projects/computervision" element={<ComputerVision navBarHeight={navBarHeight}/>} />
                    <Route path="/projects/nlp" element={<NLP navBarHeight={navBarHeight}/>} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;
