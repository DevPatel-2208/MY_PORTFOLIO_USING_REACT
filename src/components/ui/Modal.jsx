import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import useScrollLock from '../../hooks/useScrollLock'
import { useEscapeKey } from '../../hooks/useScrollLock'

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-2xl' }) {
  const panelRef = useRef(null)

  useScrollLock(open)
  useEscapeKey(onClose, open)

  useEffect(() => {
    if (!open) return undefined
    const prevActive = document.activeElement
    const timer = window.setTimeout(() => panelRef.current?.focus(), 50)
    return () => {
      window.clearTimeout(timer)
      prevActive?.focus?.()
    }
  }, [open])

  const trapFocus = (e) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusables = panelRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6"
          style={{ background: 'rgba(2, 6, 23, 0.72)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Dialog'}
        >
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            onKeyDown={trapFocus}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${maxWidth} max-h-[88vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl overflow-hidden outline-none glass-strong shadow-2xl`}
          >
            {title && (
              <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b border-border bg-surface/50">
                <h3 className="text-base sm:text-lg font-bold text-content">{title}</h3>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="p-2 rounded-full text-muted hover:text-content hover:bg-surface-2 transition-colors cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="overflow-y-auto max-h-[calc(88vh-4.5rem)] sm:max-h-[calc(85vh-4.5rem)]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
