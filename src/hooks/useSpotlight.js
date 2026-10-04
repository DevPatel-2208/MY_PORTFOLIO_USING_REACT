import { useEffect } from 'react'

/* Spotlight system — one delegated listener feeds pointer position
   into `--mx/--my` on the hovered `.spotlight` card. CSS paints a
   soft radial light there. No re-renders, touch-safe (no mousemove
   means no spotlight), works with reduced motion (pure opacity fade). */
export default function useSpotlight() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    if (window.matchMedia('(hover: none)').matches) return undefined

    const onMove = (e) => {
      const t = e.target
      if (!(t instanceof Element)) return
      const card = t.closest('.spotlight')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    return () => document.removeEventListener('mousemove', onMove)
  }, [])
}
