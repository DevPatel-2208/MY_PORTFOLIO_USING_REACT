import { motion } from 'framer-motion'

const styles = {
  primary: 'bg-gradient-accent text-white shadow-[0_12px_28px_-12px_var(--c-primary)]',
  outline:
    'border border-border-strong text-content bg-surface/40 hover:bg-surface-2 hover:border-primary/50',
  outlinePrimary:
    'border border-primary/30 text-primary bg-primary/5 hover:bg-primary/12 hover:border-primary/60 shadow-[0_0_20px_-10px_var(--c-primary)]',
  ghost: 'text-content hover:bg-surface-2',
  danger: 'bg-red-500/15 text-red-500 border border-red-500/30 hover:bg-red-500/25',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  href,
  external = false,
  ...rest
}) {
  const classes = `relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 overflow-hidden ${styles[variant]} ${sizes[size]} ${className}`

  const shine = variant === 'primary' && (
    <span
      aria-hidden="true"
      className="absolute inset-y-0 w-1/3 bg-white/25 blur-md animate-shine"
    />
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        whileHover={disabled ? undefined : { y: -2 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        {...rest}
      >
        {shine}
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      {...rest}
    >
      {shine}
      {children}
    </motion.button>
  )
}
