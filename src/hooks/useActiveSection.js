import { useState, useEffect, useMemo } from 'react'

export default function useActiveSection(sectionIds, offset = 120) {
  const [active, setActive] = useState(sectionIds[0] || '')
  const key = useMemo(() => sectionIds.join('|'), [sectionIds])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const compute = () => {
      let current = sectionIds[0] || ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id
        }
      }
      setActive(current)
    }

    compute()

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(compute)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [key, offset, sectionIds])

  return active
}
