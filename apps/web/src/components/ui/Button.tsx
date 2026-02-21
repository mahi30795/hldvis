import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-1 focus-visible:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants: Record<string, string> = {
    primary:
      'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.97]',
    secondary:
      'glass glass-border text-content-secondary hover:text-content active:scale-[0.97]',
    ghost:
      'bg-transparent text-content-muted hover:text-content hover:bg-content/[0.06] active:scale-[0.97]',
  };

  const sizes: Record<string, string> = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};
