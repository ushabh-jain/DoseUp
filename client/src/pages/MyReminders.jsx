"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Reminder.css"

function MyReminders({ reminders }) {
  const [filter, setFilter] = useState("all")

  // Format time from 24h to 12h format
  const formatTime = (time) => {
    if (!time) return ""
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  // Filter reminders based on frequency
  const filteredReminders = filter === "all" ? reminders : reminders.filter((reminder) => reminder.frequency === filter)

  return (
    <div className="my-reminders-container">
      <div className="reminders-header">
        <h1>My Medication Reminders</h1>
        <Link to="/add-reminder" className="add-reminder-button">
          + Add New Reminder
        </Link>
      </div>

      <div className="filter-controls">
        <span>Filter by: </span>
        <div className="filter-buttons">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
            All
          </button>
          <button className={filter === "daily" ? "active" : ""} onClick={() => setFilter("daily")}>
            Daily
          </button>
          <button className={filter === "twice-daily" ? "active" : ""} onClick={() => setFilter("twice-daily")}>
            Twice Daily
          </button>
          <button className={filter === "weekly" ? "active" : ""} onClick={() => setFilter("weekly")}>
            Weekly
          </button>
          <button className={filter === "monthly" ? "active" : ""} onClick={() => setFilter("monthly")}>
            Monthly
          </button>
        </div>
      </div>

      {filteredReminders.length === 0 ? (
        <div className="no-reminders">
          <p>No reminders found. Add your first medication reminder!</p>
          <Link to="/add-reminder" className="add-first-reminder">
            Add Reminder
          </Link>
        </div>
      ) : (
        <div className="reminders-list">
          {filteredReminders.map((reminder) => (
            <div key={reminder.id} className="reminder-item">
              <div className="reminder-info">
                <h3>{reminder.medicationName}</h3>
                <div className="reminder-details">
                  <p>
                    <strong>Dosage:</strong> {reminder.dosage}
                  </p>
                  <p>
                    <strong>Time:</strong> {formatTime(reminder.time)}
                  </p>
                  <p>
                    <strong>Frequency:</strong> {reminder.frequency.replace("-", " ")}
                  </p>
                  {reminder.notes && (
                    <p>
                      <strong>Notes:</strong> {reminder.notes}
                    </p>
                  )}
                </div>
              </div>
              <div className="reminder-actions">
                <button className="take-button">Mark as Taken</button>
                <button className="edit-button">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyReminders

