'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#1a1a2e] text-white hover:bg-[#2d2d44] focus-visible:ring-[#1a1a2e] active:scale-[0.98]',
    secondary: 'bg-[#f8f9fa] text-[#1a1a2e] hover:bg-[#e8ecf0] focus-visible:ring-[#1a1a2e] active:scale-[0.98]',
    outline: 'border-2 border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white focus-visible:ring-[#1a1a2e] active:scale-[0.98]',
    ghost: 'text-[#1a1a2e] hover:bg-[#f8f9fa] focus-visible:ring-[#1a1a2e] active:scale-[0.98]',
  };

  const sizes = {
    sm: 'text-sm px-4 py-2 gap-1.5',
    md: 'text-base px-6 py-3 gap-2',
    lg: 'text-lg px-8 py-4 gap-2.5',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...(({ onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, onAnimationIteration, ...rest }) => rest)(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : null}
      {children}
    </motion.button>
  );
}
