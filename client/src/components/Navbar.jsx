"use client"

import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <h1>DoseUp</h1>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About Us
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="/add-reminder" className="nav-link">
              Add Reminder
            </Link>
            <Link to="/my-reminders" className="nav-link">
              My Reminders
            </Link>
            <button onClick={onLogout} className="nav-button logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-button register-button">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar

