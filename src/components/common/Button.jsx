import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick,
  className = '',
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Magnetic effect
  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleClick = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples([...ripples, newRipple]);
    setTimeout(() => {
      setRipples(ripples => ripples.filter(r => r.id !== newRipple.id));
    }, 1000);
    
    onClick?.(e);
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 overflow-hidden';
  
  const variants = {
    primary: 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60',
    secondary: 'bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/20 hover:border-white/30',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Glass Overlay */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      )}
      
      {/* Liquid Ripples */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 100,
            height: 100,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(10px)'
          }}
        />
      ))}
      
      {/* Shimmer Effect */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: isHovered ? ['0%', '200%'] : '0%'
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear'
          }}
          style={{ transform: 'skewX(-20deg)' }}
        />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

export default Button;