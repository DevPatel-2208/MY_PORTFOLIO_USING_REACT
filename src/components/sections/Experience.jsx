import { FiCalendar, FiExternalLink, FiGithub } from 'react-icons/fi'
import { FaUniversity, FaRobot } from 'react-icons/fa'
import { experience } from '../../data/experience'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="My Journey"
          title="Professional Experience"
          description="Hands-on industry exposure building production-grade, AI-powered systems with the MERN stack."
        />

        <div className="max-w-4xl mx-auto">
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

              {/* Project summary */}
              <div className="relative rounded-2xl overflow-hidden p-5 sm:p-7 mb-8 border border-border dark:border-white/10 bg-gradient-to-br from-white via-slate-50 to-indigo-50/60 dark:from-[#0c1326] dark:via-[#0a1022] dark:to-[#070c18] shadow-soft dark:shadow-[0_24px_50px_-24px_rgba(2,6,23,0.6)]">
                <div
                  className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-100"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(420px 180px at 18% 0%, rgba(99,102,241,0.14), transparent 60%), radial-gradient(360px 160px at 92% 10%, rgba(168,85,247,0.12), transparent 58%)',
                  }}
                />

                <div className="relative flex items-start gap-3 mb-4">
                  <span className="w-11 h-11 shrink-0 rounded-xl bg-gradient-accent text-white grid place-items-center shadow-glow">
                    <FaRobot className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg font-bold text-content leading-snug">{experience.projectName}</h4>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" aria-hidden="true" />
                      Flagship Internship Project
                    </span>
                  </div>
                </div>

                <p className="relative text-sm text-muted leading-relaxed mb-5">{experience.projectSummary}</p>

                {/* Tags */}
                <div className="relative flex flex-wrap gap-2 mb-6">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 dark:bg-white/10 dark:text-white dark:border-white/20 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-border dark:border-white/10">
                  <Button
                    href={experience.github}
                    external
                    variant="outlinePrimary"
                    className="w-full justify-center"
                  >
                    <FiGithub className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">View Code</span>
                  </Button>
                  <Button
                    href={experience.live}
                    external
                    className="w-full justify-center"
                  >
                    <FiExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">Live Demo</span>
                  </Button>
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
