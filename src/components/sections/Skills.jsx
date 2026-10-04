import {
  skillCategories,
  techLogoList,
  toolsAndPlatforms,
  additionalLanguages,
} from '../../data/skills'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import TiltCard from '../ui/TiltCard'

function MarqueeRow() {
  const doubled = [...techLogoList, ...techLogoList]
  return (
    <div className="relative overflow-hidden py-2 mb-12 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="flex gap-4 w-max" style={{ animation: 'marquee 30s linear infinite' }}>
        {doubled.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl glass text-sm font-semibold text-muted whitespace-nowrap"
          >
            <tech.icon className="w-5 h-5 text-primary" aria-hidden="true" />
            {tech.name}
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillBadge({ skill }) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl glass p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
      <span className="w-11 h-11 shrink-0 rounded-xl bg-primary/12 text-primary grid place-items-center transition-transform duration-300 group-hover:scale-110">
        <skill.icon className="w-5 h-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <div className="text-sm font-bold text-content truncate">{skill.name}</div>
        <div className="text-[11px] text-muted truncate">{skill.note}</div>
      </div>
    </div>
  )
}

function ToolPill({ tool }) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl glass p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
      <span className="w-10 h-10 shrink-0 rounded-xl bg-accent/12 text-accent grid place-items-center transition-transform duration-300 group-hover:scale-110">
        <tool.icon className="w-5 h-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <div className="text-sm font-bold text-content truncate">{tool.name}</div>
        <div className="text-[11px] text-muted truncate">{tool.note}</div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Skills & Technologies"
          description="A modern toolkit for building full-stack products — from polished interfaces to robust backends and AI-powered features."
        />

        <MarqueeRow />

        {/* Specialization */}
        <Reveal className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-accent text-white text-sm sm:text-base font-bold shadow-glow">
            Full Stack MERN Developer
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="max-w-2xl mx-auto text-center text-sm sm:text-base leading-relaxed mb-12"
            style={{ color: 'var(--c-muted)' }}>
            Building end-to-end web applications with the modern JavaScript stack and AI integration —
            from database design to cloud deployment.
          </p>
        </Reveal>

        {/* Categories */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {skillCategories.map((category, catIndex) => (
            <Reveal key={category.id} delay={catIndex * 0.06} amount={0.15} className="h-full">
              <TiltCard className="h-full" max={11} scale={1.02}>
                <article className="group gradient-border-card relative h-full rounded-3xl glass p-6 md:p-7 transition-[box-shadow,border-color,background-color] duration-500 hover:border-primary/40 hover:shadow-glow hover:bg-surface-2/70 [transform-style:preserve-3d]">
                  {/* Glow border on hover */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                    style={{ boxShadow: 'inset 0 0 0 1px var(--c-primary), 0 0 36px -12px var(--c-primary)' }}
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start gap-3.5 pb-5 mb-5 border-b border-border [transform-style:preserve-3d]">
                    <span className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-accent grid place-items-center text-white shadow-glow transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-105 [transform:translateZ(0)] group-hover:[transform:translateZ(46px)]">
                      <category.icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 [transform-style:preserve-3d]">
                      <div className="flex flex-wrap items-center gap-2 mb-1 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(34px)]">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/12 text-primary border border-primary/25">
                          {category.chip}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-content leading-snug transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(30px)]">
                        {category.title}
                      </h3>
                      <p className="text-[12px] text-muted mt-0.5 leading-snug transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(22px)]">
                        {category.blurb}
                      </p>
                    </div>
                  </div>

                  <div className="relative grid gap-2.5 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(18px)]">
                    {category.skills.map((skill) => (
                      <SkillBadge key={skill.name} skill={skill} />
                    ))}
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Tools & Platforms */}
        <Reveal className="mb-6">
          <TiltCard max={8} scale={1.01}>
            <div className="group gradient-border-card relative rounded-3xl glass-strong p-6 md:p-8 transition-[box-shadow,border-color] duration-500 hover:border-primary/40 hover:shadow-glow [transform-style:preserve-3d]">
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                style={{ boxShadow: 'inset 0 0 0 1px var(--c-primary), 0 0 36px -12px var(--c-primary)' }}
                aria-hidden="true"
              />
              <div className="relative mb-6 [transform-style:preserve-3d]">
                <h4 className="text-lg font-bold text-content transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(30px)]">
                  Tools &amp; Platforms
                </h4>
                <p className="text-xs text-muted mt-0.5 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(22px)]">
                  Version control, development tools, deployment, and testing.
                </p>
              </div>
              <div className="relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(16px)]">
                {toolsAndPlatforms.map((tool) => (
                  <ToolPill key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>

        {/* Additional Languages */}
        <Reveal delay={0.05}>
          <TiltCard max={8} scale={1.01}>
            <div className="group gradient-border-card relative rounded-3xl glass-strong p-6 md:p-8 transition-[box-shadow,border-color] duration-500 hover:border-primary/40 hover:shadow-glow [transform-style:preserve-3d]">
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                style={{ boxShadow: 'inset 0 0 0 1px var(--c-primary), 0 0 36px -12px var(--c-primary)' }}
                aria-hidden="true"
              />
              <div className="relative mb-6 [transform-style:preserve-3d]">
                <h4 className="text-lg font-bold text-content transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(30px)]">
                  Additional Languages
                </h4>
                <p className="text-xs text-muted mt-0.5 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(22px)]">
                  Core programming languages for problem-solving and system development.
                </p>
              </div>
              <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(16px)]">
                {additionalLanguages.map((lang) => (
                  <ToolPill key={lang.name} tool={lang} />
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}
