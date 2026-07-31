import { motion } from 'framer-motion'
import useCursor from '../../hooks/useCursor'
import CursorRing from './CursorRing'
import CursorTrail from './CursorTrail'

function BurstFX({ bursts }) {
  return bursts.map((burst) => (
    <span key={burst.id} aria-hidden="true">
      <motion.span
        className="cursor-ripple"
        style={{ left: burst.x, top: burst.y, width: burst.size, height: burst.size }}
        initial={{ opacity: 0.9, scale: 0.2, x: '-50%', y: '-50%' }}
        animate={{ opacity: 0, scale: 3.4, x: '-50%', y: '-50%' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />
      {burst.particles.map((p, i) => (
        <motion.span
          key={`${burst.id}-${i}`}
          className="cursor-particle"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0, x: p.dx, y: p.dy }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </span>
  ))
}

export default function Cursor() {
  const {
    enabled,
    visible,
    variant,
    label,
    down,
    idle,
    bursts,
    trailCount,
    dotRef,
    ringRef,
    trailRefs,
  } = useCursor()

  if (!enabled) return null

  return (
    <div className="cursor-layer" aria-hidden="true">
      <CursorRing ringRef={ringRef} variant={variant} label={label} idle={idle} hidden={!visible} />
      <span
        ref={dotRef}
        className={`cursor-dot ${down ? 'is-down' : ''} ${visible ? '' : 'is-hidden'}`}
      />
      <CursorTrail count={trailCount} trailRefs={trailRefs} hidden={!visible} />
      <BurstFX bursts={bursts} />
    </div>
  )
}
