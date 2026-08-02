import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

function useLiveLatency() {
  const reduce = useReducedMotion()
  const [latency, setLatency] = useState(40)

  useEffect(() => {
    if (reduce) return undefined
    const id = window.setInterval(() => {
      setLatency((prev) => {
        const next = prev + (Math.random() * 8 - 4)
        return Math.max(34, Math.min(48, next))
      })
    }, 1400)
    return () => window.clearInterval(id)
  }, [reduce])

  return Math.round(latency)
}

export default function SystemStatus() {
  const latency = useLiveLatency()

  const items = [
    { id: 'mongodb', label: 'MongoDB', value: 'connected', tone: 'ok' },
    { id: 'redis', label: 'Redis', value: 'caching', tone: 'busy' },
    { id: 'api', label: 'API', value: `${latency}`, unit: 'ms', tone: 'ok' },
    { id: 'uptime', label: 'Uptime', value: '99.9', unit: '%', tone: 'ok' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
      className="system-status"
      aria-label="Live system status"
    >
      <div className="system-status-grid" aria-hidden="true" />
      <div className="system-status-shine" aria-hidden="true" />

      <div className="system-status-wrap">
        <div className="system-status-label">
          <span className="system-status-dot system-status-dot--live" aria-hidden="true" />
          <span className="system-status-title">System Status</span>
          <span className="system-status-live">
            <span className="system-status-live-dot" aria-hidden="true" />
            LIVE
          </span>
        </div>

        <ul className="system-status-items">
          {items.map((item) => (
            <li key={item.id} className="system-status-item">
              <span
                className={`system-status-dot system-status-dot--${item.tone}`}
                aria-hidden="true"
              />
              <span className="system-status-item-label">{item.label}</span>
              <span className="system-status-item-value">
                {item.value}
                {item.unit && <span className="system-status-unit">{item.unit}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
