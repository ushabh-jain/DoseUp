"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AboutUs from "./pages/AboutUs"
import AddReminder from "./pages/AddReminder"
import MyReminders from "./pages/MyReminders"
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [reminders, setReminders] = useState([])
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setUser(userData)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  const addReminder = (reminder) => {
    setReminders([...reminders, { ...reminder, id: Date.now() }])
  }

  return (
    <Router>
      <div className="app">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/add-reminder"
              element={isLoggedIn ? <AddReminder addReminder={addReminder} /> : <Navigate to="/login" />}
            />
            <Route
              path="/my-reminders"
              element={isLoggedIn ? <MyReminders reminders={reminders} /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

