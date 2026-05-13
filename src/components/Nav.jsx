import { useState } from "react";
import Icon from "./Icon.jsx";
import KushianBadge from "./KushianBadge.jsx";
import { showToast } from "./Toast.jsx";

const NAV_LINKS_SUPPORTER = (depth) => {
  const p = "../".repeat(depth);
  return [
    { href: `${p}supporter/dashboard.html`,            label: "Dashboard",   key: "dashboard" },
    { href: `${p}supporter/education.html`,            label: "Education",   key: "education" },
    { href: `${p}supporter/healthcare.html`,           label: "Healthcare",  key: "healthcare" },
    { href: `${p}supporter/sme-advisory.html`,         label: "SME",         key: "sme" },
    { href: `${p}supporter/women-empowerment.html`,    label: "Women",       key: "women" },
    { href: `${p}supporter/legal-services.html`,       label: "Legal",       key: "legal" },
    { href: `${p}supporter/product-traders.html`,      label: "Trade",       key: "trade" },
    { href: `${p}supporter/provider-marketplace.html`, label: "Marketplace", key: "marketplace" },
    { href: `${p}supporter/impact.html`,               label: "Impact",      key: "impact" }
  ];
};

const NAV_LINKS_BENEFICIARY = (depth) => {
  const p = "../".repeat(depth);
  return [
    { href: `${p}beneficiary/dashboard.html`, label: "Dashboard", key: "dashboard" },
    { href: `${p}beneficiary/my-cases.html`, label: "My Cases", key: "my-cases" },
    { href: `${p}beneficiary/documents.html`, label: "Documents", key: "documents" },
    { href: `${p}beneficiary/messages.html`, label: "Messages", key: "messages" }
  ];
};

const NAV_LINKS_NEUTRAL = (depth) => {
  const p = "../".repeat(depth);
  return [
    { href: `${p}landing.html`, label: "Home", key: "home" },
    { href: `${p}role-chooser.html`, label: "Get Started", key: "role" }
  ];
};

export default function Nav({ active, side = "supporter", depth = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links =
    side === "beneficiary" ? NAV_LINKS_BENEFICIARY(depth) :
    side === "neutral" ? NAV_LINKS_NEUTRAL(depth) :
    NAV_LINKS_SUPPORTER(depth);
  const prefix = "../".repeat(depth);
  const logoHref = `${prefix}landing.html`;
  const ctaHref = `${prefix}case-creation.html`;
  const chooserHref = `${prefix}role-chooser.html`;
  const sideLabel = side === "supporter" ? "Supporter" : side === "beneficiary" ? "Beneficiary" : null;
  const activeLink = links.find(l => l.key === active) || links[0];

  return (
    <nav className="nav">

      <div className="container nav-inner">
        <div className="nav-brand">
          <a href={logoHref} className="logo"><span className="logo-mark"></span><span className="logo-text"> Ethos Community™</span></a>
          <KushianBadge variant="pilot" />
        </div>
        <div className="nav-current-section">
          <span className="nav-current-kicker">{sideLabel || "Platform"}</span>
          <span className="nav-current-title">{activeLink?.label}</span>
        </div>
        <div className="nav-cta">
          <details className="nav-menu nav-section-menu">
            <summary className="nav-menu-trigger">Sections</summary>
            <div className="nav-menu-panel">
              {links.map(l => (
                <a key={l.key} href={l.href} className={active === l.key ? "active" : ""}>{l.label}</a>
              ))}
            </div>
          </details>
          <details className="nav-menu nav-account-menu">
            <summary className="nav-menu-trigger">{sideLabel || "Account"}</summary>
            <div className="nav-menu-panel">
              <a href={chooserHref}>Switch role</a>
              <button type="button" onClick={() => showToast("Notifications: coming next")}>Notifications</button>
              {side === "supporter" && <a href={`${prefix}supporter/impact.html`}>Impact ledger</a>}
            </div>
          </details>
          <a href={ctaHref} className="btn btn-primary sm nav-cta-btn">Create Case</a>
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
          {sideLabel && (
            <a href={chooserHref} className="nav-mobile-link nav-mobile-switch" onClick={() => setMenuOpen(false)}>Switch role · You're in {sideLabel}</a>
          )}
          <div className="nav-mobile-ctas">
            <button className="btn btn-soft btn-sm" aria-label="Notifications" onClick={() => { setMenuOpen(false); showToast("Notifications: coming next"); }}><Icon name="bell" size={16}/></button>
            <a href={ctaHref} className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Create Case</a>
          </div>
        </div>
      )}
    </nav>
  );
}
