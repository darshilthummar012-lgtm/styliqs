import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'amazon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-text text-white hover:bg-text/90 disabled:bg-text/40',
  secondary:
    'bg-bg-secondary text-text hover:bg-border disabled:opacity-50',
  ghost: 'bg-transparent text-text hover:bg-bg-secondary',
  outline:
    'border border-border bg-transparent text-text hover:border-text disabled:opacity-50',
  amazon:
    'bg-accent text-white hover:bg-accent/90 disabled:bg-accent/40',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
