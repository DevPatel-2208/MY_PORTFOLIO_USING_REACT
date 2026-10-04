import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

export default function TiltCard({
  children,
  className = '',
  max = 12,
  scale = 1.02,
  glare = true,
  glareRadius = '1.5rem',
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springX = useSpring(rotateX, { stiffness: 170, damping: 18, mass: 0.6 })
  const springY = useSpring(rotateY, { stiffness: 170, damping: 18, mass: 0.6 })
  const springScale = useSpring(1, { stiffness: 200, damping: 22 })

  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)

  const onMouseMove = (e) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    px.set(nx)
    py.set(ny)
    rotateY.set((nx - 0.5) * max)
    rotateX.set(-(ny - 0.5) * max)
  }

  const onEnter = () => {
    setHovered(true)
    if (!reduce) springScale.set(scale)
  }

  const onLeave = () => {
    setHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    springScale.set(1)
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div ref={ref} className={`tilt-perspective ${className}`}>
      <motion.div
        onMouseMove={onMouseMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          rotateX: springX,
          rotateY: springY,
          scale: springScale,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full w-full will-change-transform"
      >
        {children}

        {glare && (
          <motion.span
            aria-hidden="true"
            className="tilt-glare"
            style={{ '--gx': glareX, '--gy': glareY, borderRadius: glareRadius, opacity: hovered ? 1 : 0 }}
          />
        )}
      </motion.div>
    </div>
  )
}