import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    return scaleX.on('change', (v) => {
      el.style.transform = `scaleX(${v})`
    })
  }, [scaleX])

  return (
    <motion.div
      ref={ref}
      className="fixed top-0 left-0 right-0 h-0.5 origin-left z-[100] bg-gradient-accent"
      style={{ transform: 'scaleX(0)' }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
