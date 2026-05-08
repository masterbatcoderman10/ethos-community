const MENTORS = [
  { initials: "AT", name: "Dr Amira Tahir", role: "Senior Lecturer · Imperial College", bio: "Civil engineering, water systems and post-conflict infrastructure planning. 8 mentees placed.", skills: ["Engineering","Water","Infrastructure"], match: "94% match" },
  { initials: "RM", name: "Rasha Mahjoub", role: "Senior Counsel · Standard Chartered Dubai", bio: "Sharia-compliant finance, Islamic banking and graduate placement in GCC institutions.", skills: ["Finance","Sharia","GCC"], match: "91% match" },
  { initials: "MO", name: "Dr Mohamed Osman", role: "Consultant Pediatrician · Toronto", bio: "Medical residency pathway support for Sudanese physicians in Canada and the UK.", skills: ["Medicine","Residency","Canada/UK"], match: "88% match" },
  { initials: "FE", name: "Fatima El-Bashir", role: "Director · UN Women Cairo", bio: "Programme management, gender-responsive policy and UN system pathways.", skills: ["Policy","UN","Gender"], match: "86% match" },
  { initials: "OK", name: "Prof. Omar Khalifa", role: "Computer Science · TU Munich", bio: "Software engineering, EU PhD applications, scholarship navigation for displaced researchers.", skills: ["CS","PhD","EU"], match: "82% match" },
  { initials: "NA", name: "Nour Adam", role: "Lead Architect · Aedas Doha", bio: "Architecture and urban design pathways, returnship after displacement.", skills: ["Architecture","Design","Returnship"], match: "78% match" }
];

const STUDENTS = [
  { initials: "MA", name: "Maryam A.", desc: "Year 9 · Al-Manarah School", track: "Secondary", loc: "Cairo, EG", progress: 91 },
  { initials: "TM", name: "Tariq M.", desc: "Engineering Year 2 · Qatar University", track: "Undergraduate", loc: "Doha, QA", progress: 64 },
  { initials: "AS", name: "Amira S.", desc: "Year 11 · St Andrew's College", track: "Secondary", loc: "Kampala, UG", progress: 78 },
  { initials: "YE", name: "Yousef E.", desc: "MSc Public Health · LSHTM", track: "Postgraduate", loc: "London, UK", progress: 45 },
  { initials: "HK", name: "Huda K.", desc: "Returnship · Finance CPD", track: "Professional", loc: "Riyadh, SA", progress: 88 }
];

function App() {
  return (
    <>
      <Nav active="education"/>

      <section className="vert-hero">
        <div className="container">
          <div className="vert-grid">
            <Reveal>
              <div className="eyebrow">Vertical 01 · Education, CPD & Mentorship</div>
              <h1>Pathways back to <em>study and work</em>, partner-delivered.</h1>
              <p>Credential vault, mentor matching, employability training and graduate support — for displaced students, women returning to the workforce, and Sudanese professionals seeking to relocate or requalify.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Browse students — coming next")}>Browse 142 students <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("Become a mentor — coming next")}>Become a mentor</button>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Photo caption="EDUCATION · CPD · MENTORSHIP" overlay="Graduate cohort, Riyadh CPD circle" img="images/education-cpd.jpg"/>
            </Reveal>
          </div>
          <div className="vert-stats">
            <div><div className="num"><Counter to={142}/></div><div className="label">Active students</div></div>
            <div><div className="num"><Counter to={68}/></div><div className="label">Diaspora mentors</div></div>
            <div><div className="num"><Counter to={94} suffix="%"/></div><div className="label">Year-1 retention</div></div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div>
              <div className="section-num">§ Mentorship</div>
              <h2>68 mentors, matched by skill and need.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>The Kushian™ matching engine pairs students with diaspora professionals by discipline, language, and host-country credentialling. Verified profiles, structured 6-month engagements.</p>
          </Reveal>
          <div className="mentor-grid">
            {MENTORS.map((m, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="mentor" onClick={() => showToast(`Connect with ${m.name} — coming next`)}>
                  <div className="top">
                    <div className="ava">{m.initials}</div>
                    <div>
                      <h4>{m.name}</h4>
                      <div className="role">{m.role}</div>
                    </div>
                  </div>
                  <p className="bio">{m.bio}</p>
                  <div className="skills">{m.skills.map(s => <span key={s} className="tag">{s}</span>)}</div>
                  <div className="mentor-foot">
                    <span style={{color:"var(--green)"}}>● {m.match}</span>
                    <span>Connect <Icon name="arrow" size={12}/></span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div>
              <div className="section-num">§ CPD Pathway</div>
              <h2>A four-stage employability track.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>Designed for Sudanese graduates, women returning to work and mid-career professionals seeking host-country recognition.</p>
          </Reveal>
          <Reveal>
            <div className="cpd-track">
              {[
                { num: "01", title: "Skills audit", desc: "30-minute structured intake. Credentials catalogued, gaps identified.", prog: 100 },
                { num: "02", title: "CPD modules", desc: "Sharia-compliance, finance, healthcare regulation, project management.", prog: 75 },
                { num: "03", title: "Mentor pairing", desc: "Six-month structured engagement with a diaspora professional.", prog: 50 },
                { num: "04", title: "Placement", desc: "CV review, interview prep, partner-led introductions in target market.", prog: 25 }
              ].map((s, i) => (
                <div key={i} className="cpd-step">
                  <div className="num">STEP {s.num}</div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                  <div className="progress"><div className="progress-fill" style={{width:`${s.prog}%`}}></div></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div>
              <div className="section-num">§ Credential vault</div>
              <h2>Documents, attested and portable.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>Beneficiaries upload originals once. Partners attest. Credentials become portable across host-country institutions.</p>
          </Reveal>
          <div className="vault-list">
            {[
              { name: "Academic transcripts", sub: "Verified · 142 students" },
              { name: "Professional certifications", sub: "AAOIFI, CISI, ACCA, CFA" },
              { name: "Identity documents", sub: "UNHCR-co-signed" },
              { name: "Reference letters", sub: "Mentor & employer" },
              { name: "Language attestations", sub: "IELTS, TOEFL, DELF" },
              { name: "Medical credentials", sub: "GMC, MCC, ECFMG" }
            ].map((v, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="vault-item">
                  <div className="ic"><Icon name="doc" size={20}/></div>
                  <div>
                    <div className="nm">{v.name}</div>
                    <div className="sub">{v.sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{borderBottom:0}}>
        <div className="container">
          <Reveal className="block-head">
            <div>
              <div className="section-num">§ Active students</div>
              <h2>Students seeking support.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>From secondary tuition to postgraduate research — every student profile is verified and pledge-traceable.</p>
          </Reveal>
          {STUDENTS.map((s, i) => {
            const isMaryam = s.name === "Maryam A.";
            return (
            <Reveal key={i} delay={i * 40}>
              <div className="student-row" style={{display:"grid",cursor:"pointer"}} onClick={() => isMaryam ? window.location.href = "beneficiary-profile.html" : showToast("Full student profiles — coming next")} role="button">
                <div className="avatar initials">{s.initials}</div>
                <div>
                  <h4 className="nm">{s.name}</h4>
                  <div className="sub">{s.desc} · {s.loc}</div>
                </div>
                <span className="tag verified"><span className="dot"></span>{s.track}</span>
                <div className="progress-cell" style={{display:"flex",flexDirection:"column",gap:6}}>
                  <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"var(--ink-soft)",display:"flex",justifyContent:"space-between"}}><span>Funded</span><span>{s.progress}%</span></div>
                  <div className="progress"><div className="progress-fill" style={{width:`${s.progress}%`}}></div></div>
                </div>
                <div style={{textAlign:"right",color:"var(--green)"}}><Icon name="arrow-up-right" size={20}/></div>
              </div>
            </Reveal>
          );
          })}
        </div>
      </section>

      <Footer/>
      <DemoTag/>
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
