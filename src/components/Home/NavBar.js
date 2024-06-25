import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link to="/">
                    <div className="btn btn-ghost text-xl">
                        <Icon icon="gravity-ui:terminal" />
                        Mahamadou.Tech
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className="text-xl mx-5">
                        <Link to="/resume">Resume</Link>
                    </li>
                    <li className="text-xl mx-5 relative">
                        <button onClick={toggleDropdown} className="flex items-center space-x-1">
                            <span>Projects</span>
                            <Icon icon={isDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"} />
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute shadow-lg p-2 mt-10 space-y-2 rounded-lg z-10 bg-slate-700">
                                <li className="text-base" onClick={toggleDropdown}>
                                    <a href="#">Computer Vision</a>
                                </li>
                                <li className="text-base" onClick={toggleDropdown}>
                                    <a href="#">NLP</a>
                                </li>
                                <li className="text-base" onClick={toggleDropdown}>
                                    <Link to="/projects/dataviz">Data Viz</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="text-xl mx-5">
                        <a href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar
