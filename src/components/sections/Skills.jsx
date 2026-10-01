import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { SectionTitle } from '../common/SectionTitle';
import { GlassCard } from '../common/GlassCard';

export function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Skills & Expertise" 
          subtitle="Comprehensive toolkit for building modern, scalable, and high-performance applications."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {SKILL_CATEGORIES.map((category, idx) => (
            <GlassCard
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/50">
                <span className="text-3xl bg-surface-hover p-3 rounded-2xl border border-border shadow-sm">
                  {category.icon}
                </span>
                <h3 className="text-xl font-bold text-text-main">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        {skill.icon ? (
                          <skill.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        ) : (
                          <div className="w-4 h-4 rounded bg-primary/10 text-primary flex items-center justify-center text-[8px] font-bold">
                            {skill.name[0]}
                          </div>
                        )}
                        <span className="text-sm font-semibold text-text-main">{skill.name}</span>
                      </div>
                      <span className="text-xs font-bold text-text-muted">{skill.level}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-surface-hover rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="h-full bg-gradient-primary rounded-full relative"
                      >
                        <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 rounded-full blur-[2px]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
