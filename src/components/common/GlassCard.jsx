import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { forwardRef } from 'react';

export const GlassCard = forwardRef(({ className, children, animate = true, ...props }, ref) => {
  const Component = animate ? motion.div : 'div';
  
  return (
    <Component
      ref={ref}
      className={cn("glass-card overflow-hidden", className)}
      {...props}
    >
      {children}
    </Component>
  );
});

GlassCard.displayName = 'GlassCard';
