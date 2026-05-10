// Ethos Community™ — shared components

const { useState, useEffect, useRef } = React;

const Icon = ({ name, size = 24 }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "education": return <svg {...props}><path d="M3 9l9-4 9 4-9 4-9-4z"/><path d="M7 11v5c2 2 8 2 10 0v-5"/><path d="M21 9v5"/></svg>;
    case "health": return <svg {...props}><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/><path d="M9 12h2v-2h2v2h2"/></svg>;
    case "family": return <svg {...props}><circle cx="8" cy="8" r="2.6"/><circle cx="16" cy="8" r="2.6"/><path d="M3 19c0-2.6 2.4-4.6 5-4.6s5 2 5 4.6"/><path d="M11 19c0-2.6 2.4-4.6 5-4.6s5 2 5 4.6"/></svg>;
    case "women": return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M12 12v9"/><path d="M9 18h6"/></svg>;
    case "sme": return <svg {...props}><path d="M3 21V9l9-5 9 5v12"/><path d="M9 21v-7h6v7"/><path d="M3 21h18"/></svg>;
    case "legal": return <svg {...props}><path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7l-2 6a3 3 0 0 0 6 0l-2-6"/><path d="M19 7l-2 6a3 3 0 0 0 6 0l-2-6"/></svg>;
    case "arrow": return <svg {...props} width={18} height={18}><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>;
    case "arrow-up-right": return <svg {...props}><path d="M7 17L17 7"/><path d="M9 7h8v8"/></svg>;
    case "arrow-left": return <svg {...props}><path d="M19 12H5"/><path d="M11 19l-7-7 7-7"/></svg>;
    case "check": return <svg {...props}><path d="M4 12l5 5L20 6"/></svg>;
    case "search": return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>;
    case "filter": return <svg {...props}><path d="M3 5h18"/><path d="M6 12h12"/><path d="M10 19h4"/></svg>;
    case "bell": return <svg {...props}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case "user": return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
    case "calendar": return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M3 9h18"/><path d="M8 3v4"/><path d="M16 3v4"/></svg>;
    case "clock": return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "doc": return <svg {...props}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>;
    case "pin": return <svg {...props}><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case "globe": return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>;
    case "shield": return <svg {...props}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>;
    case "trend": return <svg {...props}><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>;
    case "growth": return <svg {...props}><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>;
    case "users": return <svg {...props}><circle cx="9" cy="8" r="3"/><circle cx="15" cy="8" r="3"/><path d="M4 18c0-2.5 2-4 5-4s5 1.5 5 4"/><path d="M10 18c0-2.5 2-4 5-4s5 1.5 5 4"/></svg>;
    case "heart": return <svg {...props}><path d="M12 21s-8-5-8-12a4 4 0 0 1 8-2 4 4 0 0 1 8 2c0 7-8 12-8 12z"/></svg>;
    case "menu": return <svg {...props}><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></svg>;
    case "hamburger": return <svg {...props}><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></svg>;
    case "close": return <svg {...props}><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>;
    case "more": return <svg {...props}><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/></svg>;
    case "plus": return <svg {...props}><path d="M12 5v14"/><path d="M5 12h14"/></svg>;
    case "external": return <svg {...props}><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></svg>;
    case "download": return <svg {...props}><path d="M12 4v12"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>;
    case "phone": return <svg {...props}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>;
    case "mail": return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 7l9 6 9-6"/></svg>;
    default: return null;
  }
};

const Counter = ({ to, prefix = "", suffix = "", duration = 1400 }) => {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const ease = 1 - Math.pow(1 - p, 3);
            setN(to * ease);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  const isInt = Number.isInteger(to);
  const display = isInt ? Math.round(n).toLocaleString() : n.toFixed(1);
  return <span ref={ref} className="counting">{prefix}{display}{suffix}</span>;
};

const Reveal = ({ children, delay = 0, as: Tag = "div", className = "", ...rest }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          obs.disconnect();
        }
      });
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
};

let toastTimer;
const showToast = (msg) => {
  let el = document.getElementById("__toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "__toast";
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
};

const Nav = ({ active }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: "supporter-dashboard.html", label: "Dashboard", key: "dashboard" },
    { href: "education.html", label: "Education", key: "education" },
    { href: "healthcare.html", label: "Healthcare", key: "healthcare" },
    { href: "sme-advisory.html", label: "SME Advisory", key: "sme" },
    { href: "impact-dashboard.html", label: "Impact", key: "impact" }
  ];
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="landing.html" className="logo"><span className="logo-mark"></span><span className="logo-text"> Ethos Community™</span></a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.key} href={l.href} className={active === l.key ? "active" : ""}>{l.label}</a>
          ))}
        </div>
        <div className="nav-cta">
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            <Icon name={menuOpen ? "close" : "hamburger"}/>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="nav-mobile-menu">
          {links.map(l => (
            <a key={l.key} href={l.href} className={`nav-mobile-link ${active === l.key ? "active" : ""}`} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <div className="nav-mobile-ctas">
            <button className="btn btn-soft btn-sm" onClick={() => { setMenuOpen(false); showToast("Notifications — coming next"); }}><Icon name="bell" size={16}/></button>
            <a href="supporter-dashboard.html" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Support a Case <Icon name="arrow"/></a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer>
    <div className="container">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="landing.html" className="logo"><span className="logo-mark"></span> Ethos Community™</a>
          <p>A Connection-as-a-Service platform connecting Sudanese diaspora supporters with displaced families, students, women professionals and SMEs through verified partner-enabled services.</p>
        </div>
        <div className="footer-col">
          <h5>Platform</h5>
          <ul>
            <li><a href="supporter-dashboard.html">Supporter Dashboard</a></li>
            <li><a href="impact-dashboard.html">Impact Dashboard</a></li>
            <li><a href="beneficiary-profile.html">Beneficiary Cases</a></li>
            <li><a href="#">Partner Directory</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Verticals</h5>
          <ul>
            <li><a href="education.html">Education & CPD</a></li>
            <li><a href="healthcare.html">Healthcare & Takaful</a></li>
            <li><a href="sme-advisory.html">SME Advisory</a></li>
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

const DemoTag = () => <div className="demo-tag">Prototype · Demo Only</div>;

const Photo = ({ caption = "", overlay = "", pill = "", img = "", style = {}, className = "", dark = false }) => {
  const bgStyle = img ? { background: `url(${img}) center/cover` } : {};
  return (
    <div className={`photo ${dark ? "dark" : ""} ${className}`} style={{ ...bgStyle, ...style }}>
      {pill && <div className="photo-pill">{pill}</div>}
      {overlay && <div className="photo-overlay" style={dark ? {color:"#f7f4ee"}:{}}>{overlay}</div>}
      <div className="photo-meta" style={dark?{color:"rgba(247,244,238,.6)"}:{}}><span>{caption}</span><span>4 : 5</span></div>
    </div>
  );
};

const Avatar = ({ initials, size = "", className = "", green = false }) => {
  const cls = `avatar ${initials ? "initials" : ""} ${size} ${className} ${green ? "green" : ""}`;
  return <div className={cls}>{initials || ""}</div>;
};

const StatusDot = ({ status = "idle", size = 12, children }) => {
  const cls = `status-dot status-dot-${status}`;
  return (
    <span className={cls} style={{ width: size, height: size }} aria-hidden="true">
      {status === "done" ? <Icon name="check" size={Math.round(size * 0.7)} /> : children}
    </span>
  );
};

Object.assign(window, { Icon, Counter, Reveal, showToast, Nav, Footer, DemoTag, Photo, Avatar, StatusDot });
