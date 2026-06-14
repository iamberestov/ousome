import { Link } from 'react-router-dom'

function About() {
  return (
    <section className="about-page">
      <Link to="/" className="back-link">← Back to home</Link>
      <h1>About me</h1>
      <p className="about-placeholder">More about Igor coming soon.</p>
    </section>
  )
}

export default About
