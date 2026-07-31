/** Linear interpolation between two values. */
export function lerp(start, end, amount) {
  return start * (1 - amount) + end * amount
}

/** Clamp a value between min and max. */
export function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value
}

/** Remap a value from one range to another. */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  if (inMax - inMin === 0) return outMin
  const ratio = (value - inMin) / (inMax - inMin)
  return outMin + ratio * (outMax - outMin)
}

/** Euclidean distance between two points. */
export function distance2D(x1, y1, x2, y2) {
  const dx = x2 - x1
  const dy = y2 - y1
  return Math.hypot(dx, dy)
}
