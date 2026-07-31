import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import { BsSun, BsMoon } from 'react-icons/bs'
import useTheme from '../../hooks/useTheme'
import useActiveSection from '../../hooks/useActiveSection'
import useScrollLock, { useEscapeKey } from '../../hooks/useScrollLock'
import { navLinks, site } from '../../data/site'
import Button from '../ui/Button'

const sectionIds = navLinks.map((link) => link.href.slice(1))
const MOBILE_MENU_ID = 'mobile-nav-menu'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const triggerRef = useRef(null)
  const panelRef = useRef(null)

  const isLight = theme === 'light'

  /* ---- Scroll state (rAF-throttled) ---- */
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 50))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  /* ---- Lock body scroll + close on Escape ---- */
  useScrollLock(open)
  useEscapeKey(() => setOpen(false), open)

  /* ---- Focus management: move focus into menu, restore on close ---- */
  useEffect(() => {
    if (!open) return undefined
    const previous = document.activeElement
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector('a, button, [href]')?.focus()
    }, 80)
    return () => {
      window.clearTimeout(timer)
      if (previous && typeof previous.focus === 'function') previous.focus()
    }
  }, [open])

  /* ---- Focus trap inside the mobile menu ---- */
  const handleMenuKeyDown = useCallback(
    (e) => {
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll(
        'a, button, [href], [tabindex]:not([tabindex="-1"])',
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
    },
    [],
  )

  /* ---- Smooth scroll from mobile menu ---- */
  const handleNavClick = useCallback(
    (e, href) => {
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      setOpen(false)
      document.body.style.overflow = ''
      window.requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    },
    [],
  )

  const headerBarClass = scrolled
    ? 'border-border-strong shadow-[0_8px_30px_-12px_rgba(2,6,23,0.25)]'
    : 'border-transparent'

  const linkClass = (isActive) =>
    `group relative flex items-center rounded-full px-2 xl:px-3 py-2 text-xs xl:text-[13px] font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
      isActive ? 'text-white' : 'text-muted hover:text-content'
    }`

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={`relative border-b transition-all duration-300 ${headerBarClass}`}
        style={{
          backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'blur(6px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'blur(6px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3 h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => open && handleNavClick(e, '#home')}
            className="justify-self-start flex items-center gap-2.5 shrink-0 min-w-0 group"
            aria-label={`${site.name} home`}
          >
            <span className="w-10 h-10 lg:w-11 lg:h-11 shrink-0 rounded-xl overflow-hidden bg-surface-2 shadow-[0_8px_20px_-8px_var(--c-primary)] transition-transform duration-300 group-hover:rotate-6">
              <img
                src={site.logo}
                alt={`${site.name} logo`}
                width={44}
                height={44}
                className="w-full h-full object-cover"
                decoding="async"
              />
            </span>
            <span className="hidden xl:block font-extrabold text-base tracking-widest text-content">
              {site.fullName.toUpperCase()}
            </span>
          </a>

          {/* Desktop navigation (centered) */}
          <nav
            className="hidden lg:flex justify-self-center items-center gap-0.5"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => {
              const id = link.href.slice(1)
              const isActive = active === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={linkClass(isActive)}
                >
                  <span
                    className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                    aria-hidden="true"
                  />
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-accent shadow-glow"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-gradient-accent transition-all duration-300 ${
                      isActive
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="justify-self-end flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
              className="w-10 h-10 rounded-full glass grid place-items-center text-muted hover:text-primary hover:bg-surface-2 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isLight ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid place-items-center"
                >
                  {isLight ? <BsMoon className="w-4.5 h-4.5" /> : <BsSun className="w-4.5 h-4.5" />}
                </motion.span>
              </AnimatePresence>
            </button>

            <Button
              href={site.resume}
              external
              size="sm"
              data-cursor="click"
              className="hidden sm:inline-flex !px-3.5 xl:!px-4"
            >
              <FiDownload className="w-4 h-4" aria-hidden="true" />
              Resume
            </Button>

            {/* Hamburger */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
              aria-controls={MOBILE_MENU_ID}
              className="lg:hidden w-11 h-11 rounded-full glass grid place-items-center text-content hover:text-primary hover:bg-surface-2 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="relative w-5 h-5" aria-hidden="true">
                <motion.span
                  animate={{ y: open ? 6 : 0, rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-x-0 top-1 h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={{ opacity: open ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-x-0 top-2.5 h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={{ y: open ? -6 : 0, rotate: open ? -45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-x-0 top-4 h-0.5 bg-current rounded-full"
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="mobile-panel"
              ref={panelRef}
              id={MOBILE_MENU_ID}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              onKeyDown={handleMenuKeyDown}
              initial={{ opacity: 0, y: -24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-[4.5rem] bottom-3 z-[45] origin-top rounded-2xl glass-strong border border-border-strong shadow-2xl overflow-hidden flex flex-col lg:hidden"
            >
              <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => {
                    const id = link.href.slice(1)
                    const isActive = active === id
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + i * 0.035 }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                            isActive
                              ? 'text-white bg-gradient-accent shadow-glow'
                              : 'text-muted hover:text-content hover:bg-surface-2'
                          }`}
                        >
                          {link.label}
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" />
                          )}
                        </a>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              <div className="px-3 pt-3 pb-4 border-t border-border shrink-0">
                <Button href={site.resume} external data-cursor="click" className="w-full" size="lg">
                  <FiDownload className="w-4 h-4" aria-hidden="true" />
                  Download Resume
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
