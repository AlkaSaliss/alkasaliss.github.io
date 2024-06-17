//NavBar.js

import React from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'


const NavBar = () => {

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link to="/dummy">
                    <div className="btn btn-ghost text-xl">
                        <Icon icon="gravity-ui:terminal" />
                        Mahamadou.Tech
                    </div>
                </Link>
            </div >
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Resume</a></li>
                    <li>
                        <details>
                            <summary>Projects</summary>
                            <ul className="p-2">
                                <li><a>Computer Vision</a></li>
                                <li><a>NLP</a></li>
                                <li><a>Data Viz</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Contact</a></li>
                </ul>
            </div>
            {/* <div className="navbar-end">
                <a className="btn">Button</a>
            </div> */}
        </div >
    )
}

export default NavBar