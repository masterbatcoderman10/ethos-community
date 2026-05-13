import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import DemoTag from '../components/DemoTag.jsx';
import Reveal from '../components/Reveal.jsx';
import ProviderCard from '../components/ProviderCard.jsx';
import '../../supporter/provider-marketplace.css';

const PROVIDERS = [
  { name: "Cleopatra Hospital",          category: "Clinics & Hospitals",         location: "Cairo, Egypt",     verified: true,  rating: 4.8, desc: "500-bed multi-specialty hospital serving Sudanese diaspora families. Telehealth available." },
  { name: "Sudan Doctors Network",        category: "Clinics & Hospitals",         location: "Dubai, UAE",       verified: true,  rating: 4.6, desc: "Network of 40+ Sudanese physicians in the GCC — consultations, referrals, specialist triage." },
  { name: "Al-Salam Medical Centre",      category: "Clinics & Hospitals",         location: "Riyadh, KSA",      verified: true,  rating: 4.5, desc: "Primary care and specialist services for Arabic-speaking communities in central Riyadh." },
  { name: "Dr Rasha Salim",               category: "Mentors & Coaches",           location: "London, UK",       verified: true,  rating: 5.0, desc: "Consultant cardiologist. Mentors Sudanese medical graduates entering UK foundation programmes." },
  { name: "Prof Khalid Mahmoud",          category: "Mentors & Coaches",           location: "Doha, Qatar",      verified: true,  rating: 4.9, desc: "Professor of Economics, Qatar University. Mentors post-graduate researchers and CPD candidates." },
  { name: "Nile Learning Institute",      category: "Universities & Training",     location: "Cairo, Egypt",     verified: true,  rating: 4.7, desc: "ACCA, CMA, PMP and digital skills certification — Arabic-medium available." },
  { name: "Gulf Skills Academy",          category: "Universities & Training",     location: "Abu Dhabi, UAE",   verified: true,  rating: 4.6, desc: "CPD aligned to UAE CBUAE and KHDA licensing requirements. Finance and law specialisms." },
  { name: "Omdurman CPD Institute",       category: "Universities & Training",     location: "Cairo, Egypt",     verified: true,  rating: 4.4, desc: "AAOIFI-accredited Islamic finance CPD. Credential preservation for displaced professionals." },
  { name: "Al-Neel Legal Consultancy",    category: "Lawyers",                     location: "Riyadh, KSA",      verified: true,  rating: 4.7, desc: "Documentation, residency permits, corporate formation and real-estate advisory." },
  { name: "Diaspora Law Group",           category: "Lawyers",                     location: "London, UK",       verified: true,  rating: 4.8, desc: "Immigration, asylum, nationality and family law for Arabic-speaking clients in the UK." },
  { name: "Nile Accounting Group",        category: "Accountants & Auditors",      location: "Dubai, UAE",       verified: true,  rating: 4.5, desc: "Accounting, VAT compliance, IFRS reporting and external audit for Sudanese-owned SMEs." },
  { name: "Heritage Tax Advisory",        category: "Tax Advisers",                location: "London, UK",       verified: true,  rating: 4.6, desc: "UK and cross-border tax for diaspora professionals, non-doms and business owners." },
  { name: "Ibn Khaldun Tax Advisory",     category: "Tax Advisers",                location: "Jeddah, KSA",      verified: false, rating: 4.2, desc: "Zakat, Saudi VAT and corporate tax advisory for family businesses and SMEs." },
  { name: "Dar Immigration Services",     category: "Immigration & Documentation", location: "Cairo, Egypt",     verified: true,  rating: 4.3, desc: "Egyptian residency, UNHCR registration, document legalisation and translation services." },
  { name: "Sudan Bridge Documentation",   category: "Immigration & Documentation", location: "Kampala, Uganda",  verified: false, rating: 4.1, desc: "Ugandan work permits, UNHCR processes and embassy documentation for Sudanese nationals." },
  { name: "Heritage Property Law",        category: "Property & Inheritance",      location: "London, UK",       verified: true,  rating: 4.6, desc: "Cross-border inheritance, Sudanese property claims, UK probate and estate planning." },
  { name: "Desert Rose Advisory",         category: "Business Consultants",        location: "Dubai, UAE",       verified: true,  rating: 4.7, desc: "Business setup, free-zone licensing, SME strategy for Sudanese entrepreneurs." },
  { name: "Khartoum Capital Advisers",    category: "Finance Partners",            location: "Doha, Qatar",      verified: true,  rating: 4.8, desc: "Islamic finance structuring, Murabaha facilities and development finance advisory." },
  { name: "Nile Takaful Cooperative",     category: "Takaful & Insurance",         location: "Riyadh, KSA",      verified: true,  rating: 4.5, desc: "Family Takaful, medical cover and group protection for Sudanese diaspora communities." },
  { name: "Gulf Solidarity Insurance",    category: "Takaful & Insurance",         location: "Abu Dhabi, UAE",   verified: false, rating: 4.0, desc: "Cooperative health and life cover for migrant workers and displaced professionals." }
];

const CATEGORIES = ["All","Clinics & Hospitals","Mentors & Coaches","Universities & Training","Lawyers","Accountants & Auditors","Tax Advisers","Immigration & Documentation","Property & Inheritance","Business Consultants","Finance Partners","Takaful & Insurance"];

export default function SupporterProviderMarketplace() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = PROVIDERS.filter(p => active === "All" || p.category === active);

  return (
    <>
      <Nav active="marketplace" side="supporter" depth={1} />

      <section className="mp-hero">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Provider Directory · Verified Network</div>
            <h1>Provider <em>Marketplace</em></h1>
            <p>Verified professionals, clinics, institutions, and advisers serving Sudanese diaspora and displaced communities across 12 corridors.</p>
            <div className="mp-search-wrap">
              <Icon name="search" size={18}/>
              <input
                className="mp-search"
                type="search"
                aria-label="Search providers by name, specialty, or location"
                placeholder="Search by name, specialty, or location…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === "Enter" && showToast(`Search: ${search}`)}
              />
              <button className="btn btn-primary sm" onClick={() => showToast(`Search: ${search}`)}>Search</button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container">
        <div className="mp-filter-bar" role="tablist" aria-label="Provider categories">
          {CATEGORIES.map(c => (
            <button key={c} role="tab" aria-selected={active === c} className={`chip ${active === c ? "active" : ""}`} onClick={() => setActive(c)}>{c}</button>
          ))}
        </div>
      </div>

      <section className="section-block">
        <div className="container">
          <div className="mp-grid">
            {filtered.map((p, i) => (
              <Reveal key={i} delay={i * 40}><ProviderCard {...p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block mp-join">
        <div className="container">
          <Reveal>
            <div className="mp-join-inner">
              <div>
                <div className="eyebrow">For Professionals</div>
                <h2>Join our verified provider network</h2>
                <p>Connect with Sudanese diaspora clients seeking your expertise. Verified listings, structured introductions, community trust.</p>
              </div>
              <button className="btn btn-primary" onClick={() => showToast("Provider application — coming next")}>Become a Listed Provider <Icon name="arrow"/></button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer depth={1}/><DemoTag/>
    </>
  );
}
