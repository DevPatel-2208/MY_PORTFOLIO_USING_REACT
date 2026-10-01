import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export function SectionTitle({ title, subtitle, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center mb-16", className)}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl md:text-5xl font-black uppercase tracking-tight text-text-main mb-4"
      >
        {title}
      </motion.h2>
      
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "64px" }}
        viewport={{ once: true, margin: "-100px" }}
        className="h-1.5 rounded-full bg-gradient-primary mb-6"
      />
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl text-text-muted text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
