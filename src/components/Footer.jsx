import { Link } from "react-router-dom";

export default function Footer({ depth = 0 }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="logo"><span className="logo-mark"></span> Ethos Community™</Link>
            <p>A Connection-as-a-Service platform connecting Sudanese diaspora supporters with displaced families, students, women professionals and SMEs through verified partner-enabled services.</p>
          </div>
          <div className="footer-col">
            <h5>Platform</h5>
            <ul>
              <li><Link to="/supporter">Supporter Dashboard</Link></li>
              <li><Link to="/supporter/impact">Impact Dashboard</Link></li>
              <li><Link to="/supporter/cases/maryam">Beneficiary Cases</Link></li>
              <li><a href="#">Partner Directory</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Verticals</h5>
            <ul>
              <li><Link to="/supporter/education">Education &amp; CPD</Link></li>
              <li><Link to="/supporter/healthcare">Healthcare &amp; Takaful</Link></li>
              <li><Link to="/supporter/sme">SME Advisory</Link></li>
              <li><a href="#">Women &amp; Workforce</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Organisation</h5>
            <ul>
              <li><a href="#">About Kushian™</a></li>
              <li><a href="#">Founder</a></li>
              <li><a href="#">Press &amp; Media</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <p className="compliance">Prototype for demonstration only. Future financial, insurance, healthcare and payment services will be delivered through licensed partners subject to applicable laws and approvals. Ethos Community™ and Kushian™ are demonstration marks shown for the IsDB Group Innovation and Startups Pitch Competition.</p>
        <div className="footer-bottom">
          <span>© 2026 Ethos Community™</span>
          <span>Demo · v0.1 · MVP Prototype</span>
        </div>
      </div>
    </footer>
  );
}
