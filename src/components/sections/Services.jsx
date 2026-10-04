import { services } from '../../data/services'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import TiltCard from '../ui/TiltCard'

export default function Services() {
  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What I Offer"
          title="Services"
          description="End-to-end engineering services — from concept and design to scalable deployment and AI integration."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.07} amount={0.2} className="h-full">
              <TiltCard className="h-full" max={12} scale={1.03}>
                <article className="group spotlight relative h-full rounded-3xl glass p-6 md:p-7 flex flex-col transition-[box-shadow,border-color,background-color] duration-500 hover:border-primary/40 hover:shadow-glow hover:bg-surface-2/70 [transform-style:preserve-3d]">
                  {/* Glow border on hover */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                    style={{ boxShadow: 'inset 0 0 0 1px var(--c-primary), 0 0 36px -12px var(--c-primary)' }}
                    aria-hidden="true"
                  />

                  <span className="relative w-12 h-12 rounded-2xl bg-gradient-accent grid place-items-center text-white shadow-glow mb-5 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6 [transform:translateZ(0)] group-hover:[transform:translateZ(46px)]">
                    <service.icon className="wiggle w-6 h-6" aria-hidden="true" />
                  </span>

                  <h4 className="relative text-base md:text-lg font-bold text-content leading-snug transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(30px)]">
                    {service.title}
                  </h4>

                  <p className="relative mt-2.5 text-sm text-muted leading-relaxed flex-1 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(20px)]">
                    {service.description}
                  </p>

                  <div className="relative flex flex-wrap gap-2 mt-5 pt-5 border-t border-border transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(34px)]">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
