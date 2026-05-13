export const SUPPORTERS = [
  {
    id: 'sarah',
    name: 'Dr Sarah Mahmoud',
    role: 'supporter',
    title: 'Consultant Cardiologist · Manchester, UK',
    initials: 'SM',
    greeting: 'Welcome back, Dr Sarah.',
    side: 'supporter'
  },
  {
    id: 'osman',
    name: 'Prof. Osman Idris',
    role: 'finance',
    title: 'Professor of Finance · KAUST, Saudi Arabia',
    initials: 'OI',
    greeting: 'Welcome back, Professor Osman.',
    side: 'supporter'
  },
  {
    id: 'khalid',
    name: 'Khalid Abdelrahman',
    role: 'development',
    title: 'Family Office Principal · Dubai, UAE',
    initials: 'KA',
    greeting: 'Welcome back, Khalid.',
    side: 'supporter'
  },
  {
    id: 'hassan',
    name: 'Hassan Yousif',
    role: 'mentor',
    title: 'Software Engineer · Toronto, Canada',
    initials: 'HY',
    greeting: 'Welcome back, Hassan.',
    side: 'supporter'
  }
]

export const RECEIVERS = [
  {
    id: 'halima',
    name: 'Halima M.',
    role: 'beneficiary',
    title: 'Finance returnship · Doha, QA',
    initials: 'HM',
    side: 'beneficiary'
  },
  {
    id: 'awad',
    name: 'Awad Family',
    role: 'beneficiary',
    title: '5 dependents · Kampala, UG',
    initials: 'AF',
    side: 'beneficiary'
  },
  {
    id: 'afaf',
    name: 'Dr Afaf O.',
    role: 'sme',
    title: 'Dental clinic · Sharjah, AE',
    initials: 'AO',
    side: 'beneficiary'
  },
  {
    id: 'maryam',
    name: 'Maryam A.',
    role: 'beneficiary',
    title: 'Year 9 student · Cairo, EG',
    initials: 'MA',
    side: 'beneficiary'
  },
  {
    id: 'yasmin',
    name: 'Yasmin H.',
    role: 'beneficiary',
    title: 'Cardiac patient · Khartoum, SD',
    initials: 'YH',
    side: 'beneficiary'
  }
]

export const USERS = [...SUPPORTERS, ...RECEIVERS]

export const getUserById = (id) => USERS.find(u => u.id === id) || null

export const CASES = [
  {
    id: 'K-2384',
    name: 'Maryam A.',
    desc: 'Year 9 student, displaced from Omdurman',
    vertical: 'Education',
    verticalKey: 'education',
    category: 'family',
    location: 'Cairo, EG',
    since: 'Sept 2025',
    raised: 3840,
    target: 4200,
    progress: 91,
    status: 'verified',
    urgency: null,
    img: '../images/maryam-school.jpg',
    ownerUserId: 'maryam',
    supporterUserIds: ['sarah', 'osman', 'khalid'],
    documents: [
      { id: 'd1', name: 'School enrolment letter', status: 'verified', date: 'Oct 2025' },
      { id: 'd2', name: 'Displacement certificate', status: 'verified', date: 'Sept 2025' }
    ],
    messages: [
      { id: 'm1', from: 'sarah', text: 'Term 2 attendance confirmed — 100% present.', date: '2h ago' },
      { id: 'm2', from: 'maryam', text: 'Thank you, Dr Sarah. My grades are improving.', date: '1d ago' }
    ],
    milestones: [
      { id: 'ms1', label: 'School enrolment verified', status: 'complete', date: 'Sept 2025' },
      { id: 'ms2', label: 'Term 1 funded', status: 'complete', date: 'Dec 2025' },
      { id: 'ms3', label: 'Term 2 tuition disbursement', status: 'complete', date: 'May 2026' },
      { id: 'ms4', label: 'Term 3 funding target', status: 'active', date: null }
    ]
  },
  {
    id: 'K-1908',
    name: 'Awad Family',
    desc: '5 dependents, father seeking work',
    vertical: 'Family Support',
    verticalKey: 'family',
    category: 'family',
    location: 'Kampala, UG',
    since: 'Jul 2025',
    raised: 6240,
    target: 9600,
    progress: 65,
    status: 'verified',
    urgency: null,
    img: '../images/case-family.jpg',
    ownerUserId: 'awad',
    supporterUserIds: ['khalid', 'hassan'],
    documents: [
      { id: 'd3', name: 'Household registration', status: 'verified', date: 'Jul 2025' },
      { id: 'd4', name: 'Monthly stipend receipts', status: 'verified', date: 'Apr 2026' }
    ],
    messages: [
      { id: 'm3', from: 'khalid', text: 'May stipend confirmed. How is the job search going?', date: '3d ago' },
      { id: 'm4', from: 'awad', text: 'Had two interviews this week. Very hopeful.', date: '2d ago' }
    ],
    milestones: [
      { id: 'ms5', label: 'Family verification complete', status: 'complete', date: 'Jul 2025' },
      { id: 'ms6', label: 'Monthly stipends Q3-Q4 2025', status: 'complete', date: 'Dec 2025' },
      { id: 'ms7', label: 'Job placement support', status: 'active', date: null }
    ]
  },
  {
    id: 'K-3014',
    name: 'Dr Afaf O.',
    desc: 'Dental clinic relocation advisory',
    vertical: 'SME Recovery',
    verticalKey: 'sme',
    category: 'sme',
    location: 'Sharjah, AE',
    since: 'Jan 2026',
    raised: 12400,
    target: 18000,
    progress: 69,
    status: 'verified',
    urgency: null,
    img: '../images/sme-hero.jpg',
    ownerUserId: 'afaf',
    supporterUserIds: ['osman', 'khalid'],
    documents: [
      { id: 'd5', name: 'Business licence transfer', status: 'verified', date: 'Feb 2026' },
      { id: 'd6', name: 'Equipment financing agreement', status: 'verified', date: 'Mar 2026' }
    ],
    messages: [
      { id: 'm5', from: 'osman', text: 'Lease signed. Clinic fit-out begins 15 May.', date: '2d ago' },
      { id: 'm6', from: 'afaf', text: 'Equipment financing tranche 2 received. On track.', date: '1d ago' }
    ],
    milestones: [
      { id: 'ms8', label: 'Business diagnostics', status: 'complete', date: 'Jan 2026' },
      { id: 'ms9', label: 'Lease signed', status: 'complete', date: 'May 2026' },
      { id: 'ms10', label: 'Clinic fit-out', status: 'active', date: null },
      { id: 'ms11', label: 'Grand opening', status: 'idle', date: null }
    ]
  },
  {
    id: 'K-2756',
    name: 'Yasmin H.',
    desc: 'Hospitalization · cardiac surgery',
    vertical: 'Healthcare',
    verticalKey: 'health',
    category: 'health',
    location: 'Khartoum, SD',
    since: 'Mar 2026',
    raised: 4200,
    target: 8400,
    progress: 50,
    status: 'urgent',
    urgency: '48h remaining',
    img: '../images/case-healthcare.jpg',
    ownerUserId: 'yasmin',
    supporterUserIds: ['sarah', 'hassan'],
    documents: [
      { id: 'd7', name: 'Hospital assessment report', status: 'verified', date: 'Mar 2026' },
      { id: 'd8', name: 'Surgery quotation', status: 'verified', date: 'Apr 2026' }
    ],
    messages: [
      { id: 'm7', from: 'sarah', text: 'Surgery scheduled 12 May. Surgery deposit confirmed.', date: '5d ago' },
      { id: 'm8', from: 'yasmin', text: 'All pre-op tests completed. Ready for surgery.', date: '1d ago' }
    ],
    milestones: [
      { id: 'ms12', label: 'Initial assessment', status: 'complete', date: 'Mar 2026' },
      { id: 'ms13', label: 'Surgery deposit', status: 'complete', date: 'May 2026' },
      { id: 'ms14', label: 'Cardiac surgery', status: 'active', date: null },
      { id: 'ms15', label: 'Post-op recovery', status: 'idle', date: null }
    ]
  },
  {
    id: 'K-2102',
    name: 'Ibrahim Engineering Cohort',
    desc: '12 graduate engineers · CPD return-track',
    vertical: 'Education',
    verticalKey: 'education',
    category: 'education',
    location: 'Riyadh, SA',
    since: 'Aug 2025',
    raised: 14400,
    target: 14400,
    progress: 100,
    status: 'complete',
    urgency: null,
    img: '../images/education-cpd.jpg',
    ownerUserId: null,
    supporterUserIds: ['osman', 'khalid', 'sarah', 'hassan'],
    documents: [
      { id: 'd9', name: 'CPD completion certificates', status: 'verified', date: 'May 2026' },
      { id: 'd10', name: 'Placement confirmation letters', status: 'verified', date: 'May 2026' }
    ],
    messages: [
      { id: 'm9', from: 'osman', text: 'All 12 placed. Graduation ceremony was incredible.', date: '1w ago' }
    ],
    milestones: [
      { id: 'ms16', label: 'Cohort selected', status: 'complete', date: 'Aug 2025' },
      { id: 'ms17', label: 'CPD modules 1-6', status: 'complete', date: 'Apr 2026' },
      { id: 'ms18', label: 'Industry placements', status: 'complete', date: 'May 2026' },
      { id: 'ms19', label: 'Graduation ceremony', status: 'complete', date: 'May 2026' }
    ]
  },
  {
    id: 'K-2890',
    name: 'Halima M.',
    desc: "Women's returnship programme · finance",
    vertical: 'Women & Workforce',
    verticalKey: 'women',
    category: 'women',
    location: 'Doha, QA',
    since: 'Feb 2026',
    raised: 1800,
    target: 3600,
    progress: 50,
    status: 'pending',
    urgency: null,
    img: '../images/case-workforce.jpg',
    ownerUserId: 'halima',
    supporterUserIds: ['sarah', 'osman'],
    documents: [
      { id: 'd11', name: 'Acceptance letter — AAOIFI Pathway', status: 'pending', date: 'Feb 2026' },
      { id: 'd12', name: 'Government ID', status: 'verified', date: 'Feb 2026' }
    ],
    messages: [
      { id: 'm10', from: 'osman', text: 'CPD module 3 fees disbursed. How is module 4 going?', date: '3d ago' },
      { id: 'm11', from: 'halima', text: 'Module 4 starts next week. Feeling confident.', date: '2d ago' }
    ],
    milestones: [
      { id: 'ms20', label: 'Application verified', status: 'complete', date: 'Feb 2026' },
      { id: 'ms21', label: 'Modules 1-3 funded', status: 'complete', date: 'May 2026' },
      { id: 'ms22', label: 'Modules 4-6', status: 'active', date: null },
      { id: 'ms23', label: 'Returnship placement', status: 'idle', date: null }
    ]
  },
  {
    id: 'K-3120',
    name: "Halima's Children Education",
    desc: "Children's education support · Cairo",
    vertical: 'Education',
    verticalKey: 'education',
    category: 'family',
    location: 'Cairo, EG',
    since: 'Apr 2026',
    raised: 2400,
    target: 3600,
    progress: 67,
    status: 'pending',
    urgency: null,
    img: '../images/case-family.jpg',
    ownerUserId: 'halima',
    supporterUserIds: ['hassan'],
    documents: [
      { id: 'd13', name: 'Children school records', status: 'pending', date: 'Apr 2026' }
    ],
    messages: [
      { id: 'm12', from: 'hassan', text: 'Happy to support. Can you upload the school invoices?', date: '5d ago' },
      { id: 'm13', from: 'halima', text: 'Uploading them today.', date: '4d ago' }
    ],
    milestones: [
      { id: 'ms24', label: 'Case opened', status: 'complete', date: 'Apr 2026' },
      { id: 'ms25', label: 'Document verification', status: 'active', date: null },
      { id: 'ms26', label: 'First disbursement', status: 'idle', date: null }
    ]
  }
]

export const getCaseById = (id) => CASES.find(c => c.id === id) || null

export const LEDGER = [
  { dt: '08 May', id: 'K-2384', desc: 'Maryam A. · Term 2 tuition disbursement', partner: 'Al-Manarah School', amount: 480, status: 'settled' },
  { dt: '07 May', id: 'K-2812', desc: 'Awad M. · Quarterly chronic-care payout', partner: 'Cleopatra Hospital', amount: 540, status: 'settled' },
  { dt: '06 May', id: 'K-1908', desc: 'Awad family · May household stipend', partner: 'Kampala Diaspora Org', amount: 800, status: 'settled' },
  { dt: '06 May', id: 'K-3014', desc: 'Dr Afaf O. · Equipment financing tranche 2', partner: 'Sharjah CDR', amount: 4800, status: 'settled' },
  { dt: '05 May', id: 'K-2756', desc: 'Yasmin H. · Surgery deposit', partner: 'Cleopatra Hospital', amount: 2100, status: 'pending' },
  { dt: '04 May', id: 'K-2102', desc: 'Ibrahim cohort · Final placement bonus', partner: 'Riyadh Eng. Institute', amount: 6000, status: 'settled' },
  { dt: '03 May', id: 'K-2890', desc: 'Halima M. · CPD module 3 fees', partner: 'AAOIFI Pathway', amount: 360, status: 'settled' }
]

export const VERT_BREAKDOWN = [
  { lab: 'Education & Mentorship', val: 142, of: 500, color: '' },
  { lab: 'Family Support', val: 96, of: 500, color: '' },
  { lab: 'SME Recovery', val: 38, of: 500, color: 'gold' },
  { lab: 'Healthcare & Takaful', val: 124, of: 500, color: '' },
  { lab: 'Women & Workforce', val: 68, of: 500, color: '' },
  { lab: 'Hospitalization', val: 18, of: 500, color: 'red' }
]

export const VERTICALS = [
  { category: 'education', count: 142, label: 'Education' },
  { category: 'health', count: 184, label: 'Healthcare' },
  { category: 'family', count: 97, label: 'Family Support' },
  { category: 'women', count: 312, label: 'Women' },
  { category: 'sme', count: 63, label: 'SME Recovery' },
  { category: 'legal', count: 44, label: 'Legal' }
]

export const SUPPORTER_ACTIVITY = {
  sarah: [
    { when: '2h', text: 'Cairo school partner posted Term 2 attendance attestation for Maryam A. · 100% present' },
    { when: '1d', text: 'Cleopatra Hospital confirmed Yasmin H. completed pre-operative review' },
    { when: '3d', text: 'Manchester physicians circle added two clinical reviewers to healthcare cases' },
    { when: '1w', text: 'Ibrahim cohort graduation ceremony · 12 of 12 placed' }
  ],
  osman: [
    { when: '4h', text: 'Dr Afaf O. equipment financing note moved to partner review' },
    { when: '2d', text: 'Sharjah clinic lease signed · fit-out begins 15 May 2026' },
    { when: '3d', text: 'AAOIFI Pathway confirmed Halima M. module 3 fee receipt' },
    { when: '1w', text: 'Ibrahim cohort final placement bonus settled through Riyadh partner' }
  ],
  khalid: [
    { when: '6h', text: 'Awad family May household stipend confirmed by Kampala partner' },
    { when: '1d', text: 'Family office pledge pool added Dr Afaf O. as SME recovery priority' },
    { when: '4d', text: 'Maryam A. term support reached 91% of annual target' },
    { when: '1w', text: 'Ibrahim cohort final placement report published' }
  ],
  hassan: [
    { when: '3h', text: "Halima's children education case received updated school invoice request" },
    { when: '1d', text: 'Yasmin H. care team posted post-surgery monitoring checklist' },
    { when: '3d', text: 'Awad family employment support moved to interview stage' },
    { when: '1w', text: 'Engineering cohort mentorship survey closed with 12 responses' }
  ],
  default: [
    { when: '2h', text: 'A partner update was added to one of your active cases' },
    { when: '1d', text: 'A verification milestone was completed' },
    { when: '3d', text: 'A new supporter joined a shared pledge circle' }
  ]
}

export const BENEFICIARY_ACTIVITY = [
  { icon: 'heart', who: 'Rasha S.', text: 'pledged $400 to K-2890', when: '2h ago' },
  { icon: 'shield', who: 'Fatima O.', text: 'verified your government ID', when: 'Yesterday' },
  { icon: 'heart', who: 'Khalid M.', text: 'pledged $250 to K-2890', when: 'Yesterday' },
  { icon: 'doc', who: 'System', text: 'opened K-3120 for review', when: '5 days ago' },
  { icon: 'mail', who: 'Fatima O.', text: 'requested an education invoice', when: '1 week ago' }
]
