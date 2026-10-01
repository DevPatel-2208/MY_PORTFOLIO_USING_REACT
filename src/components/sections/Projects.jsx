import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import { PROJECTS } from '../../data/portfolioData';
import { SectionTitle } from '../common/SectionTitle';
import { GlassCard } from '../common/GlassCard';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

const FILTERS = [
  { value: 'all', label: 'All Projects' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'academic', label: 'Academic' },
  { value: 'utility', label: 'Utility' },
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Featured Projects" 
          subtitle="A selection of my best work across full-stack development, API integrations, and academic research."
        />

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative",
                activeFilter === f.value ? "text-white" : "text-text-muted hover:text-text-main bg-surface-hover border border-border"
              )}
            >
              {activeFilter === f.value && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-primary rounded-xl shadow-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <GlassCard
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col h-full hover:border-primary/50 transition-colors duration-500"
              >
                {/* Image Wrapper */}
                <div className="relative h-64 w-full overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1.5 rounded-lg bg-surface/80 backdrop-blur text-xs font-bold text-primary border border-border shadow-sm">
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10 opacity-80" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-text-muted text-sm mb-6 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <h4 className="text-sm font-semibold text-text-main flex items-center gap-2">
                      <FiCheckCircle className="text-primary" /> Key Features
                    </h4>
                    <ul className="space-y-2">
                      {project.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="text-sm text-text-muted flex items-start gap-2">
                          <span className="text-accent mt-1 text-xs">▹</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-1 bg-surface-hover border border-border rounded-md text-xs font-medium text-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-6 border-t border-border flex gap-4">
                    <Button asChild variant="outline" size="sm" href={project.github} target="_blank">
                      <FiGithub /> Code
                    </Button>
                    {project.github !== '#' && (
                      <Button asChild variant="ghost" size="sm" href={project.github} target="_blank">
                        <FiExternalLink /> Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
