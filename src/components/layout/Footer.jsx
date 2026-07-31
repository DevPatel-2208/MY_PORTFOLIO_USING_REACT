import { FiArrowUp, FiHeart } from 'react-icons/fi'
import { navLinks, site } from '../../data/site'
import SocialLinks from '../ui/SocialLinks'

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/40 backdrop-blur-xl">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a href="#home" className="inline-flex items-center gap-2.5 group">
              <span className="w-10 h-10 rounded-xl bg-gradient-accent grid place-items-center text-white font-black text-sm shadow-[0_8px_20px_-8px_var(--c-primary)] transition-transform duration-300 group-hover:rotate-6">
                {site.initials}
              </span>
              <span className="font-extrabold tracking-widest text-content">{site.fullName.toUpperCase()}</span>
            </a>
            <p className="mt-2 text-sm text-muted">
              {site.role} &amp; MCA Candidate
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials + back to top */}
          <div className="flex items-center gap-4">
            <SocialLinks links={site.socials} />
            <a
              href="#home"
              aria-label="Back to top"
              className="w-10 h-10 rounded-full glass grid place-items-center text-muted hover:text-white hover:bg-gradient-accent hover:border-transparent transition-all duration-300 hover:-translate-y-1"
            >
              <FiArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-muted">
            Crafted with <FiHeart className="w-3.5 h-3.5 text-accent" aria-hidden="true" /> using React &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
