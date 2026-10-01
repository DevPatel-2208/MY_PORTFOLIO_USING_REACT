import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';
import { HERO_DATA } from '../../data/portfolioData';
import { Button } from '../common/Button';

const TypingText = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, texts]);

  return (
    <span className="text-gradient font-bold border-r-2 border-primary pr-1 animate-[blink_1s_infinite]">
      {texts[index].substring(0, subIndex)}
    </span>
  );
};

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.12, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-semibold text-accent">Available for Internships</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-text-main mb-4 leading-[1.1]">
                Hi, I'm <br className="hidden sm:block" />
                <span className="text-gradient">{HERO_DATA.name}</span>
              </h1>
              
              <div className="text-xl sm:text-2xl text-text-muted font-medium h-8 sm:h-10">
                I'm a <TypingText texts={HERO_DATA.roles} />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-text-muted max-w-xl leading-relaxed"
            >
              {HERO_DATA.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-text-muted font-medium"
            >
              <FiMapPin className="text-primary w-5 h-5" />
              {HERO_DATA.location}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Button asChild variant="primary" href={HERO_DATA.resumeLink} target="_blank">
                <FiDownload /> Resume
              </Button>
              <Button asChild variant="outline" href="#projects">
                View Projects
              </Button>
              <div className="flex gap-2 ml-auto sm:ml-4">
                <Button asChild variant="ghost" className="px-3" href={HERO_DATA.githubLink} target="_blank">
                  <FiGithub className="w-5 h-5" />
                </Button>
                <Button asChild variant="ghost" className="px-3" href={HERO_DATA.linkedinLink} target="_blank">
                  <FiLinkedin className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 pt-8 mt-8 border-t border-border w-full max-w-lg"
            >
              {HERO_DATA.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-text-main mb-1">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider text-text-muted font-bold">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Image/Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="hidden lg:flex relative justify-center items-center"
          >
            <div className="relative w-[400px] h-[400px]">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              
              {/* Image Container */}
              <div className="absolute inset-4 rounded-3xl overflow-hidden glass-card shadow-2xl p-2 z-10">
                <img 
                  src="/image%20dev.jpeg" 
                  alt="Dev Patel" 
                  className="w-full h-full object-cover rounded-2xl"
                  loading="eager"
                />
              </div>

              {/* Floating Badges */}
              {['React', 'Node.js', 'MongoDB'].map((tech, i) => (
                <motion.div
                  key={tech}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                  className="absolute z-20 px-4 py-2 rounded-xl glass-card text-sm font-bold shadow-xl"
                  style={{
                    top: i === 0 ? '10%' : i === 1 ? '70%' : '30%',
                    left: i === 0 ? '-5%' : i === 1 ? '-10%' : '85%',
                  }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
