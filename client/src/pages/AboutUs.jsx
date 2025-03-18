import "./AboutUs.css"

function AboutUs() {
  return (
    <div className="about-container">
      <h1>About DoseUp</h1>

      <div className="about-section">
        <div className="about-image">
          <img src="/placeholder.svg?height=300&width=400" alt="DoseUp Team" />
        </div>

        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            At DoseUp, we believe that medication adherence should be simple and stress-free. Our mission is to help
            people stay on track with their medication schedules, improving health outcomes and peace of mind.
          </p>

          <h2>Our Story</h2>
          <p>
            DoseUp was founded in 2023 by a team of healthcare professionals and technology experts who recognized the
            challenges many people face in managing their medications. What started as a simple reminder tool has grown
            into a comprehensive medication management platform.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Simplicity:</strong> We believe in keeping things simple and user-friendly.
            </li>
            <li>
              <strong>Privacy:</strong> Your health information is personal, and we treat it with the utmost respect.
            </li>
            <li>
              <strong>Reliability:</strong> You can count on DoseUp to be there when you need it.
            </li>
            <li>
              <strong>Accessibility:</strong> We design our platform to be accessible to everyone.
            </li>
          </ul>
        </div>
      </div>

      <div className="team-section">
        <h2>Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="/placeholder.svg?height=150&width=150" alt="Team Member" />
            <h3>Jane Doe</h3>
            <p>Founder & CEO</p>
          </div>

          <div className="team-member">
            <img src="/placeholder.svg?height=150&width=150" alt="Team Member" />
            <h3>John Smith</h3>
            <p>Chief Medical Officer</p>
          </div>

          <div className="team-member">
            <img src="/placeholder.svg?height=150&width=150" alt="Team Member" />
            <h3>Emily Johnson</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

