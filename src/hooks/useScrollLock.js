import { useEffect } from 'react'

let lockCount = 0
let savedOverflow = ''
let savedPaddingRight = ''

export default function useScrollLock(locked) {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') return undefined

    if (lockCount === 0) {
      savedOverflow = document.body.style.overflow
      savedPaddingRight = document.body.style.paddingRight
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    lockCount += 1

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) {
        document.body.style.overflow = savedOverflow
        document.body.style.paddingRight = savedPaddingRight
      }
    }
  }, [locked])
}

export function useEscapeKey(handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') handler()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handler, enabled])
}