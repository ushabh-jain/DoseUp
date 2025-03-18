"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BorderBeam } from "../components/BorderBeam"
import "./Auth.css"

function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    // In a real app, you would make an API call to verify credentials
    // This is just a mock login for demonstration
    onLogin({ email, name: email.split("@")[0] })
    navigate("/")
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to DoseUp</h2>
        <p className="auth-description">Welcome back! Enter your credentials to access your account.</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            <button type="submit" className="auth-button">
              Login
            </button>
          </div>
        </form>
        <BorderBeam duration={8} size={100} />
      </div>
    </div>
  )
}

export default Login

