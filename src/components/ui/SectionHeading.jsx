import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description }) {
  const reduce = useReducedMotion()
  const words = title.split(' ')

  return (
    <Reveal className="max-w-2xl mx-auto text-center mb-14 md:mb-16">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {eyebrow}
        </span>
      )}
      <h2
        aria-label={title}
        className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-balance"
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} aria-hidden="true">
            <motion.span
              className="text-gradient-heading inline-block"
              initial={reduce ? false : { opacity: 0, y: 16, filter: 'blur(10px)' }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-muted leading-relaxed text-balance">
          {description}
        </p>
      )}
    </Reveal>
  )
}
