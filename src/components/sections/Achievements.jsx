import { motion } from 'framer-motion';
import { SectionTitle } from '../common/SectionTitle';
import { GlassCard } from '../common/GlassCard';

const STATS = [
  { label: 'Overall CGPA', value: '9.62' },
  { label: 'University Rank', value: '5th' },
  { label: 'College Rank', value: '4th' },
];

const GALLERY = [
  { src: '/sem5.jpeg', caption: 'Semester 5 Trophy' },
  { src: '/5.jpeg', caption: 'Rank 1 Achievement' },
  { src: '/rp.jpeg', caption: 'Semester 3 Trophy' },
  { src: '/aodev.jpeg', caption: 'Overall Excellence' },
];

export function Achievements() {
  return (
    <section id="achievements" className="py-24 relative bg-surface-hover/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Achievements" 
          subtitle="A consistent academic journey marked by top ranks and excellence awards."
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-8 h-full flex flex-col justify-center text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center text-accent text-3xl mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                🏆
              </div>
              <h3 className="text-2xl font-black text-text-main mb-4">Academic Excellence</h3>
              <p className="text-text-muted mb-8 leading-relaxed">
                Maintained a consistent top-tier academic performance throughout the degree, reflecting dedication and strong conceptual understanding.
              </p>
              
              <div className="space-y-4">
                {STATS.map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex justify-between items-center p-4 bg-surface rounded-xl border border-border shadow-sm"
                  >
                    <span className="text-sm font-bold text-text-muted">{stat.label}</span>
                    <span className="text-xl font-black text-gradient">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4 h-full">
              {GALLERY.map((img, idx) => (
                <GlassCard 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group overflow-hidden h-48 sm:h-auto min-h-[200px]"
                >
                  <img 
                    src={img.src} 
                    alt={img.caption} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold text-sm text-center">{img.caption}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
