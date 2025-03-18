"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BorderBeam } from "../components/BorderBeam"
import "./Reminder.css"

function AddReminder({ addReminder }) {
  const [medicationName, setMedicationName] = useState("")
  const [dosage, setDosage] = useState("")
  const [frequency, setFrequency] = useState("daily")
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    if (!medicationName || !dosage || !time) {
      setError("Please fill in all required fields")
      return
    }

    // Create reminder object
    const newReminder = {
      medicationName,
      dosage,
      frequency,
      time,
      notes,
      createdAt: new Date().toISOString(),
    }

    // Add reminder to state
    addReminder(newReminder)

    // Navigate to My Reminders page
    navigate("/my-reminders")
  }

  return (
    <div className="reminder-container">
      <div className="reminder-card">
        <h2>Add Medication Reminder</h2>
        <p className="reminder-description">Set up a new medication reminder to stay on track.</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="medicationName">Medication Name*</label>
            <input
              id="medicationName"
              type="text"
              value={medicationName}
              onChange={(e) => setMedicationName(e.target.value)}
              placeholder="Enter medication name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dosage">Dosage*</label>
            <input
              id="dosage"
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="e.g., 10mg, 1 pill"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="frequency">Frequency*</label>
            <select id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} required>
              <option value="daily">Daily</option>
              <option value="twice-daily">Twice Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="as-needed">As Needed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="time">Time*</label>
            <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or notes"
              rows="3"
            />
          </div>

          <div className="reminder-footer">
            <button type="button" className="cancel-button" onClick={() => navigate("/my-reminders")}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Reminder
            </button>
          </div>
        </form>
        <BorderBeam duration={8} size={100} />
      </div>
    </div>
  )
}

export default AddReminder

