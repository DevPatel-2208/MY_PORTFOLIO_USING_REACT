import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function AnimatedNumber({ end, decimals = 0, suffix = '', duration = 2, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  const [value, setValue] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!inView || hasStarted.current) return undefined

    hasStarted.current = true
    let animationFrame
    let delayTimer
    let startTime

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp

      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easedProgress = 1 - (1 - progress) ** 3
      setValue(end * easedProgress)

      if (progress < 1) animationFrame = requestAnimationFrame(animate)
    }

    delayTimer = window.setTimeout(() => {
      animationFrame = requestAnimationFrame(animate)
    }, delay * 1000)

    return () => {
      window.clearTimeout(delayTimer)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [delay, duration, end, inView])

  return (
    <span ref={ref}>
      {value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}