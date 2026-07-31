import { useEffect } from 'react'

export default function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [locked])
}

export function useEscapeKey(handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') handler()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handler, enabled])
}
