import { useEffect, useState } from 'react'
import { FiGithub, FiLinkedin, FiArrowUpRight, FiZoomIn } from 'react-icons/fi'
import { SiHackerrank, SiUnstop } from 'react-icons/si'
import { FaFire } from 'react-icons/fa'
import Reveal from '../ui/Reveal'
import Badge from '../ui/Badge'
import TiltCard from '../ui/TiltCard'
import Modal from '../ui/Modal'
import { profiles } from '../../data/profiles'

const GH_USER = 'DevPatel-2208'
const GH_CACHE_KEY = 'gh-profile-cache'
const GH_CACHE_TTL = 6 * 3600 * 1000 // 6 hours (public API allows 60 req/hr)

const iconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  hackerrank: SiHackerrank,
  unstop: SiUnstop,
}

function useGitHubStats(enabled) {
  const [state, setState] = useState({ status: 'loading', stats: null })

  useEffect(() => {
    if (!enabled) return undefined
    let live = true
    try {
      const cached = JSON.parse(localStorage.getItem(GH_CACHE_KEY))
      if (cached && Date.now() - cached.t < GH_CACHE_TTL && cached.d) {
        setState({ status: 'live', stats: cached.d })
        return undefined
      }
    } catch {
      /* ignore bad cache */
    }
    fetch(`https://api.github.com/users/${GH_USER}`)
      .then((r) => {
        if (!r.ok) throw new Error('github api')
        return r.json()
      })
      .then((d) => {
        if (!live) return
        const stats = {
          repos: d.public_repos,
          followers: d.followers,
          following: d.following,
        }
        setState({ status: 'live', stats })
        try {
          localStorage.setItem(GH_CACHE_KEY, JSON.stringify({ t: Date.now(), d: stats }))
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        if (live) setState({ status: 'off', stats: null })
      })
    return () => {
      live = false
    }
  }, [enabled])

  return state
}

function GitHubStats({ status, stats }) {
  if (status === 'live' && stats) {
    const items = [
      { value: stats.repos, label: 'Repos' },
      { value: stats.followers, label: 'Followers' },
      { value: stats.following, label: 'Following' },
    ]
    return (
      <div className="grid grid-cols-3 gap-2">
        {items.map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-primary/8 border border-primary/20 px-2 py-2 text-center"
          >
            <div className="text-base font-black text-content tabular-nums">{s.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (status === 'loading') {
    return (
      <div className="grid grid-cols-3 gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-border px-2 py-2 text-center">
            <div className="h-5 rounded-md bg-surface-2 animate-pulse" />
            <div className="h-3 mt-1.5 rounded-md bg-surface-2 animate-pulse" />
          </div>
        ))}
      </div>
    )
  }
  return null
}

function ProfileCard({ profile, gh, onProof }) {
  const Icon = iconMap[profile.icon] || FiGithub
  return (
    <TiltCard className="h-full" max={14} scale={1.04} glareRadius="1rem">
      <article className="group relative h-full rounded-2xl glass p-5 flex flex-col transition-[box-shadow,border-color,background-color] duration-500 hover:border-primary/40 hover:shadow-glow hover:bg-surface-2/70 [transform-style:preserve-3d]">
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{ boxShadow: 'inset 0 0 0 1px var(--c-primary), 0 0 28px -10px var(--c-primary)' }}
          aria-hidden="true"
        />

        <div className="relative flex items-start justify-between gap-3 mb-4">
          <span
            className="w-12 h-12 rounded-2xl grid place-items-center text-white shrink-0 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6 [transform:translateZ(0)] group-hover:[transform:translateZ(44px)]"
            style={{ background: `linear-gradient(135deg, ${profile.color}, ${profile.color}99)`, boxShadow: `0 10px 28px -10px ${profile.color}` }}
          >
            <Icon className="w-6 h-6" aria-hidden="true" />
          </span>
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${profile.platform} profile of ${profile.handle}`}
            className="w-9 h-9 rounded-full grid place-items-center text-muted border border-border hover:text-white hover:bg-gradient-accent hover:border-transparent transition-all duration-300 shrink-0 [transform:translateZ(0)] group-hover:[transform:translateZ(48px)]"
          >
            <FiArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <h4 className="relative text-base font-bold text-content transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(30px)]">
          {profile.platform}
        </h4>
        <p className="relative text-xs font-mono text-primary mt-0.5 truncate transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(26px)]">
          {profile.handle}
        </p>
        <p className="relative text-[13px] text-muted leading-relaxed mt-2.5 flex-1 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(18px)]">
          {profile.blurb}
        </p>

        <div className="relative mt-4 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(34px)]">
          {profile.live ? (
            <GitHubStats status={gh.status} stats={gh.stats} />
          ) : profile.stats && profile.stats.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {profile.stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-primary/8 border border-primary/20 px-2 py-2 text-center">
                  <div className="text-base font-black text-content tabular-nums">{s.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {profile.chips.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Daily practice streak — flame badge + optional screenshot proof */}
        {profile.streak != null && (
          <div className="relative mt-3 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(40px)]">
            <div className="streak-badge">
              <span className="streak-flame" aria-hidden="true">
                <FaFire className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="streak-count tabular-nums">{profile.streak}-day streak</span>
              <span className="streak-pulse" aria-hidden="true" />
            </div>
          </div>
        )}
        {profile.proof && (
          <button
            type="button"
            onClick={() => onProof(profile)}
            aria-label={`View ${profile.platform} streak screenshot proof`}
            className="group/proof relative mt-3 block w-full rounded-xl overflow-hidden border border-border focus-visible:outline-2 focus-visible:outline-primary transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(30px)]"
          >
            <img
              src={profile.proof}
              alt={`${profile.platform} practice streak screenshot`}
              className="w-full h-20 object-cover object-top transition-transform duration-500 group-hover/proof:scale-105"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
            <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-black/55 backdrop-blur-sm border border-white/25">
              <FiZoomIn className="w-3 h-3" aria-hidden="true" />
              Proof
            </span>
          </button>
        )}
      </article>
    </TiltCard>
  )
}

export default function CodingProfiles() {
  const hasLive = profiles.some((p) => p.live)
  const gh = useGitHubStats(hasLive)
  const [proof, setProof] = useState(null)

  return (
    <div className="mt-14">
      <Reveal className="mb-6">
        <div className="flex items-center gap-3">
          <Badge tone="accent">Proof of Skill</Badge>
          <h4 className="text-lg font-bold text-content">Coding Profiles</h4>
          {gh.status === 'live' && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              GitHub live
            </span>
          )}
        </div>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {profiles.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05} amount={0.2} className="h-full">
            <ProfileCard profile={p} gh={gh} onProof={setProof} />
          </Reveal>
        ))}
      </div>

      {/* Streak screenshot lightbox */}
      <Modal open={!!proof} onClose={() => setProof(null)} title={proof ? `${proof.platform} streak proof` : ''} maxWidth="max-w-2xl">
        {proof && (
          <div className="p-4 sm:p-6">
            <img
              src={proof.proof}
              alt={`${proof.platform} practice streak screenshot`}
              className="w-full rounded-2xl border border-border"
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold text-content">
                {proof.streak != null ? `${proof.streak}-day practice streak` : 'Practice streak'} — verify live:
              </p>
              <a
                href={proof.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline underline-offset-4"
              >
                Open {proof.platform}
                <FiArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
