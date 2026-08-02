import { motion } from 'framer-motion'
import { FiCode, FiServer, FiDatabase, FiCloud, FiShield, FiCpu } from 'react-icons/fi'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import TerminalWindow from '../ui/terminal/TerminalWindow'

const highlights = [
  { icon: FiServer, label: 'MERN Stack', desc: 'End-to-end development' },
  { icon: FiDatabase, label: 'RESTful APIs', desc: 'Secure & documented' },
  { icon: FiCloud, label: 'Cloud Deployment', desc: 'Vercel, Render, Netlify' },
  { icon: FiShield, label: 'JWT Auth', desc: 'Role-based access control' },
  { icon: FiCpu, label: 'RAG & LLMs', desc: 'AI-powered features' },
  { icon: FiCode, label: 'Clean Code', desc: 'Modular & maintainable' },
]

const terminalLines = [
  'Full Stack MERN Developer',
  'MCA @ Sardar Patel University · 2025–2027',
  '6+ Projects Shipped',
  'MERN + AI / RAG Integration',
  'Open to Internships',
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

        {/*
          One grid handles every breakpoint. The two wrappers are
          `display: contents` on mobile so all five blocks participate in a
          single-column flow (reordered via CSS `order`), and become real
          flex columns on desktop where the image + terminal group on the
          left and the text + skill cards sit on the right.
        */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.45fr_0.55fr] lg:items-start lg:gap-16">
          {/* Left column — portrait + terminal (grouped on desktop) */}
          <div className="contents lg:order-1 lg:mx-auto lg:flex lg:w-full lg:max-w-[23rem] lg:flex-col lg:gap-6">
            {/* Portrait */}
            <Reveal direction="left" className="order-2 lg:order-none">
              <div className="relative group w-full max-w-[15rem] mx-auto md:max-w-[19rem] lg:max-w-none">
                <div
                  className="absolute inset-0 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'var(--glow-a)', filter: 'blur(60px)' }}
                  aria-hidden="true"
                />
                <div className="gradient-border-card rounded-3xl p-1.5 glass shadow-soft">
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
                  transition={{ delay: 0.55, type: 'spring', stiffness: 240, damping: 18 }}
                  whileHover={{ y: -3, scale: 1.04, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                  className="mt-6 mx-auto flex w-fit items-center gap-2.5 rounded-full tech-badge px-3.5 py-2 will-change-transform md:mt-0 md:absolute md:top-3 md:left-3 md:z-10 md:gap-2 md:px-3 md:py-1.5 lg:top-4 lg:left-4 lg:gap-2.5 lg:px-4 lg:py-2.5"
                >
                  <span
                    className="w-1.5 h-1.5 shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-[13px] font-bold leading-tight text-content lg:text-sm">
                      MCA Candidate
                    </span>
                    <span className="block mt-0.5 text-[10px] font-medium leading-snug text-muted lg:text-[11px]">
                      2025–2027
                    </span>
                  </span>
                </motion.div>
              </div>
            </Reveal>

            {/* Terminal — attached directly below the portrait */}
            <Reveal direction="left" className="order-5 lg:order-none">
              <div className="w-full md:mx-auto md:max-w-[27rem] lg:mx-0 lg:max-w-none">
                <TerminalWindow lines={terminalLines} />
              </div>
            </Reveal>
          </div>

          {/* Right column — intro, description, skill cards */}
          <div className="contents lg:order-2 lg:flex lg:min-w-0 lg:flex-col lg:gap-8">
            {/* Intro heading */}
            <Reveal direction="right" className="order-1 lg:order-none">
              <h3 className="text-center text-2xl md:text-3xl font-bold text-gradient-heading lg:text-left">
                Full Stack MERN Developer &amp; MCA Student
              </h3>
            </Reveal>

            {/* Description */}
            <Reveal direction="right" className="order-3 lg:order-none">
              <div className="space-y-4 text-muted leading-relaxed text-justify">
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
            </Reveal>

            {/* Skill cards */}
            <Reveal direction="right" className="order-4 lg:order-none">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
      </div>
    </section>
  )
}
