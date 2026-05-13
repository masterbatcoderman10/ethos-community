import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

function HomePage() {
  return <div>Home</div>
}

function RolePage() {
  return <div>Role</div>
}

function CreatePage() {
  return <div>Create</div>
}

function ShowcasePage() {
  return <div>Showcase</div>
}

function SupporterPage() {
  return <div>Supporter</div>
}

function BeneficiaryPage() {
  return <div>Beneficiary</div>
}

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
          <Route path="/" element={<HomePage />} />
          <Route path="/role" element={<RolePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/showcase" element={<ShowcasePage />} />
          <Route path="/supporter" element={<SupporterPage />} />
          <Route path="/beneficiary" element={<BeneficiaryPage />} />
        </Routes>
      </main>
    </div>
  )
}
