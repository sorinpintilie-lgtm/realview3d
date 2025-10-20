import { motion, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Button from '../common/Button';

const Navigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [blobPosition, setBlobPosition] = useState({ x: 0, width: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  
  const menuItems = [
    { name: 'Product', href: '#product' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
  ];
  
  // Smooth spring animation for blob
  const blobX = useSpring(blobPosition.x, { 
    stiffness: 300, 
    damping: 30,
    mass: 0.8 
  });
  const blobWidth = useSpring(blobPosition.width, { 
    stiffness: 300, 
    damping: 30,
    mass: 0.8 
  });
  
  const updateBlobPosition = (index) => {
    const navItems = navRef.current?.querySelectorAll('.nav-item');
    if (navItems && navItems[index]) {
      const item = navItems[index];
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      
      setBlobPosition({
        x: itemRect.left - navRect.left,
        width: itemRect.width
      });
    }
  };
  
  useEffect(() => {
    updateBlobPosition(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Change style based on scroll position
      setScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.nav
      className="fixed top-6 left-1/2 z-50 px-8 py-4 rounded-full"
      style={{
        x: '-50%',
        background: scrolled 
          ? 'rgba(255, 255, 255, 0.7)' 
          : 'rgba(255, 255, 255, 0.3)',
        backdropFilter: `blur(${scrolled ? '20px' : '10px'})`,
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: scrolled 
          ? '0 8px 32px 0 rgba(31, 38, 135, 0.15)' 
          : '0 4px 16px 0 rgba(31, 38, 135, 0.1)'
      }}
      animate={{
        y: isVisible ? 0 : -100,
        scale: scrolled ? 0.95 : 1
      }}
      transition={{
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }}
      initial={{ y: -100 }}
    >
      <div className="flex items-center gap-8">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2 mr-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <span className="text-white font-bold text-sm">R3D</span>
          </div>
          <span className={`text-lg font-semibold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            RealView3D<sup className="text-xs ml-0.5">™</sup>
          </span>
        </motion.div>
        
        {/* Navigation Items */}
        <div ref={navRef} className="relative flex items-center gap-6">
          {/* Liquid Blob Background */}
          <motion.div
            className="absolute h-full rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30"
            style={{
              x: blobX,
              width: blobWidth,
              filter: 'blur(1px)'
            }}
          />
          
          {/* Liquid Blob Glow */}
          <motion.div
            className="absolute h-full rounded-full bg-cyan-400/30"
            style={{
              x: blobX,
              width: blobWidth,
              filter: 'blur(20px)',
              transform: 'scale(1.2)'
            }}
          />
          
          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="nav-item relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer"
              style={{
                color: activeIndex === index
                  ? (scrolled ? '#000' : '#fff')
                  : (scrolled ? '#666' : '#ccc')
              }}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => updateBlobPosition(index)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button size="sm" variant="primary">
            Request Demo
          </Button>
        </motion.div>
      </div>
      
      {/* Liquid Background Blob Animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-cyan-500/5 pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ filter: 'blur(20px)' }}
      />
    </motion.nav>
  );
};

export default Navigation;