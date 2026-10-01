import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  asChild, 
  children, 
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-text-muted hover:text-text-main hover:bg-surface-hover',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
  };

  const Component = asChild ? 'a' : 'button';

  return (
    <Component
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Button.displayName = 'Button';
