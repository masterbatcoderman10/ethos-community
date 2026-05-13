export default function Footer({ depth = 0 }) {
  const p = "../".repeat(depth);
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href={`${p}landing.html`} className="logo"><span className="logo-mark"></span> Ethos Community™</a>
            <p>A Connection-as-a-Service platform connecting Sudanese diaspora supporters with displaced families, students, women professionals and SMEs through verified partner-enabled services.</p>
          </div>
          <div className="footer-col">
            <h5>Platform</h5>
            <ul>
              <li><a href={`${p}supporter/dashboard.html`}>Supporter Dashboard</a></li>
              <li><a href={`${p}supporter/impact.html`}>Impact Dashboard</a></li>
              <li><a href={`${p}supporter/cases/maryam.html`}>Beneficiary Cases</a></li>
              <li><a href="#">Partner Directory</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Verticals</h5>
            <ul>
              <li><a href={`${p}supporter/education.html`}>Education & CPD</a></li>
              <li><a href={`${p}supporter/healthcare.html`}>Healthcare & Takaful</a></li>
              <li><a href={`${p}supporter/sme-advisory.html`}>SME Advisory</a></li>
              <li><a href="#">Women & Workforce</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Organisation</h5>
            <ul>
              <li><a href="#">About Kushian™</a></li>
              <li><a href="#">Founder</a></li>
              <li><a href="#">Press & Media</a></li>
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
