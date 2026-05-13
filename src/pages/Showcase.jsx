import { useEffect } from 'react';
import './Showcase.css';

export default function Showcase() {
  useEffect(() => {
    document.body.dataset.pair = "newsreader";
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(el => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });

    return () => revealObserver.disconnect();
  }, []);

  const setPair = (pair) => {
    document.body.dataset.pair = pair;
  };

  return (
    <div className="showcase-page">
      <nav className="nav">
        <div className="container nav-inner">
          <div className="logo"><span className="logo-mark"></span> Kushian™</div>
          <div className="pair-switch">
            <button className="pair-btn active" onClick={() => setPair("newsreader")}>Newsreader / Manrope</button>
            <button className="pair-btn" onClick={() => setPair("dm")}>DM Serif / DM Sans</button>
            <button className="pair-btn" onClick={() => setPair("instrument")}>Instrument / Inter Tight</button>
          </div>
        </div>
      </nav>

      <section className="section" style={{paddingBottom:48}}>
        <div className="container">
          <div className="section-eyebrow">Design System · Showcase</div>
          <h1 className="section-title" style={{fontSize:"clamp(44px,6vw,82px)",lineHeight:1.02,marginBottom:28}}>Kushian™<em style={{fontStyle:"italic",color:"var(--green)"}}> design tokens</em> and components.</h1>
          <p style={{fontSize:19,lineHeight:1.55,color:"var(--ink-soft)",maxWidth:560,margin:"0 0 36px"}}>A living reference for the development-finance editorial identity built for the IsDB Group pitch competition. Switch type pairings above to see the system across three font families.</p>
          <div className="flex-gap-10">
            <a href="#colors" className="btn btn-primary">Explore Colors</a>
            <a href="#typography" className="btn btn-ghost">Typography</a>
            <a href="#components" className="btn btn-text">Components →</a>
          </div>
        </div>
      </section>

      <section className="section" id="colors" style={{paddingTop:48}}>
        <div className="container">
          <div className="section-eyebrow">Tokens · Palette</div>
          <h2 className="section-title">Colors</h2>
          <div className="swatch-grid">
            <div className="swatch"><div className="swatch-color" style={{background:"#f7f4ee"}}></div><div className="swatch-info"><div className="swatch-name">Cream</div><div className="swatch-hex">#f7f4ee</div></div></div>
            <div className="swatch"><div className="swatch-color" style={{background:"#efeae0"}}></div><div className="swatch-info"><div className="swatch-name">Cream-2</div><div className="swatch-hex">#efeae0</div></div></div>
            <div className="swatch"><div className="swatch-color" style={{background:"#141512"}}></div><div className="swatch-info"><div className="swatch-name">Ink</div><div className="swatch-hex">#141512</div></div></div>
            <div className="swatch"><div className="swatch-color" style={{background:"#3a3a36"}}></div><div className="swatch-info"><div className="swatch-name">Ink-soft</div><div className="swatch-hex">#3a3a36</div></div></div>
            <div className="swatch"><div className="swatch-color" style={{background:"#7a7568"}}></div><div className="swatch-info"><div className="swatch-name">Muted</div><div className="swatch-hex">#7a7568</div></div></div>
            <div className="swatch"><div className="swatch-color" style={{background:"#e2dccf"}}></div><div className="swatch-info"><div className="swatch-name">Line</div><div className="swatch-hex">#e2dccf</div></div></div>
            <div className="swatch"><div className="swatch-color" style={{background:"#0e3b2e"}}></div><div className="swatch-info"><div className="swatch-name">Green</div><div className="swatch-hex">#0e3b2e</div></div></div>
            <div className="swatch"><div className="swatch-color" style={{background:"#0a2a21"}}></div><div className="swatch-info"><div className="swatch-name">Green-2</div><div className="swatch-hex">#0a2a21</div></div></div>
            <div className="swatch"><div className="swatch-color" style={{background:"#c9a961"}}></div><div className="swatch-info"><div className="swatch-name">Gold</div><div className="swatch-hex">#c9a961</div></div></div>
            <div className="swatch"><div className="swatch-color" style={{background:"#a8884a"}}></div><div className="swatch-info"><div className="swatch-name">Gold-2</div><div className="swatch-hex">#a8884a</div></div></div>
            <div className="swatch"><div className="swatch-color" style={{background:"#a13628"}}></div><div className="swatch-info"><div className="swatch-name">Red</div><div className="swatch-hex">#a13628</div></div></div>
            <div className="swatch"><div className="swatch-color" style={{background:"#1c3a5c"}}></div><div className="swatch-info"><div className="swatch-name">Blue</div><div className="swatch-hex">#1c3a5c</div></div></div>
          </div>
        </div>
      </section>

      <section className="section" id="typography">
        <div className="container">
          <div className="section-eyebrow">Tokens · Type</div>
          <h2 className="section-title">Typography</h2>
          <div className="type-scale">
            <div className="type-sample"><span className="type-label">h1-display</span><span style={{fontFamily:"var(--ff-display)",fontSize:"clamp(44px,6vw,82px)",fontWeight:"var(--display-weight)",letterSpacing:"var(--display-tracking)",lineHeight:1.02}}>A diaspora rebuilding Sudan</span></div>
            <div className="type-sample"><span className="type-label">display</span><span style={{fontFamily:"var(--ff-display)",fontSize:"clamp(34px,4vw,56px)",fontWeight:"var(--display-weight)",letterSpacing:"var(--display-tracking)",lineHeight:1.05}}>Six verticals, partner-delivered.</span></div>
            <div className="type-sample"><span className="type-label">h3</span><span style={{fontFamily:"var(--ff-display)",fontSize:24,fontWeight:"var(--display-weight)",letterSpacing:"var(--display-tracking)",lineHeight:1.15}}>Education, CPD & Mentorship</span></div>
            <div className="type-sample"><span className="type-label">lede</span><span style={{fontSize:19,lineHeight:1.55,color:"var(--ink-soft)"}}>Every pledge through Kushian™ is verified, traceable and partner-delivered.</span></div>
            <div className="type-sample"><span className="type-label">body-md</span><span style={{fontSize:17,lineHeight:1.6,color:"var(--ink-soft)"}}>The Kushian™ pilot demonstrates how diaspora capital and expertise scale into measurable outcomes.</span></div>
            <div className="type-sample"><span className="type-label">body-sm</span><span style={{fontSize:14,lineHeight:1.55,color:"var(--ink-soft)"}}>Browse displaced families, students, women in transition and SMEs in recovery.</span></div>
            <div className="type-sample"><span className="type-label">label</span><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:".18em",textTransform:"uppercase",color:"var(--gold-2)"}}>Verified · Partner-delivered</span></div>
            <div className="type-sample"><span className="type-label">mono-sm</span><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,letterSpacing:".08em",textTransform:"uppercase",color:"var(--muted)"}}>DIASPORA · GCC + EUROPE + UK</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="spacing">
        <div className="container">
          <div className="section-eyebrow">Tokens · Space</div>
          <h2 className="section-title">Spacing</h2>
          <div className="space-scale">
            {[4, 8, 14, 16, 20, 24, 32, 48, 64, 80, 96, 120].map(px => (
              <div key={px} className="space-sample">
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--muted)",minWidth:80}}>{px}px</span>
                <div className="space-bar" style={{width:px}}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="components">
        <div className="container">
          <div className="section-eyebrow">Components · Library</div>
          <h2 className="section-title">Components</h2>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Buttons</div>
            <div className="flex-gap-16">
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-soft">Soft</button>
              <button className="btn btn-gold">Gold</button>
              <button className="btn btn-text">Text →</button>
            </div>
            <div className="flex-gap-16" style={{marginTop:16}}>
              <button className="btn btn-primary btn-sm">Primary Small</button>
              <button className="btn btn-ghost btn-sm">Ghost Small</button>
              <button className="btn btn-gold btn-sm">Gold Small</button>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Tags</div>
            <div className="flex-gap-10">
              <span className="tag">Default</span>
              <span className="tag tag-verified"><span className="dot"></span>Verified</span>
              <span className="tag tag-pending"><span className="dot"></span>Pending</span>
              <span className="tag tag-urgent"><span className="dot"></span>Urgent</span>
              <span className="tag tag-complete"><span className="dot"></span>Complete</span>
            </div>
          </div>

          <div className="component-grid" style={{marginBottom:24}}>
            <div className="card">
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:".1em",textTransform:"uppercase",color:"var(--muted)",marginBottom:12}}>Standard Card</div>
              <h3>Card Title</h3>
              <p style={{fontSize:14,lineHeight:1.55,color:"var(--ink-soft)",margin:"8px 0 0"}}>A standard content card with cream background, line border, and hover shadow elevation.</p>
            </div>
            <div className="panel-dark">
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,letterSpacing:".12em",textTransform:"uppercase",color:"var(--gold)",marginBottom:12}}>Dark Panel</div>
              <h3 style={{fontFamily:"var(--ff-display)",fontSize:18,fontWeight:"var(--display-weight)",letterSpacing:"var(--display-tracking)",margin:"0 0 8px"}}>Verification Panel</h3>
              <p style={{fontSize:13,lineHeight:1.6,color:"rgba(247,244,238,.78)",margin:0}}>Used for beneficiary verification status and partner attestation blocks.</p>
            </div>
          </div>

          <div className="component-grid" style={{marginBottom:24}}>
            <div className="component-block">
              <div className="component-label">Photo Placeholder</div>
              <div className="photo" style={{maxWidth:180}}>
                <div className="photo-pill">Portrait</div>
                <div className="photo-meta"><span>4 : 5</span><span>HATCH</span></div>
              </div>
            </div>
            <div className="component-block">
              <div className="component-label">Avatars</div>
              <div className="flex-gap-16">
                <div className="avatar"></div>
                <div className="avatar avatar-green"></div>
                <div className="avatar avatar-initials">HT</div>
              </div>
            </div>
          </div>

          <div className="component-grid" style={{marginBottom:24}}>
            <div className="component-block">
              <div className="component-label">Progress Bars</div>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <div className="progress"><div className="progress-fill" style={{width:"72%"}}></div></div>
                <div className="progress"><div className="progress-fill" style={{width:"45%",background:"var(--gold)"}}></div></div>
              </div>
            </div>
            <div className="component-block">
              <div className="component-label">Form Field</div>
              <div className="field">
                <label>Email Address</label>
                <input type="email" placeholder="name@example.com" />
              </div>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24,overflowX:"auto"}}>
            <div className="component-label">Table</div>
            <table className="tbl">
              <thead>
                <tr><th>Case ID</th><th>Beneficiary</th><th>Vertical</th><th>Status</th><th>Amount</th></tr>
              </thead>
              <tbody>
                <tr><td style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--gold-2)"}}>K-2384</td><td>Maryam, 14</td><td>Education</td><td><span className="tag tag-verified"><span className="dot"></span>Verified</span></td><td style={{fontFamily:"'JetBrains Mono',monospace",textAlign:"right"}}>$3,840</td></tr>
                <tr><td style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--gold-2)"}}>K-2401</td><td>Ibrahim Awad</td><td>SME Advisory</td><td><span className="tag tag-pending"><span className="dot"></span>Pending</span></td><td style={{fontFamily:"'JetBrains Mono',monospace",textAlign:"right"}}>$12,500</td></tr>
                <tr><td style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--gold-2)"}}>K-2412</td><td>Dr Afaf</td><td>Healthcare</td><td><span className="tag tag-complete"><span className="dot"></span>Complete</span></td><td style={{fontFamily:"'JetBrains Mono',monospace",textAlign:"right"}}>$8,200</td></tr>
              </tbody>
            </table>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Timeline</div>
            <div className="timeline">
              <div className="tl-item done">
                <div className="tl-when">March 2026</div>
                <div className="tl-title">Beneficiary Verified</div>
                <div className="tl-desc">Identity and documents confirmed by Kushian™ partner in Cairo.</div>
              </div>
              <div className="tl-item done">
                <div className="tl-when">April 2026</div>
                <div className="tl-title">Pledge Committed</div>
                <div className="tl-desc">Twelve diaspora supporters pledged tuition and book coverage.</div>
              </div>
              <div className="tl-item future">
                <div className="tl-when">June 2026</div>
                <div className="tl-title">Outcome Report</div>
                <div className="tl-desc">End-of-term results and partner attestation due.</div>
              </div>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">VCard (Service Vertical)</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"1px",background:"var(--line)",border:"1px solid var(--line)"}}>
              <div className="vcard">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <span className="vcard-num">01</span>
                  <span style={{color:"var(--green)",opacity:.5}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>
                  </span>
                </div>
                <div style={{width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--green)"}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-4 9 4-9 4-9-4z"/><path d="M7 11v5c2 2 8 2 10 0v-5"/></svg>
                </div>
                <h3>Education, CPD & Mentorship</h3>
                <p>Credential vault, mentor matching, employability training and graduate support.</p>
                <div className="vcard-tags">
                  <span className="tag">CPD</span>
                  <span className="tag">Mentorship</span>
                  <span className="tag">Vault</span>
                </div>
              </div>
              <div className="vcard">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <span className="vcard-num">02</span>
                  <span style={{color:"var(--green)",opacity:.5}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>
                  </span>
                </div>
                <div style={{width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--green)"}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/><path d="M9 12h2v-2h2v2h2"/></svg>
                </div>
                <h3>Healthcare & Takaful</h3>
                <p>Partner-enabled medical referrals, clinic directory, and cooperative Takaful workflows.</p>
                <div className="vcard-tags">
                  <span className="tag">Clinics</span>
                  <span className="tag">Takaful</span>
                  <span className="tag">Referrals</span>
                </div>
              </div>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Case Row</div>
            <div className="case-row">
              <div className="avatar" style={{width:64,height:64,borderRadius:6}}></div>
              <div>
                <div style={{fontFamily:"var(--ff-display)",fontSize:20,margin:"0 0 4px",lineHeight:1.2}}>Maryam, 14</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--muted)",letterSpacing:".06em"}}>Omdurman → Cairo · Case #K-2384</div>
              </div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--gold-2)",letterSpacing:".1em",textTransform:"uppercase"}}>Education</div>
              <div>
                <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--ink-soft)",marginBottom:6}}><span>72%</span><span>$3,840</span></div>
                <div className="progress"><div className="progress-fill" style={{width:"72%"}}></div></div>
              </div>
              <div style={{textAlign:"right"}}><span className="tag tag-verified"><span className="dot"></span>Verified</span></div>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Summary Cards</div>
            <div className="flex-gap-24">
              <div className="sum-card">
                <div className="sum-label">Supporters</div>
                <div className="sum-num">1,247</div>
                <div className="sum-delta">+12% this month</div>
              </div>
              <div className="sum-card">
                <div className="sum-label">Lives Reached</div>
                <div className="sum-num">3,892</div>
                <div className="sum-delta">+8% this month</div>
              </div>
              <div className="sum-card">
                <div className="sum-label">SMEs Advised</div>
                <div className="sum-num">142</div>
                <div className="sum-delta down" style={{color:"var(--red)"}}>-3% this month</div>
              </div>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Mentor Card</div>
            <div style={{maxWidth:320}}>
              <div className="mentor">
                <div style={{display:"flex",alignItems:"center",gap:14}}>
                  <div className="mentor-ava">SA</div>
                  <div>
                    <div style={{fontFamily:"var(--ff-display)",fontSize:18,margin:0,lineHeight:1.2}}>Dr Sara Abbas</div>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--muted)",letterSpacing:".04em",marginTop:2}}>Public Health · London</div>
                  </div>
                </div>
                <p style={{fontSize:13.5,lineHeight:1.55,color:"var(--ink-soft)",margin:0}}>Former NHS advisor specialising in refugee health transitions and clinic network building.</p>
                <div className="flex-gap-10">
                  <span className="tag">Mentorship</span>
                  <span className="tag">Health</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:14,borderTop:"1px dashed var(--line)",fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--muted)"}}>
                  <span>12 hrs / month</span>
                  <span>Available</span>
                </div>
              </div>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Takaful Cards</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:20}}>
              <div className="takaful-card">
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,letterSpacing:".14em",textTransform:"uppercase",color:"var(--gold-2)",marginBottom:8}}>Basic Pool</div>
                <div className="num" style={{color:"var(--ink)"}}>$25 <small style={{fontSize:18,opacity:.6,fontWeight:400}}>/ month</small></div>
                <h4 style={{fontFamily:"var(--ff-display)",fontSize:24,margin:0,lineHeight:1.2}}>Individual Cover</h4>
                <p style={{fontSize:13.5,lineHeight:1.6,color:"var(--ink-soft)",margin:0}}>Outpatient referrals and emergency hospitalisation support.</p>
              </div>
              <div className="takaful-card featured">
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,letterSpacing:".14em",textTransform:"uppercase",color:"var(--gold)",marginBottom:8}}>Featured Pool</div>
                <div className="num" style={{color:"var(--gold)"}}>$75 <small style={{fontSize:18,opacity:.6,fontWeight:400}}>/ month</small></div>
                <h4 style={{fontFamily:"var(--ff-display)",fontSize:24,margin:0,lineHeight:1.2,color:"var(--cream)"}}>Family Cover</h4>
                <p style={{fontSize:13.5,lineHeight:1.6,color:"rgba(247,244,238,.78)",margin:0}}>Full family coverage including maternity, paediatrics and chronic care.</p>
              </div>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Workflow Band</div>
            <div className="workflow">
              <div className="wf-step">
                <div className="num">STEP 01</div>
                <h4>Discovery</h4>
                <p>Browse verified cases with documented identity and need.</p>
              </div>
              <div className="wf-step">
                <div className="num">STEP 02</div>
                <h4>Pledge</h4>
                <p>Allocate purpose-linked support through licensed partners.</p>
              </div>
              <div className="wf-step">
                <div className="num">STEP 03</div>
                <h4>Delivery</h4>
                <p>Partner delivers service and submits attestation.</p>
              </div>
              <div className="wf-step">
                <div className="num">STEP 04</div>
                <h4>Impact</h4>
                <p>Milestone updates roll into your supporter dashboard.</p>
              </div>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Audit Strip</div>
            <div className="audit-strip">
              <div>
                <h3 style={{fontFamily:"var(--ff-display)",fontSize:32,lineHeight:1.1,fontWeight:"var(--display-weight)",letterSpacing:"var(--display-tracking)",margin:"0 0 12px",color:"var(--cream)"}}>Every pledge is traceable.</h3>
                <p style={{fontSize:15,lineHeight:1.6,color:"rgba(247,244,238,.7)",margin:0}}>Development-finance grade audit trails with KYC verification, partner attestations, and on-chain hash references for compliance review.</p>
              </div>
              <div className="audit-seal">
                <div>
                  <div className="audit-seal-name">E</div>
                  <div className="audit-seal-sub">Kushian Verified</div>
                </div>
              </div>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Bar Chart</div>
            <div style={{maxWidth:600}}>
              <div className="bar-chart">
                <div className="lab">Education</div>
                <div className="track"><div className="fill" style={{width:"78%"}}></div></div>
                <div className="val">$124k</div>
                <div className="lab">Healthcare</div>
                <div className="track"><div className="fill gold" style={{width:"62%"}}></div></div>
                <div className="val">$98k</div>
                <div className="lab">SME Recovery</div>
                <div className="track"><div className="fill" style={{width:"45%"}}></div></div>
                <div className="val">$71k</div>
                <div className="lab">Women & Workforce</div>
                <div className="track"><div className="fill red" style={{width:"28%"}}></div></div>
                <div className="val">$44k</div>
              </div>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Geo Grid</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:8}}>
              {[
                {num:"842",label:"Egypt"},
                {num:"634",label:"KSA"},
                {num:"412",label:"UAE"},
                {num:"389",label:"Qatar"},
                {num:"256",label:"UK"},
                {num:"198",label:"USA"},
                {num:"156",label:"Canada"}
              ].map(g => (
                <div key={g.label} className="geo"><div className="geo-num">{g.num}</div><div className="geo-label">{g.label}</div></div>
              ))}
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Urgency Bar</div>
            <div className="urgency">
              <div className="urgency-ic">!</div>
              <div>
                <div style={{fontFamily:"var(--ff-display)",fontSize:18,margin:"0 0 2px"}}>Urgent: Hospitalisation Fund</div>
                <p style={{fontSize:13.5,color:"var(--ink-soft)",margin:0}}>Three cases awaiting emergency coverage in Cairo clinics.</p>
              </div>
              <button className="btn btn-primary" style={{marginLeft:"auto"}}>View Cases</button>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Document Item</div>
            <div className="doc" style={{maxWidth:400}}>
              <div className="doc-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>
              </div>
              <div>
                <div style={{fontSize:14,lineHeight:1.3}}>Passport Copy — Maryam</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,letterSpacing:".06em",color:"var(--muted)",marginTop:2}}>PDF · 1.2 MB · Verified</div>
              </div>
              <div className="doc-check">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 12l5 5L20 6"/></svg>
              </div>
            </div>
          </div>

          <div className="component-block" style={{marginBottom:24}}>
            <div className="component-label">Toast</div>
            <div className="toast-demo">Support pledged — confirmation sent</div>
          </div>

          <div className="dark-band">
            <h3>The diaspora is ready. Are you?</h3>
            <p>Join the Kushian™ pilot cohort. Pledge to a verified case in under three minutes.</p>
            <div className="flex-gap-10" style={{marginTop:24}}>
              <button className="btn btn-dark-gold">Support a Case</button>
              <button className="btn btn-ghost" style={{borderColor:"rgba(247,244,238,.4)",color:"var(--cream)"}}>Request Deck</button>
            </div>
          </div>

        </div>
      </section>

      <section className="section" id="guidelines">
        <div className="container">
          <div className="section-eyebrow">Guidelines</div>
          <h2 className="section-title">Do's and Don'ts</h2>
          <div className="do-dont-grid">
            <div className="do-dont do">
              <h4>Do</h4>
              <ul>
                <li>Use cream as the default canvas for every page.</li>
                <li>Let display type breathe — large sizes with tight tracking.</li>
                <li>Use JetBrains Mono for every label, stat, date, and meta element.</li>
                <li>Keep green as the single action color; gold only for emphasis.</li>
                <li>Use the hatch pattern for photo placeholders.</li>
                <li>Maintain 120px section padding on desktop.</li>
                <li>Provide visible focus indicators on all interactive elements.</li>
                <li>Respect prefers-reduced-motion for animations.</li>
              </ul>
            </div>
            <div className="do-dont dont">
              <h4>Don't</h4>
              <ul>
                <li>Use bold weights (700) for display text. Size and space carry hierarchy.</li>
                <li>Introduce accent colors beyond green, gold, and functional red.</li>
                <li>Use gradients for text, backgrounds, or decorative elements.</li>
                <li>Use glassmorphism or translucent overlays on text.</li>
                <li>Use emojis or generic icon libraries — bespoke SVG line icons only.</li>
                <li>Shrink touch targets below 44px on mobile.</li>
                <li>Use side-stripe decorative borders or hero-metric templates.</li>
                <li>Use identical card grids without variation in rhythm or scale.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-top">
            <div>
              <div className="logo" style={{color:"var(--cream)",marginBottom:16}}><span className="logo-mark"></span> Kushian™</div>
              <p style={{maxWidth:360,lineHeight:1.6,color:"rgba(247,244,238,.6)",margin:0}}>A Connection-as-a-Service platform connecting Sudanese diaspora supporters with displaced families, students, women professionals and SMEs.</p>
            </div>
            <div className="footer-col">
              <h5>Platform</h5>
              <ul>
                <li><a href="#" style={{color:"rgba(247,244,238,.7)"}}>Support a Case</a></li>
                <li><a href="#" style={{color:"rgba(247,244,238,.7)"}}>Impact Dashboard</a></li>
                <li><a href="#" style={{color:"rgba(247,244,238,.7)"}}>Partner Directory</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Verticals</h5>
              <ul>
                <li><a href="#" style={{color:"rgba(247,244,238,.7)"}}>Education & CPD</a></li>
                <li><a href="#" style={{color:"rgba(247,244,238,.7)"}}>Healthcare & Takaful</a></li>
                <li><a href="#" style={{color:"rgba(247,244,238,.7)"}}>SME Advisory</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Organisation</h5>
              <ul>
                <li><a href="#" style={{color:"rgba(247,244,238,.7)"}}>About Kushian™</a></li>
                <li><a href="#" style={{color:"rgba(247,244,238,.7)"}}>Founder</a></li>
                <li><a href="#" style={{color:"rgba(247,244,238,.7)"}}>Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Kushian™</span>
            <span>Demo · v0.1 · MVP Prototype</span>
          </div>
        </div>
      </footer>

      <div className="demo-tag">Prototype · Demo Only</div>
    </div>
  );
}
