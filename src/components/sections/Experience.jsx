import { FiCalendar, FiCheckCircle } from 'react-icons/fi'
import { FaUniversity } from 'react-icons/fa'
import { experience } from '../../data/experience'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Badge from '../ui/Badge'

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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
