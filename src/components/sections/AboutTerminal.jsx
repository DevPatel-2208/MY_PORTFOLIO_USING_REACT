import { useEffect, useRef, useState } from 'react'

const COMMAND = 'npm run dev-patel'

const LINES = [
  { id: 'mern', text: 'MERN Stack \u00B7 MongoDB \u00B7 Express \u00B7 React \u00B7 Node.js' },
  { id: 'mca', text: 'MCA Student building AI-powered web apps' },
  { id: 'open', text: 'Open to internships & freelance work' },
]

// timing (ms) — tuned for premium but not sluggish feel
const TYPING_INTERVAL = 48
const PAUSE_AFTER_COMMAND = 520
const LINE_REVEAL_STAGGER = 560
const PAUSE_BEFORE_FINAL = 520

const PHASE_ORDER = ['idle', 'command', 'line1', 'line2', 'line3', 'final', 'complete']

function atOrAfter(current, target) {
  return PHASE_ORDER.indexOf(current) >= PHASE_ORDER.indexOf(target)
}

export default function AboutTerminal() {
  const rootRef = useRef(null)
  const timersRef = useRef([])

  const [started, setStarted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [phase, setPhase] = useState('idle')
  const [typedLen, setTypedLen] = useState(0)

  // detect prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(mql.matches)
    sync()
    // Safari < 14 uses addListener
    if (typeof mql.addEventListener === 'function') mql.addEventListener('change', sync)
    else mql.addListener(sync)
    return () => {
      if (typeof mql.removeEventListener === 'function') mql.removeEventListener('change', sync)
      else mql.removeListener(sync)
    }
  }, [])

  // Trigger exactly once when the terminal enters the viewport.
  // No scroll listener — single IntersectionObserver, disconnected after firing.
  useEffect(() => {
    if (started) return undefined
    const el = rootRef.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.28, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [started])

  // Deterministic sequence — single source of truth for all timers.
  // Every timer is tracked and cleared on unmount or re-run.
  useEffect(() => {
    if (!started) return undefined

    const timers = timersRef.current
    const clearAll = () => {
      timers.forEach((id) => clearTimeout(id))
      timers.length = 0
    }
    clearAll()

    if (reducedMotion) {
      // Respect reduced motion: show final stable terminal instantly, no typing.
      setTypedLen(COMMAND.length)
      setPhase('complete')
      return () => clearAll()
    }

    setTypedLen(0)
    setPhase('command')

    // Character-by-character command typing
    for (let i = 1; i <= COMMAND.length; i++) {
      timers.push(
        setTimeout(() => setTypedLen(i), i * TYPING_INTERVAL),
      )
    }

    const commandDoneAt = COMMAND.length * TYPING_INTERVAL
    timers.push(setTimeout(() => setPhase('line1'), commandDoneAt + PAUSE_AFTER_COMMAND))
    timers.push(setTimeout(() => setPhase('line2'), commandDoneAt + PAUSE_AFTER_COMMAND + LINE_REVEAL_STAGGER))
    timers.push(setTimeout(() => setPhase('line3'), commandDoneAt + PAUSE_AFTER_COMMAND + LINE_REVEAL_STAGGER * 2))
    timers.push(
      setTimeout(
        () => setPhase('final'),
        commandDoneAt + PAUSE_AFTER_COMMAND + LINE_REVEAL_STAGGER * 2 + PAUSE_BEFORE_FINAL,
      ),
    )
    timers.push(
      setTimeout(
        () => setPhase('complete'),
        commandDoneAt + PAUSE_AFTER_COMMAND + LINE_REVEAL_STAGGER * 2 + PAUSE_BEFORE_FINAL + 120,
      ),
    )

    return () => clearAll()
  }, [started, reducedMotion])

  const isCommandTyping = phase === 'command' && typedLen < COMMAND.length
  // During the short pause after the command finishes but before line1,
  // keep a static cursor at the end of the completed command — no blink churn.
  const isCommandPause = phase === 'command' && typedLen === COMMAND.length

  return (
    <div ref={rootRef} className="about-terminal-card" role="figure" aria-label="Developer terminal summary">
      <div className="at-head">
        <span className="at-dot at-dot--red" aria-hidden="true" />
        <span className="at-dot at-dot--amber" aria-hidden="true" />
        <span className="at-dot at-dot--green" aria-hidden="true" />
        <span className="at-title">dev-patel — zsh</span>
        <span className="at-live" aria-hidden="true">
          <span className="at-live-dot" />
          LIVE
        </span>
      </div>

      <div className="at-body">
        {/* Single command row — stable position, never shifts */}
        <p className="at-line at-command" aria-label="npm run dev-patel">
          <span className="at-prompt" aria-hidden="true">
            $
          </span>
          <span className="at-command-text">
            {COMMAND.slice(0, typedLen)}
            {(isCommandTyping || isCommandPause) && (
              <span className={isCommandTyping ? 'at-typing-cursor' : 'at-typing-cursor at-typing-cursor--idle'} aria-hidden="true" />
            )}
          </span>
        </p>

        {/* Output rows — reserved from first paint, revealed deterministically */}
        {LINES.map((line, idx) => {
          const visible = atOrAfter(phase, `line${idx + 1}`)
          return (
            <p
              key={line.id}
              className={`at-line at-output${visible ? ' is-visible' : ''}`}
              aria-hidden={!visible ? true : undefined}
            >
              <span className="at-check" aria-hidden="true">
                &#10003;
              </span>
              <span className="at-output-text">{line.text}</span>
            </p>
          )
        })}

        {/* Final prompt — single cursor in the entire terminal. Appears only after all output. */}
        <p className={`at-line at-final${atOrAfter(phase, 'final') ? ' is-visible' : ''}`} aria-hidden={!atOrAfter(phase, 'final')}>
          <span className="at-prompt" aria-hidden="true">
            $
          </span>
          <span className="at-cursor" aria-hidden="true" />
        </p>
      </div>
    </div>
  )
}
