import clsx from 'clsx'

function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
    accent: 'bg-accent-600 hover:bg-accent-700 text-white',
    outline: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5 text-lg',
  }
  
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button