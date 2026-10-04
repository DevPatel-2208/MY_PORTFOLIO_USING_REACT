import confetti from 'canvas-confetti'

const COLORS = ['#4f46e5', '#9333ea', '#059669', '#f59e0b', '#ef4444', '#3b82f6']

function canCelebrate() {
  if (typeof window === 'undefined') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* Celebration burst at a pointer position (resume downloads, etc.) */
export function burstAt(clientX, clientY, particleCount = 70) {
  if (!canCelebrate()) return
  confetti({
    particleCount,
    spread: 75,
    startVelocity: 34,
    ticks: 70,
    gravity: 1,
    decay: 0.94,
    origin: {
      x: Math.min(Math.max(clientX / window.innerWidth, 0), 1),
      y: Math.min(Math.max(clientY / window.innerHeight, 0), 1),
    },
    colors: COLORS,
    disableForReducedMotion: true,
  })
}

/* Click handler for download links — celebrates, then lets the
   navigation proceed untouched. */
export function resumeBurst(e) {
  const x = e?.clientX ?? window.innerWidth / 2
  const y = e?.clientY ?? window.innerHeight * 0.25
  burstAt(x, y, 70)
}

/* Small centered pop (palette actions, copy success, etc.) */
export function popCenter(particleCount = 45) {
  if (!canCelebrate()) return
  confetti({
    particleCount,
    spread: 60,
    startVelocity: 28,
    origin: { x: 0.5, y: 0.4 },
    colors: COLORS,
    disableForReducedMotion: true,
  })
}
