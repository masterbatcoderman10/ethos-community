import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import DemoTag from '../components/DemoTag.jsx';
import Reveal from '../components/Reveal.jsx';

const CASES = {
  afaf: {
    caseId: "K-3014",
    photoMeta: "ENTREPRENEUR · DR AFAF OSMAN",
    eyebrow: "SME Recovery vertical · Healthcare clinic",
    name: "Dr Afaf Osman",
    subtitle: "Dentist · Khartoum → Sharjah",
    meta: [
      { icon: "pin", text: "Sharjah, UAE · Clinic relocation" },
      { icon: "calendar", text: "Project start Jan 2026" },
      { icon: "shield", text: "Verified by advisor board" }
    ],
    story: "Dr Afaf Osman, a licensed dentist with 12 years' practice in Khartoum, is relocating her dental clinic to Sharjah following displacement. Through Kushian™'s SME Recovery pool, three diaspora advisors and financial partners structured Sharia-compliant Murabaha financing for equipment, clinic setup and working capital — supporting both business restart and job creation for 6 displaced dental hygienists.",
    campaign: { amount: "$12,400", goal: "$18,000 GOAL · 69%", progress: 69, financiers: 3, jobs: 6, structure: "Murabaha" },
    verification: { status: "Fully verified", text: "Credentials, business plan and Sharia compliance attested by advisor board. Last review: 18 Apr 2026." },
    docs: [
      { name: "Business license · Sudan", sub: "Verified · Original archived" },
      { name: "UAE business establishment permit", sub: "Dubai DED · In progress" },
      { name: "Clinic lease agreement", sub: "Sharjah · 36-month term" },
      { name: "Equipment manifest", sub: "Dental chairs, autoclave, tools" },
      { name: "Professional credentials", sub: "DDS degree · UAE licensing pending" },
      { name: "Financial audit", sub: "2024 clinic accounts · Verified" }
    ],
    timeline: [
      { when: "Jan 2026", title: "Clinic relocation decision", desc: "Dr Afaf decides to relocate dental practice from Khartoum to Sharjah, UAE.", state: "done" },
      { when: "Feb 2026", title: "Onboarded to SME Recovery pool", desc: "Diagnostic completed. 18-month business restart plan approved.", state: "done" },
      { when: "Mar 2026", title: "Lease secured", desc: "Prime location clinic space signed for 36 months in Sharjah CBD.", state: "done" },
      { when: "Apr 2026", title: "Capital structuring completed", desc: "Murabaha financing for equipment approved. Pledge campaign opened.", state: "done" },
      { when: "May 2026", title: "Fit-out begins", desc: "Clinic renovation and equipment installation. Target opening: June 2026.", state: "current" },
      { when: "Sept 2026", title: "6-month operational review", desc: "Patient acquisition, revenue, team hiring and compliance attestation.", state: "future" }
    ],
    supporters: [
      { initials: "OB", name: "Omar Bashir", loc: "Deloitte ME", amt: 4800 },
      { initials: "RS", name: "Rasha Salim", loc: "Emirates NBD", amt: 4000 },
      { initials: "MA", name: "Mohamed Abdalla", loc: "Lattice Capital", amt: 3600 }
    ],
    similarCases: [
      { id: "SME Advisory",  name: "SME Recovery & Finance-Readiness", href: "/supporter/sme" },
      { id: "K-2890",        name: "Halima M. — Women CPD", href: "/supporter/cases/halima" },
      { id: "K-3401",        name: "Nour H. — Women-Led SME", href: "/supporter/women" }
    ],
    sidePanel: {
      eyebrow: "Advisor of record",
      title: "Sharia & Strategy Board",
      text: "Dr Hatim El Tahir (founder), Omar Bashir (Deloitte), Rasha Salim (Emirates NBD)",
      cta: "Advisor profiles"
    },
    background: [
      "Dr Afaf Osman is a licensed dentist with a private practice in Khartoum's Al-Riyadh district since 2014. She employs six dental hygienists and operates as a primary care provider for underserved neighborhoods. Conflict in 2024 forced her to close operations and relocate to Sharjah in January 2026.",
      "With 12 years' experience and an established patient base among Sudanese diaspora in the GCC, she has immediate demand for services. The primary barrier is capital for clinic setup — equipment, lease deposit and working capital."
    ],
    supportRequested: "The Kushian™ SME pool structures $18,000 of Sharia-compliant Murabaha financing: equipment and autoclave ($8,000), clinic lease deposit and fit-out ($6,000), working capital ($3,000), and professional licensing ($1,000). The clinic targets revenue breakeven by month 8 and profitability by month 12, with quarterly milestones tracked by the advisor board."
  },
  awad: {
    caseId: "K-1908",
    photoMeta: "BENEFICIARY · AWAD FAMILY",
    eyebrow: "Family Support vertical · Household stabilization",
    name: "Awad M. Family",
    subtitle: "5 dependents · Wad Madani → Kampala",
    meta: [
      { icon: "pin", text: "Kampala, Uganda · Manufacturing sector" },
      { icon: "calendar", text: "Onboarded Mar 2026" },
      { icon: "shield", text: "Verified by Kampala partner" }
    ],
    story: "The Awad family — father seeking work, mother and three school-age children — was displaced from Wad Madani in February 2026. Through Kushian™'s Family Support pool, eight diaspora supporters across Riyadh, Jeddah, Cairo and London pledged monthly household stipends covering rent, food, utilities and children's education — coordinated by a verified Kampala partner with quarterly income assessments.",
    campaign: { amount: "$6,240", goal: "$9,600 GOAL · 65%", progress: 65, supporters: 8, coverage: "6 months", partner: "Kampala CDO" },
    verification: { status: "Fully verified", text: "Identity, displacement and income attested by Kampala partner. Last assessment: 22 Apr 2026." },
    docs: [
      { name: "National ID · Family", sub: "Verified · Kampala Partner" },
      { name: "UNHCR displacement certificate", sub: "Issued Feb 2026 · Family of 5" },
      { name: "Household income declaration", sub: "Self-attested · Witnessed" },
      { name: "Rental agreement", sub: "Housing in Kampala, UG" },
      { name: "Employment seeking status", sub: "Father · Labour permit application" },
      { name: "Child welfare attestation", sub: "3 dependents · Health screening passed" }
    ],
    timeline: [
      { when: "Feb 2026", title: "Family displaced from Wad Madani", desc: "Awad M., spouse and 3 children relocate to Kampala via Kenya corridor.", state: "done" },
      { when: "Mar 2026", title: "Onboarded to Family Support pool", desc: "Verified through Kampala partner. Income assessment completed.", state: "done" },
      { when: "Apr 2026", title: "Monthly stipend begins", desc: "First payment deployed: $800/month for 6 months covering rent, food, utilities.", state: "done" },
      { when: "May 2026", title: "Employment support initiated", desc: "Father pursuing manufacturing sector work. Skills audit and job placement support.", state: "current" },
      { when: "Aug 2026", title: "Mid-term progress review", desc: "Family stabilization milestone check. Employment progress assessment.", state: "future" },
      { when: "Sept 2026", title: "Loan transition planning", desc: "Move from stipend to microcredit for skills training and business restart.", state: "future" }
    ],
    supporters: [
      { initials: "OI", name: "Prof. Osman I.", loc: "Jeddah, SA", amt: 800 },
      { initials: "AH", name: "Ahmed H.", loc: "Doha, QA", amt: 800 },
      { initials: "FE", name: "Fatima E.", loc: "London, UK", amt: 800 },
      { initials: "NK", name: "Nouf K.", loc: "Riyadh, SA", amt: 800 },
      { initials: "RM", name: "Rasha M.", loc: "Dubai, AE", amt: 800 },
      { initials: "MA", name: "Mohamed A.", loc: "Toronto, CA", amt: 800 },
      { initials: "SH", name: "Serag H.", loc: "Cairo, EG", amt: 400 },
      { initials: "+1", name: "1 more supporter", loc: "GCC + Africa", amt: 400 }
    ],
    similarCases: [
      { id: "K-2384", name: "Maryam R. — Family Support", href: "/supporter/cases/maryam" },
      { id: "K-3120", name: "Fatima A. — Widows Support", href: "/supporter/women" },
      { id: "K-2890", name: "Halima M. — Women CPD", href: "/supporter/cases/halima" }
    ],
    sidePanel: {
      eyebrow: "Partner of record",
      title: "Kampala Diaspora Organization",
      text: "Kampala, Uganda · Family support & employment placement · 42 active cases.",
      cta: "Partner profile"
    },
    background: [
      "Awad M. was a manufacturing supervisor at a Wad Madani textile factory before conflict displaced his family in February 2026. His family — a spouse, three children aged 6, 9 and 12, and an elderly dependent — relocated to Kampala via Kenya.",
      "With limited local language skills and no immediate employment prospects, the family faces acute income insecurity. The mother is unable to work due to childcare demands, leaving household stabilization dependent on monthly support."
    ],
    supportRequested: "The Kushian™ Family pool funds $800/month covering rent ($400), food and nutrition ($250), utilities and transport ($100), and children's school fees ($50) — a 6-month stabilization package while the father pursues employment in the manufacturing or construction sectors. Parallel job placement support connects him with verified employers."
  },
  halima: {
    caseId: "K-2890",
    photoMeta: "PROFESSIONAL · HALIMA M.",
    eyebrow: "Women & Workforce vertical · Returnship",
    name: "Halima M.",
    subtitle: "Finance professional · Khartoum → Doha",
    meta: [
      { icon: "pin", text: "Doha, Qatar · Islamic finance" },
      { icon: "calendar", text: "Onboarded Feb 2026" },
      { icon: "shield", text: "Verified by program partner" }
    ],
    story: "Halima, a mid-career finance professional with 6 years' banking experience in Khartoum, was displaced in February 2026. Through Kushian™'s Women & Workforce pool, four diaspora supporters funded a 12-week CPD returnship in Sharia-compliant finance — professional upskilling, mentor coaching from a senior Islamic banker, and employer placement support — positioning her for re-entry into banking across the GCC.",
    campaign: { amount: "$1,800", goal: "$3,600 GOAL · 50%", progress: 50, supporters: 4, program: "AAOIFI CPD", mentor: "Rasha Salim" },
    verification: { status: "Fully verified", text: "Credentials and professional background attested by program partner. Last update: 20 Apr 2026." },
    docs: [
      { name: "National ID · Woman", sub: "Verified · Qatar residency" },
      { name: "Professional credentials", sub: "Finance diploma · CFA Level 1 passed" },
      { name: "Displacement certificate", sub: "UNHCR · Issued Feb 2026" },
      { name: "CPD program enrollment", sub: "AAOIFI Pathway · Scholarship approved" },
      { name: "Employment commitment letter", sub: "Host employer · Conditional offer" },
      { name: "Mentor assignment", sub: "Rasha Salim, Emirates NBD Islamic" }
    ],
    timeline: [
      { when: "Feb 2026", title: "Displacement from Sudan", desc: "Halima M. relocates to Doha following workplace closure in Khartoum.", state: "done" },
      { when: "Feb 2026", title: "Onboarded to Women & Workforce pool", desc: "Professional background assessed. Returnship and upskilling pathway designed.", state: "done" },
      { when: "Mar 2026", title: "CPD program begins", desc: "AAOIFI Sharia-compliant finance pathway. 12-week intensive modules.", state: "done" },
      { when: "Apr 2026", title: "Mentor pairing completed", desc: "Matched with Rasha Salim (Emirates NBD Islamic). Weekly coaching sessions.", state: "current" },
      { when: "May 2026", title: "Employer interviews", desc: "3 Islamic banking firms conduct interviews. Conditional offers extended.", state: "current" },
      { when: "Sept 2026", title: "Employment placement", desc: "Transition to full-time finance role. Ongoing mentor support.", state: "future" }
    ],
    supporters: [
      { initials: "RS", name: "Rasha Salim", loc: "Emirates NBD Islamic", amt: 600 },
      { initials: "SM", name: "Dr Sarah M.", loc: "Manchester, UK", amt: 400 },
      { initials: "AH", name: "Ahmed H.", loc: "Doha, QA", amt: 400 },
      { initials: "NK", name: "Nouf K.", loc: "Riyadh, SA", amt: 400 }
    ],
    similarCases: [
      { id: "Women",      name: "Browse women's support pathways", href: "/supporter/women" },
      { id: "K-3275",     name: "Amira A. — Women CPD", href: "/supporter/women" },
      { id: "K-3401",     name: "Nour H. — Women-Led SME", href: "/supporter/women" }
    ],
    sidePanel: {
      eyebrow: "Mentor of record",
      title: "Rasha Salim",
      text: "MD, Emirates NBD Islamic · 15 years' Islamic banking · Senior Counsel.",
      cta: "Mentor profile"
    },
    background: [
      "Halima is a mid-career finance professional with 6 years' experience as a credit analyst at a major Sudanese bank in Khartoum. She holds a diploma in finance and completed Level 1 of the CFA exam. Her career was disrupted when her employer closed operations in the conflict, forcing her to relocate to Doha in February 2026.",
      "While she has strong technical skills and banking experience, she faces two barriers: knowledge gaps in Sharia-compliant finance (unfamiliar in her prior role) and a 3-month employment gap that requires confidence-building and credentials refreshment before GCC banks will hire her."
    ],
    supportRequested: "The Kushian™ Women & Workforce pool funds a targeted 12-week returnship: AAOIFI Sharia-compliant finance modules ($1,200), professional certification exam fee ($400), one-on-one mentor coaching with a senior Islamic banker ($800), and employer interview preparation ($400). Rasha Salim, MD of Emirates NBD Islamic, provides weekly guidance and employer introductions at 3 leading Islamic banks in the region."
  },
  ibrahim: {
    caseId: "K-2102",
    photoMeta: "COHORT · ENGINEERING GRADUATES",
    eyebrow: "Education vertical · Graduate CPD & placement",
    name: "Ibrahim Engineering Cohort",
    subtitle: "12 graduates · Sudan → Riyadh",
    meta: [
      { icon: "pin", text: "Riyadh, Saudi Arabia · Engineering firms" },
      { icon: "calendar", text: "Program start Aug 2024" },
      { icon: "shield", text: "Verified by institute partner" }
    ],
    story: "Twelve displaced Sudanese engineering graduates converged in Riyadh seeking employment in the Gulf's booming infrastructure and energy sector. Through Kushian™'s Education pool, twenty-two diaspora supporters funded a 9-month CPD and placement program — professional development, Saudi technical standards, workplace Arabic and employer interviews coordinated by a verified Riyadh engineering institute. All 12 secured engineering roles at major Saudi firms.",
    campaign: { amount: "$14,400", goal: "$14,400 GOAL · 100%", progress: 100, supporters: 22, placed: "12 of 12", status: "COMPLETE" },
    verification: { status: "Fully placed", text: "All 12 cohort members employed in engineering roles. Final attestation: 28 May 2026." },
    docs: [
      { name: "Engineering degrees · 12 recipients", sub: "Verified · Bachelor of Science" },
      { name: "Graduation attestation", sub: "Riyadh Engineering Institute · May 2026" },
      { name: "Employment letters", sub: "12 of 12 placed in engineering roles" },
      { name: "Displacement certificates", sub: "UNHCR · Sudan-based cohort" },
      { name: "CPD completion certificates", sub: "Professional development track" },
      { name: "Employer attestation", sub: "Saudi Aramco, SABIC, Saudi Binladin Group" }
    ],
    timeline: [
      { when: "Aug 2024", title: "Cohort formation", desc: "12 displaced Sudanese engineering graduates assembled in Riyadh.", state: "done" },
      { when: "Sept 2024", title: "Onboarded to Education pool", desc: "CPD program and placement support launched by Riyadh Engineering Institute.", state: "done" },
      { when: "Dec 2024", title: "CPD modules complete", desc: "Professional development, Saudi standards, workplace Arabic training.", state: "done" },
      { when: "Mar 2026", title: "Placement interviews begin", desc: "Interviews conducted with 8 major Saudi engineering firms.", state: "done" },
      { when: "May 2026", title: "Graduation ceremony", desc: "12 of 12 cohort members placed. Placement bonus paid and ceremonies held.", state: "done" },
      { when: "Sept 2026", title: "6-month employment review", desc: "Onboarding attestation and salary progression tracking.", state: "current" }
    ],
    supporters: [
      { initials: "SM", name: "Dr Sarah M.", loc: "Manchester, UK", amt: 600 },
      { initials: "OI", name: "Prof. Osman I.", loc: "Jeddah, SA", amt: 900 },
      { initials: "KA", name: "Khalid A.", loc: "Dubai, AE", amt: 600 },
      { initials: "HY", name: "Hassan Y.", loc: "Toronto, CA", amt: 600 },
      { initials: "FE", name: "Fatima E.", loc: "London, UK", amt: 600 },
      { initials: "AH", name: "Ahmed H.", loc: "Doha, QA", amt: 600 },
      { initials: "NK", name: "Nouf K.", loc: "Riyadh, SA", amt: 600 },
      { initials: "MA", name: "Mohamed A.", loc: "Cairo, EG", amt: 600 },
      { initials: "RM", name: "Rasha M.", loc: "Dubai, AE", amt: 500 },
      { initials: "+12", name: "12 more supporters", loc: "GCC + Global", amt: 3900 }
    ],
    similarCases: [
      { id: "Education",  name: "Browse all education cases", href: "/supporter/education" },
      { id: "K-2384",     name: "Maryam R. — Student support", href: "/supporter/cases/maryam" },
      { id: "Mentors",    name: "View diaspora mentor network", href: "/supporter/education" }
    ],
    sidePanel: {
      eyebrow: "Partner of record",
      title: "Riyadh Engineering Institute",
      text: "Riyadh, Saudi Arabia · CPD & placement · Established 1998.",
      cta: "Partner profile"
    },
    background: [
      "In August 2024, a cohort of twelve engineering graduates from Sudan converged in Riyadh seeking employment. All held Bachelor of Science degrees in civil, mechanical or electrical engineering from leading Sudanese universities. Displacement and border restrictions prevented direct entry into Saudi job markets without local credentialling and professional network alignment.",
      "The group faced a common challenge: expertise in engineering was not matched by knowledge of Saudi technical standards, employer expectations, or workplace Arabic proficiency — a gap that required structured 6-8 month bridging before placement could succeed."
    ],
    supportRequested: "The Kushian™ Education pool funded a comprehensive 9-month CPD and placement program: technical standards and Saudi codes ($3,600), workplace Arabic immersion ($2,400), professional certifications ($2,400), employer interview prep ($2,400), placement bonus ($2,800), and program management ($900). The Riyadh Engineering Institute managed recruitment, training and employer introductions across Saudi Aramco, SABIC, Saudi Binladin and other major firms."
  },
  maryam: {
    caseId: "K-2384",
    photoMeta: "BENEFICIARY · MARYAM A.",
    eyebrow: "Education vertical · Year 9 Student",
    name: "Maryam A.",
    subtitle: "Age 14 · Omdurman → Cairo",
    meta: [
      { icon: "pin", text: "Cairo, Egypt · Al-Manarah School" },
      { icon: "calendar", text: "Onboarded May 2025" },
      { icon: "shield", text: "Verified by Cairo partner" }
    ],
    story: "When her family was displaced from Omdurman in August 2024, Maryam's secondary education stopped. Through Kushian™, twelve diaspora supporters across Riyadh, Doha, Manchester and Toronto pledged toward her tuition, books, transport and counselling for the academic year — coordinated by a verified Cairo school partner with monthly attestations.",
    campaign: { amount: "$3,840", goal: "$4,200 GOAL · 91%", progress: 91, supporters: 12, coverage: "9 months", partner: "Al-Manarah" },
    verification: { status: "Fully verified", text: "Identity, displacement and enrolment attested by Cairo partner. Last attestation: 18 Apr 2026." },
    docs: [
      { name: "National ID · Mother", sub: "Verified · Cairo Partner" },
      { name: "School enrolment letter", sub: "Al-Manarah School · Sept 2025" },
      { name: "Displacement certificate", sub: "UNHCR · Issued Aug 2024" },
      { name: "Term 1 attendance attestation", sub: "100% · Issued Dec 2025" },
      { name: "Counselling intake form", sub: "Trauma-informed care · Verified" },
      { name: "Household income declaration", sub: "Self-attested · Witnessed" }
    ],
    timeline: [
      { when: "Aug 2024", title: "Family displaced from Omdurman", desc: "Maryam, mother and 3 siblings relocate to Cairo via Aswan corridor.", state: "done" },
      { when: "May 2025", title: "Onboarded to Kushian™", desc: "Verified through Cairo partner. Documentation completed in 11 days.", state: "done" },
      { when: "Sept 2025", title: "Enrolment at Al-Manarah School", desc: "Year 9 placement secured. Tuition pledge campaign opened.", state: "done" },
      { when: "Dec 2025", title: "Term 1 milestone reached", desc: "100% attendance · Top quartile in maths and Arabic literature.", state: "done" },
      { when: "May 2026", title: "Term 2 attestation due", desc: "School partner submission expected by 15 May 2026.", state: "current" },
      { when: "Sept 2026", title: "Year 10 enrolment review", desc: "Eligibility for full-year continuation pledge.", state: "future" }
    ],
    supporters: [
      { initials: "SM", name: "Dr Sarah M.", loc: "Manchester, UK", amt: 480 },
      { initials: "OI", name: "Prof. Osman I.", loc: "Jeddah, SA", amt: 600 },
      { initials: "KA", name: "Khalid A.", loc: "Dubai, AE", amt: 480 },
      { initials: "HY", name: "Hassan Y.", loc: "Toronto, CA", amt: 240 },
      { initials: "FE", name: "Fatima E.", loc: "London, UK", amt: 360 },
      { initials: "AH", name: "Ahmed H.", loc: "Doha, QA", amt: 420 },
      { initials: "NK", name: "Nouf K.", loc: "Riyadh, SA", amt: 360 },
      { initials: "+5", name: "5 more supporters", loc: "GCC + Europe", amt: 900 }
    ],
    similarCases: [
      { id: "K-1908", name: "Awad T. — Family Support", href: "/supporter/cases/awad" },
      { id: "K-3120", name: "Fatima A. — Widows Support", href: "/supporter/women" },
      { id: "K-3580", name: "Samira K. — Family Resilience", href: "/supporter/women" }
    ],
    sidePanel: {
      eyebrow: "Partner of record",
      title: "Al-Manarah School",
      text: "Heliopolis, Cairo · Established 1998 · Currently hosts 14 displaced Sudanese students in 2025/26.",
      cta: "Partner profile"
    },
    background: [
      "Maryam was a top-quartile Year 8 student at a public secondary school in Omdurman when conflict displaced her family in August 2024. Her father — a civil engineer at the city water authority — was unable to relocate with the family and remains in Wad Madani.",
      "The family of five reached Cairo in September 2024 through the Aswan corridor. Maryam's mother, a trained nurse, was unable to secure local registration for nine months, during which time Maryam's secondary schooling lapsed."
    ],
    supportRequested: "The Kushian™ pledge funds tuition fees ($2,400/year), books and uniform ($600), daily transport ($480), school meals ($420) and weekly trauma-informed counselling ($300) at Al-Manarah School in Heliopolis — a verified partner with 14 displaced Sudanese students in their 2025/26 cohort."
  },
  yasmin: {
    caseId: "K-2756",
    photoMeta: "BENEFICIARY · YASMIN H.",
    eyebrow: "Healthcare vertical · Pediatric cardiology",
    name: "Yasmin H.",
    subtitle: "Age 8 · Khartoum → Cairo",
    meta: [
      { icon: "pin", text: "Cairo, Egypt · Cleopatra Hospital" },
      { icon: "calendar", text: "Surgery scheduled 12 May 2026" },
      { icon: "shield", text: "Verified by clinical partner" }
    ],
    story: "Yasmin, an 8-year-old displaced from Khartoum, requires pediatric cardiac surgery to repair an atrial septal defect (ASD). Through Kushian™'s Healthcare pool, six diaspora supporters across the GCC and Europe pledged toward the $8,400 surgical cost at Cleopatra Hospital — coordinated by a Sharia-compliant Takaful pool with clinical attestation and 48-hour review SLA.",
    campaign: { amount: "$4,200", goal: "$8,400 GOAL · 50%", progress: 50, supporters: 6, timeline: "48 hours", partner: "Cleopatra" },
    verification: { status: "Fully verified", text: "Cardiac assessment and clinical case attested by Cleopatra Hospital. Takaful pool reviewed 3 May 2026." },
    docs: [
      { name: "Cardiac assessment", sub: "Cleopatra Hospital · Verified" },
      { name: "Surgical consultation report", sub: "Dr Hassan Karim, Pediatric cardiologist" },
      { name: "Displacement certificate", sub: "UNHCR · Issued Mar 2026" },
      { name: "Family health insurance", sub: "Takaful pool coverage · Active" },
      { name: "Parental consent form", sub: "Surgery authorization · Notarized" },
      { name: "Post-operative care plan", sub: "12-week rehabilitation protocol" }
    ],
    timeline: [
      { when: "Mar 2026", title: "Cardiac condition identified", desc: "Routine screening at Cleopatra Hospital identified pediatric ASD (atrial septal defect).", state: "done" },
      { when: "Apr 2026", title: "Onboarded to Healthcare pool", desc: "Verified through clinical partner. Surgical consultation completed.", state: "done" },
      { when: "May 2026", title: "Surgery scheduled", desc: "Surgical date set for 12 May 2026. Pledge campaign opened for $8,400.", state: "current" },
      { when: "May 2026", title: "48-hour milestone alert", desc: "$4,200 pledged of $8,400. Final push for pre-operative funds.", state: "current" },
      { when: "Jun 2026", title: "Post-operative monitoring", desc: "6-week clinic visits and rehabilitation milestones tracked.", state: "future" },
      { when: "Sept 2026", title: "Health recovery review", desc: "Cardiologist attestation and outcome assessment.", state: "future" }
    ],
    supporters: [
      { initials: "SM", name: "Dr Sarah M.", loc: "Manchester, UK", amt: 1200 },
      { initials: "OI", name: "Prof. Osman I.", loc: "Jeddah, SA", amt: 1000 },
      { initials: "KA", name: "Khalid A.", loc: "Dubai, AE", amt: 800 },
      { initials: "HY", name: "Hassan Y.", loc: "Toronto, CA", amt: 600 },
      { initials: "FE", name: "Fatima E.", loc: "London, UK", amt: 600 }
    ],
    similarCases: [
      { id: "Healthcare", name: "Browse all healthcare cases", href: "/supporter/healthcare" },
      { id: "K-3275",    name: "Amira A. — Displaced nurse", href: "/supporter/women" },
      { id: "Takaful",   name: "View Takaful coverage options", href: "/supporter/healthcare" }
    ],
    sidePanel: {
      eyebrow: "Partner of record",
      title: "Cleopatra Hospital",
      text: "Cairo, Egypt · Tier-I clinical partner · 38 verified cases attested 2025.",
      cta: "Partner profile"
    },
    background: [
      "Yasmin is an 8-year-old who was identified during routine health screening to have a moderate atrial septal defect (ASD) — a congenital heart condition that allows blood to flow abnormally between heart chambers. Her family was displaced from Khartoum in March 2026.",
      "Without surgical intervention, the condition will worsen and limit her physical activity and quality of life. The surgical window is narrow; delaying repair increases both clinical and financial risk."
    ],
    supportRequested: "The Kushian™ Healthcare pool funds the complete surgical package: cardiac surgeon fees ($3,200), anesthesia and operating theatre ($2,400), post-operative monitoring ($1,800), and 12-week rehabilitation ($1,000) at Cleopatra Hospital — a Tier-I clinical partner with 38 verified cases in 2025."
  }
};

export default function SupporterCaseDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState("story");
  const caseData = CASES[id];

  if (!caseData) {
    return (
      <>
        <Nav side="supporter" depth={2} />
        <div className="container" style={{padding: "80px 32px", textAlign: "center"}}>
          <h1>Case not found</h1>
          <p>The case "{id}" does not exist.</p>
          <Link to="/supporter" className="btn btn-primary">Back to Dashboard</Link>
        </div>
        <Footer depth={2} />
      </>
    );
  }

  const c = caseData;
  const isComplete = c.campaign.status === "COMPLETE";

  return (
    <>
      <Nav side="supporter" depth={2} />

      <div className="container bp-back">
        <Link to="/supporter" style={{display:"flex",alignItems:"center",gap:6}}><Icon name="arrow-left" size={14}/> Back to dashboard</Link>
        <span style={{color:"var(--line)"}}>·</span>
        <span style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,letterSpacing:".08em"}}>CASE {c.caseId}</span>
      </div>

      <section className="bp-hero">
        <div className="container">
          <div className="bp-hero-grid">
            <Reveal><div className="bp-photo" style={{background:`url(../../images/${id === 'afaf' ? 'sme-hero' : id === 'awad' ? 'case-family' : id === 'halima' ? 'case-workforce' : id === 'ibrahim' ? 'education-cpd' : id === 'maryam' ? 'maryam-school' : 'case-healthcare'}.jpg) center/cover`}}>
              <div className="photo-meta"><span>{c.photoMeta}</span><span>4 : 5</span></div>
            </div></Reveal>
            <Reveal delay={120}>
              <div className="eyebrow">{c.eyebrow}</div>
              <h1 className="bp-name">{c.name}<br/><em style={{fontStyle:"italic",color:"var(--green)"}}>{c.subtitle}</em></h1>
              <div className="bp-meta">
                {c.meta.map((m, i) => (
                  <span key={i}><Icon name={m.icon} size={14}/> {m.text}</span>
                ))}
              </div>
              <p className="bp-story">{c.story}</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("To support this case, create a support case → case-creation.html")}>Pledge support <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("Message beneficiary — coming next")}>Send a message</button>
                <button className="btn btn-text" onClick={() => showToast("Share case — coming next")}>Share case <Icon name="external" size={14}/></button>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="panel">
                <div className="panel-eyebrow">{isComplete ? "Campaign status" : "Active campaign"}</div>
                <div className="num-big">{c.campaign.amount}</div>
                <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"var(--muted)",letterSpacing:".06em",marginTop:6,marginBottom:14}}>OF {c.campaign.goal}</div>
                <div className="progress"><div className="progress-fill" style={{width:`${c.campaign.progress}%`}}></div></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:18,paddingTop:18,borderTop:"1px dashed var(--line)"}}>
                  <span style={{color:"var(--muted)"}}>{c.campaign.supporters !== undefined ? "Supporters" : "Financiers"}</span>
                  <strong>{c.campaign.supporters !== undefined ? c.campaign.supporters : c.campaign.financiers}</strong>
                </div>
                {c.campaign.jobs !== undefined && (
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                    <span style={{color:"var(--muted)"}}>Jobs created</span>
                    <strong>{c.campaign.jobs}</strong>
                  </div>
                )}
                {c.campaign.coverage !== undefined && (
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                    <span style={{color:"var(--muted)"}}>Coverage</span>
                    <strong>{c.campaign.coverage}</strong>
                  </div>
                )}
                {c.campaign.structure !== undefined && (
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                    <span style={{color:"var(--muted)"}}>Structure</span>
                    <strong>{c.campaign.structure}</strong>
                  </div>
                )}
                {c.campaign.program !== undefined && (
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                    <span style={{color:"var(--muted)"}}>Program</span>
                    <strong>{c.campaign.program}</strong>
                  </div>
                )}
                {c.campaign.mentor !== undefined && (
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                    <span style={{color:"var(--muted)"}}>Mentor</span>
                    <strong>{c.campaign.mentor}</strong>
                  </div>
                )}
                {c.campaign.placed !== undefined && (
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                    <span style={{color:"var(--muted)"}}>Graduates placed</span>
                    <strong>{c.campaign.placed}</strong>
                  </div>
                )}
                {c.campaign.status !== undefined && (
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                    <span style={{color:"var(--muted)"}}>Status</span>
                    <strong>{c.campaign.status}</strong>
                  </div>
                )}
                {c.campaign.timeline !== undefined && (
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                    <span style={{color:"var(--muted)"}}>Timeline</span>
                    <strong>{c.campaign.timeline}</strong>
                  </div>
                )}
                {c.campaign.partner !== undefined && (
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                    <span style={{color:"var(--muted)"}}>Partner</span>
                    <strong>{c.campaign.partner}</strong>
                  </div>
                )}
              </div>
              <div className="panel verification">
                <div className="panel-eyebrow">{isComplete ? "Completion status" : "Verification status"}</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}><Icon name="check" size={18}/> <strong>{c.verification.status}</strong></div>
                <p>{c.verification.text}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="bp-tabs">
          {["story","documents","timeline","supporters"].map(t => (
            <button key={t} className={`bp-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="bp-body">
          <div>
            {tab === "story" && <Reveal>
              <div className="bp-section">
                <h3>Background</h3>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>{c.background[0]}</p>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>{c.background[1]}</p>
              </div>
              <div className="bp-section">
                <h3>Support requested</h3>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>{c.supportRequested}</p>
              </div>
            </Reveal>}
            {tab === "documents" && <Reveal>
              <div className="bp-section">
                <h3>Document checklist · {c.docs.length} of {c.docs.length} verified</h3>
                <div className="doc-list">
                  {c.docs.map((d, i) => (
                    <div key={i} className="doc">
                      <div className="doc-icon"><Icon name="doc" size={18}/></div>
                      <div>
                        <div className="name">{d.name}</div>
                        <div className="sub">{d.sub}</div>
                      </div>
                      <div className="check"><Icon name="check" size={18}/></div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>}
            {tab === "timeline" && <Reveal>
              <div className="bp-section">
                <h3>Support journey</h3>
                <div className="timeline">
                  {c.timeline.map((t, i) => (
                    <div key={i} className={`tl-item ${t.state}`}>
                      <div className="tl-when">{t.when}</div>
                      <div className="tl-title">{t.title}</div>
                      <div className="tl-desc">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>}
            {tab === "supporters" && <Reveal>
              <div className="bp-section">
                <h3>{c.supporters.length} diaspora supporters</h3>
                <div className="supporter-grid">
                  {c.supporters.map((s, i) => (
                    <div key={i} className="supporter">
                      <div className="ava">{s.initials}</div>
                      <div>
                        <div className="nm">{s.name}</div>
                        <div className="sub">{s.loc}</div>
                      </div>
                      <div className="amt">${s.amt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>}
          </div>
          <aside>
            <div className="panel">
              <div className="panel-eyebrow">{c.sidePanel.eyebrow}</div>
              <h4>{c.sidePanel.title}</h4>
              <p style={{fontSize:13,lineHeight:1.6,color:"var(--ink-soft)",margin:"6px 0 12px"}}>{c.sidePanel.text}</p>
              <button className="btn btn-soft sm" onClick={() => showToast(`${c.sidePanel.cta} — coming next`)}>{c.sidePanel.cta} <Icon name="arrow-up-right" size={14}/></button>
            </div>
            <div className="panel">
              <div className="panel-eyebrow">Similar cases</div>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2901</span><span>Mariam K. · Maternal care · Kampala</span></a>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2944</span><span>Ahmed S. · Pediatric oncology · Doha</span></a>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2812</span><span>Awad M. · Chronic care · Wad Madani</span></a>
            </div>
          </aside>
        </div>
      </div>

      <section className="section-block" style={{background:"var(--cream-2)",borderTop:"1px solid var(--line)"}}>
        <div className="container">
          <Reveal>
            <div className="section-num">§ Similar Cases</div>
            <h3 style={{fontSize:20,fontWeight:400,marginBottom:24}}>Other cases you might support</h3>
            <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
              {c.similarCases.map((s,i) => (
                <Link key={i} to={s.href} className="similar-case-link">
                  <span className="similar-case-id">{s.id}</span>
                  <span className="similar-case-name">{s.name} <Icon name="arrow" size={14}/></span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer depth={2} />
      <DemoTag/>
    </>
  );
}
