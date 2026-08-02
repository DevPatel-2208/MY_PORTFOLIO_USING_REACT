import { useCallback, useEffect, useRef, useState } from 'react'
import { lerp, clamp } from '../utils/lerp'
import { computeSpeed, computeAngle, cursorScale, stretchFactors } from '../utils/cursorPhysics'

const LABELS = {
  default: '',
  link: '',
  badge: '',
  card: '',
  click: '',
  view: '',
  plus: '',
  text: '',
}

const INTERACTIVE = 'button, a[href], [role="button"], [data-magnetic]'

function initialPoint() {
  if (typeof window === 'undefined') return { x: 0, y: 0 }
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
}

export default function useCursor(trailCount = 6) {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState('default')
  const [label, setLabel] = useState('')
  const [down, setDown] = useState(false)
  const [idle, setIdle] = useState(false)
  const [scrolling, setScrolling] = useState(false)
  const [visible, setVisible] = useState(true)
  const [bursts, setBursts] = useState([])

  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const trailRefs = useRef([])

  const pos = useRef(initialPoint())
  const ringPos = useRef(initialPoint())
  const prevFrame = useRef({ ...pos.current })
  const vel = useRef(0)
  const angle = useRef(0)
  const trail = useRef(Array.from({ length: trailCount }, () => ({ ...pos.current })))
  const variantRef = useRef('default')
  const idleRef = useRef(false)
  const scrollingRef = useRef(false)
  const visibleRef = useRef(true)
  const lastMove = useRef(0)
  const magnet = useRef(null)
  const scrollTimer = useRef(0)
  const raf = useRef(0)
  const burstId = useRef(0)

  /* ---- Gate: enable only on fine pointers, without reduced motion ---- */
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const on = fine && !reduce
    setEnabled(on)
    if (on) document.documentElement.classList.add('custom-cursor')
    return () => document.documentElement.classList.remove('custom-cursor')
  }, [])

  const applyVariant = useCallback((next) => {
    variantRef.current = next
    setVariant(next)
    setLabel(LABELS[next] || '')
  }, [])

  const setHidden = useCallback((value) => {
    if (visibleRef.current === value) return
    visibleRef.current = value
    setVisible(value)
  }, [])

  const updateHover = useCallback(
    (e) => {
      const el = e.target
      if (!(el instanceof Element)) return

      const dataEl = el.closest('[data-cursor]')
      if (dataEl && dataEl.dataset.cursor) {
        applyVariant(dataEl.dataset.cursor)
        return
      }
      if (el.closest('button, [role="button"]')) {
        applyVariant('click')
        return
      }
      if (el.closest('a[href]')) {
        applyVariant('link')
        return
      }
      if (el.closest('input, textarea, select, [contenteditable="true"]')) {
        applyVariant('text')
        return
      }
      if (el.closest('img, picture')) {
        applyVariant('view')
        return
      }
      applyVariant('default')
    },
    [applyVariant],
  )

  const spawnBurst = useCallback((x, y) => {
    const id = ++burstId.current
    const particles = Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2 + Math.random() * 0.5
      const dist = 26 + Math.random() * 36
      return {
        x,
        y,
        dx: Math.cos(a) * dist,
        dy: Math.sin(a) * dist,
        size: 3 + Math.random() * 3,
      }
    })
    setBursts((prev) => [...prev.slice(-4), { id, x, y, size: 40, particles }])
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id))
    }, 800)
  }, [])

  /* ---- Main loop: listeners + rAF physics ---- */
  useEffect(() => {
    if (!enabled) return undefined

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      lastMove.current = performance.now()
      if (!visibleRef.current) setHidden(true)
      const t = e.target
      magnet.current =
        t instanceof Element && t.closest(INTERACTIVE) ? t.closest(INTERACTIVE) : null
    }

    const onDown = (e) => {
      if (e.button !== 0) return
      setDown(true)
      spawnBurst(e.clientX, e.clientY)
    }
    const onUp = () => setDown(false)

    const onScroll = () => {
      if (!scrollingRef.current) {
        scrollingRef.current = true
        setScrolling(true)
      }
      window.clearTimeout(scrollTimer.current)
      scrollTimer.current = window.setTimeout(() => {
        scrollingRef.current = false
        setScrolling(false)
      }, 170)
    }

    const onKeyDown = (e) => {
      if (e.key === 'Tab') setHidden(false)
    }
    const onDocLeave = () => setHidden(false)
    const onDocEnter = () => setHidden(true)

    let lastFrame = performance.now()

    const tick = (now) => {
      const dt = clamp((now - lastFrame) / 16.667, 0.2, 3)
      lastFrame = now

      const px = pos.current.x
      const py = pos.current.y
      const dx = px - prevFrame.current.x
      const dy = py - prevFrame.current.y
      const moved = Math.abs(dx) + Math.abs(dy) > 0.1

      if (moved) {
        const speed = computeSpeed(px, py, prevFrame.current.x, prevFrame.current.y, dt)
        vel.current = lerp(vel.current, Math.min(speed, 1.2), 0.12 * dt)
        angle.current = computeAngle(prevFrame.current.x, prevFrame.current.y, px, py)
      } else {
        vel.current = lerp(vel.current, 0, 0.08 * dt)
      }
      prevFrame.current = { x: px, y: py }

      const isIdle = now - lastMove.current > 1400
      if (isIdle !== idleRef.current) {
        idleRef.current = isIdle
        setIdle(isIdle)
      }

      let tx = px
      let ty = py
      if (magnet.current) {
        const rect = magnet.current.getBoundingClientRect()
        tx = lerp(px, rect.left + rect.width / 2, 0.16)
        ty = lerp(py, rect.top + rect.height / 2, 0.16)
      }

      ringPos.current.x = lerp(ringPos.current.x, tx, 0.17 * dt)
      ringPos.current.y = lerp(ringPos.current.y, ty, 0.17 * dt)

      const scale = cursorScale({
        variant: variantRef.current,
        speed: vel.current,
        scrolling: scrollingRef.current,
        moving: moved,
      })
      const { x: sx, y: sy } = stretchFactors(vel.current, angle.current)

      if (dotRef.current) {
        const ds = (scrollingRef.current ? 0.55 : 1) * (1 + vel.current * 0.25)
        dotRef.current.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) scale(${ds})`
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) rotate(${angle.current}rad) scale(${scale * sx}, ${scale * sy})`
      }

      let fx = px
      let fy = py
      for (let i = 0; i < trailRefs.current.length; i += 1) {
        const el = trailRefs.current[i]
        if (!el) continue
        const prev = trail.current[i]
        prev.x = lerp(prev.x, fx, 0.4 * dt)
        prev.y = lerp(prev.y, fy, 0.4 * dt)
        fx = prev.x
        fy = prev.y
        el.style.transform = `translate3d(${fx}px, ${fy}px, 0) translate(-50%, -50%)`
      }

      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', updateHover, { passive: true })
    document.addEventListener('mouseleave', onDocLeave)
    document.addEventListener('mouseenter', onDocEnter)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', onScroll, { passive: true })
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', updateHover)
      document.removeEventListener('mouseleave', onDocLeave)
      document.removeEventListener('mouseenter', onDocEnter)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf.current)
      window.clearTimeout(scrollTimer.current)
    }
  }, [enabled, updateHover, setHidden, spawnBurst])

  return {
    enabled,
    visible,
    variant,
    label,
    down,
    idle,
    scrolling,
    bursts,
    trailCount,
    dotRef,
    ringRef,
    trailRefs,
  }
}
