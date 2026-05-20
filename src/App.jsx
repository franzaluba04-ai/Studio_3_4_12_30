import { useEffect, useMemo, useState } from 'react'
import franzMerrick from './portfolios/franz-merrick/profile'
import ivanJethro from './portfolios/ivan-jethro/profile'
import jamesIvan from './portfolios/james-ivan/profile'
import josephIvan from './portfolios/joseph-ivan/profile'
import JosephIvanPortfolio from './portfolios/joseph-ivan/FullPortfolio'
import './App.css'

const teamMembers = [franzMerrick, josephIvan, ivanJethro, jamesIvan]
const internalPortfolioMembers = teamMembers.filter((member) => !member.portfolioUrl)

const works = [
  {
    title: 'Class Portfolio Hub',
    type: 'Combined Work',
    owner: 'Team Project',
    members: ['franz-merrick', 'joseph-ivan', 'ivan-jethro', 'james-ivan'],
    description:
      'A shared dashboard that collects each classmate portfolio, common projects, and similar work categories in one place.',
    tags: ['React', 'Dashboard', 'Portfolio'],
  },
  {
    title: 'Campus Event Website',
    type: 'Combined Work',
    owner: 'Team Project',
    members: ['franz-merrick', 'joseph-ivan', 'ivan-jethro'],
    description:
      'A responsive event page with schedule sections, speaker details, registration prompts, and mobile-friendly navigation.',
    tags: ['Website', 'Responsive', 'Events'],
  },
  {
    title: 'Personal Brand Cards',
    type: 'Similar Work',
    owner: 'Design Series',
    members: ['joseph-ivan', 'ivan-jethro', 'james-ivan'],
    description:
      'A set of matching portfolio cards that use each member profile, skills, and project highlights.',
    tags: ['Branding', 'Cards', 'Identity'],
  },
  {
    title: 'Mini Productivity App',
    type: 'Similar Work',
    owner: 'Prototype Series',
    members: ['franz-merrick', 'james-ivan'],
    description:
      'A simple task interface showing filters, status labels, and clean controls for organizing school work.',
    tags: ['JavaScript', 'Prototype', 'App'],
  },
  {
    title: 'Research Presentation Pack',
    type: 'Similar Work',
    owner: 'Class Output',
    members: ['joseph-ivan', 'ivan-jethro'],
    description:
      'Slide layouts and written summaries for presenting research findings with charts and concise explanations.',
    tags: ['Slides', 'Research', 'Storytelling'],
  },
]

function App() {
  const [activeMemberId, setActiveMemberId] = useState(getInitialPage)

  useEffect(() => {
    const handleHashChange = () => {
      setActiveMemberId(getPageFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const activeMember = useMemo(
    () => internalPortfolioMembers.find((member) => member.id === activeMemberId),
    [activeMemberId],
  )

  const filteredWorks = activeMember
    ? works.filter((work) => work.members.includes(activeMember.id))
    : works

  return (
    <main className="app-shell">
      {activeMemberId !== 'joseph-ivan' && (
        <nav className="navbar" aria-label="Portfolio navigation">
          <a
            href="#dashboard"
            className={`brand ${activeMemberId === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveMemberId('dashboard')}
          >
            Studio 4-ITS
          </a>

          <div className="nav-links">
            {teamMembers.map((member) => (
              <a
                key={member.id}
                href={
                  member.portfolioUrl
                    ? getExternalPortfolioHref(member.portfolioUrl)
                    : `#${member.id}`
                }
                className={activeMemberId === member.id ? 'active' : ''}
                onClick={(event) => {
                  if (member.portfolioUrl) {
                    event.preventDefault()
                    window.location.href = getExternalPortfolioHref(member.portfolioUrl)
                    return
                  }

                  setActiveMemberId(member.id)
                }}
              >
                {member.name}
              </a>
            ))}
          </div>
        </nav>
      )}

      {activeMember ? (
        activeMember.id === 'joseph-ivan' ? (
          <JosephIvanPortfolio />
        ) : (
          <MemberPortfolio member={activeMember} works={filteredWorks} />
        )
      ) : (
        <Dashboard works={filteredWorks} />
      )}
    </main>
  )
}

function getInitialPage() {
  return getPageFromHash()
}

function getPageFromHash() {
  const page = window.location.hash.replace('#', '')
  const hasMember = internalPortfolioMembers.some((member) => member.id === page)

  return page === 'dashboard' || hasMember ? page : 'dashboard'
}

function getExternalPortfolioHref(portfolioUrl) {
  if (/^https?:\/\//i.test(portfolioUrl)) {
    return portfolioUrl
  }
  const currentPath = window.location.pathname
  const appBasePath = currentPath.includes('/aluba-portfolio/')
    ? currentPath.split('/aluba-portfolio/')[0]
    : currentPath.replace(/\/[^/]*$/, '')
  const normalizedBase = appBasePath.endsWith('/') ? appBasePath : `${appBasePath}/`

  return `${window.location.origin}${normalizedBase}${portfolioUrl}`
}

function getAppAssetHref(assetPath) {
  if (/^https?:\/\//i.test(assetPath) || assetPath.startsWith('/')) {
    return assetPath
  }

  const currentPath = window.location.pathname
  const appBasePath = currentPath.includes('/aluba-portfolio/')
    ? currentPath.split('/aluba-portfolio/')[0]
    : currentPath.replace(/\/[^/]*$/, '')
  const normalizedBase = appBasePath.endsWith('/') ? appBasePath : `${appBasePath}/`

  return `${normalizedBase}${assetPath}`
}

function Dashboard({ works }) {
  const combinedCount = works.filter((work) => work.type === 'Combined Work').length
  const similarCount = works.filter((work) => work.type === 'Similar Work').length

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Class Portfolio Dashboard</p>
          <h1>One place for our team projects and personal portfolios.</h1>
          <p>
            Browse combined works, similar class outputs, and each classmate&apos;s
            individual portfolio from Studio 4-ITS.
          </p>
        </div>

        <div className="team-panel" aria-label="Team members">
          {teamMembers.map((member) => (
            <article key={member.id} className="member-tile">
              <Avatar member={member} className="avatar" />
              <div>
                <h2>{member.name}</h2>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-grid" aria-label="Portfolio summary">
        <Stat label="Team Members" value={teamMembers.length} />
        <Stat label="Combined Works" value={combinedCount} />
        <Stat label="Similar Works" value={similarCount} />
        <Stat label="Skill Areas" value="12+" />
      </section>

      <WorkGallery works={works} title="Shared Dashboard" />
    </>
  )
}

function Avatar({ member, className }) {
  if (member.image) {
    return (
      <img
        className={className}
        src={getAppAssetHref(member.image)}
        alt={`${member.name} profile`}
        loading="lazy"
      />
    )
  }

  return (
    <div className={className} style={{ backgroundColor: member.color }}>
      {member.name.slice(0, 1)}
    </div>
  )
}

function MemberPortfolio({ member, works }) {
  return (
    <>
      <section className="profile-hero">
        <Avatar member={member} className="profile-mark" />
        <div>
          <p className="eyebrow">Individual Portfolio</p>
          <h1>{member.name}</h1>
          <p className="role-line">{member.role}</p>
          <p>{member.bio}</p>
        </div>
      </section>

      <section className="profile-details">
        <article>
          <h2>Focus</h2>
          <p>{member.focus}</p>
        </article>
        <article>
          <h2>Skills</h2>
          <div className="tag-row">
            {member.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </article>
      </section>

      <WorkGallery works={works} title={`${member.name}'s Works`} />
    </>
  )
}

function WorkGallery({ works, title }) {
  return (
    <section className="work-section">
      <div className="section-heading">
        <p className="eyebrow">Projects</p>
        <h2>{title}</h2>
      </div>

      <div className="work-grid">
        {works.map((work) => (
          <article key={work.title} className="work-card">
            <div className="card-topline">
              <span>{work.type}</span>
              <span>{work.owner}</span>
            </div>
            <h3>{work.title}</h3>
            <p>{work.description}</p>
            <div className="tag-row">
              {work.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <article className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  )
}

export default App
