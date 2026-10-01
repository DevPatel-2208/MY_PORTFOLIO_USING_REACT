import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { NAV_LINKS } from '../../data/portfolioData';
import { useTheme } from '../common/ThemeProvider';
import { cn } from '../../utils/cn';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={isHidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:py-4"
    >
      <div className="max-w-7xl mx-auto">
        <nav className="glass-card flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl">
          <a href="#home" className="text-xl font-black tracking-tighter text-text-main shrink-0">
            DEV<span className="text-primary">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-semibold transition-colors duration-200",
                  activeSection === link.href.substring(1) ? "text-primary" : "text-text-muted hover:text-text-main"
                )}
              >
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-surface hover:bg-surface-hover text-text-muted hover:text-text-main transition-colors border border-border"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            
            <a 
              href="/DEV_PATEL_RESAUME_FINAL.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white bg-text-main hover:bg-primary transition-colors rounded-xl"
            >
              Resume
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl bg-surface border border-border text-text-main"
            >
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="absolute top-full left-4 right-4 mt-2 p-4 glass-card rounded-2xl md:hidden flex flex-col gap-2 shadow-2xl"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "p-3 rounded-xl text-base font-semibold transition-colors",
                  activeSection === link.href.substring(1) 
                    ? "bg-primary/10 text-primary" 
                    : "text-text-muted hover:bg-surface-hover hover:text-text-main"
                )}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
