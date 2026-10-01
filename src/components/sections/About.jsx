import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiAward, FiBriefcase, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { SectionTitle } from '../common/SectionTitle';
import { GlassCard } from '../common/GlassCard';

const EDUCATION_TIMELINE = [
  {
    id: 'mca',
    title: 'Master of Computer Applications (MCA)',
    institution: 'Sardar Patel University',
    period: '2025 - Present',
    gpa: '9.28 (Semester 1)',
    achievements: ['University Rank 3 in Semester 1'],
    current: true,
  },
  {
    id: 'bca',
    title: 'Bachelor of Computer Applications (BCA)',
    institution: 'Aanand Commerce College',
    period: '2022 - 2025',
    gpa: '9.62 CGPA',
    achievements: [
      'University Rank 1 in Semester 5 (9.92 GPA)',
      'College Rank 4 Overall',
      'Top 5% in University',
    ],
    current: false,
  },
];

export function About() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  // Autoplay starts muted (browser policy) and retries on visibility/interaction
  // if playback is momentarily blocked. Never requires a manual Play click.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const userMuted = { current: true };
    const applyMuted = () => { video.muted = userMuted.current; };

    let active = true;
    let retryTimer = null;

    const tryPlay = () => {
      if (!active || !video) return;
      applyMuted();
      if (video.currentTime > 0 && !video.ended) return;
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    tryPlay();

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && video.paused) tryPlay();
    };
    const onInteraction = () => { if (video.paused) tryPlay(); };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointerdown', onInteraction, { once: true });
    window.addEventListener('keydown', onInteraction, { once: true });

    retryTimer = window.setInterval(() => {
      if (video.readyState >= 2) {
        if (video.paused) tryPlay();
        window.clearInterval(retryTimer);
      }
    }, 500);

    const onCanPlay = () => { if (video.paused) tryPlay(); };
    video.addEventListener('canplay', onCanPlay);

    const onToggle = (e) => {
      userMuted.current = e.detail?.muted ?? true;
      applyMuted();
    };
    window.addEventListener('about:video-mute', onToggle);

    return () => {
      active = false;
      if (retryTimer) window.clearInterval(retryTimer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointerdown', onInteraction);
      window.removeEventListener('keydown', onInteraction);
      video.removeEventListener('canplay', onCanPlay);
      window.removeEventListener('about:video-mute', onToggle);
    };
  }, []);

  const handleToggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      if (videoRef.current) videoRef.current.muted = next;
      window.dispatchEvent(new CustomEvent('about:video-mute', { detail: { muted: next } }));
      return next;
    });
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-surface-hover/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="About Me" 
          subtitle="Passionate about building scalable applications and continuous learning."
        />

        <div className="grid lg:grid-cols-5 gap-12 mt-16">
          {/* Summary & Image - Col span 2 */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <GlassCard className="p-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl z-0" />
              <div className="relative z-10 overflow-hidden rounded-xl">
                <video
                  ref={videoRef}
                  src="/My_Intro.mp4"
                  className="w-full h-auto block rounded-xl"
                  autoPlay
                  muted={muted}
                  loop
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                />
                <button
                  type="button"
                  onClick={handleToggleMute}
                  aria-label={muted ? 'Unmute intro video' : 'Mute intro video'}
                  title={muted ? 'Turn sound on' : 'Turn sound off'}
                  className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 bg-surface/85 backdrop-blur border border-border text-text-main shadow-lg"
                >
                  {muted ? <FiVolumeX className="w-4 h-4" aria-hidden="true" /> : <FiVolume2 className="w-4 h-4" aria-hidden="true" />}
                </button>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 bg-surface border border-border p-6 rounded-2xl shadow-2xl z-20"
              >
                <div className="text-4xl font-black text-primary mb-1">3+</div>
                <div className="text-sm font-bold text-text-muted">Years Learning &<br/>Building</div>
              </motion.div>
            </GlassCard>

            <GlassCard className="p-8">
              <h3 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
                <FiBriefcase className="text-primary" /> Professional Summary
              </h3>
              <p className="text-text-muted leading-relaxed mb-4">
                I am a highly motivated <strong className="text-text-main">Full Stack Developer</strong> specializing in the MERN stack and modern backend architectures.
              </p>
              <p className="text-text-muted leading-relaxed">
                Currently pursuing my Master's (MCA), I have built several production-ready systems, including E-Commerce platforms and Club Management Systems, focusing on clean code, robust APIs, and seamless user experiences.
              </p>
            </GlassCard>
          </div>

          {/* Education Timeline - Col span 3 */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-black tracking-tight text-text-main mb-8 flex items-center gap-3">
              <FiBookOpen className="text-primary" /> Education Journey
            </h3>
            
            <div className="space-y-8">
              {EDUCATION_TIMELINE.map((edu, idx) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-8 md:pl-0"
                >
                  {/* Desktop Timeline Line */}
                  <div className="hidden md:block absolute left-[27px] top-10 bottom-[-40px] w-0.5 bg-border last:hidden" />
                  
                  <div className="md:grid md:grid-cols-[60px_1fr] items-start gap-6">
                    {/* Icon */}
                    <div className="hidden md:flex flex-col items-center z-10 pt-2">
                      <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-primary shadow-lg border-primary/20">
                        <FiAward className="w-6 h-6" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <GlassCard className="p-6 md:p-8 hover:border-primary/30 transition-colors">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-text-main">{edu.title}</h4>
                          <p className="text-primary font-medium">{edu.institution}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-surface-hover text-text-muted">
                            {edu.period}
                          </span>
                          {edu.current && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent border border-accent/20 animate-pulse">
                              Currently Pursuing
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-sm font-bold text-text-muted uppercase tracking-wider">GPA / CGPA</span>
                        <div className="text-2xl font-black text-text-main">{edu.gpa}</div>
                      </div>
                      
                      <div className="space-y-2 pt-4 border-t border-border">
                        {edu.achievements.map((ach, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-text-muted">
                            <span className="text-primary mt-1 text-xs">▹</span>
                            {ach}
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
