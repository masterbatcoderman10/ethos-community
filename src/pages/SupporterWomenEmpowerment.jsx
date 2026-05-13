import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import DemoTag from '../components/DemoTag.jsx';
import Reveal from '../components/Reveal.jsx';
import Counter from '../components/Counter.jsx';
import Photo from '../components/Photo.jsx';
import Avatar from '../components/Avatar.jsx';
import CaseProgressBar from '../components/CaseProgressBar.jsx';
import PurposeBadge from '../components/PurposeBadge.jsx';
import '../../supporter/women-empowerment.css';

const PATHWAYS = [
  { icon: "heart",     title: "Widows Support",                     desc: "Living support, legal documentation, residency guidance and family stability for widowed women in Sudan and displacement corridors." },
  { icon: "family",    title: "Female-Headed Household Resilience", desc: "Income generation, children's education support, rent assistance and ambassador-verified need tracking." },
  { icon: "education", title: "Women CPD \u0026 Certification",          desc: "Professional development, AAOIFI/industry credential preservation, employability training and mentor matching." },
  { icon: "sme",       title: "Women-Led SME Support",              desc: "Business setup, licensing guidance, finance-readiness and marketplace access for women entrepreneurs." },
  { icon: "users",     title: "Family Resilience",                  desc: "Combined health, education and living support for vulnerable families through a single verified case." }
];

const CASES = [
  { id: "K-2890", name: "Halima M.", loc: "Dubai → Riyadh",  tag: "women",  desc: "Finance returnship · AAOIFI CPD pathway · Mentor-matched",           raised: 6200, target: 9000,  href: "/supporter/cases/halima" },
  { id: "K-3120", name: "Fatima A.", loc: "Kassala, Sudan",  tag: "family", desc: "Widowed mother of 3 · Living + children's education support",         raised: 2800, target: 8000,  href: null },
  { id: "K-3275", name: "Amira A.",  loc: "Cairo, Egypt",    tag: "women",  desc: "Displaced nurse · CPD recertification pathway · CCHM target",         raised: 1400, target: 5000,  href: null },
  { id: "K-3401", name: "Nour H.",   loc: "Omdurman, Sudan", tag: "sme",    desc: "Women-led textile cooperative · Export-readiness + market access",    raised: 3600, target: 12000, href: null },
  { id: "K-3580", name: "Samira K.", loc: "Port Sudan",      tag: "family", desc: "Female-headed household · Combined health + education support",       raised: 900,  target: 6500,  href: null }
];

const MENTORS = [
  { initials: "NA", name: "Dr Nadia Ahmed",    role: "Consultant Physician · London",   skills: ["Medicine","CPD","UK Pathways"],    match: "97% match" },
  { initials: "LH", name: "Lina Hassan",       role: "Senior Partner · Deloitte Dubai", skills: ["Finance","Audit","GCC"],           match: "93% match" },
  { initials: "RO", name: "Rawan Osman",       role: "Corporate Lawyer · Riyadh",       skills: ["Legal","Immigration","Contracts"], match: "89% match" },
  { initials: "SK", name: "Prof Samia Khalil", role: "Economics · Georgetown Doha",     skills: ["Economics","Research","Mentoring"],match: "85% match" }
];

export default function SupporterWomenEmpowerment() {
  return (
    <>
      <Nav active="women" side="supporter" depth={1}/>

      <section className="vert-hero">
        <div className="container">
          <div className="vert-grid">
            <Reveal>
              <div className="eyebrow">Vertical 04 · Women Empowerment & Family Resilience</div>
              <h1>Dignified pathways for <em>women</em> and families.</h1>
              <p>From widows in Kassala to women professionals rebuilding careers in Dubai — verified, purpose-linked support with measurable outcomes.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <Link to="/create" className="btn btn-primary">Start a Women's Case <Icon name="arrow"/></Link>
                <button className="btn btn-ghost" onClick={() => showToast("View all cases — coming next")}>View all cases</button>
              </div>
            </Reveal>
            <Reveal delay={120}><Photo caption="WOMEN · EMPOWERMENT · RESILIENCE" overlay="Women CPD circle, Riyadh 2026" img="../images/women-cpd.png"/></Reveal>
          </div>
          <div className="vert-stats">
            <div><div className="num"><Counter to={312}/></div><div className="label">Women supported</div></div>
            <div><div className="num"><Counter to={74}/></div><div className="label">Widows reached</div></div>
            <div><div className="num"><Counter to={28}/></div><div className="label">Women-led SMEs</div></div>
            <div><div className="num"><Counter to={91} suffix="%"/></div><div className="label">Case verification rate</div></div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div><div className="section-num">§ Pathways</div><h2>Five pathways for women-centred support.</h2></div>
          </Reveal>
          <div className="we-pathways">
            {PATHWAYS.map((p,i) => (
              <Reveal key={i} delay={i*60}>
                <div className="we-pathway-card">
                  <div className="we-pathway-icon"><Icon name={p.icon} size={32}/></div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <button className="btn btn-text sm" onClick={() => showToast(`${p.title} — learn more`)}>Learn more <Icon name="arrow" size={14}/></button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{background:"var(--cream-2)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <Reveal className="block-head">
            <div><div className="section-num">§ Active Cases</div><h2>Women supported right now.</h2></div>
            <Link to="/supporter/cases/halima" className="btn btn-ghost sm">View Halima's profile <Icon name="arrow" size={14}/></Link>
          </Reveal>
          <div className="we-cases">
            {CASES.map((c,i) => (
              <Reveal key={i} delay={i*50}>
                <div className="we-case-card">
                  <div className="we-case-top"><span className="case-id">{c.id}</span><PurposeBadge category={c.tag}/></div>
                  <h4>{c.name}</h4>
                  <div className="we-case-loc"><Icon name="pin" size={12}/> {c.loc}</div>
                  <p>{c.desc}</p>
                  <CaseProgressBar raised={c.raised} target={c.target}/>
                  {c.href
                    ? <Link to={c.href} className="btn btn-ghost sm" style={{marginTop:12}}>View profile <Icon name="arrow" size={14}/></Link>
                    : <button className="btn btn-ghost sm" style={{marginTop:12}} onClick={() => showToast(`Support ${c.name} — create a case`)}>Support this case <Icon name="arrow" size={14}/></button>
                  }
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div><div className="section-num">§ Mentor Matching</div><h2>Women mentors, diaspora-matched.</h2></div>
          </Reveal>
          <div className="mentor-grid">
            {MENTORS.map((m,i) => (
              <Reveal key={i} delay={i*60}>
                <div className="mentor" onClick={() => showToast(`Connect with ${m.name} — coming next`)}>
                  <div className="top">
                    <Avatar initials={m.initials} size="lg" green/>
                    <div><strong>{m.name}</strong><div className="sub">{m.role}</div></div>
                  </div>
                  <div className="skills">{m.skills.map(s => <span key={s} className="tag sm">{s}</span>)}</div>
                  <div className="match-row"><span className="match">{m.match}</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block we-takaful">
        <div className="container">
          <Reveal>
            <div className="we-takaful-inner">
              <div className="we-takaful-icon"><Icon name="health" size={36}/></div>
              <div className="we-takaful-img"><img src="../images/women-healthcare.png" alt="Healthcare support"/></div>
              <div>
                <div className="eyebrow">Healthcare &amp; Protection</div>
                <h3>Takaful coverage for women and families</h3>
                <p>Cooperative health and family protection plans for widows and female-headed households — through our Takaful partner network.</p>
              </div>
              <Link to="/supporter/healthcare" className="btn btn-ghost">View Takaful Pools <Icon name="arrow"/></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer depth={1}/><DemoTag/>
    </>
  );
}
