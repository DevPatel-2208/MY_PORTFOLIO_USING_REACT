import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { HERO_DATA, NAV_LINKS } from '../../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <a href="#home" className="inline-block text-2xl font-black tracking-tighter text-text-main mb-4">
              DEV<span className="text-primary">.</span>
            </a>
            <p className="text-text-muted text-sm max-w-sm mb-6 leading-relaxed">
              Building highly scalable and visually stunning web applications with modern architectures and clean code.
            </p>
            <div className="flex gap-4">
              <a href={HERO_DATA.githubLink} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-surface-hover text-text-muted hover:text-primary transition-colors">
                <FiGithub className="w-5 h-5" />
              </a>
              <a href={HERO_DATA.linkedinLink} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-surface-hover text-text-muted hover:text-primary transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${HERO_DATA.email}`} className="p-2.5 rounded-lg bg-surface-hover text-text-muted hover:text-primary transition-colors">
                <FiMail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-text-muted hover:text-primary text-sm font-medium transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">Availability</h3>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Open for Opportunities
            </div>
            <p className="text-text-muted text-sm mb-6">
              Currently available for full-time roles and freelance projects. Let's build something amazing together.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm font-medium">
            &copy; {new Date().getFullYear()} {HERO_DATA.name}. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-surface-hover text-text-muted hover:text-primary transition-colors hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
