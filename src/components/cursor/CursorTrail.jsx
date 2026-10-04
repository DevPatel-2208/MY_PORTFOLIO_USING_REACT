export default function CursorTrail({ count, trailRefs, hidden }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el
          }}
          aria-hidden="true"
          className={`cursor-trail-dot ${hidden ? 'is-hidden' : ''}`}
        />
      ))}
    </>
  )
}
