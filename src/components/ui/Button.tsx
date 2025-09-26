import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-5 py-3 text-base rounded-xl',
}

export default function Button({ variant = 'primary', size = 'md', className = '', disabled, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed'
  const variantClasses = variant === 'primary'
    ? 'btn-primary-gradient text-white shadow'
    : 'bg-transparent hover:bg-gray-100 text-gray-800'
  const cls = `${base} ${variantClasses} ${sizeClasses[size]} ${className}`
  return (
    <button className={cls} disabled={disabled} {...props}>
      {children}
    </button>
  )
}


