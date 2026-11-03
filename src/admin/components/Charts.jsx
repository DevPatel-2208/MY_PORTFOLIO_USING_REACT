import { motion, useReducedMotion } from 'framer-motion'

// Tone → CSS var map so charts stay in sync with the theme.
const toneVar = {
  primary: 'var(--c-primary)',
  secondary: 'var(--c-secondary)',
  accent: 'var(--c-accent)',
  warning: 'var(--c-warning)',
}

/* ── Sparkline: tiny inline trend line used inside stat cards ── */
export function Sparkline({ data = [], tone = 'primary', className = '' }) {
  const reduce = useReducedMotion()
  const w = 120
  const h = 36
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / span) * (h - 6) - 3
    return [x, y]
  })

  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const area = `${d} L${w} ${h} L0 ${h} Z`
  const gid = `spark-${tone}-${data.join('-')}`.replace(/[^a-z0-9-]/gi, '')

  return (
    <svg
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={toneVar[tone]} stopOpacity="0.32" />
          <stop offset="100%" stopColor={toneVar[tone]} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#${gid})`}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <motion.path
        d={d}
        stroke={toneVar[tone]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    </svg>
  )
}

/* ── Area chart: smooth monthly series with grid + hover readout ── */
export function AreaChart({ labels = [], values = [], tone = 'primary' }) {
  const reduce = useReducedMotion()
  const w = 720
  const h = 240
  const padX = 16
  const padY = 18
  const max = Math.max(...values) * 1.12 || 1
  const min = 0

  const xFor = (i) => padX + (i / (values.length - 1)) * (w - padX * 2)
  const yFor = (v) => h - padY - ((v - min) / (max - min)) * (h - padY * 2)

  // Catmull-Rom → bezier smoothing so the line is buttery.
  const points = values.map((v, i) => [xFor(i), yFor(v)])
  let d = `M${points[0][0]} ${points[0][1]}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(i + 2, points.length - 1)]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }

  const area = `${d} L${xFor(values.length - 1)} ${h - padY} L${xFor(0)} ${h - padY} Z`
  const gid = 'area-grad'

  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const y = padY + (i / 4) * (h - padY * 2)
    const val = Math.round(max - (i / 4) * (max - min))
    return { y, val }
  })

  return (
    <div className="relative">
      <svg
        className="w-full h-auto"
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label="Monthly profile views chart"
        fill="none"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={toneVar[tone]} stopOpacity="0.34" />
            <stop offset="100%" stopColor={toneVar[tone]} stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridLines.map((g) => (
          <g key={g.y}>
            <line
              x1={padX}
              y1={g.y}
              x2={w - padX}
              y2={g.y}
              stroke="var(--c-border)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <text
              x={w - padX}
              y={g.y - 5}
              textAnchor="end"
              className="fill-[var(--c-muted)]"
              style={{ fontSize: '11px', fontWeight: 600 }}
            >
              {g.val >= 1000 ? `${(g.val / 1000).toFixed(1)}k` : g.val}
            </text>
          </g>
        ))}

        <motion.path
          d={area}
          fill={`url(#${gid})`}
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        />
        <motion.path
          d={d}
          stroke={toneVar[tone]}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r="4"
            fill="var(--c-base-2)"
            stroke={toneVar[tone]}
            strokeWidth="2.5"
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 + i * 0.06 }}
          >
            <title>{`${labels[i]}: ${values[i].toLocaleString()} views`}</title>
          </motion.circle>
        ))}
      </svg>

      <div className="flex justify-between gap-1 px-1 mt-2 overflow-x-auto scrollbar-none">
        {labels.map((l) => (
          <span
            key={l}
            className="text-[10px] sm:text-[11px] font-semibold text-muted flex-none"
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Bar chart: weekly activity with rounded animated bars ── */
export function BarChart({ labels = [], values = [], tone = 'secondary' }) {
  const reduce = useReducedMotion()
  const max = Math.max(...values) * 1.15 || 1

  return (
    <div className="flex items-end justify-between gap-2 sm:gap-3 h-44 px-1">
      {values.map((v, i) => {
        const pct = (v / max) * 100
        return (
          <div
            key={i}
            className="group relative flex flex-col items-center justify-end gap-2 flex-1 h-full"
          >
            <motion.span
              className="absolute -top-0.5 text-[10px] font-bold text-content opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              initial={false}
            >
              {v}
            </motion.span>
            <motion.div
              className="w-full max-w-[2.6rem] rounded-t-lg rounded-b-sm relative overflow-hidden"
              style={{
                background: `linear-gradient(180deg, ${toneVar[tone]}, color-mix(in srgb, ${toneVar[tone]} 45%, transparent))`,
              }}
              initial={reduce ? { height: `${pct}%` } : { height: '0%' }}
              animate={{ height: `${pct}%` }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/25 dark:to-white/10" />
            </motion.div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-muted flex-none">
              {labels[i]}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ── Donut chart: stack distribution with legend + centre total ── */
export function DonutChart({ data = [], size = 180 }) {
  const reduce = useReducedMotion()
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1
  const radius = 42
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7">
      <div className="relative flex-none" style={{ width: size, height: size }}>
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 100 100"
          role="img"
          aria-label="Tech stack distribution"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="var(--c-border)"
            strokeWidth="11"
            fill="none"
          />
          {data.map((d) => {
            const dash = (d.value / total) * circumference
            const seg = (
              <motion.circle
                key={d.id}
                cx="50"
                cy="50"
                r={radius}
                stroke={toneVar[d.tone]}
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference - dash}`}
                initial={reduce ? { strokeDashoffset: -offset } : { strokeDashoffset: circumference - offset }}
                animate={{ strokeDashoffset: -offset }}
                transition={{ duration: 1, delay: 0.15, ease: 'easeInOut' }}
              />
            )
            offset += dash
            return seg
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="text-2xl font-extrabold text-content leading-none">
              {total}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted mt-1">
              Skills
            </div>
          </div>
        </div>
      </div>

      <ul className="flex flex-col gap-2.5 w-full min-w-0">
        {data.map((d) => (
          <li key={d.id} className="flex items-center gap-2.5 text-sm">
            <span
              className="w-2.5 h-2.5 rounded-full flex-none"
              style={{ background: toneVar[d.tone] }}
            />
            <span className="font-medium text-content flex-1 truncate">{d.label}</span>
            <span className="font-bold text-muted tabular-nums">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
