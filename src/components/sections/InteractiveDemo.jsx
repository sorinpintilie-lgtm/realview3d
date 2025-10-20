import { motion } from 'framer-motion';
import { FaCube, FaMousePointer, FaExpand, FaRedo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InteractiveDemo = () => {
  const navigate = useNavigate();

  return (
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-full text-sm font-medium backdrop-blur-sm"
            >
              <FaCube className="animate-spin" style={{ animationDuration: '4s' }} />
              Interactive 3D Demo
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              See It In Action
            </h2>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the power of RealView3D with our live interactive demo. Rotate, zoom, and explore a real building project.
            </p>
          </motion.div>
          
          {/* Demo Viewer Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
          >
            {/* Demo Placeholder with 3D Effect */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
              {/* Preview Image - Lazy loaded */}
              <div className="absolute inset-0">
                <img
                  src="/assets/panoramic 360/afara.jpg"
                  alt="Building Preview"
                  className="w-full h-full object-cover opacity-50"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>
              
              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <FaCube className="text-cyan-400 text-6xl mb-4 mx-auto drop-shadow-lg" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Interactive 360° Viewer</h3>
                  <p className="text-gray-300 mb-6">Explore the building from every angle</p>
                  <button
                    onClick={() => navigate('/demo')}
                    className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:scale-105 flex items-center gap-2 mx-auto"
                  >
                    Start Demo
                    <FaCube />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-cyan-500 rounded-3xl opacity-20 blur-xl" />
          </motion.div>
          
          {/* Feature Highlights Below Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: FaMousePointer, text: 'Click Arrows to Rotate' },
              { icon: FaExpand, text: 'Fullscreen Mode' },
              { icon: FaRedo, text: '4 Different Views' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-3 text-gray-400">
                <item.icon className="text-cyan-500" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <button 
              onClick={() => navigate('/demo')}
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:scale-105 transition-transform shadow-xl"
            >
              Try Full Interactive Demo
            </button>
            <p className="text-gray-500 text-sm mt-4">No signup required • Works on all devices</p>
          </motion.div>
        </div>
      </section>
  );
};

export default InteractiveDemo;