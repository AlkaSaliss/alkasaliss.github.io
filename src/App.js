//App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './Components/NavBar'
import HomePage from './Components/HomePage'
import DummyPage from './Components/DummyPage'

function App() {
    // return (
    //     <div className="app-container">
    //         <NavBar />
    //         <HomePage />
    //     </div>
    // );
    return (
        <div className="app-container">
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dummy" element={<DummyPage />} />
                </Routes>
            </Router>
            </div>
        )
}

export default App;
