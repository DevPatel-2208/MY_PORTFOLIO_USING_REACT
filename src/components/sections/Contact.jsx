import { useState, useRef } from 'react'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi'
import { site } from '../../data/site'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SocialLinks from '../ui/SocialLinks'
import Button from '../ui/Button'

const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xdkdazaz'

const contactCards = [
  { icon: FiMail, label: 'Email', value: site.email, sub: 'Replies within 24 hours', href: `mailto:${site.email}` },
  { icon: FiPhone, label: 'Phone', value: site.phone, sub: 'Available during business hours', href: `tel:${site.phone.replace(/\s/g, '')}` },
  { icon: FiMapPin, label: 'Location', value: site.location, sub: 'Gujarat, India (IST)', href: null },
]

function validate(values) {
  const errors = {}
  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please enter your name (min 2 characters).'
  }
  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.subject || values.subject.trim().length < 2) {
    errors.subject = 'Please add a short subject.'
  }
  if (!values.message || values.message.trim().length < 10) {
    errors.message = 'Your message should be at least 10 characters.'
  }
  return errors
}

function fireConfetti() {
  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 1,
    decay: 0.94,
    startVelocity: 32,
    colors: ['#4f46e5', '#9333ea', '#059669', '#f59e0b', '#ef4444', '#3b82f6'],
  }

  confetti({ ...defaults, particleCount: 80, origin: { x: 0.5, y: 0.7 } })
  window.setTimeout(() => confetti({ ...defaults, particleCount: 50, origin: { x: 0, y: 0.8 } }), 200)
  window.setTimeout(() => confetti({ ...defaults, particleCount: 50, origin: { x: 1, y: 0.8 } }), 350)
}

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: new FormData(formRef.current),
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
      fireConfetti()
      formRef.current.reset()
      setValues({ name: '', email: '', subject: '', message: '' })
      window.setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      window.setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const inputClasses = (hasError) =>
    `w-full px-4 py-3.5 rounded-xl glass text-sm text-content placeholder:text-muted outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 ${
      hasError ? '!border-red-500/60 focus:!ring-red-500/20' : ''
    }`

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          description="Have a project in mind, an internship opportunity, or just want to say hi? My inbox is always open."
        />

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8">
          {/* Info */}
          <Reveal direction="left" className="h-full">
            <div className="gradient-border-card rounded-3xl glass-strong p-6 md:p-8 h-full flex flex-col">
              <div className="space-y-4">
                {contactCards.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 rounded-2xl glass p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40">
                    <span className="w-12 h-12 rounded-2xl bg-gradient-accent grid place-items-center text-white shadow-glow shrink-0">
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h5 className="font-bold text-content">{item.label}</h5>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-muted hover:text-primary transition-colors break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-muted">{item.value}</p>
                      )}
                      {item.sub && <p className="text-xs text-muted/80 mt-0.5">{item.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h5 className="font-bold text-content mb-4">Connect With Me</h5>
                <SocialLinks links={site.socials} size="w-11 h-11" iconSize="w-5 h-5" />
              </div>

              <div className="mt-6 flex items-center gap-2.5 rounded-2xl bg-accent/10 border border-accent/25 px-4 py-3.5">
                <FiClock className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                <span className="text-sm font-semibold text-accent">{site.availability}</span>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="right" className="h-full">
            <div className="gradient-border-card rounded-3xl glass-strong p-6 md:p-8 h-full">
              <h4 className="text-xl font-bold text-content mb-6">Send a Message</h4>

              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-content mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputClasses(!!errors.name)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs font-medium text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-content mb-1.5">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={inputClasses(!!errors.email)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs font-medium text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-semibold text-content mb-1.5">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className={inputClasses(!!errors.subject)}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    autoComplete="off"
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1.5 text-xs font-medium text-red-500">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-content mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className={`${inputClasses(!!errors.message)} resize-none`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs font-medium text-red-500">{errors.message}</p>
                  )}
                </div>

                <div className="pt-1">
                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <motion.span
                          className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          aria-hidden="true"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 rounded-2xl bg-accent/12 border border-accent/30 px-4 py-3.5"
                      role="status"
                    >
                      <FiCheckCircle className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
                      <span className="text-sm font-semibold text-accent">
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 rounded-2xl bg-red-500/12 border border-red-500/30 px-4 py-3.5"
                      role="alert"
                    >
                      <FiAlertCircle className="w-5 h-5 text-red-500 shrink-0" aria-hidden="true" />
                      <span className="text-sm font-semibold text-red-500">
                        Something went wrong. Please try again or email me directly.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
