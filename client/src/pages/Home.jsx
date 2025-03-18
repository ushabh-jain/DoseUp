import { Link } from "react-router-dom"
import { PulseEffect } from "../components/PulseEffect"
import "./Home.css"

function Home({ isLoggedIn }) {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Never Miss a Dose Again</h1>
        <p className="hero-subtitle">DoseUp helps you stay on track with your medication schedule</p>
        <div className="cta-buttons">
          {isLoggedIn ? (
            <Link to="/add-reminder" className="cta-button primary">
              Set a Reminder
            </Link>
          ) : (
            <Link to="/register" className="cta-button primary">
              Get Started
            </Link>
          )}
          <Link to="/about" className="cta-button secondary">
            Learn More
          </Link>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">⏰</div>
          <h3>Timely Reminders</h3>
          <p>Get notifications when it's time to take your medication</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Track Progress</h3>
          <p>Monitor your medication adherence over time</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔔</div>
          <h3>Custom Alerts</h3>
          <p>Set up personalized reminder schedules</p>
        </div>
      </div>

      <PulseEffect />
    </div>
  )
}

export default Home

