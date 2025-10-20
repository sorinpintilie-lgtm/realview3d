import { motion } from 'framer-motion';
import { FaCube } from 'react-icons/fa';

const LandingCover = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center"
    >
      {/* Background Video Loop - Blurred, optimized for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static background for mobile, video for desktop */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 md:hidden" />
        <video
          className="absolute inset-0 w-full h-full object-cover scale-110 hidden md:block"
          style={{ filter: 'blur(8px)' }}
          autoPlay
          loop
          muted
          playsInline
          loading="lazy"
        >
          <source src="/assets/video30sec/var2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Liquid Glass Cover */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="relative z-10 max-w-2xl mx-auto px-8"
      >
        <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-12 shadow-2xl">
          {/* Liquid Blob Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ filter: 'blur(60px)' }}
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Logo */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <FaCube className="text-white text-3xl" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white mb-2">
                RealView3D<sup className="text-xl">™</sup>
              </h1>
              <p className="text-cyan-400 text-lg">Immersive Building Experience</p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 mb-8 text-lg leading-relaxed"
            >
              Explore every detail of this architectural masterpiece in stunning 360° views
            </motion.p>

            {/* Enter Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnter}
              className="px-12 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full text-lg transition-all shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60"
            >
              ENTER EXPERIENCE
            </motion.button>

            {/* Hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/50 text-sm mt-6"
            >
              Click to begin your virtual tour
            </motion.p>
          </div>

          {/* Animated Border Glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(6,182,212,0.5), rgba(14,165,233,0.5))',
              padding: '2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />
        </div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
};

export default LandingCover;