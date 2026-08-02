import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { site } from '../../data/site'
import useScrollLock from '../../hooks/useScrollLock'

const EASE = [0.16, 1, 0.3, 1]

const BOOT_STEPS = [
  { at: 0, msg: 'Initializing Portfolio…' },
  { at: 12, msg: 'Loading Components…' },
  { at: 28, msg: 'Preparing User Interface…' },
  { at: 46, msg: 'Connecting Services…' },
  { at: 66, msg: 'Optimizing Experience…' },
  { at: 86, msg: 'Almost Ready…' },
]

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 41 + 13) % 100}%`,
  top: `${(i * 29 + 7) % 100}%`,
  size: 1.5 + ((i * 5) % 3.5),
  delay: `${(i % 9) * 1.2}s`,
  duration: `${14 + ((i * 3) % 12)}s`,
  drift: `${((i % 5) - 2) * 46}px`,
  opacity: 0.15 + (i % 4) * 0.08,
}))

const TOTAL = 3400

function useBootProgress() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf
    let start = null
    const tick = (now) => {
      if (start === null) start = now
      const t = Math.min(1, (now - start) / TOTAL)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = Math.round(eased * 100)
      setProgress((prev) => {
        if (next > prev) return next
        return prev
      })
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
  const [imgLoaded, setImgLoaded] = useState(false)
  const rootRef = useRef(null)

  useScrollLock(true)

  const currentStep = useMemo(
    () => [...BOOT_STEPS].reverse().find((s) => progress >= s.at) ?? BOOT_STEPS[0],
    [progress],
  )

  const parallax = useMemo(
    () => [
      { factor: 16, layer: 'blobs' },
      { factor: 30, layer: 'mesh' },
      { factor: 44, layer: 'grid' },
      { factor: 10, layer: 'particles' },
    ],
    [],
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduce) return

    let raf = null
    let cx = 0.5
    let cy = 0.5
    let tx = 0.5
    let ty = 0.5

    const onMove = (e) => {
      tx = e.clientX / window.innerWidth
      ty = e.clientY / window.innerHeight
    }

    const loop = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      parallax.forEach(({ factor, layer }) => {
        const el = root.querySelector(`[data-plx="${layer}"]`)
        if (el) {
          el.style.transform = `translate3d(${(cx - 0.5) * factor}px, ${(cy - 0.5) * factor}px, 0)`
        }
      })
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [parallax, reduce])

  useEffect(() => {
    if (!done) return undefined
    const t1 = setTimeout(() => setVisible(false), 900)
    const t2 = setTimeout(onDone, 1400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [done, onDone])

  const cardExit = reduce
    ? { opacity: 0, y: -14, transition: { duration: 0.5, ease: 'easeInOut' } }
    : {
        opacity: 0,
        y: -18,
        scale: 0.96,
        filter: 'blur(10px)',
        transition: { duration: 0.7, ease: EASE },
      }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={rootRef}
          className="preloader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="preloader-bg" aria-hidden="true">
            <div className="preloader-plx preloader-blobs" data-plx="blobs">
              <span className="preloader-blob preloader-blob--a" />
              <span className="preloader-blob preloader-blob--b" />
              <span className="preloader-blob preloader-blob--c" />
            </div>

            <div className="preloader-plx preloader-mesh" data-plx="mesh" />

            <div className="preloader-plx preloader-grid" data-plx="grid" />

            <div className="preloader-plx preloader-particles" data-plx="particles">
              {PARTICLES.map((p) => (
                <span
                  key={p.id}
                  className="preloader-particle"
                  style={{
                    left: p.left,
                    top: p.top,
                    width: p.size,
                    height: p.size,
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                    ['--p-x']: p.drift,
                    ['--p-o']: p.opacity,
                  }}
                />
              ))}
            </div>

            <div className="preloader-vignette" />
          </div>

          <motion.div
            className="preloader-card"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={cardExit}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <div className="preloader-card-top" aria-hidden="true">
              <span className="preloader-chip">
                <span className="preloader-chip-dot" />
                Startup Sequence
              </span>
              <span className="preloader-ver">{`v2.0.0`}</span>
            </div>

            <div className="preloader-profile">
              <div className="preloader-avatar-ring" aria-hidden="true">
                <motion.img
                  className={`preloader-avatar${imgLoaded ? ' is-loaded' : ''}`}
                  src={site.profileImage}
                  alt="Dev Patel"
                  width="128"
                  height="128"
                  loading="eager"
                  decoding="async"
                  onLoad={() => setImgLoaded(true)}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
                />
              </div>

              <motion.h1
                className="preloader-name"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              >
                {site.name}
              </motion.h1>

              <motion.p
                className="preloader-role"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.62 }}
              >
                {site.role}
              </motion.p>
            </div>

            <motion.div
              className="preloader-status-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={currentStep.msg}
                  className="preloader-message"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <span className="preloader-status-dot" aria-hidden="true" />
                  {currentStep.msg}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="preloader-progress"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
            >
              <div
                className="preloader-track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label="Loading progress"
              >
                <div className="preloader-fill" style={{ width: `${progress}%` }}>
                  <span className="preloader-shine" aria-hidden="true" />
                </div>
              </div>

              <div className="preloader-meta">
                <span className="preloader-label">Loading Portfolio</span>
                <motion.span
                  className="preloader-pct"
                  key={progress}
                  initial={{ opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {progress}%
                </motion.span>
              </div>
            </motion.div>

            <motion.div
              className="preloader-ready"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 0.96 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="preloader-ready-badge">
                <svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true">
                  <path d="M4 10.5l4 4L16 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Ready
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
