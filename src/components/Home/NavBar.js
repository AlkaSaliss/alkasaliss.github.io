import React, { useState, useRef, useEffect } from "react"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"

const NavBar = ({ setNavBarHeight }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navBarRef = useRef(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    if (navBarRef.current) {
      setNavBarHeight(navBarRef.current.offsetHeight)
    }
  }, [setNavBarHeight])

  return (
    <div
      ref={navBarRef}
      className="navbar bg-base-100 fixed top-0 left-0 w-full z-50 sm:h-10"
    >
      <div className="navbar-start">
        <Link to="/">
          <div className="btn btn-ghost text-xl">
            <Icon icon="gravity-ui:terminal" />
            Mahamadou
          </div>
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="text-xl mx-5 font-bold">
            <Link to="/resume">Resume</Link>
          </li>
          <li className="text-xl mx-5 font-bold relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1"
            >
              <span>Projects</span>
              <Icon
                icon={isDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              />
            </button>
            {isDropdownOpen && (
              <ul className="absolute shadow-lg p-2 mt-10 space-y-2 rounded-lg z-10 bg-slate-700">
                <li className="text-base" onClick={toggleDropdown}>
                  <Link to="/projects/computervision">Computer Vision</Link>
                </li>
                <li className="text-base" onClick={toggleDropdown}>
                  <Link to="/projects/nlp">NLP</Link>
                </li>
                <li className="text-base" onClick={toggleDropdown}>
                  <Link to="/projects/dataviz">Data Viz</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile menu button */}
      <div className="navbar-end lg:hidden">
        <button onClick={toggleMobileMenu} className="btn btn-ghost">
          <Icon
            icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"}
            className="text-2xl"
          />
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-0 z-50 bg-base-100 pt-16 overflow-y-auto w-1/2">
          <ul className="menu p-4">
            <li className="text-xl font-bold py-2">
              <Link to="/resume" onClick={toggleMobileMenu}>
                Resume
              </Link>
            </li>
            <li className="text-xl font-bold py-2">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full"
              >
                <span>Projects</span>
                <Icon
                  icon={isDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
                />
              </button>
              {isDropdownOpen && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li
                    className="text-base"
                    onClick={() => {
                      toggleDropdown()
                      toggleMobileMenu()
                    }}
                  >
                    <Link to="/projects/computervision">Computer Vision</Link>
                  </li>
                  <li
                    className="text-base"
                    onClick={() => {
                      toggleDropdown()
                      toggleMobileMenu()
                    }}
                  >
                    <Link to="/projects/nlp">NLP</Link>
                  </li>
                  <li
                    className="text-base"
                    onClick={() => {
                      toggleDropdown()
                      toggleMobileMenu()
                    }}
                  >
                    <Link to="/projects/dataviz">Data Viz</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default NavBar
