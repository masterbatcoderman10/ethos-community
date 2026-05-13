import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import KushianBadge from "./KushianBadge.jsx";

const NAV_LINKS_SUPPORTER = [
  { to: "/supporter",            label: "Dashboard",   key: "dashboard" },
  { to: "/supporter/education",            label: "Education",   key: "education" },
  { to: "/supporter/healthcare",           label: "Healthcare",  key: "healthcare" },
  { to: "/supporter/sme",         label: "SME",         key: "sme" },
  { to: "/supporter/women",    label: "Women",       key: "women" },
  { to: "/supporter/legal",       label: "Legal",       key: "legal" },
  { to: "/supporter/traders",      label: "Trade",       key: "trade" },
  { to: "/supporter/marketplace", label: "Marketplace", key: "marketplace" },
  { to: "/supporter/impact",               label: "Impact",      key: "impact" }
];

const NAV_LINKS_BENEFICIARY = [
  { to: "/beneficiary", label: "Dashboard", key: "dashboard" },
  { to: "/beneficiary/cases", label: "My Cases", key: "my-cases" },
  { to: "/beneficiary/documents", label: "Documents", key: "documents" },
  { to: "/beneficiary/messages", label: "Messages", key: "messages" },
  { to: "/beneficiary/pathways/healthcare", label: "Healthcare", key: "healthcare" },
  { to: "/beneficiary/pathways/education", label: "Education", key: "education" },
  { to: "/beneficiary/pathways/women", label: "Women", key: "women" },
  { to: "/beneficiary/pathways/legal", label: "Legal", key: "legal" },
  { to: "/beneficiary/pathways/sme", label: "SME", key: "sme" },
  { to: "/beneficiary/pathways/traders", label: "Trade", key: "trade" },
  { to: "/beneficiary/pathways/marketplace", label: "Marketplace", key: "marketplace" }
];

export default function Nav({ active, side = "supporter", depth = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links =
    side === "beneficiary" ? NAV_LINKS_BENEFICIARY :
    NAV_LINKS_SUPPORTER;
  const logoHref = "/";
  const ctaHref = "/create";
  const sideLabel = side === "supporter" ? "Supporter" : side === "beneficiary" ? "Beneficiary" : null;
  const activeLink = links.find(l => l.key === active) || links[0];

  if (side === "neutral") {
    return (
      <nav className="nav">
        <div className="container lnav-bar">
          <Link to="/" className="logo">
            <span className="logo-mark" />
            <span className="logo-text">Kushian™</span>
          </Link>
          <nav className="lnav-bar-links" aria-label="Site navigation">
            <a href="#impact">Impact</a>
            <a href="#verticals">Verticals</a>
            <a href="#partners">For Partners</a>
          </nav>
          <Link to="/role" className="lnav-bar-cta">
            Support a Family
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="nav">

      <div className="container nav-inner">
        <div className="nav-brand">
          <Link to={logoHref} className="logo"><span className="logo-mark"></span><span className="logo-text"> Kushian™</span></Link>
          <KushianBadge variant="powered" />
        </div>
        <div className="nav-current-section">
          <span className="nav-current-kicker">{sideLabel || "Platform"}</span>
          <span className="nav-current-title">{activeLink?.label}</span>
        </div>
        <div className="nav-cta">
          <details className="nav-menu nav-section-menu">
            <summary className="nav-menu-trigger">Navigate</summary>
            <div className="nav-menu-panel">
              {links.map(l => (
                <Link key={l.key} to={l.to} className={active === l.key ? "active" : ""}>{l.label}</Link>
              ))}
            </div>
          </details>
          {side === "supporter" && (
            <Link to="/supporter/impact" className="btn btn-ghost sm nav-cta-btn">Impact ledger</Link>
          )}
          {side === "beneficiary" && (
            <Link to={ctaHref} className="btn btn-primary sm nav-cta-btn">Open a Case</Link>
          )}
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            <Icon name={menuOpen ? "close" : "hamburger"}/>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-mobile-menu">
          {links.map(l => (
            <Link key={l.key} to={l.to} className={`nav-mobile-link ${active === l.key ? "active" : ""}`} onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
          <div className="nav-mobile-ctas">
            {side === "supporter" && (
              <Link to="/supporter/impact" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Impact ledger</Link>
            )}
            {side === "beneficiary" && (
              <Link to={ctaHref} className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Open a Case</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
