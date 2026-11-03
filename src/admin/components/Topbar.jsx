import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiSearch, FiBell, FiMoon, FiSun, FiMail } from 'react-icons/fi'
import { site } from '../../data/site'
import { messages } from '../data/admin'

export default function Topbar({
  title,
  query,
  onQueryChange,
  onOpenSidebar,
  theme,
  onToggleTheme,
  onNavigate,
}) {
  const [notifOpen, setNotifOpen] = useState(false)
  const ref = useRef(null)
  const unread = messages.filter((m) => m.unread)

  useEffect(() => {
    function onClickAway(e) {
      if (ref.current && !ref.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', onClickAway)
    return () => document.removeEventListener('mousedown', onClickAway)
  }, [])

  return (
    <header className="admin-topbar">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="icon-btn lg:hidden has-tip"
        data-tip="Menu"
        aria-label="Open navigation"
      >
        <FiMenu size={19} />
      </button>

      <div className="flex flex-col min-w-0 mr-auto lg:hidden">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted leading-none">
          Admin Panel
        </span>
        <span className="text-sm font-extrabold text-content leading-tight truncate">
          {title}
        </span>
      </div>

      <div className="admin-search hidden lg:flex">
        <span className="admin-search-icon">
          <FiSearch size={16} />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search projects, messages…"
          aria-label="Search dashboard"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto lg:ml-0">
        <button
          type="button"
          onClick={onToggleTheme}
          className="icon-btn has-tip"
          data-tip={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            className="icon-btn has-tip"
            data-tip="Notifications"
            aria-label="Notifications"
            aria-expanded={notifOpen}
          >
            <FiBell size={18} />
            {unread.length > 0 && <span className="icon-btn-dot" />}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute right-0 top-[calc(100%+0.6rem)] w-[min(20rem,calc(100vw-2rem))] rounded-2xl p-2 z-[90] border border-border-strong bg-[var(--c-elevated)] shadow-[0_24px_56px_-20px_rgba(2,6,23,0.5)]"
              >
                <div className="flex items-center justify-between px-2.5 py-2">
                  <p className="text-sm font-extrabold text-content">Notifications</p>
                  <span className="text-[10px] font-bold text-primary bg-primary/12 border border-primary/25 px-2 py-0.5 rounded-full">
                    {unread.length} new
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto scrollbar-none flex flex-col gap-1">
                  {unread.slice(0, 5).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setNotifOpen(false)
                        onNavigate('messages')
                      }}
                      className="w-full text-left flex gap-2.5 p-2.5 rounded-xl hover:bg-surface-2 transition-colors duration-200"
                    >
                      <span className="w-8 h-8 rounded-lg grid place-items-center flex-none bg-primary/12 text-primary border border-primary/25">
                        <FiMail size={15} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold text-content truncate">
                          {m.name}
                        </span>
                        <span className="block text-[11px] text-muted truncate">
                          {m.subject}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNotifOpen(false)
                    onNavigate('messages')
                  }}
                  className="w-full mt-1 py-2 rounded-xl text-xs font-bold text-primary hover:bg-primary/10 transition-colors duration-200"
                >
                  View all messages
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className="has-tip flex-none"
          data-tip="Your profile"
          aria-label="Your profile"
        >
          <img
            src={site.profileImage}
            alt={site.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-border-strong hover:border-primary transition-colors duration-300"
          />
        </button>
      </div>
    </header>
  )
}
