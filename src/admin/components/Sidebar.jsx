import { motion } from 'framer-motion'
import {
  FiGrid,
  FiBox,
  FiMail,
  FiUser,
  FiSettings,
  FiChevronsLeft,
  FiMoon,
  FiSun,
  FiExternalLink,
  FiX,
} from 'react-icons/fi'
import { site } from '../../data/site'

export const adminNav = [
  { id: 'overview', label: 'Overview', icon: FiGrid },
  { id: 'projects', label: 'Projects', icon: FiBox },
  { id: 'messages', label: 'Messages', icon: FiMail },
  { id: 'profile', label: 'Profile', icon: FiUser },
  { id: 'settings', label: 'Settings', icon: FiSettings },
]

export default function Sidebar({
  active,
  onNavigate,
  collapsed,
  onToggleCollapse,
  open,
  onClose,
  unreadCount = 0,
  theme,
  onToggleTheme,
}) {
  const initials = site.initials || 'DP'

  return (
    <aside
      className={`admin-sidebar ${open ? 'is-open' : ''}`}
      aria-label="Admin navigation"
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-1.5 py-1.5 mb-1.5">
        <div className="relative flex-none w-10 h-10 rounded-xl grid place-items-center bg-gradient-accent text-white font-extrabold shadow-[0_8px_20px_-8px_var(--c-primary)]">
          {initials}
          <span className="absolute -inset-0.5 rounded-xl ring-1 ring-inset ring-white/20" />
        </div>
        <div className="min-w-0 sidebar-hide-on-collapse">
          <p className="text-sm font-extrabold text-content leading-tight truncate">
            {site.name}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted truncate">
            Admin Panel
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="icon-btn lg:hidden ml-auto has-tip"
          data-tip="Close"
          aria-label="Close navigation"
        >
          <FiX size={17} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1 min-h-0 overflow-y-auto scrollbar-none">
        <p className="sidebar-hide-on-collapse px-3 pb-1 pt-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
          Workspace
        </p>
        {adminNav.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          const badge = item.id === 'messages' && unreadCount > 0 ? unreadCount : null
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`nav-link has-tip ${isActive ? 'is-active' : ''}`}
              data-tip={collapsed ? item.label : undefined}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="nav-link-icon">
                <Icon size={18} />
              </span>
              <span className="nav-link-label">{item.label}</span>
              {badge !== null && (
                <span className="nav-link-badge">{badge}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-border">
        <button
          type="button"
          onClick={onToggleTheme}
          className="nav-link has-tip"
          data-tip={collapsed ? (theme === 'dark' ? 'Light mode' : 'Dark mode') : undefined}
        >
          <span className="nav-link-icon">
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </span>
          <span className="nav-link-label">
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </span>
        </button>

        <a href="/" className="nav-link has-tip" data-tip={collapsed ? 'View live site' : undefined}>
          <span className="nav-link-icon">
            <FiExternalLink size={18} />
          </span>
          <span className="nav-link-label">View live site</span>
        </a>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="nav-link sidebar-hide-on-collapse has-tip hidden lg:flex"
          data-tip="Collapse sidebar"
          aria-label="Collapse sidebar"
        >
          <span className="nav-link-icon">
            <FiChevronsLeft
              size={18}
              className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            />
          </span>
          <span className="nav-link-label">Collapse</span>
        </button>

        <div className="sidebar-hide-on-collapse flex items-center gap-2.5 px-2 pt-1.5">
          <img
            src={site.profileImage}
            alt={site.name}
            loading="lazy"
            className="w-8 h-8 rounded-full object-cover flex-none border border-border-strong"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-content truncate leading-tight">
              {site.name}
            </p>
            <p className="text-[10px] text-muted truncate">{site.role}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
