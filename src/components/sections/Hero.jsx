import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiDownload, FiMapPin, FiMousePointer } from 'react-icons/fi'
import { SiReact, SiNodedotjs, SiMongodb, SiExpress } from 'react-icons/si'
import { typedRoles, heroStats, site } from '../../data/site'
import SocialLinks from '../ui/SocialLinks'
import AnimatedNumber from '../ui/AnimatedNumber'
import Button from '../ui/Button'

function useTypewriter(words) {
  const [text, setText] = useState('')
  const ref = useRef({
    wordIndex: 0,
    charIndex: 0,
    deleting: false,
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return undefined
    }

    let timeout
    const tick = () => {
      const state = ref.current
      const current = words[state.wordIndex]

      if (!state.deleting) {
        state.charIndex += 1
        setText(current.slice(0, state.charIndex))
        if (state.charIndex === current.length) {
          state.deleting = true
          timeout = setTimeout(tick, 1900)
          return
        }
        timeout = setTimeout(tick, 80)
      } else {
        state.charIndex -= 1
        setText(current.slice(0, state.charIndex))
        if (state.charIndex === 0) {
          state.deleting = false
          state.wordIndex = (state.wordIndex + 1) % words.length
        }
        timeout = setTimeout(tick, 40)
      }
    }

    timeout = setTimeout(tick, 600)
    return () => clearTimeout(timeout)
  }, [words])

  return text
}

const floatingTech = [
  {
    icon: SiReact,
    label: 'React',
    pos: 'top-1/2 -translate-y-1/2 -left-3 sm:-top-5 sm:translate-y-0 sm:-left-8',
    delay: 0.2,
    color: '#61dafb',
  },
  {
    icon: SiNodedotjs,
    label: 'Node.js',
    pos: 'top-1/2 -translate-y-1/2 -right-3 sm:-right-10',
    delay: 0.4,
    color: '#68a063',
  },
  {
    icon: SiMongodb,
    label: 'MongoDB',
    pos: '-bottom-3 -left-2 sm:bottom-8 sm:-left-12',
    delay: 0.6,
    color: '#4faa41',
  },
  {
    icon: SiExpress,
    label: 'Express',
    pos: '-bottom-3 -right-2 sm:-bottom-5 sm:right-6',
    delay: 0.8,
    color: 'var(--c-content)',
  },
]

export default function Hero() {
  const typed = useTypewriter(typedRoles)

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/*
          Single source of truth for both layouts:
          - Mobile (1 column): badge -> portrait -> intro -> socials/stats via `order`
          - Desktop (2 columns): badge/intro/socials stacked left, portrait centered right
            via explicit `lg:col-start` / `lg:row-start` placement.
        */}
        <div className="grid grid-cols-1 items-center gap-x-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-8">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-none lg:col-start-1 lg:row-start-1 flex justify-center lg:justify-start"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold glass border-accent/30"
              style={{ color: 'var(--c-accent)' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              {site.availability}
            </span>
          </motion.div>

          {/* Portrait — sits right below the badge on mobile, right column on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:self-center relative flex items-center justify-center mt-6 lg:mt-0"
          >
            <div className="relative w-[70vw] h-[70vw] max-w-[18rem] min-w-[15rem] sm:w-80 sm:h-80 lg:w-96 lg:h-96 lg:max-w-full">
              {/* Rotating dashed ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1.5px dashed var(--c-primary)',
                  animation: 'spinSlow 26s linear infinite',
                }}
                aria-hidden="true"
              />
              {/* Glow */}
              <div
                className="absolute inset-4 rounded-full animate-blob"
                style={{ background: 'var(--glow-b)', filter: 'blur(50px)' }}
                aria-hidden="true"
              />

              {/* Portrait */}
              <div className="absolute inset-6 rounded-full overflow-hidden glass-strong p-1.5">
                <img
                  src="/image%20dev.jpeg"
                  alt={`${site.name} — ${site.role}`}
                  className="w-full h-full object-cover rounded-full"
                  width={384}
                  height={384}
                  fetchPriority="high"
                />
              </div>

              {/* Floating tech badges */}
              {floatingTech.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.15, type: 'spring', stiffness: 260, damping: 18 }}
                  className={`absolute ${t.pos} animate-float`}
                  style={{ animationDelay: `${i * 1.2}s` }}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl glass-strong shadow-md">
                    <t.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: t.color }} aria-hidden="true" />
                    <span className="text-[11px] sm:text-xs font-bold text-content whitespace-nowrap">{t.label}</span>
                  </div>
                </motion.div>
              ))}

              {/* Corner badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: 'spring' }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-strong shadow-md hidden sm:block"
              >
                <span className="text-xs font-bold text-gradient">3+ yrs learning</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Intro */}
          <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 text-center lg:text-left">
            <motion.div variants={container} initial="hidden" animate="visible">
              <motion.p variants={item} className="mt-6 text-lg md:text-xl text-muted">
                Hi there, I'm
              </motion.p>

              <motion.h1
                variants={item}
                className="mt-1 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-gradient-heading"
              >
                {site.name}
              </motion.h1>

              <motion.div
                variants={item}
                className="mt-4 flex items-center justify-center lg:justify-start gap-2 min-h-[2.5rem]"
              >
                <span className="text-lg sm:text-2xl font-semibold text-muted">I'm a</span>
                <span className="text-lg sm:text-2xl font-bold text-gradient text-left" aria-live="polite">
                  {typed}
                </span>
                <span className="w-0.5 h-6 sm:h-7 bg-gradient-accent rounded-full animate-pulse" aria-hidden="true" />
              </motion.div>

              <motion.p
                variants={item}
                className="mt-5 text-base md:text-lg text-content/80 max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty"
              >
                Building end-to-end web applications with the modern JavaScript stack and AI
                integration — from database design to cloud deployment.
              </motion.p>

              <motion.p
                variants={item}
                className="mt-4 inline-flex items-center gap-2 text-sm text-muted"
              >
                <FiMapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                {site.location}
              </motion.p>

              <motion.div
                variants={item}
                className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3"
              >
                <Button href="#contact" size="lg">
                  Hire Me
                  <FiArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button href="#projects" variant="outline" size="lg">
                  View Projects
                </Button>
                <motion.a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="click"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold tracking-wide text-content transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-xl p-px bg-gradient-to-r from-primary/70 via-secondary/70 to-primary/70 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="block h-full w-full rounded-[11px] bg-surface/80 backdrop-blur-sm group-hover:bg-surface-2 transition-colors duration-300" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_28px_-6px_var(--c-primary)]"
                  />
                  <span className="relative grid place-items-center w-7 h-7 rounded-lg bg-gradient-accent text-white shadow-[0_6px_16px_-6px_var(--c-primary)] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <FiDownload
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-px group-hover:translate-y-px"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="relative">Resume</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Socials + stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="order-4 lg:order-none lg:col-start-1 lg:row-start-3 mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
          >
            <SocialLinks links={site.socials} />

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-black text-gradient">
                    <AnimatedNumber
                      end={stat.value}
                      decimals={stat.decimals || 0}
                      suffix={stat.suffix || ''}
                    />
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-muted hover:text-primary transition-colors"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">Scroll</span>
        <FiMousePointer className="w-5 h-5 animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
