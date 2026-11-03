import { motion } from 'framer-motion'

/* Reusable page header: eyebrow, title, subtitle and optional actions. */
export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5 sm:mb-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="min-w-0"
      >
        {eyebrow && (
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary mb-1.5">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-content tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-sm text-muted max-w-2xl">{subtitle}</p>
        )}
      </motion.div>

      {children && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-2.5 flex-none"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}
