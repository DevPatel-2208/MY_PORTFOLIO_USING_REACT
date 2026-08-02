import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'

/*
 * 3D tilt wrapper. Rotation and a `depth` Z-lift are driven by springs and only
 * applied while the pointer is over the card — at rest the element keeps its
 * exact grid geometry, so cards never scale outside their cell or overlap
 * their neighbours (a persistent translateZ under perspective would do that).
 */
export default function TiltCard({
  children,
  className = '',
  max = 7,
  depth = 0,
  glare = true,
}) {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const finePointer = window.matchMedia('(pointer: fine)').matches
    setEnabled(finePointer && !reduce)
  }, [reduce])

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 200, damping: 18 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 18 })

  /* Z-lift: 0 at rest, `depth` on hover. */
  const z = useSpring(0, { stiffness: 260, damping: 20 })

  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glareSpringX = useSpring(glareX, { stiffness: 180, damping: 20 })
  const glareSpringY = useSpring(glareY, { stiffness: 180, damping: 20 })
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareSpringX}% ${glareSpringY}%, rgba(255, 255, 255, 0.5) 0%, color-mix(in srgb, var(--c-primary) 16%, transparent) 42%, transparent 68%)`
  const lift = useMotionTemplate`translateZ(${z}px)`
  const glareLift = useMotionTemplate`translateZ(calc(${z}px + 1px))`

  const onMouseMove = (e) => {
    if (!enabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * max)
    rotateX.set(-py * max)
    glareX.set((px + 0.5) * 100)
    glareY.set((py + 0.5) * 100)
    if (depth > 0) z.set(depth)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
    glareX.set(50)
    glareY.set(50)
    z.set(0)
  }

  return (
    <motion.div
      onMouseMove={enabled ? onMouseMove : undefined}
      onMouseLeave={enabled ? reset : undefined}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative will-change-transform ${className}`}
    >
      {depth > 0 ? (
        <motion.div
          className="h-full"
          style={{ transform: lift, transformStyle: 'preserve-3d' }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
      {glare && (
        <motion.div
          aria-hidden="true"
          style={{
            background: glareBackground,
            transform: glareLift,
          }}
          className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </motion.div>
  )
}
