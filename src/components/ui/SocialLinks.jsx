import { FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi'

const iconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  mail: FiMail,
  location: FiMapPin,
}

/* Professional brand tiles — solid brand gradients with a white glyph, so the
   icon is legible in BOTH light and dark mode (never white-on-white or
   black-on-black). `glow` feeds the themed drop shadow. */
const brandMap = {
  github: {
    bg: 'linear-gradient(135deg, #2b3138, #12161c)',
    glow: 'rgba(43, 49, 56, 0.5)',
    label: 'GitHub',
  },
  linkedin: {
    bg: 'linear-gradient(135deg, #0a66c2, #0a4f97)',
    glow: 'rgba(10, 102, 194, 0.55)',
    label: 'LinkedIn',
  },
  mail: {
    bg: 'linear-gradient(135deg, #ea4335, #c5221f)',
    glow: 'rgba(234, 67, 53, 0.55)',
    label: 'Email',
  },
  location: {
    bg: 'linear-gradient(135deg, var(--c-primary), var(--c-secondary))',
    glow: 'rgba(99, 102, 241, 0.55)',
    label: 'Location',
  },
}

const fallback = brandMap.github

export default function SocialLinks({ links, className = '', size = 'w-11 h-11', iconSize = 'w-5 h-5' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map((link) => {
        const Icon = iconMap[link.icon] || FiGithub
        const brand = brandMap[link.icon] || fallback
        return (
          <a
            key={link.id}
            href={link.url}
            target={link.url.startsWith('mailto') ? undefined : '_blank'}
            rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            aria-label={link.label}
            title={link.label}
            className={`social-brand ${size} rounded-xl flex items-center justify-center text-white ring-1 ring-inset ring-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
            style={{ backgroundImage: brand.bg, '--brand-glow': brand.glow }}
          >
            <Icon className={iconSize} aria-hidden="true" />
          </a>
        )
      })}
    </div>
  )
}