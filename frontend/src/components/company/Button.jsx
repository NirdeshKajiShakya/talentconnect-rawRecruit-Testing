import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button', 
  className = '',
  disabled = false
}) => {
  const baseClasses = 'btn'
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary'
  }
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.button>
  )
}

export default Button