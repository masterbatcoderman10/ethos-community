const TRACK_A = [
  { cat: "Technology", name: "iWire", desc: "Web · Mobile · Dashboard" },
  { cat: "Healthcare", name: "Clinic Network", desc: "Verified Care Providers" },
  { cat: "Takaful", name: "Cooperative Cover", desc: "Health & Family Insurance" },
  { cat: "Education", name: "University Partners", desc: "CPD · Credentials · Mentors" },
  { cat: "Islamic Finance", name: "SME Recovery Partners", desc: "Capital · Microfinance" },
  { cat: "Professional", name: "Legal & Advisory", desc: "Law · Tax · Immigration" },
  { cat: "Community", name: "Diaspora Networks", desc: "Associations · Ambassadors" },
  { cat: "Development", name: "IsDB Group", desc: "Development Finance Partner" },
];

const TRACK_B = [
  { cat: "Fintech", name: "Payment Partners", desc: "Wallets · Remittance · Cards" },
  { cat: "Telemedicine", name: "Remote Health", desc: "Virtual Consultations" },
  { cat: "Microfinance", name: "SME Finance", desc: "Working Capital · Advisory" },
  { cat: "CPD", name: "Certification Bodies", desc: "Professional Institutes" },
  { cat: "Women", name: "Enterprise Hub", desc: "Skills · Returnship · CPD" },
  { cat: "NGO", name: "Development Partners", desc: "Field Operations · Reach" },
  { cat: "Compliance", name: "Audit & Sharia", desc: "Tax · Compliance Review" },
  { cat: "Immigration", name: "Documentation Aid", desc: "Residency · Legal Support" },
];

function Pill({ cat, name, desc }) {
  return (
    <div className="partner-pill">
      <span className="partner-pill-cat">{cat}</span>
      <span className="partner-pill-name">{name}</span>
      <span className="partner-pill-desc">{desc}</span>
    </div>
  );
}

export default function PartnershipStrip() {
  return (
    <div className="partner-marquee" aria-hidden="true">
      <div className="partner-track partner-track--fwd">
        {[...TRACK_A, ...TRACK_A].map((item, i) => <Pill key={i} {...item} />)}
      </div>
      <div className="partner-track partner-track--rev">
        {[...TRACK_B, ...TRACK_B].map((item, i) => <Pill key={i} {...item} />)}
      </div>
    </div>
  );
}
