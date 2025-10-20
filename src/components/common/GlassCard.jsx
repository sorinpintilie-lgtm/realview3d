import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const GlassCard = ({ children, className = '', hover = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hover ? { y: -8 } : {}}
      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Enhanced Glass Background with Better Visibility */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl" />
      
      {/* Liquid Hover Effect */}
      <AnimatePresence>
        {isHovered && hover && (
          <motion.div
            className="absolute rounded-full pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0.3 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              width: 200,
              height: 200,
              background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(30px)'
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Gradient Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
        animate={{ opacity: isHovered && hover ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.6), rgba(14,165,233,0.6))',
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />
      
      {/* Content with Better Contrast */}
      <div className="relative z-10 p-8 bg-gradient-to-br from-white/5 to-transparent">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;