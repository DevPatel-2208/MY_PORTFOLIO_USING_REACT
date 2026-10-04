import { useMemo } from 'react'

export default function BackgroundFX() {
  const dots = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 2 + ((i * 7) % 4),
        delay: `${(i % 8) * 0.9}s`,
        duration: `${9 + ((i * 3) % 7)}s`,
      })),
    [],
  )

  return (
    <div className="fixed inset-0 z-[-1] decorative" aria-hidden="true">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(var(--c-border) 1px, transparent 1px), linear-gradient(90deg, var(--c-border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
      />

      {/* Gradient blobs */}
      <div className="absolute -top-40 -left-40 w-[34rem] h-[34rem] rounded-full animate-blob"
        style={{ background: 'var(--glow-a)', filter: 'blur(90px)' }} />
      <div className="absolute top-1/4 -right-48 w-[30rem] h-[30rem] rounded-full animate-blob"
        style={{ background: 'var(--glow-b)', filter: 'blur(100px)', animationDelay: '-6s' }} />
      <div className="absolute -bottom-48 left-1/4 w-[32rem] h-[32rem] rounded-full animate-blob"
        style={{ background: 'var(--glow-c)', filter: 'blur(100px)', animationDelay: '-12s' }} />

      {/* Floating dots */}
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full animate-float-slow"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: 'var(--c-primary)',
            opacity: 0.25,
            animationDelay: d.delay,
            animationDuration: d.duration,
          }}
        />
      ))}
    </div>
  )
}
