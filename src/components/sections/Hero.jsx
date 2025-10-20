import { motion } from 'framer-motion';
import { FaChevronDown, FaCube, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const Hero = () => {
  const navigate = useNavigate();
  const title = "RealView3D";
  const subtitle = "Immersive 3D Building Visualization";
  const description = "Transform architectural renders into interactive 3D experiences. Showcase properties with photorealistic detail and let buyers explore every angle.";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-0">
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 md:px-6">
        {/* 3D Badge - Floating Glass */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-2xl border border-cyan-500/30 rounded-full shadow-lg shadow-cyan-500/20"
        >
          <FaCube className="text-cyan-400 text-sm md:text-base" />
          <span className="text-white font-medium text-xs md:text-base">3D Architectural Visualization</span>
        </motion.div>
        
        {/* 3D Title with TM - Simplified animation on mobile */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-white relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(6, 182, 212, 0.3)',
          }}
        >
          {/* Desktop: Animated letters */}
          <span className="hidden md:inline">
            {title.split('').map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.03,
                  ease: [0.76, 0, 0.24, 1]
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {/* Mobile: Simple text */}
          <span className="md:hidden">{title}</span>
          <sup className="text-xl md:text-2xl ml-1 opacity-70">™</sup>
        </motion.h1>
        
        {/* Subtitle - Floating Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-block mb-6 md:mb-8 px-4 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl shadow-xl"
        >
          <p className="text-lg md:text-2xl lg:text-3xl text-cyan-400 font-light">
            {subtitle}
          </p>
        </motion.div>
        
        {/* Description - Floating Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="inline-block mb-8 md:mb-12 px-4 md:px-8 py-4 md:py-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl max-w-2xl"
        >
          <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
            {description}
          </p>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="primary" size="lg" onClick={() => navigate('/demo')}>
            <FaCube className="mr-2" />
            View 3D Demo
          </Button>
          <Button variant="secondary" size="lg" onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Features
          </Button>
        </motion.div>
        
        {/* Stats - Floating Glass Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 md:mt-16 grid grid-cols-3 gap-3 md:gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: '360°', label: 'Full Rotation' },
            { value: '4K', label: 'Resolution' },
            { value: 'Real-time', label: 'Rendering' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-3 md:p-6 bg-white/5 backdrop-blur-2xl border border-cyan-500/20 rounded-xl md:rounded-2xl shadow-lg"
            >
              <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">{stat.value}</div>
              <div className="text-[10px] md:text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll Indicator - Properly Centered, hidden on small mobile */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-20 flex justify-center">
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs md:text-sm text-center">Explore 3D Showcase</span>
          <FaChevronDown className="w-5 h-5 md:w-6 md:h-6" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;