import { motion } from 'framer-motion';
import { FaCube, FaVrCardboard, FaMobileAlt, FaExpand, FaMousePointer, FaRocket } from 'react-icons/fa';
import GlassCard from '../common/GlassCard';

const Features = () => {
  const features = [
    {
      icon: FaCube,
      title: '360° 3D Rotation',
      description: 'Explore buildings from every angle with smooth, interactive 360-degree rotation and zoom controls.'
    },
    {
      icon: FaVrCardboard,
      title: 'Immersive Experience',
      description: 'Virtual reality ready visualizations that transport buyers directly into the property space.'
    },
    {
      icon: FaExpand,
      title: 'Photorealistic Renders',
      description: 'Ultra-high definition 4K renders with realistic lighting, materials, and environmental effects.'
    },
    {
      icon: FaMousePointer,
      title: 'Interactive Hotspots',
      description: 'Click on any part of the building to view detailed information, floor plans, and unit specifications.'
    },
    {
      icon: FaMobileAlt,
      title: 'Cross-Platform',
      description: 'Seamless experience across desktop, tablet, and mobile devices with touch gesture support.'
    },
    {
      icon: FaRocket,
      title: 'Instant Loading',
      description: 'Optimized 3D assets load in seconds with progressive rendering for smooth performance.'
    }
  ];

  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-full text-sm font-medium backdrop-blur-sm"
          >
            <FaCube className="animate-pulse" />
            3D Visualization Features
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Powerful 3D Capabilities
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Industry-leading 3D rendering technology that brings architectural designs to life with stunning realism
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="h-full">
                <motion.div
                  className="mb-6 transform group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ 
                    rotateY: [0, 180, 360],
                    transition: { duration: 0.6 }
                  }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Additional Info with 3D Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-black to-gray-900 border border-cyan-500/20 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
              }} />
            </div>
            
            <div className="relative z-10 grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">3D Models Rendered</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">&lt;2s</div>
                <div className="text-blue-100">Average Load Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4K</div>
                <div className="text-blue-100">Ultra HD Quality</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-8">
            Ready to transform your property marketing with 3D visualization?
          </p>
          
          <motion.a
            href="#demo"
            className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:gap-4 transition-all"
            whileHover={{ x: 5 }}
          >
            See it in action
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;