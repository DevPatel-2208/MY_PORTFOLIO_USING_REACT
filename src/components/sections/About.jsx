import { motion } from 'framer-motion'
import { FiCode, FiServer, FiDatabase, FiCloud, FiShield, FiCpu } from 'react-icons/fi'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const highlights = [
  { icon: FiServer, label: 'MERN Stack', desc: 'End-to-end development' },
  { icon: FiDatabase, label: 'RESTful APIs', desc: 'Secure & documented' },
  { icon: FiCloud, label: 'Cloud Deployment', desc: 'Vercel, Render, Netlify' },
  { icon: FiShield, label: 'JWT Auth', desc: 'Role-based access control' },
  { icon: FiCpu, label: 'RAG & LLMs', desc: 'AI-powered features' },
  { icon: FiCode, label: 'Clean Code', desc: 'Modular & maintainable' },
]

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who I Am"
          title="About Me"
          description="A Full Stack MERN Developer and MCA student building scalable, secure, AI-powered web applications."
        />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <Reveal direction="left" className="flex justify-center">
            <div className="relative group max-w-sm w-full">
              <div
                className="absolute inset-0 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'var(--glow-a)', filter: 'blur(60px)' }}
                aria-hidden="true"
              />
              <div className="gradient-border-card rounded-3xl p-1.5 glass">
                <img
                  src="/2.jpeg"
                  alt="Dev Patel portrait"
                  className="w-full aspect-[4/5] object-cover rounded-3xl"
                  width={400}
                  height={500}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 240, damping: 18 }}
                className="absolute -bottom-5 -right-3 sm:-right-6 rounded-2xl bg-gradient-accent px-5 py-4 shadow-xl text-white"
              >
                <div className="text-2xl font-black leading-none">3+</div>
                <div className="text-[11px] font-medium opacity-90 mt-1">Years Learning</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, type: 'spring', stiffness: 240, damping: 18 }}
                className="absolute -top-4 -left-3 sm:-left-6 glass-strong rounded-2xl px-4 py-3 shadow-md"
              >
                <div className="text-[11px] font-bold text-gradient uppercase tracking-wide">MCA</div>
                <div className="text-[10px] text-muted">Candidate</div>
              </motion.div>
            </div>
          </Reveal>

          {/* Content */}
          <Reveal direction="right">
            <h3 className="text-2xl md:text-3xl font-bold mb-5 text-gradient-heading">
              Full Stack MERN Developer &amp; MCA Student
            </h3>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                I'm a <strong className="text-content font-semibold">Full Stack MERN Developer</strong> and
                current <strong className="text-content font-semibold">MCA student at Sardar Patel University</strong>{' '}
                with a deep passion for building scalable web applications. My journey into software
                development began during my BCA, where I discovered the power of the MERN Stack —{' '}
                <strong className="text-content font-semibold">MongoDB, Express.js, React, and Node.js</strong> —
                and haven't looked back since.
              </p>
              <p>
                I specialize in designing and developing{' '}
                <strong className="text-content font-semibold">RESTful APIs</strong>, implementing secure{' '}
                <strong className="text-content font-semibold">JWT authentication</strong>, integrating
                AI-powered features using <strong className="text-content font-semibold">RAG architectures</strong>,
                and building real-time applications with{' '}
                <strong className="text-content font-semibold">Socket.IO</strong>. My tech arsenal includes
                Cloudinary for media management, Redis for caching, and payment gateways for production-ready
                e-commerce solutions.
              </p>
              <p>
                What drives me is the challenge of solving real-world problems through clean, maintainable
                code and scalable architecture. I recently completed a{' '}
                <strong className="text-content font-semibold">Research &amp; Development internship</strong> at
                Sardar Patel University where I built an AI-powered Admission Assistant Chatbot using the
                MERN Stack. I'm currently seeking{' '}
                <strong className="text-content font-semibold">internship opportunities</strong> where I can
                contribute to impactful projects and grow as a professional software engineer.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
              {highlights.map((item, i) => (
                <Reveal key={item.label} delay={i * 0.05} amount={0.3}>
                  <div className="group h-full rounded-2xl glass p-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow">
                    <div className="mx-auto mb-2.5 w-10 h-10 rounded-xl bg-primary/12 grid place-items-center text-primary transition-transform duration-300 group-hover:scale-110">
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="text-sm font-bold text-content">{item.label}</div>
                    <div className="text-[11px] text-muted mt-0.5">{item.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
