import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <Reveal className="max-w-2xl mx-auto text-center mb-14 md:mb-16">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-balance">
        <span className="text-gradient-heading">{title}</span>
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-muted leading-relaxed text-balance">
          {description}
        </p>
      )}
    </Reveal>
  )
}
