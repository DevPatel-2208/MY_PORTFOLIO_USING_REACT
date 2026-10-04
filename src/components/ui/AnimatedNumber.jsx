import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

function Digit({ d }) {
  return (
    <span className="odo-digit" aria-hidden="true">
      <span className="odo-strip" style={{ transform: `translateY(-${d * 10}%)` }}>
        {Array.from({ length: 10 }, (_, n) => (
          /* Own gradient per digit: an ancestor's background-clip:text
             never paints through transformed descendants, so each leaf
             carries its own gradient to stay visible in both themes. */
          <span key={n} className="odo-num text-gradient">
            {n}
          </span>
        ))}
      </span>
    </span>
  )
}

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

  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref}>
      <span className="sr-only">
        {end}
        {suffix}
      </span>
      <span aria-hidden="true" className="odo">
        {formatted.split('').map((ch, i) =>
          /\d/.test(ch) ? (
            <Digit key={i} d={Number(ch)} />
          ) : (
            <span key={i} className="text-gradient">
              {ch}
            </span>
          ),
        )}
        {suffix && <span className="text-gradient">{suffix}</span>}
      </span>
    </span>
  )
}
