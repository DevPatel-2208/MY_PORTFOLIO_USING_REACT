import { motion, useReducedMotion } from 'framer-motion'
import { FiBookOpen, FiAward, FiStar, FiFileText } from 'react-icons/fi'
import { HiAcademicCap } from 'react-icons/hi2'
import { FaTrophy } from 'react-icons/fa'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import TiltCard from '../ui/TiltCard'
import { educationTimeline, bcaSemesters, mcaSemesters } from '../../data/education'

const iconMap = {
  education: HiAcademicCap,
}

const highlightIcon = {
  trophy: FaTrophy,
  medal: FiAward,
  star: FiStar,
  code: FiBookOpen,
  gpa: FiFileText,
}

const timelineLine =
  'linear-gradient(to bottom, transparent, rgba(147,51,234,0.75), rgba(147,51,234,1), rgba(147,51,234,0.75), transparent)'

function EducationCard({ item }) {
  return (
    <article className="group gradient-border-card relative rounded-3xl glass p-5 sm:p-6 md:p-8 transition-[box-shadow,border-color,background-color] duration-500 hover:border-primary/40 hover:shadow-glow hover:bg-surface-2/70 [transform-style:preserve-3d]">
      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
        style={{ boxShadow: 'inset 0 0 0 1px var(--c-primary), 0 0 36px -12px var(--c-primary)' }}
        aria-hidden="true"
      />

      <div className="relative flex flex-wrap items-center gap-2 sm:gap-3 mb-3 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(32px)]">
        <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-primary/12 text-primary border border-primary/25">
          {item.period}
        </span>
        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider bg-accent/12 text-accent border border-accent/25">
          {item.type === 'education' ? 'Education' : 'Experience'}
        </span>
      </div>

      <h3 className="relative text-lg sm:text-xl md:text-2xl font-bold text-content leading-snug break-words transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(30px)]">
        {item.title}
      </h3>
      <p className="relative text-sm font-semibold text-primary mt-1 break-words transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(26px)]">
        {item.place}
      </p>
      <p className="relative text-sm text-muted mt-3 leading-relaxed transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(20px)]">
        {item.summary}
      </p>

      <ul className="relative mt-4 space-y-2.5 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(16px)]">
        {item.highlights.map((h) => {
          const HI = highlightIcon[h.icon] || FiAward
          return (
            <li key={h.text} className="flex items-start gap-2.5 text-sm text-muted">
              <span className="mt-0.5 w-7 h-7 rounded-lg bg-accent/12 grid place-items-center text-accent shrink-0">
                <HI className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
              <span className="min-w-0 break-words">{h.text}</span>
            </li>
          )
        })}
      </ul>

      {item.metric && (
        <div className="relative mt-5 pt-5 border-t border-border transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(30px)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">{item.metric.label}</span>
            <span className="text-lg font-black text-gradient">{item.metric.value}</span>
          </div>
          <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.metric.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-accent"
            />
          </div>
        </div>
      )}
    </article>
  )
}

function SemesterCard({ sem, gpa, width, rank, upcoming, index }) {
  return (
    <Reveal delay={index * 0.05} amount={0.3} className="h-full">
      <TiltCard className="h-full" max={14} scale={1.04}>
        <div className="group relative h-full rounded-2xl glass p-5 transition-[box-shadow,border-color,background-color] duration-500 hover:border-primary/40 hover:shadow-glow hover:bg-surface-2/70 [transform-style:preserve-3d]">
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
            style={{ boxShadow: 'inset 0 0 0 1px var(--c-primary), 0 0 28px -10px var(--c-primary)' }}
            aria-hidden="true"
          />
          <div className="relative flex items-center justify-between gap-2 mb-3 [transform-style:preserve-3d]">
            <h5 className="text-sm font-bold text-content transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(30px)]">
              {sem}
            </h5>
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold text-white shrink-0 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(44px)] ${
                upcoming ? 'bg-slate-500/60' : 'bg-gradient-accent'
              }`}
            >
              {gpa}
            </span>
          </div>
          <div className="relative h-2 rounded-full bg-surface-2 overflow-hidden transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(18px)]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${width}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full rounded-full ${upcoming ? 'bg-slate-500/60' : 'bg-gradient-accent'}`}
            />
          </div>
          {rank && (
            <div className="relative mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-accent transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(26px)]">
              <FaTrophy className="w-3.5 h-3.5" aria-hidden="true" />
              {rank}
            </div>
          )}
        </div>
      </TiltCard>
    </Reveal>
  )
}

function TimelineIcon({ item, index, reduceMotion }) {
  const Icon = iconMap[item.type] || HiAcademicCap

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 + index * 0.15 }}
      className="relative z-10 shrink-0 flex items-center gap-x-2 sm:gap-x-3 md:gap-x-4"
    >
      <span className="relative flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-purple-500/25 blur-lg animate-pulse" aria-hidden="true" />
        <span className="relative flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-accent text-white shadow-[0_8px_30px_-6px_rgba(147,51,234,0.6)] ring-1 ring-inset ring-white/40">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </span>
      </span>
      <span className="hidden text-xs font-bold tracking-wider text-muted whitespace-nowrap sm:inline sm:text-sm">
        {item.year}
      </span>
    </motion.div>
  )
}

function TimelineEndpoint({ reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
      className="relative z-10 shrink-0 flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14"
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full bg-purple-500/30 blur-lg animate-pulse" />
      <span className="absolute inset-0 rounded-full bg-purple-500/40 animate-ping" />
      <span className="relative h-3.5 w-3.5 rounded-full bg-gradient-accent shadow-glow" />
    </motion.div>
  )
}

export default function Education({ onShowResults }) {
  const reduceMotion = useReducedMotion()

  return (
    <section id="education" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="My Journey"
          title="Education"
          description="A consistent academic track record built on discipline, curiosity, and a love for engineering."
        />

        {/* Timeline — three independent layers */}
        <div className="relative max-w-5xl mx-auto">
          {/* Layer 1: continuous vertical line (left rail, stays inside container) */}
          <motion.div
            initial={reduceMotion ? false : { scaleY: 0 }}
            whileInView={reduceMotion ? undefined : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="education-rail-line"
            style={{ background: timelineLine }}
            aria-hidden="true"
          />

          {/* Layer 2 + 3: rows (icon | gap | card) */}
          {educationTimeline.map((item, i) => (
            <div
              key={item.id}
              className={`relative flex items-start ${
                i < educationTimeline.length - 1 ? 'mb-10 sm:mb-12 md:mb-14' : ''
              }`}
            >
              {/* Icon */}
              <TimelineIcon item={item} index={i} reduceMotion={reduceMotion} />

              {/* Gap */}
              <div className="w-3.5 sm:w-5 md:w-6 shrink-0" />

              {/* Card */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 min-w-0"
              >
                <TiltCard max={10} scale={1.015}>
                  <EducationCard item={item} />
                </TiltCard>
              </motion.div>
            </div>
          ))}

          {/* Endpoint */}
          <div className="relative flex items-center pt-5 sm:pt-6 md:pt-8">
            <TimelineEndpoint reduceMotion={reduceMotion} />
            <div className="w-3.5 sm:w-5 md:w-6 shrink-0" />
            <div className="flex-1 min-w-0" />
          </div>
        </div>

        {/* Semester performance */}
        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="gradient-border-card rounded-3xl glass-strong p-6 md:p-8 h-full">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <h4 className="text-lg font-bold text-content">BCA Semester-wise</h4>
                  <p className="text-xs text-muted mt-0.5">Bachelor of Computer Applications</p>
                </div>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-accent/12 text-accent border border-accent/25">
                  CGPA 9.62
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {bcaSemesters.map((s, i) => (
                  <SemesterCard key={s.sem} {...s} index={i} />
                ))}
              </div>
              <div className="text-center mt-6">
                <Button onClick={onShowResults} variant="outline">
                  <FiFileText className="w-4 h-4" aria-hidden="true" />
                  View All Results
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="gradient-border-card rounded-3xl glass-strong p-6 md:p-8 h-full">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <h4 className="text-lg font-bold text-content">MCA Semester-wise</h4>
                  <p className="text-xs text-muted mt-0.5">Master of Computer Applications</p>
                </div>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-primary/12 text-primary border border-primary/25">
                  Sem 2 GPA 9.68
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {mcaSemesters.map((s, i) => (
                  <SemesterCard key={s.sem} {...s} index={i} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
