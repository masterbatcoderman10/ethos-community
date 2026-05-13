import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import FormField from '../components/FormField.jsx'
import FormInput from '../components/FormInput.jsx'
import FormSelect from '../components/FormSelect.jsx'
import FormRadioGroup from '../components/FormRadioGroup.jsx'
import { showToast } from '../components/Toast.jsx'
import { SUPPORTERS, RECEIVERS } from '../data/mockDb.js'
import { setActiveUser, addLocalUser, getLocalUsers } from '../data/mockSession.js'
import './RoleChooser.css'

const LOCATIONS = [
  { value: 'sudan', label: 'Sudan' },
  { value: 'egypt', label: 'Egypt' },
  { value: 'uae', label: 'United Arab Emirates' },
  { value: 'ksa', label: 'Saudi Arabia' },
  { value: 'qatar', label: 'Qatar' },
  { value: 'uganda', label: 'Uganda' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'other', label: 'Other' }
]

const VERTICALS = [
  { value: 'health', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'legal', label: 'Legal' },
  { value: 'women', label: 'Women Empowerment' },
  { value: 'family', label: 'Family Support' },
  { value: 'sme', label: 'SME Recovery' }
]

const SUPPORTER_ROLES = [
  { value: 'supporter', label: 'Diaspora Supporter' },
  { value: 'mentor', label: 'Mentor / Service Provider' },
  { value: 'ambassador', label: 'Community Ambassador' },
  { value: 'finance', label: 'Finance / Takaful Partner' },
  { value: 'development', label: 'Development Partner' }
]

const RECEIVER_TYPES = [
  { value: 'family', label: 'Beneficiary / Family Representative' },
  { value: 'student', label: 'Student' },
  { value: 'patient', label: 'Patient' },
  { value: 'professional', label: 'Displaced Professional' },
  { value: 'sme', label: 'SME / Business' }
]

const NEED_PATHWAYS = [
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'legal', label: 'Legal' },
  { value: 'women-empowerment', label: 'Women Empowerment' },
  { value: 'sme-recovery', label: 'SME Recovery' },
  { value: 'family-support', label: 'Family Support' }
]

const INITIAL_SUPPORTER = { name: '', supporterRole: '', location: '', verticals: [] }
const INITIAL_RECEIVER = { name: '', receiverType: '', location: '', pathway: '' }

const extractInitials = (name) => {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

const LoginCard = ({ user, onSelect }) => (
  <button type="button" className="rc-login-card" onClick={() => onSelect(user)}>
    <span className="rc-login-card-avatar">{user.initials}</span>
    <span className="rc-login-card-body">
      <span className="rc-login-card-name">{user.name}</span>
      <span className="rc-login-card-title">{user.title}</span>
    </span>
    <span className="rc-login-card-arrow">
      <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_forward</span>
    </span>
  </button>
)

const AccessPanel = ({ onPick }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const canSubmit = credentials.username.trim() && credentials.password.trim()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return
    showToast('Credentials accepted')
    onPick('login')
  }

  return (
    <div className="rc-auth">
      <form className="rc-auth-panel" onSubmit={handleSubmit}>
        <header className="rc-auth-header">
          <h3>Log in</h3>
          <p>Enter your account details to continue to the correct workspace.</p>
        </header>

        <div className="rc-register-form">
          <FormField label="Username or email" htmlFor="login-username" required>
            <FormInput
              id="login-username"
              placeholder="name@example.com"
              value={credentials.username}
              onChange={event => setCredentials(prev => ({ ...prev, username: event.target.value }))}
            />
          </FormField>
          <FormField label="Password" htmlFor="login-password" required>
            <FormInput
              id="login-password"
              type="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={event => setCredentials(prev => ({ ...prev, password: event.target.value }))}
            />
          </FormField>
        </div>

        <button type="submit" className="btn btn-primary rc-register-submit" disabled={!canSubmit}>
          <span>Continue</span>
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_forward</span>
        </button>
      </form>

      <div className="rc-auth-secondary">
        <button type="button" className="btn btn-soft" onClick={() => onPick('login')}>
          Sign in with saved profile
        </button>
        <button type="button" className="btn btn-text" onClick={() => onPick('register')}>
          Create a new account <Icon name="arrow" size={14} />
        </button>
      </div>
    </div>
  )
}

const LoginRoleChoice = ({ onPick }) => (
  <div className="rc-register-pick">
    <div className="rc-mode-grid">
      <button type="button" className="rc-mode-card" onClick={() => onPick('supporter')}>
        <span className="rc-mode-card-icon">
          <Icon name="heart" size={28} />
        </span>
        <span className="rc-mode-card-body">
          <span className="rc-mode-card-title">Supporter</span>
          <span className="rc-mode-card-desc">Access pledge activity, verified cases, and impact records.</span>
        </span>
      </button>
      <button type="button" className="rc-mode-card" onClick={() => onPick('beneficiary')}>
        <span className="rc-mode-card-icon">
          <Icon name="user" size={28} />
        </span>
        <span className="rc-mode-card-body">
          <span className="rc-mode-card-title">Receiver</span>
          <span className="rc-mode-card-desc">Access case status, documents, messages, and pathway guidance.</span>
        </span>
      </button>
    </div>
  </div>
)

const ProfileList = ({ side, onBack }) => {
  const navigate = useNavigate()
  const localReceivers = getLocalUsers().filter(u => u.side === 'beneficiary')
  const localSupporters = getLocalUsers().filter(u => u.side === 'supporter')
  const profiles = side === 'supporter'
    ? [...SUPPORTERS, ...localSupporters]
    : [...RECEIVERS, ...localReceivers]
  const heading = side === 'supporter' ? 'Previously signed-in supporter profiles' : 'Previously signed-in receiver profiles'
  const emptyCopy = side === 'supporter'
    ? 'No supporter profiles are available yet. Create an account to begin.'
    : 'No receiver profiles are available yet. Create an account to begin.'

  const handleSelect = (user) => {
    setActiveUser(user)
    showToast(`Signed in as ${user.name}`)
    const target = user.side === 'supporter' ? '/supporter' : '/beneficiary'
    setTimeout(() => navigate(target), 400)
  }

  return (
    <div className="rc-login">
      <button type="button" className="rc-back-btn" onClick={onBack}>
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_left</span>
        <span>Back</span>
      </button>

      <section className="rc-login-section">
        <h3 className="rc-login-heading">{heading}</h3>
        <div className="rc-login-grid">
          {profiles.map(u => <LoginCard key={u.id} user={u} onSelect={handleSelect} />)}
        </div>
        {profiles.length === 0 && <p className="rc-login-empty">{emptyCopy}</p>}
      </section>
    </div>
  )
}

const Login = ({ onBack }) => {
  const [side, setSide] = useState(null)

  if (side) return <ProfileList side={side} onBack={() => setSide(null)} />

  return (
    <div className="rc-login">
      <button type="button" className="rc-back-btn" onClick={onBack}>
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_left</span>
        <span>Back</span>
      </button>
      <LoginRoleChoice onPick={setSide} />
    </div>
  )
}

const SupporterRegister = ({ onBack }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_SUPPORTER)

  const toggleVertical = (val) => {
    setForm(prev => ({
      ...prev,
      verticals: prev.verticals.includes(val)
        ? prev.verticals.filter(v => v !== val)
        : [...prev.verticals, val]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.supporterRole || !form.location) return
    const id = `local-${Date.now()}`
    const user = {
      id,
      name: form.name.trim(),
      role: form.supporterRole,
      side: 'supporter',
      title: `${SUPPORTER_ROLES.find(r => r.value === form.supporterRole)?.label || 'Supporter'} · ${LOCATIONS.find(l => l.value === form.location)?.label || form.location}`,
      initials: extractInitials(form.name),
      verticals: form.verticals
    }
    addLocalUser(user)
    setActiveUser(user)
    showToast(`Welcome, ${user.name}`)
    setTimeout(() => navigate('/supporter'), 400)
  }

  const valid = form.name.trim() && form.supporterRole && form.location

  return (
    <form className="rc-register" onSubmit={handleSubmit}>
      <button type="button" className="rc-back-btn" onClick={onBack}>
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_left</span>
        <span>Back</span>
      </button>

      <header className="rc-register-header">
        <h3>Register as a supporter</h3>
        <p>Create your supporter profile to access verified cases and pledge records.</p>
      </header>

      <div className="rc-register-form">
        <FormField label="Supporter role" required>
          <FormRadioGroup
            name="supporter-role"
            options={SUPPORTER_ROLES}
            value={form.supporterRole}
            onChange={e => setForm(prev => ({ ...prev, supporterRole: e.target.value }))}
          />
        </FormField>

        <FormField label="Your name" htmlFor="reg-name" required>
          <FormInput id="reg-name" placeholder="e.g. Fatima Abdelrahman" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} />
        </FormField>

        <FormField label="Country / corridor" htmlFor="reg-location" required>
          <FormSelect id="reg-location" options={LOCATIONS} value={form.location} onChange={e => setForm(prev => ({ ...prev, location: e.target.value }))} placeholder="Select country" />
        </FormField>

        <FormField label="Interest verticals" hint="Select all that apply.">
          <div className="rc-checkbox-group">
            {VERTICALS.map(v => (
              <label key={v.value} className={`rc-checkbox ${form.verticals.includes(v.value) ? 'checked' : ''}`}>
                <input type="checkbox" checked={form.verticals.includes(v.value)} onChange={() => toggleVertical(v.value)} />
                <span>{v.label}</span>
              </label>
            ))}
          </div>
        </FormField>
      </div>

      <button type="submit" className="btn btn-primary rc-register-submit" disabled={!valid}>
        <span>Create profile</span>
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_forward</span>
      </button>
    </form>
  )
}

const ReceiverRegister = ({ onBack }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_RECEIVER)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.receiverType || !form.location) return
    const id = `local-${Date.now()}`
    const user = {
      id,
      name: form.name.trim(),
      role: form.receiverType === 'sme' ? 'sme' : 'beneficiary',
      side: 'beneficiary',
      title: `${RECEIVER_TYPES.find(t => t.value === form.receiverType)?.label || form.receiverType} · ${LOCATIONS.find(l => l.value === form.location)?.label || form.location}`,
      initials: extractInitials(form.name),
      receiverType: form.receiverType,
      pathway: form.pathway
    }
    addLocalUser(user)
    setActiveUser(user)
    showToast(`Welcome, ${user.name}`)
    const target = form.pathway ? `/create?mode=receiver` : '/beneficiary'
    setTimeout(() => navigate(target), 400)
  }

  const valid = form.name.trim() && form.receiverType && form.location

  return (
    <form className="rc-register" onSubmit={handleSubmit}>
      <button type="button" className="rc-back-btn" onClick={onBack}>
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_left</span>
        <span>Back</span>
      </button>

      <header className="rc-register-header">
        <h3>Register as a receiver</h3>
        <p>Create your receiver profile to begin a verified case intake.</p>
      </header>

      <div className="rc-register-form">
        <FormField label="Your name" htmlFor="reg-r-name" required>
          <FormInput id="reg-r-name" placeholder="e.g. Amira Hassan" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} />
        </FormField>

        <FormField label="Receiver role" required>
          <FormRadioGroup name="receiver-type" options={RECEIVER_TYPES} value={form.receiverType} onChange={e => setForm(prev => ({ ...prev, receiverType: e.target.value }))} />
        </FormField>

        <FormField label="Location" htmlFor="reg-r-location" required>
          <FormSelect id="reg-r-location" options={LOCATIONS} value={form.location} onChange={e => setForm(prev => ({ ...prev, location: e.target.value }))} placeholder="Select country" />
        </FormField>

        <FormField label="Primary need pathway" htmlFor="reg-r-pathway" hint="Optional — routes you to the matching intake form.">
          <FormSelect id="reg-r-pathway" options={NEED_PATHWAYS} value={form.pathway} onChange={e => setForm(prev => ({ ...prev, pathway: e.target.value }))} placeholder="Select pathway" />
        </FormField>
      </div>

      <button type="submit" className="btn btn-primary rc-register-submit" disabled={!valid}>
        <span>Create profile</span>
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_forward</span>
      </button>
    </form>
  )
}

const Register = ({ onBack }) => {
  const [side, setSide] = useState(null)

  if (side === 'supporter') return <SupporterRegister onBack={() => setSide(null)} />
  if (side === 'beneficiary') return <ReceiverRegister onBack={() => setSide(null)} />

  return (
    <div className="rc-register-pick">
      <button type="button" className="rc-back-btn" onClick={onBack}>
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_left</span>
        <span>Back</span>
      </button>

      <div className="rc-mode-grid">
        <button type="button" className="rc-mode-card" onClick={() => setSide('supporter')}>
          <span className="rc-mode-card-icon">
            <Icon name="heart" size={28} />
          </span>
          <span className="rc-mode-card-body">
            <span className="rc-mode-card-title">Register as supporter</span>
            <span className="rc-mode-card-desc">Diaspora supporter, mentor, ambassador, finance partner, or development partner.</span>
          </span>
        </button>
        <button type="button" className="rc-mode-card" onClick={() => setSide('beneficiary')}>
          <span className="rc-mode-card-icon">
            <Icon name="user" size={28} />
          </span>
          <span className="rc-mode-card-body">
            <span className="rc-mode-card-title">Register as receiver</span>
            <span className="rc-mode-card-desc">Beneficiary, family representative, student, patient, professional, or SME owner.</span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default function RoleChooser() {
  const [mode, setMode] = useState(null)

  const heroTitle = !mode
    ? 'Log in to Kushian™.'
    : mode === 'login'
      ? 'Choose account role.'
      : 'Create your account.'

  const heroLede = !mode
    ? 'Use your account credentials, sign in with a saved profile, or create a new account.'
    : mode === 'login'
      ? 'Select whether you are entering as a supporter or receiver, then choose the relevant profile.'
      : 'Share a few details so the platform can route you to the right workspace.'

  const handleBack = () => setMode(null)

  return (
    <>
      <Nav side="neutral" depth={0} active="role" />
      <main className="role-chooser">
        <div className="container">
          <div className="role-chooser-grid">
            <Reveal as="header" className="role-chooser-hero">
              <span className="eyebrow">Registration · Step 01</span>
              <h1>{heroTitle}</h1>
              <p className="role-chooser-lede">{heroLede}</p>
            </Reveal>
            <section className="role-chooser-list-wrap" aria-label="Profile selection">
              {!mode && <AccessPanel onPick={setMode} />}
              {mode === 'login' && <Login onBack={handleBack} />}
              {mode === 'register' && <Register onBack={handleBack} />}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
