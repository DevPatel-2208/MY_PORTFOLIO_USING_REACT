import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import { site } from '../../data/site'
import useScrollLock from '../../hooks/useScrollLock'

const EASE = [0.22, 1, 0.36, 1]
const TOTAL_MS = 2600

const BOOT_STEPS = [
  { at: 0, msg: 'Initializing portfolio…', short: 'Boot' },
  { at: 25, msg: 'Loading components…', short: 'UI' },
  { at: 50, msg: 'Preparing interface…', short: 'Polish' },
  { at: 75, msg: 'Almost ready…', short: 'Ready' },
]

const STACK = ['React 19', 'Vite', 'Tailwind v4', 'Framer Motion']

function useBootProgress() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf = 0
    let start = 0
    const tick = (now) => {
      if (!start) start = now
      const t = Math.min(1, (now - start) / TOTAL_MS)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setDone(true)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return { progress, done }
}

export default function Preloader({ onDone }) {
  const reduce = useReducedMotion()
  const { progress, done } = useBootProgress()
  const [visible, setVisible] = useState(true)
  const [imgOk, setImgOk] = useState(true)

  useScrollLock(true)

  useEffect(() => {
    if (!done) return undefined
    const hold = reduce ? 150 : 700
    const t1 = window.setTimeout(() => setVisible(false), hold)
    const t2 = window.setTimeout(() => onDone?.(), hold + (reduce ? 100 : 750))
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [done, onDone, reduce])

  const currentStep = useMemo(
    () => [...BOOT_STEPS].reverse().find((s) => progress >= s.at) ?? BOOT_STEPS[0],
    [progress],
  )

  const letters = useMemo(() => site.name.split(''), [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pl-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { y: '-100%', transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }
          }
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="pl-bg" aria-hidden="true">
            <span className="pl-blob pl-blob--a" />
            <span className="pl-blob pl-blob--b" />
            <div className="pl-grid" />
            <div className="pl-vignette" />
          </div>

          <motion.div
            className="pl-card"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, transition: { duration: 0.35, ease: EASE } }
            }
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Avatar with revolving orbit dot */}
            <div className="pl-avatar-ring" aria-hidden="true">
              {!reduce && (
                <span className="pl-orbit">
                  <span className="pl-orbit-dot" />
                </span>
              )}
              {imgOk ? (
                <img
                  className="pl-avatar"
                  src={site.profileImage}
                  alt=""
                  width="96"
                  height="96"
                  loading="eager"
                  decoding="async"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <span className="pl-avatar-fallback">{site.initials}</span>
              )}
            </div>

            {/* Name — letter-by-letter rise */}
            <h1 className="pl-name" aria-label={site.name}>
              {letters.map((ch, i) =>
                reduce ? (
                  <span key={i} className="pl-letter" aria-hidden="true">
                    {ch === ' ' ? ' ' : ch}
                  </span>
                ) : (
                  <motion.span
                    key={i}
                    className="pl-letter"
                    aria-hidden="true"
                    initial={{ opacity: 0, y: 14, rotateX: -60 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.15 + i * 0.035, duration: 0.5, ease: EASE }}
                  >
                    {ch === ' ' ? ' ' : ch}
                  </motion.span>
                ),
              )}
            </h1>
            <p className="pl-role">{site.role}</p>

            {/* Boot step checklist */}
            <div className="pl-steps" aria-hidden="true">
              {BOOT_STEPS.map((s) => {
                const lit = progress >= s.at
                return (
                  <span key={s.short} className={`pl-step${lit ? ' is-done' : ''}`}>
                    <FiCheck className="pl-step-tick" aria-hidden="true" />
                    {s.short}
                  </span>
                )
              })}
            </div>

            <div className="pl-status" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={currentStep.msg}
                  className="pl-message"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <span className="pl-status-dot" aria-hidden="true" />
                  {currentStep.msg}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="pl-progress">
              <div
                className="pl-track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label="Loading progress"
              >
                <div className="pl-fill" style={{ width: `${progress}%` }}>
                  {!reduce && <span className="pl-shine" aria-hidden="true" />}
                </div>
                <span
                  className="pl-tip"
                  style={{ left: `${progress}%` }}
                  aria-hidden="true"
                />
              </div>
              <div className="pl-meta">
                <span className="pl-label">Loading</span>
                <span className="pl-pct">{progress}%</span>
              </div>
            </div>

            {/* Stack strip */}
            <div className="pl-stack" aria-hidden="true">
              {STACK.map((s) => (
                <span key={s} className="pl-stack-item">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
