import { clamp, lerp } from './lerp'

/**
 * SmoothDamp-style spring for a single axis.
 * Returns the new value given current, target, a mutable reference velocity,
 * smoothTime (seconds) and frame delta (normalized to ~60fps).
 */
export function smoothDamp(current, target, refVelocity, smoothTime, dt) {
  const omega = 2 / smoothTime
  const x = omega * dt
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  const delta = current - target
  const temp = (refVelocity.current + omega * delta) * dt
  const newValue = current - delta * exp
  refVelocity.current = (refVelocity.current - omega * temp * exp) * 1
  return newValue
}

/**
 * Compute instantaneous speed from two samples.
 * Returns a normalized speed (0..~1+) based on pixels moved per frame.
 */
export function computeSpeed(x1, y1, x2, y2, frameDt) {
  const dx = x2 - x1
  const dy = y2 - y1
  const dist = Math.hypot(dx, dy)
  const raw = dist / Math.max(frameDt, 1)
  return clamp(raw, 0, 1.4)
}

/** Angle (radians) of travel between two samples. */
export function computeAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1)
}

/**
 * Build a scale envelope for the cursor ring based on current state.
 * Combines hover growth, movement stretch and scroll shrink into one factor.
 */
export function cursorScale({ variant, speed, scrolling, moving }) {
  let scale = 1

  if (variant !== 'default' && variant !== 'text') {
    scale *= 1.55
  }
  if (variant === 'text') {
    scale *= 0.6
  }

  if (moving) {
    scale *= lerp(1, 1.28, speed)
  } else {
    scale *= 0.96
  }

  if (scrolling) {
    scale *= 0.72
  }

  return scale
}

/** Stretch factors that make the ring lean into the direction of travel. */
export function stretchFactors(speed, angle) {
  const intensity = 1 + speed * 0.28
  return {
    x: intensity * (1 + Math.abs(Math.cos(angle)) * 0.18 * speed),
    y: intensity * (1 - Math.abs(Math.sin(angle)) * 0.18 * speed),
  }
}
