function Avatar({ src, name, size = 'md' }) {
    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    }
    
    const sizeClass = sizes[size] || sizes.md
    
    // Generate initials from name
    const initials = name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : '?'
    
    return (
      <div
        className={`${sizeClass} flex items-center justify-center rounded-full bg-primary-100 text-primary-800 font-medium`}
      >
        {src ? (
          <img
            src={src}
            alt={name || 'Avatar'}
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    )
  }
  
  export default Avatar