import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiX } from 'react-icons/fi';
import { SectionTitle } from '../common/SectionTitle';
import { GlassCard } from '../common/GlassCard';
import { Button } from '../common/Button';

const CERTIFICATES = [
  {
    title: 'Web Development Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: 'May 2025',
    tags: ['Frontend', 'UI/UX'],
    description: 'Learned HTML, CSS, GitHub, and frontend development principles using design thinking approach.',
    image: '/ibm.pdf',
    imageMobile: '/ibm.jpg',
  },
  {
    title: 'Developing Websites with Bootstrap',
    issuer: 'Coursera (IBM)',
    date: 'May 2025',
    tags: ['Frontend'],
    description: 'Building responsive websites and modern front-end interfaces using Bootstrap.',
    image: '/cboot.png',
    verify: 'https://www.coursera.org/account/accomplishments/verify/VBJTH4AF9FSD',
  },
  {
    title: 'Bootstrap Development',
    issuer: 'Infosys (Springboard)',
    date: 'Feb 2025',
    tags: ['Frontend'],
    description: 'Responsive UI design, grid systems, and reusable components using Bootstrap 5.',
    image: '/boot.pdf',
    imageMobile: '/boot.jpg',
  },
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: 'Apr 2026',
    tags: ['AI'],
    description: 'Foundational understanding of AI concepts, including generative AI and prompt engineering.',
    image: '/ai.png',
  },
];

export function Certificates() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="certificates" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Certifications" 
          subtitle="Continuous learning and professional development."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {CERTIFICATES.map((cert, idx) => (
            <GlassCard
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col h-full hover:border-primary/50 transition-colors cursor-pointer group p-6"
              onClick={() => setSelected(cert)}
            >
              <div className="mb-4 flex flex-wrap gap-2">
                {cert.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-surface-hover text-primary text-[10px] font-bold uppercase tracking-widest rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="text-lg font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
                {cert.title}
              </h4>
              <p className="text-sm text-text-muted font-semibold mb-4">
                {cert.issuer} &bull; {cert.date}
              </p>
              <p className="text-sm text-text-muted flex-1">
                {cert.description}
              </p>
              <div className="mt-6 pt-4 border-t border-border text-sm font-semibold text-primary flex items-center gap-2">
                View Credential &rarr;
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-border flex justify-between items-center bg-surface-hover/50">
                <h4 className="font-bold text-text-main truncate pr-4">{selected.title}</h4>
                <button onClick={() => setSelected(null)} className="p-2 bg-surface hover:bg-surface-hover rounded-lg text-text-muted transition-colors">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto bg-surface-hover/20 flex-1 flex flex-col items-center">
                {selected.image.endsWith('.pdf') ? (
                  <>
                    <iframe src={selected.image} className="w-full h-[600px] rounded-lg hidden md:block border border-border shadow-lg" title={selected.title} />
                    <img src={selected.imageMobile} alt={selected.title} className="w-full rounded-lg block md:hidden border border-border shadow-lg" />
                  </>
                ) : (
                  <img src={selected.image} alt={selected.title} className="w-full rounded-lg border border-border shadow-lg" />
                )}
                {selected.verify && (
                  <Button asChild variant="primary" className="mt-6" href={selected.verify} target="_blank">
                    <FiExternalLink /> Verify Online
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
