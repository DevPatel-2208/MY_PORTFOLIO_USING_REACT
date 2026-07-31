import { useMemo, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { FiZoomIn } from 'react-icons/fi'
import {
  LuAward,
  LuGraduationCap,
  LuMedal,
  LuCodeXml,
  LuBrain,
  LuBookOpen,
  LuArrowUpRight,
} from 'react-icons/lu'
import { achievementStats, achievementImages } from '../../data/achievements'
import Reveal from '../ui/Reveal'
import Badge from '../ui/Badge'
import AnimatedNumber from '../ui/AnimatedNumber'
import Modal from '../ui/Modal'

const gradients = {
  blue: { from: '#3b82f6', to: '#6366f1', glow: 'rgba(59, 130, 246, 0.45)' },
  purple: { from: '#8b5cf6', to: '#a855f7', glow: 'rgba(139, 92, 246, 0.45)' },
  orange: { from: '#f97316', to: '#f59e0b', glow: 'rgba(249, 115, 22, 0.45)' },
  cyan: { from: '#06b6d4', to: '#3b82f6', glow: 'rgba(6, 182, 212, 0.45)' },
  green: { from: '#10b981', to: '#22c55e', glow: 'rgba(16, 185, 129, 0.45)' },
  pink: { from: '#ec4899', to: '#f43f5e', glow: 'rgba(236, 72, 153, 0.45)' },
}

const cards = [
  {
    icon: LuAward,
    gradient: gradients.blue,
    badge: '10+ Certifications',
    title: 'Industry-Recognized Credentials',
    subtitle: 'IBM · Microsoft · HackerRank · GitHub',
    description:
      'Earned certifications from IBM, Microsoft, HackerRank, GitHub, and Unstop in Full Stack Development, AI, and Web Technologies.',
  },
  {
    icon: LuGraduationCap,
    gradient: gradients.purple,
    badge: '9.62 CGPA',
    title: 'College Rank 4 Overall',
    subtitle: 'Bachelor of Computer Applications',
    description:
      'Maintained consistent academic excellence throughout the BCA program with a cumulative CGPA of 9.62 and secured College Rank 4.',
  },
  {
    icon: LuMedal,
    gradient: gradients.orange,
    badge: 'Rank 3',
    title: 'University Rank in MCA',
    subtitle: 'MCA — Semester 1',
    description:
      'Achieved University Rank 3 in MCA Semester 1 with a GPA of 9.28, demonstrating continued academic excellence.',
  },
  {
    icon: LuCodeXml,
    gradient: gradients.cyan,
    badge: '6+ Projects',
    title: 'Production-Ready Applications',
    subtitle: 'MERN · PHP · ASP.NET',
    description:
      'Developed full-stack applications using MERN, PHP, and ASP.NET with AI integration, authentication, payment gateways, cloud deployment, and real-time features.',
  },
  {
    icon: LuBrain,
    gradient: gradients.green,
    badge: 'AI & RAG',
    title: 'AI-Powered Systems',
    subtitle: 'RAG · Groq LLM · Pinecone',
    description:
      'Designed intelligent applications using Retrieval-Augmented Generation (RAG), Groq LLM, Pinecone vector search, conversational AI, and modern AI workflows.',
  },
  {
    icon: LuBookOpen,
    gradient: gradients.pink,
    badge: 'Open Source',
    title: 'Continuous Learning',
    subtitle: 'Code · Research · Growth',
    description:
      'Continuously improving development skills through open-source contributions, modern technologies, certifications, AI research, and hands-on real-world projects.',
  },
]

const PARTICLE_COUNT = 12

const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

function AchievementCard({ card, variants, reduceMotion }) {
  const { icon: Icon, gradient, badge, title, subtitle, description } = card

  return (
    <motion.article
      variants={variants}
      whileHover={reduceMotion ? {} : { y: -8, scale: 1.015 }}
      whileTap={reduceMotion ? {} : { scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 230, damping: 22 }}
      className="group relative h-full"
    >
      {/* Subtle top-left radial tint — adds depth, never covers content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle at top left, rgba(139, 92, 246, 0.10), transparent 60%)',
        }}
      />

      {/* Card body */}
      <div className="relative h-full rounded-3xl border border-border bg-surface-2/95 dark:bg-[rgba(20,24,38,0.88)] backdrop-blur-xl p-7 flex flex-col overflow-hidden shadow-soft transition-all duration-500 group-hover:border-secondary/50 group-hover:bg-white dark:group-hover:bg-[rgba(26,30,47,0.93)] group-hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)] dark:group-hover:shadow-[0_20px_50px_rgba(139,92,246,0.18)]">
        {/* Top row: badge + arrow */}
        <div className="relative flex items-center justify-between gap-3 mb-5">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-transform duration-500 group-hover:-translate-y-0.5"
            style={{
              color: gradient.from,
              background: `color-mix(in srgb, ${gradient.from} 10%, transparent)`,
              borderColor: `color-mix(in srgb, ${gradient.from} 30%, transparent)`,
            }}
          >
            {badge}
          </span>
          <span
            aria-hidden="true"
            className="relative grid place-items-center w-8 h-8 rounded-full text-white opacity-75 transition-all duration-500 group-hover:opacity-100 group-hover:brightness-110"
            style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
          >
            <LuArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-45" />
          </span>
        </div>

        {/* Icon */}
        <div className="relative w-14 h-14">
          <span
            aria-hidden="true"
            className="absolute -inset-1.5 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            style={{ background: gradient.glow }}
          />
          <div
            className="relative w-14 h-14 rounded-2xl grid place-items-center text-white transition-all duration-500 group-hover:scale-[1.08] group-hover:brightness-110"
            style={{
              background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
              boxShadow: `0 10px 30px -8px ${gradient.glow}`,
            }}
          >
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
        </div>

        {/* Title */}
        <h3 className="relative mt-5 text-lg xl:text-xl font-bold text-content leading-snug">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="relative mt-1.5 text-sm font-semibold tracking-wide" style={{ color: gradient.from }}>
          {subtitle}
        </p>

        {/* Description */}
        <p className="relative mt-3 text-sm text-muted leading-relaxed flex-1">{description}</p>
      </div>
    </motion.article>
  )
}

export default function Achievements() {
  const reduceMotion = useReducedMotion()
  const [selected, setSelected] = useState(null)
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        left: `${(i * 37 + 13) % 100}%`,
        top: `${(i * 53 + 29) % 100}%`,
        size: 2 + (i % 3),
        opacity: 0.15 + (i % 4) * 0.08,
        delay: `${(i % 5) * 1.3}s`,
        duration: `${7 + (i % 5) * 1.6}s`,
      })),
    [],
  )

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 20 })
  const sy = useSpring(my, { stiffness: 50, damping: 20 })
  const blobX = useTransform(sx, [-0.5, 0.5], [-36, 36])
  const blobY = useTransform(sy, [-0.5, 0.5], [-24, 24])
  const blobX2 = useTransform(sx, [-0.5, 0.5], [28, -28])
  const blobY2 = useTransform(sy, [-0.5, 0.5], [18, -18])

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width - 0.5)
    my.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: reduceMotion ? 0 : 0.1 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 44, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 90, damping: 18 },
    },
  }

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      onMouseMove={handleMouseMove}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background FX — subtle, non-distracting */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-28 -left-28 w-96 h-96 rounded-full blur-3xl"
          style={{ x: blobX, y: blobY, background: 'var(--glow-a)' }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl"
          style={{ x: blobX2, y: blobY2, background: 'var(--glow-b)' }}
        />
        <motion.div
          className="absolute -bottom-36 left-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ x: blobX, y: blobY2, background: 'var(--glow-c)' }}
        />

        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-primary/40 animate-float-slow"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}

        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: noiseTexture }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Key Achievements heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Milestones &amp; Recognition
          </span>

          <h2
            id="achievements-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance"
          >
            <span className="text-gradient-heading">Key Achievements</span>
          </h2>

          {/* Animated gradient underline */}
          <motion.span
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="block relative w-24 h-[3px] mx-auto mt-6 rounded-full bg-gradient-to-r from-primary via-secondary to-accent overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="absolute inset-y-0 w-1/2 animate-shine"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)' }}
            />
          </motion.span>

          <p className="mt-5 text-base md:text-lg text-muted leading-relaxed text-balance">
            Academic excellence, technical expertise, industry certifications, and real-world project
            experience.
          </p>
        </motion.div>

        {/* Key Achievements — 6 cards */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8"
        >
          {cards.map((card) => (
            <AchievementCard
              key={card.title}
              card={card}
              variants={cardVariants}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>

        {/* Stats */}
        <Reveal className="mt-16 md:mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {achievementStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06} amount={0.4}>
                <div className="gradient-border-card rounded-3xl glass p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <div className="text-3xl md:text-4xl font-black text-gradient">
                    <AnimatedNumber end={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Gallery */}
        <Reveal className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <Badge tone="accent">Proof of Work</Badge>
            <h4 className="text-lg font-bold text-content">Achievement Gallery</h4>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {achievementImages.map((img, i) => (
            <Reveal key={img.src} delay={(i % 5) * 0.04} amount={0.2}>
              <motion.button
                type="button"
                onClick={() => setSelected(img)}
                whileHover={reduceMotion ? {} : { y: -4, scale: 1.02 }}
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
                className="relative group w-full rounded-2xl overflow-hidden cursor-pointer border border-border focus-visible:outline-2 focus-visible:outline-primary"
                style={{ aspectRatio: '4 / 5' }}
                aria-label={`View ${img.caption} (${img.label})`}
              >
                <img
                  src={img.src}
                  alt={`${img.label} — ${img.caption}`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95"
                  aria-hidden="true"
                />
                <span
                  className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${
                    img.extra ? 'bg-accent/90' : 'bg-primary/90'
                  }`}
                >
                  {img.label}
                </span>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white drop-shadow">{img.caption}</span>
                  <FiZoomIn
                    className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Modal open={!!selected} onClose={() => setSelected(null)} maxWidth="max-w-3xl">
        {selected && (
          <div className="p-4 sm:p-6">
            <img
              src={selected.src}
              alt={`${selected.label} — ${selected.caption}`}
              className="w-full rounded-2xl border border-border"
            />
            <p className="mt-4 text-center text-sm font-semibold text-content">
              {selected.label} — {selected.caption}
            </p>
          </div>
        )}
      </Modal>
    </section>
  )
}
