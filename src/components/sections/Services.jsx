import { motion } from 'framer-motion'
import { services } from '../../data/services'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

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
            <Reveal key={service.id} delay={i * 0.07} amount={0.2}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group h-full rounded-3xl glass p-6 md:p-7 flex flex-col transition-colors duration-300 hover:border-primary/40 hover:shadow-glow"
              >
                <span className="w-12 h-12 rounded-2xl bg-gradient-accent grid place-items-center text-white shadow-glow mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <service.icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <h4 className="text-base md:text-lg font-bold text-content leading-snug">{service.title}</h4>
                <p className="mt-2.5 text-sm text-muted leading-relaxed flex-1">{service.description}</p>
                <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
