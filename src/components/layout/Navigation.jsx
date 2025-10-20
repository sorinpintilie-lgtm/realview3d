import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaCube } from 'react-icons/fa';
import Button from '../common/Button';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  
  const menuItems = [
    { name: 'Product', href: '#product' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
        setMobileMenuOpen(false); // Close menu on scroll down
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

  const handleMenuClick = (href) => {
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="hidden lg:flex fixed top-6 left-1/2 z-50 px-8 py-4 rounded-full"
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
          <div className="flex items-center gap-2 mr-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <FaCube className="text-white text-sm" />
            </div>
            <span className={`text-lg font-semibold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              RealView3D<sup className="text-xs ml-0.5">™</sup>
            </span>
          </div>
          
          {/* Menu Items */}
          <div className="flex items-center gap-6">
            {menuItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-cyan-500 ${
                  scrolled ? 'text-gray-700' : 'text-gray-300'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* CTA Button */}
          <Button size="sm" variant="primary">
            Request Demo
          </Button>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        className="lg:hidden fixed top-4 left-4 right-4 z-50 flex items-center justify-between"
        animate={{
          y: isVisible ? 0 : -100
        }}
        transition={{
          duration: 0.3,
          ease: [0.76, 0, 0.24, 1]
        }}
        initial={{ y: -100 }}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 px-4 py-3 rounded-full"
          style={{
            background: scrolled 
              ? 'rgba(255, 255, 255, 0.9)' 
              : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <FaCube className="text-white text-sm" />
          </div>
          <span className={`text-base font-semibold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            RealView3D
          </span>
        </motion.div>

        {/* Hamburger Button with Liquid Glass */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative w-12 h-12 rounded-full flex items-center justify-center touch-manipulation"
          style={{
            background: scrolled 
              ? 'rgba(255, 255, 255, 0.9)' 
              : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <motion.span
              className={`h-0.5 rounded-full ${scrolled ? 'bg-gray-900' : 'bg-white'}`}
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 7 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={`h-0.5 rounded-full ${scrolled ? 'bg-gray-900' : 'bg-white'}`}
              animate={{
                opacity: mobileMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className={`h-0.5 rounded-full ${scrolled ? 'bg-gray-900' : 'bg-white'}`}
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -7 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.button>
      </motion.div>

      {/* Mobile Menu Panel - Liquid Glass */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300
              }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 z-50 p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(40px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '-8px 0 32px 0 rgba(31, 38, 135, 0.15)'
              }}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-8 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                    <FaCube className="text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    RealView3D
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => handleMenuClick(item.href)}
                    className="block px-6 py-4 rounded-2xl text-gray-700 hover:text-cyan-600 font-medium transition-all hover:bg-cyan-50"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Button size="lg" variant="primary" className="w-full">
                  Request Demo
                </Button>
              </motion.div>

              {/* Decorative Blob */}
              <motion.div
                className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{ filter: 'blur(60px)' }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;