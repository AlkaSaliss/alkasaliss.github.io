//NavBar.js

import React from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'


const NavBar = () => {

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link to="/">
                    <div className="btn btn-ghost text-xl">
                        <Icon icon="gravity-ui:terminal" />
                        Mahamadou.Tech
                    </div>
                </Link>
            </div >
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className='text-xl mx-5'>
                        <Link to="/resume">Resume</Link>
                    </li>
                    <li className='text-xl mx-5'>
                        <details>
                            <summary>Projects</summary>
                            <ul className="p-2">
                                <li className='text-base'>
                                    <a>Computer Vision</a>
                                </li>
                                <li className='text-base'>
                                    <a>NLP</a>
                                </li>
                                <li className='text-base'>
                                    <Link to="/projects/dataviz">Data Viz</Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li className='text-xl mx-5'>
                        <a>Contact</a>
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default NavBar
