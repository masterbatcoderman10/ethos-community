import { Routes, Route, Link, useLocation } from 'react-router-dom'

import Landing from './pages/Landing.jsx'
import RoleChooser from './pages/RoleChooser.jsx'
import CaseCreation from './pages/CaseCreation.jsx'
import Showcase from './pages/Showcase.jsx'

import SupporterDashboard from './pages/SupporterDashboard.jsx'
import SupporterImpact from './pages/SupporterImpact.jsx'
import SupporterEducation from './pages/SupporterEducation.jsx'
import SupporterHealthcare from './pages/SupporterHealthcare.jsx'
import SupporterLegalServices from './pages/SupporterLegalServices.jsx'
import SupporterWomenEmpowerment from './pages/SupporterWomenEmpowerment.jsx'
import SupporterSmeAdvisory from './pages/SupporterSmeAdvisory.jsx'
import SupporterProviderMarketplace from './pages/SupporterProviderMarketplace.jsx'
import SupporterProductTraders from './pages/SupporterProductTraders.jsx'
import SupporterCaseDetail from './pages/SupporterCaseDetail.jsx'

import BeneficiaryDashboard from './pages/BeneficiaryDashboard.jsx'
import BeneficiaryCaseDetail from './pages/BeneficiaryCaseDetail.jsx'
import BeneficiaryMyCases from './pages/BeneficiaryMyCases.jsx'
import BeneficiaryDocuments from './pages/BeneficiaryDocuments.jsx'
import BeneficiaryMessages from './pages/BeneficiaryMessages.jsx'

function Nav() {
  const location = useLocation()
  const links = [
    { path: '/', label: 'Home' },
    { path: '/role', label: 'Role' },
    { path: '/create', label: 'Create' },
    { path: '/showcase', label: 'Showcase' },
    { path: '/supporter', label: 'Supporter' },
    { path: '/beneficiary', label: 'Beneficiary' },
  ]

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-inner">
          <div className="nav-brand">
            <Link to="/" className="logo">
              <span className="logo-mark"></span>
              <span className="logo-text">Ethos Community</span>
            </Link>
          </div>
          <div className="nav-links">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="nav-cta">
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>React SPA</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/role" element={<RoleChooser />} />
          <Route path="/create" element={<CaseCreation />} />
          <Route path="/showcase" element={<Showcase />} />

          <Route path="/supporter" element={<SupporterDashboard />} />
          <Route path="/supporter/impact" element={<SupporterImpact />} />
          <Route path="/supporter/education" element={<SupporterEducation />} />
          <Route path="/supporter/healthcare" element={<SupporterHealthcare />} />
          <Route path="/supporter/legal" element={<SupporterLegalServices />} />
          <Route path="/supporter/women" element={<SupporterWomenEmpowerment />} />
          <Route path="/supporter/sme" element={<SupporterSmeAdvisory />} />
          <Route path="/supporter/marketplace" element={<SupporterProviderMarketplace />} />
          <Route path="/supporter/traders" element={<SupporterProductTraders />} />
          <Route path="/supporter/cases/:id" element={<SupporterCaseDetail />} />

          <Route path="/beneficiary" element={<BeneficiaryDashboard />} />
          <Route path="/beneficiary/case/:id" element={<BeneficiaryCaseDetail />} />
          <Route path="/beneficiary/cases" element={<BeneficiaryMyCases />} />
          <Route path="/beneficiary/documents" element={<BeneficiaryDocuments />} />
          <Route path="/beneficiary/messages" element={<BeneficiaryMessages />} />
        </Routes>
      </main>
    </div>
  )
}
