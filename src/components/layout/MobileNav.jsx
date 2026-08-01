import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiAward,
  FiBriefcase,
  FiCode,
  FiDownload,
  FiFolder,
  FiHome,
  FiLayers,
  FiMail,
  FiUser,
  FiX,
} from 'react-icons/fi'
import { HiAcademicCap, HiTrophy } from 'react-icons/hi2'
import { BsMoon, BsSun } from 'react-icons/bs'
import { navLinks, site } from '../../data/site'

const DRAWER_TRANSITION = { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
const ITEM_TRANSITION = { duration: 0.3, ease: [0.22, 1, 0.36, 1] }

const NAV_ICONS = {
  '#home': FiHome,
  '#about': FiUser,
  '#experience': FiBriefcase,
  '#education': HiAcademicCap,
  '#skills': FiCode,
  '#services': FiLayers,
  '#projects': FiFolder,
  '#certificates': FiAward,
  '#achievements': HiTrophy,
  '#contact': FiMail,
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: ITEM_TRANSITION },
}

export default function MobileNav({ active, open, panelRef, onClose, onNavigate, onKeyDown, theme, toggleTheme }) {
  const isLight = theme === 'light'

  useEffect(() => {
    if (!open) return undefined
    const closeForDesktop = () => {
      if (window.innerWidth >= 1024) onClose()
    }
    window.addEventListener('resize', closeForDesktop)
    return () => window.removeEventListener('resize', closeForDesktop)
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            key="mobile-navigation-overlay"
            type="button"
            aria-label="Close navigation menu"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={DRAWER_TRANSITION}
            className="fixed inset-0 z-[10000] bg-slate-950/60 backdrop-blur-md lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            key="mobile-navigation-panel"
            ref={panelRef}
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={onKeyDown}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={DRAWER_TRANSITION}
            className="fixed inset-y-0 right-0 z-[10001] flex w-[85%] max-w-[380px] flex-col overflow-hidden rounded-l-[24px] border-l border-border-strong bg-drawer-bg text-content shadow-[-28px_0_60px_-24px_rgba(2,6,23,0.5)] outline-none lg:hidden"
          >
            <div
              className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain scrollbar-none">
              <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-drawer-header px-4 py-3.5 backdrop-blur-xl sm:px-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted/80">
                  Menu
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
                    data-cursor="click"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-surface text-muted transition-all duration-300 hover:bg-surface-2 hover:text-primary hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={isLight ? 'moon' : 'sun'}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="grid place-items-center"
                      >
                        {isLight ? <BsMoon className="h-5 w-5" /> : <BsSun className="h-5 w-5" />}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close navigation menu"
                    data-mobile-close
                    data-cursor="click"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-surface text-content transition-all duration-300 hover:bg-surface-2 hover:text-red-500 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <FiX className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </header>

              <section aria-label="Profile" className="mx-4 mt-4 rounded-2xl border border-border bg-drawer-panel p-4 shadow-soft sm:mx-5">
                <div className="flex items-center gap-3.5">
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-accent p-[2px] shadow-[0_0_24px_-4px_var(--c-primary)]">
                    <img
                      src={site.profileImage}
                      alt={`${site.name} profile`}
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full rounded-full object-cover ring-2 ring-drawer-panel"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold tracking-tight text-content">
                      {site.name}
                    </p>
                    <p className="mt-0.5 truncate text-[13px] font-medium text-muted">{site.role}</p>
                  </div>
                </div>
              </section>

              <nav className="px-4 py-4 sm:px-5" aria-label="Mobile navigation">
                <motion.ul
                  className="space-y-2"
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                >
                  {navLinks.map((link) => {
                    const isActive = active === link.href.slice(1)
                    const Icon = NAV_ICONS[link.href] ?? FiHome
                    return (
                      <motion.li key={link.href} variants={itemVariants}>
                        <a
                          href={link.href}
                          onClick={(event) => onNavigate(event, link.href)}
                          aria-current={isActive ? 'page' : undefined}
                          className={`group relative flex min-h-12 items-center gap-3 rounded-[14px] border px-3.5 transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                            isActive
                              ? 'border-transparent'
                              : 'border-border/80 bg-drawer-card shadow-sm hover:border-primary/30 hover:bg-drawer-card-hover'
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="mobile-active-pill"
                              className="absolute inset-0 rounded-[14px] bg-gradient-accent shadow-glow"
                              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                              aria-hidden="true"
                            />
                          )}
                          <span
                            className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-[10px] transition-colors duration-200 ${
                              isActive
                                ? 'bg-white/15 text-white'
                                : 'bg-surface text-muted group-hover:bg-surface-2 group-hover:text-primary'
                            }`}
                          >
                            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                          </span>
                          <span
                            className={`relative z-10 flex-1 truncate text-sm font-semibold tracking-wide ${
                              isActive
                                ? 'text-white'
                                : 'text-content/90 transition-colors duration-200 group-hover:text-content'
                            }`}
                          >
                            {link.label}
                          </span>
                          {isActive && (
                            <span
                              className="relative z-10 mr-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                              aria-hidden="true"
                            />
                          )}
                        </a>
                      </motion.li>
                    )
                  })}
                </motion.ul>
              </nav>
            </div>

            <footer className="relative shrink-0 border-t border-border bg-surface/50 px-4 pb-6 pt-4 sm:px-5">
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                data-cursor="click"
                className="group relative flex min-h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-accent px-5 text-sm font-semibold tracking-wide text-white shadow-[0_12px_28px_-12px_var(--c-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-strong active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span
                  className="absolute inset-y-0 w-1/3 bg-white/25 blur-md animate-shine"
                  aria-hidden="true"
                />
                <FiDownload
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
                Download Resume
              </a>
              <p className="mt-3.5 text-center text-xs font-medium leading-relaxed text-muted/85">
                Available for Internships &amp; Full-Time Opportunities
              </p>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
