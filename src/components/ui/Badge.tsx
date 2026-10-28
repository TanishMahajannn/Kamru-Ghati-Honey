import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'forest' | 'honey' | 'earth' | 'outline' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'forest',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const variants = {
    forest: 'bg-forest-50 text-forest-700 border border-forest-200',
    honey: 'bg-honey-100 text-earth-800 border border-honey-300',
    earth: 'bg-cream-200 text-earth-700 border border-cream-300',
    outline: 'border border-earth-300 text-earth-700 bg-white',
    neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-xs md:text-sm px-3 py-1 gap-1.5',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
