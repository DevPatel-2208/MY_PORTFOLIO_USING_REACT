import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiBookOpen,
  FiZap,
  FiTool,
  FiFolder,
  FiAward,
  FiMail,
  FiSun,
  FiMoon,
  FiDownload,
  FiLink,
  FiArrowUp,
  FiArrowUpRight,
  FiPlay,
  FiGithub,
  FiLinkedin,
  FiSearch,
  FiCheck,
  FiClock,
} from 'react-icons/fi'
import { FaTrophy } from 'react-icons/fa'
import { navLinks, site } from '../../data/site'
import useTheme from '../../hooks/useTheme'
import useScrollLock, { useEscapeKey } from '../../hooks/useScrollLock'
import { popCenter } from '../../utils/confetti'

const RECENT_KEY = 'portfolio-palette-recent'
const PLAY_INTRO_EVENT = 'portfolio:play-intro'

const navIcons = {
  home: FiHome,
  about: FiUser,
  experience: FiBriefcase,
  education: FiBookOpen,
  skills: FiZap,
  services: FiTool,
  projects: FiFolder,
  certificates: FiAward,
  achievements: FaTrophy,
  contact: FiMail,
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
      return true
    } catch {
      return false
    }
  }
}

function loadRecent() {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_KEY))
    return Array.isArray(raw) ? raw.filter((x) => typeof x === 'string').slice(0, 4) : []
  } catch {
    return []
  }
}

/* Subsequence fuzzy match with consecutive + word-start bonuses.
   Returns { score, indices } or null. */
function fuzzy(query, text) {
  const q = query.toLowerCase().trim()
  if (!q) return { score: 0, indices: [] }
  const t = text.toLowerCase()
  let qi = 0
  let score = 0
  let streak = 0
  let last = -2
  const indices = []
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) {
      indices.push(i)
      const wordStart = i === 0 || /[\s\-_#./]/.test(t[i - 1])
      score += 10 + (wordStart ? 8 : 0)
      if (i === last + 1) {
        streak += 1
        score += 5 + streak * 2
      } else {
        streak = 0
      }
      last = i
      qi += 1
    }
  }
  if (qi < q.length) return null
  score += Math.max(0, 24 - t.length)
  return { score, indices }
}

function Highlight({ text, indices }) {
  if (!indices || indices.length === 0) return text
  const set = new Set(indices)
  return text.split('').map((ch, i) =>
    set.has(i) ? (
      <mark key={i} className="cmdk-mark">
        {ch}
      </mark>
    ) : (
      <span key={i}>{ch}</span>
    ),
  )
}

function buildCommands({ isLight, toggleTheme }) {
  const go = (href) => () =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const navigate = navLinks.map((link) => ({
    id: `go-${link.href.slice(1)}`,
    group: 'Go to',
    label: link.label,
    hint: link.href,
    icon: navIcons[link.href.slice(1)] || FiHome,
    keywords: `${link.label} ${link.href} section page navigate scroll`,
    run: go(link.href),
  }))

  const actions = [
    {
      id: 'action-theme',
      group: 'Actions',
      label: isLight ? 'Switch to dark mode' : 'Switch to light mode',
      hint: 'Theme',
      icon: isLight ? FiMoon : FiSun,
      keywords: 'theme dark light mode toggle appearance color',
      run: () => toggleTheme(),
    },
    {
      id: 'action-resume',
      group: 'Actions',
      label: 'Download resume',
      hint: 'PDF',
      icon: FiDownload,
      keywords: 'resume cv download pdf hire',
      run: () => {
        popCenter()
        window.open(site.resume, '_blank', 'noopener')
      },
    },
    {
      id: 'copy-email',
      group: 'Actions',
      label: 'Copy email address',
      hint: site.email,
      icon: FiMail,
      keywords: 'copy email mail contact address',
      run: () => copyText(site.email),
    },
    {
      id: 'copy-link',
      group: 'Actions',
      label: 'Copy portfolio link',
      hint: 'URL',
      icon: FiLink,
      keywords: 'copy link url share portfolio website',
      run: () => copyText(site.url),
    },
    {
      id: 'action-video',
      group: 'Actions',
      label: 'Play intro video with sound',
      hint: 'About',
      icon: FiPlay,
      keywords: 'play video intro sound unmute watch',
      run: () => window.dispatchEvent(new CustomEvent(PLAY_INTRO_EVENT)),
    },
    {
      id: 'action-top',
      group: 'Actions',
      label: 'Back to top',
      hint: 'Home',
      icon: FiArrowUp,
      keywords: 'top back scroll start home',
      run: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
  ]

  const external = [
    {
      id: 'ext-github',
      group: 'External',
      label: 'Open GitHub profile',
      hint: 'github.com',
      icon: FiGithub,
      keywords: 'github profile code repos external',
      run: () => window.open(site.socials[0].url, '_blank', 'noopener'),
    },
    {
      id: 'ext-linkedin',
      group: 'External',
      label: 'Open LinkedIn profile',
      hint: 'linkedin.com',
      icon: FiLinkedin,
      keywords: 'linkedin profile connect external',
      run: () => window.open(site.socials[1].url, '_blank', 'noopener'),
    },
  ]

  return [...navigate, ...actions, ...external]
}

export default function CommandPalette({ open, onClose }) {
  const { theme, toggleTheme } = useTheme()
  const reduce = useReducedMotion()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [copiedId, setCopiedId] = useState(null)
  const [recent, setRecent] = useState(loadRecent)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const closeTimer = useRef(0)

  useScrollLock(open)
  useEscapeKey(onClose, open)

  /* Reset + autofocus on open; restore focus on close */
  useEffect(() => {
    if (!open) return undefined
    setQuery('')
    setActive(0)
    setCopiedId(null)
    const prev = document.activeElement
    const t = window.setTimeout(() => inputRef.current?.focus(), 60)
    return () => {
      window.clearTimeout(t)
      window.clearTimeout(closeTimer.current)
      if (prev && typeof prev.focus === 'function') prev.focus()
    }
  }, [open ])

  const commands = useMemo(
    () => buildCommands({ isLight: theme === 'light', toggleTheme }),
    [theme, toggleTheme],
  )

  const items = useMemo(() => {
    const byId = new Map(commands.map((c) => [c.id, c]))
    if (!query.trim()) {
      const recents = recent
        .map((id) => byId.get(id))
        .filter(Boolean)
        .map((c) => ({ ...c, group: 'Recent' }))
      const listed = new Set(recents.map((c) => c.id))
      return [...recents, ...commands.filter((c) => !listed.has(c.id))]
    }
    return commands
      .map((c) => {
        const m = fuzzy(query, `${c.label} ${c.keywords}`)
        if (!m) return null
        const hl = fuzzy(query, c.label)
        return { ...c, score: m.score, indices: hl ? hl.indices : [] }
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
  }, [commands, query, recent])

  useEffect(() => {
    setActive(0)
  }, [query ])

  const clamped = items.length === 0 ? 0 : Math.min(active, items.length - 1)

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' })
  }, [clamped ])

  const saveRecent = (id) => {
    setRecent((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, 4)
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }

  const runCommand = async (cmd) => {
    if (!cmd) return
    saveRecent(cmd.id)
    if (cmd.id.startsWith('copy-')) {
      const ok = await cmd.run()
      if (ok) {
        setCopiedId(cmd.id)
        window.clearTimeout(closeTimer.current)
        closeTimer.current = window.setTimeout(onClose, 650)
        return
      }
    } else {
      cmd.run()
    }
    onClose()
  }

  const onInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (items.length === 0 ? 0 : (a + 1) % items.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (items.length === 0 ? 0 : (a - 1 + items.length) % items.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      runCommand(items[clamped ])
    }
  }

  /* Simple Tab trap inside the dialog */
  const onDialogKeyDown = (e) => {
    if (e.key !== 'Tab') return
    const root = e.currentTarget
    const focusables = root.querySelectorAll(
      'input, button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    )
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  let lastGroup = null

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[1300]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="absolute inset-0 overflow-y-auto pointer-events-none">
            <div className="min-h-full flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh] pb-8">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                onKeyDown={onDialogKeyDown}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.98 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto w-full max-w-xl rounded-2xl glass-strong gradient-border-card shadow-[0_32px_80px_-24px_rgba(2,6,23,0.55)] overflow-hidden"
              >
                {/* Search row */}
                <div className="flex items-center gap-3 px-4 sm:px-5 border-b border-border">
                  <FiSearch className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onInputKeyDown}
                    type="text"
                    role="combobox"
                    aria-expanded="true"
                    aria-controls="cmdk-list"
                    aria-label="Search commands and sections"
                    placeholder="Type a command or search sections…"
                    autoComplete="off"
                    spellCheck={false}
                    className="flex-1 min-w-0 h-14 bg-transparent text-[15px] font-medium text-content placeholder:text-muted focus:outline-none"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      aria-label="Clear search"
                      className="text-xs font-bold text-muted hover:text-content transition-colors shrink-0"
                    >
                      Clear
                    </button>
                  )}
                  <span className="cmdk-kbd shrink-0" aria-hidden="true">
                    ESC
                  </span>
                </div>

                {/* Results */}
                <div
                  ref={listRef}
                  id="cmdk-list"
                  role="listbox"
                  aria-label="Commands"
                  className="max-h-[46vh] sm:max-h-[52vh] overflow-y-auto p-2"
                >
                  {items.length === 0 && (
                    <p className="px-3 py-8 text-center text-sm text-muted">
                      No results for <span className="font-bold text-content">“{query}”</span>
                    </p>
                  )}
                  {items.map((cmd, i) => {
                    const Icon = cmd.icon
                    const isActive = i === clamped
                    const header =
                      cmd.group !== lastGroup ? (
                        <p
                          key={`g-${cmd.group}`}
                          className="flex items-center gap-1.5 px-3 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted"
                          aria-hidden="true"
                        >
                          {cmd.group === 'Recent' && (
                            <FiClock className="w-3 h-3" aria-hidden="true" />
                          )}
                          {cmd.group}
                        </p>
                      ) : null
                    lastGroup = cmd.group
                    const copied = copiedId === cmd.id
                    return (
                      <div key={cmd.id}>
                        {header}
                        <button
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          data-active={isActive ? 'true' : undefined}
                          onMouseMove={() => setActive(i)}
                          onClick={() => runCommand(cmd)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary ${
                            isActive
                              ? 'bg-primary/12 text-content'
                              : 'text-muted hover:text-content hover:bg-surface-2/60'
                          }`}
                        >
                          <span
                            className={`w-8 h-8 shrink-0 rounded-lg grid place-items-center transition-colors ${
                              isActive ? 'bg-gradient-accent text-white shadow-glow' : 'bg-primary/10 text-primary'
                            }`}
                            aria-hidden="true"
                          >
                            {copied ? (
                              <FiCheck className="w-4 h-4" aria-hidden="true" />
                            ) : (
                              <Icon className="w-4 h-4" aria-hidden="true" />
                            )}
                          </span>
                          <span className="flex-1 min-w-0 truncate">
                            {copied ? 'Copied to clipboard' : <Highlight text={cmd.label} indices={cmd.indices} />}
                          </span>
                          {cmd.hint && !copied && (
                            <span className="hidden sm:block shrink-0 text-[11px] font-medium text-muted/80 truncate max-w-[12rem]">
                              {cmd.hint}
                            </span>
                          )}
                          {cmd.id.startsWith('ext-') && (
                            <FiArrowUpRight className="w-3.5 h-3.5 text-muted shrink-0" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    )
                  })}
                </div>

                {/* Footer hints */}
                <div className="hidden sm:flex items-center gap-4 px-5 py-2.5 border-t border-border text-[11px] font-semibold text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="cmdk-kbd">↑↓</span> navigate
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="cmdk-kbd">↵</span> select
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="cmdk-kbd">esc</span> close
                  </span>
                  <span className="ml-auto tabular-nums">
                    {items.length} command{items.length === 1 ? '' : 's'}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
