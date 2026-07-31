import { FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi'

const iconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  mail: FiMail,
  location: FiMapPin,
}

export default function SocialLinks({ links, className = '', size = 'w-10 h-10', iconSize = 'w-5 h-5' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map((link) => {
        const Icon = iconMap[link.icon] || FiGithub
        return (
          <a
            key={link.id}
            href={link.url}
            target={link.url.startsWith('mailto') ? undefined : '_blank'}
            rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            aria-label={link.label}
            title={link.label}
            className={`${size} rounded-full flex items-center justify-center glass text-muted hover:text-white hover:bg-gradient-accent hover:border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_-10px_var(--c-primary)]`}
          >
            <Icon className={iconSize} />
          </a>
        )
      })}
    </div>
  )
}
