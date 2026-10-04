import { AnimatePresence, motion } from 'framer-motion'

function ringClass(variant) {
  switch (variant) {
    case 'click':
      return 'is-click'
    case 'view':
      return 'is-view'
    case 'plus':
      return 'is-plus'
    case 'text':
      return 'is-text'
    case 'link':
    case 'badge':
    case 'card':
      return 'is-interactive'
    default:
      return ''
  }
}

export default function CursorRing({ ringRef, variant, label, idle, hidden }) {
  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className={`cursor-ring ${ringClass(variant)} ${idle ? 'is-idle' : ''} ${hidden ? 'is-hidden' : ''}`}
    >
      <span className="cursor-ring-core" />
      <AnimatePresence>
        {label && (
          <motion.span
            key={variant}
            className="cursor-label"
            initial={{ opacity: 0, scale: 0.5, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
