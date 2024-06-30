//App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/Home/NavBar'
import HomePage from './components/Home/HomePage'
import Resume from './components/resume/Resume'
import DataViz from './components/dataviz/DataViz'
import ComputerVision from './components/computervision/ComputerVision'
import NLP from './components/nlp/NLP'

function App() {

    return (
        <div className="app-container">
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/projects/dataviz" element={<DataViz />} />
                    <Route path="/projects/computervision" element={<ComputerVision />} />
                    <Route path="/projects/nlp" element={<NLP />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;
