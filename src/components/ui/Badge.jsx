const tones = {
  primary: 'bg-primary/12 text-primary border-primary/25',
  accent: 'bg-accent/12 text-accent border-accent/25',
  muted: 'bg-surface-2 text-muted border-border',
  warning: 'bg-amber-500/12 text-amber-600 dark:text-amber-400 border-amber-500/25',
}

export default function Badge({ children, tone = 'primary', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${tones[tone] || tones.primary} ${className}`}
    >
      {children}
    </span>
  )
}
