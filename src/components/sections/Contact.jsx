import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { SectionTitle } from '../common/SectionTitle';
import { GlassCard } from '../common/GlassCard';
import { Button } from '../common/Button';
import { HERO_DATA } from '../../data/portfolioData';
import { cn } from '../../utils/cn';

export function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    // Using placeholder keys as we don't have the user's .env. 
    // They will need to supply their own EmailJS config if it's not present.
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id',
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key'
    ).then(
      () => {
        setLoading(false);
        setSuccess(true);
        formRef.current.reset();
        setTimeout(() => setSuccess(false), 5000);
      },
      () => {
        setLoading(false);
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    );
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-surface-hover/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Get In Touch" 
          subtitle="Open for internships, full-time roles, and freelance opportunities. Let's build something great."
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-4xl font-black text-text-main mb-6 leading-tight">
              Let's Talk <br />
              <span className="text-gradient">Ideas & Solutions.</span>
            </h3>
            <p className="text-text-muted mb-10 text-lg max-w-md leading-relaxed">
              Whether you have a project in mind, looking for a full-stack developer, or just want to say hi, my inbox is always open.
            </p>

            <div className="space-y-6">
              <GlassCard className="p-6 flex items-center gap-6 hover:border-primary/50 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FiMail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-muted mb-1 uppercase tracking-wider">Email Me At</div>
                  <a href={`mailto:${HERO_DATA.email}`} className="text-lg font-semibold text-text-main hover:text-primary transition-colors">
                    {HERO_DATA.email}
                  </a>
                </div>
              </GlassCard>

              <GlassCard className="p-6 flex items-center gap-6 hover:border-primary/50 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <FiMapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-muted mb-1 uppercase tracking-wider">Location</div>
                  <div className="text-lg font-semibold text-text-main">
                    {HERO_DATA.location}
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 md:p-10 shadow-2xl border-t border-t-white/10">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-text-main">Full Name</label>
                  <input
                    type="text"
                    name="user_name"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-surface-hover/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-main placeholder:text-text-muted/50"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-text-main">Email Address</label>
                  <input
                    type="email"
                    name="user_email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-surface-hover/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-main placeholder:text-text-muted/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-text-main">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl bg-surface-hover/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-main placeholder:text-text-muted/50 resize-none"
                    placeholder="How can I help you?"
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full mt-4 h-14" 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2"><FiSend /> Send Message</span>
                  )}
                </Button>

                {success && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-accent text-center text-sm font-bold">
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
                
                {error && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center text-sm font-bold">
                    Oops! Something went wrong. Please try again or email me directly.
                  </motion.div>
                )}
              </form>
            </GlassCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
