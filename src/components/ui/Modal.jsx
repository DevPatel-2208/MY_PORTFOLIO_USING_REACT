import { useCallback, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import useScrollLock, { useEscapeKey } from '../../hooks/useScrollLock'

const panelTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] }

export default function Modal({
  open,
  onClose,
  title,
  headerContent,
  footer,
  children,
  maxWidth = 'max-w-2xl',
  className = '',
  imageViewer = false,
}) {
  const modalRef = useRef(null)
  const titleId = useId()

  useScrollLock(open)
  useEscapeKey(onClose, open)

  useEffect(() => {
    if (!open) return undefined

    const previousActiveElement = document.activeElement
    const focusTimer = window.setTimeout(() => {
      modalRef.current?.querySelector('[data-modal-close]')?.focus()
    }, 0)

    return () => {
      window.clearTimeout(focusTimer)
      previousActiveElement?.focus?.()
    }
  }, [open])

  const trapFocus = useCallback((event) => {
    if (event.key !== 'Tab' || !modalRef.current) return

    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    if (!focusableElements.length) return

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }, [])

  if (typeof document === 'undefined') return null

  const closeButton = (
    <button
      data-modal-close
      type="button"
      onClick={onClose}
      aria-label={imageViewer ? 'Close image preview' : 'Close dialog'}
      className={
        imageViewer
          ? 'fixed right-3 top-3 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/45 text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/65 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 sm:top-5'
          : 'absolute right-3 top-3 z-30 grid h-11 w-11 place-items-center rounded-full border border-modal-border bg-modal-control text-modal-muted transition-all duration-200 hover:scale-105 hover:border-primary/50 hover:bg-modal-card hover:text-modal-content active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:right-5 sm:top-5'
      }
    >
      <FiX className="h-5 w-5" aria-hidden="true" />
    </button>
  )

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[10000] grid place-items-center p-2 sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
          role="presentation"
        >
          <div
            className={`absolute inset-0 ${imageViewer ? 'bg-black/85 backdrop-blur-md' : 'bg-modal-overlay'}`}
            onMouseDown={onClose}
            aria-hidden="true"
          />
          {imageViewer && closeButton}
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-label={imageViewer ? 'Image preview' : title ? undefined : 'Dialog'}
            tabIndex={-1}
            onKeyDown={trapFocus}
            onMouseDown={(event) => {
              if (imageViewer && event.target === event.currentTarget) onClose()
            }}
            initial={{ scale: 0.98, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 8 }}
            transition={panelTransition}
            className={
              imageViewer
                ? `relative flex min-h-0 w-full max-w-[94vw] max-h-[85vh] flex-col items-center justify-center overflow-hidden outline-none sm:max-w-[90vw] sm:max-h-[90vh] ${className}`
                : `relative flex h-[calc(100dvh-1rem)] max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] sm:h-[90vh] sm:max-h-[calc(100dvh-2rem)] sm:w-[90vw] ${maxWidth} min-h-0 flex-col overflow-hidden rounded-2xl border border-modal-border bg-modal-bg text-modal-content shadow-2xl outline-none sm:rounded-3xl ${className}`
            }
          >
            {!imageViewer && closeButton}
            {imageViewer ? (
              children
            ) : (
              <>
                {(title || headerContent) && (
                  <header className="z-10 flex shrink-0 items-start gap-3 border-b border-modal-border bg-modal-bg px-4 py-3 pr-16 sm:gap-4 sm:px-7 sm:py-5 sm:pr-20">
                    <div className="min-w-0">
                      {title && <h3 id={titleId} className="text-xl font-bold leading-tight text-modal-content sm:text-2xl lg:text-3xl">{title}</h3>}
                      {headerContent && <div className="mt-3">{headerContent}</div>}
                    </div>
                  </header>
                )}

                <div className="modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-gutter:stable]" tabIndex={0} aria-label="Dialog content">
                  {children}
                </div>

                {footer && (
                  <footer className="z-10 shrink-0 border-t border-modal-border bg-modal-bg px-4 py-4 sm:px-8 sm:py-5">
                    {footer}
                  </footer>
                )}
              </>
            )}
          </motion.section>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
