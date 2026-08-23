import { FiCalendar, FiCheckCircle, FiExternalLink } from 'react-icons/fi'
import { FaUniversity, FaGithub } from 'react-icons/fa'
import { experience } from '../../data/experience'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Badge from '../ui/Badge'

function ExperienceActions({ experience, layout = 'mobile' }) {
  const base =
    layout === 'mobile'
      ? 'flex-1 justify-center text-[13px] px-3 py-2.5'
      : 'flex-1 sm:flex-none sm:min-w-[180px] justify-center text-sm px-5 py-2.5'
  return (
    <div className="mt-5 pt-5 border-t border-border flex flex-col sm:flex-row gap-3">
      <a
        href={experience.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-xl font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 bg-gradient-accent text-white shadow-[0_12px_28px_-12px_var(--c-primary)] ${base}`}
      >
        <FiExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
        Live Demo
      </a>
      <a
        href={experience.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-xl font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 border border-border-strong text-content bg-surface/40 hover:bg-surface-2 hover:border-primary/50 ${base}`}
      >
        <FaGithub className="w-4 h-4 shrink-0" aria-hidden="true" />
        Source Code
      </a>
    </div>
  )
}

function MobileExperienceCard({ experience }) {
  return (
    <article className="mobile-exp-card rounded-[22px] glass-strong p-5 sm:p-6 shadow-soft">
      <header>
        <div className="flex items-center justify-between gap-3">
          <span className="flex w-11 h-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-accent text-white ring-1 ring-inset ring-white/25 shadow-[0_2px_14px_-4px_color-mix(in_srgb,var(--c-primary)_60%,transparent)]">
            <experience.icon className="w-5 h-5" aria-hidden="true" />
          </span>
          <Badge tone="accent">{experience.type}</Badge>
        </div>

        <div className="mt-4">
          <h3 className="text-[22px] font-semibold leading-[1.3] tracking-tight text-content text-balance">
            {experience.role}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <FaUniversity className="w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="text-[16px] font-semibold text-primary">{experience.place}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-[13px] font-medium text-muted">
            <FiCalendar className="w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
            {experience.period}
          </div>
        </div>
      </header>

      <p className="mt-5 pt-5 border-t border-border text-[14px] leading-[1.7] text-muted text-pretty">
        {experience.description}
      </p>

      <div className="mt-5 pt-5 border-t border-border">
        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Key Technologies
        </h4>
        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-accent/10 text-accent border border-accent/25"
            >
              <FiCheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-border">
        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Highlights
        </h4>
        <ul className="space-y-3">
          {experience.highlights.map((h) => (
            <li key={h.title} className="rounded-2xl glass p-4">
              <div className="flex items-center gap-3">
                <span className="flex w-11 h-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 text-primary">
                  <h.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h5 className="text-[16px] font-semibold leading-snug text-content">{h.title}</h5>
              </div>
              <p className="mt-3 text-[14px] leading-[1.65] text-muted text-pretty">{h.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <ExperienceActions experience={experience} layout="mobile" />
    </article>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="My Journey"
          title="Professional Experience"
          description="Hands-on industry exposure building production-grade, AI-powered systems with the MERN stack."
        />

        {/* ═══════ MOBILE EXPERIENCE (< md) ═══════ */}
        <div className="md:hidden max-w-lg mx-auto">
          <Reveal>
            <MobileExperienceCard experience={experience} />
          </Reveal>
        </div>

        {/* ═══════ DESKTOP EXPERIENCE (md+) ═══════ */}
        <div className="hidden md:block max-w-4xl mx-auto">
          <Reveal>
            <div className="gradient-border-card rounded-3xl glass-strong p-6 md:p-10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 pb-7 mb-8 border-b border-border">
                <span className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-gradient-accent grid place-items-center text-white shadow-glow">
                  <experience.icon className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-content">{experience.role}</h3>
                    <Badge tone="accent">{experience.type}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <FaUniversity className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                      {experience.place}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiCalendar className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                      {experience.period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <ul className="grid md:grid-cols-2 gap-4 md:gap-5">
                {experience.highlights.map((h) => (
                  <li
                    key={h.title}
                    className="group flex items-start gap-3.5 rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
                  >
                    <span className="mt-0.5 w-10 h-10 shrink-0 rounded-xl bg-primary/12 text-primary grid place-items-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <h.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-content flex items-center gap-1.5">
                        {h.title}
                      </h4>
                      <p className="mt-1 text-[13px] text-muted leading-relaxed">{h.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2.5 mt-8 pt-7 border-t border-border">
                {experience.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/25"
                  >
                    <FiCheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>

              <ExperienceActions experience={experience} layout="desktop" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
