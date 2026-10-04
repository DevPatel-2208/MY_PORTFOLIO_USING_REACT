import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowUp, FiHeart, FiMail, FiMapPin, FiDownload, FiArrowRight } from 'react-icons/fi'
import { navLinks, site } from '../../data/site'
import SocialLinks from '../ui/SocialLinks'
import { resumeBurst } from '../../utils/confetti'

const exploreLinks = navLinks.slice(0, 5)
const moreLinks = navLinks.slice(5)

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function FooterColumn({ title, links }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.nav variants={item} aria-label={`${title} links`} className="text-center md:text-left">
      <h4 className="footer-heading">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((link, i) => (
          <motion.li
            key={link.href}
            initial={reduceMotion ? false : { opacity: 0, x: -10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.04, duration: 0.4 }}
          >
            <a href={link.href} className="footer-link">
              <span className="footer-link-dot" aria-hidden="true" />
              <span>{link.label}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const reduceMotion = useReducedMotion()

  return (
    <footer className="site-footer relative overflow-hidden border-t border-border">
      {/* Gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden="true" />
      {/* Soft glow décor */}
      <div className="footer-glow" aria-hidden="true" />
      <div className="footer-grid-lines" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-8">
        <motion.div
          variants={container}
          initial={reduceMotion ? undefined : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]"
        >
          {/* Brand */}
          <motion.div variants={item} className="text-center md:text-left">
            <a href="#home" className="group inline-flex items-center gap-3" aria-label={`${site.name} home`}>
              <span className="w-11 h-11 rounded-2xl bg-gradient-accent grid place-items-center text-white font-black text-sm shadow-glow transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                {site.initials}
              </span>
              <span className="flex flex-col text-left leading-none">
                <span className="font-extrabold tracking-widest text-content">{site.fullName.toUpperCase()}</span>
                <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  {site.role}
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-xs mx-auto md:mx-0 text-sm text-muted leading-relaxed">
              {site.tagline} Currently open to internships and freelance opportunities.
            </p>
            <div className="mt-6 flex justify-center md:justify-start">
              <SocialLinks links={site.socials} />
            </div>
          </motion.div>

          {/* Explore */}
          <FooterColumn title="Explore" links={exploreLinks} />

          {/* More */}
          <FooterColumn title="More" links={moreLinks} />

          {/* Connect */}
          <motion.div variants={item} className="text-center md:text-left">
            <h4 className="footer-heading">Let&apos;s Connect</h4>
            <ul className="mt-4 space-y-3 inline-flex flex-col items-center md:items-stretch">
              <li>
                <a href={`mailto:${site.email}`} className="footer-contact group">
                  <span className="footer-contact-icon">
                    <FiMail className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="truncate">{site.email}</span>
                </a>
              </li>
              <li>
                <span className="footer-contact">
                  <span className="footer-contact-icon">
                    <FiMapPin className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="truncate">{site.location}</span>
                </span>
              </li>
            </ul>

            <a href={site.resume} target="_blank" rel="noopener noreferrer" onClick={resumeBurst} className="footer-cta group">
              <span className="footer-cta-icon">
                <FiDownload className="w-4 h-4" aria-hidden="true" />
              </span>
              <span>Download Resume</span>
              <FiArrowRight className="footer-cta-arrow w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted text-center sm:text-left">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-muted">
            Crafted with
            <FiHeart className="w-3.5 h-3.5 text-accent animate-pulse" aria-hidden="true" />
            using React &amp; Tailwind
          </p>
          <a href="#home" aria-label="Back to top" className="footer-totop group">
            <FiArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
            <span>Back to top</span>
          </a>
        </div>
      </div>
    </footer>
  )
}