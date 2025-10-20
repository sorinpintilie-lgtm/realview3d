import Navigation from '../components/layout/Navigation';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Showcase3D from '../components/sections/Showcase3D';
import InteractiveDemo from '../components/sections/InteractiveDemo';
import { motion } from 'framer-motion';
import { FaCube, FaEnvelope, FaPhone } from 'react-icons/fa';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black">
      {/* Unified Background with Animated Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated 3D Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Floating Blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ filter: 'blur(100px)' }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ filter: 'blur(100px)' }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-400/5 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{ filter: 'blur(120px)' }}
        />
      </div>

      {/* Content - All sections on same background */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Features />
        <Showcase3D />
        <InteractiveDemo />
        
        {/* Pricing Section */}
        <section id="pricing" className="min-h-screen flex items-center justify-center relative py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-full text-sm font-medium backdrop-blur-sm">
                <FaCube />
                Flexible Pricing
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Choose Your Plan</h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16">
                Professional 3D visualization solutions tailored to your project size
              </p>

              {/* Pricing Cards */}
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12">
                {[
                  { name: 'Small Project', price: 'From $500', unit: 'per project', features: ['Up to 5 Views', 'HD Quality', '2 Revisions', 'Email Support'] },
                  { name: 'Medium Project', price: 'From $1,500', unit: 'per project', features: ['Up to 15 Views', '4K Quality', 'Unlimited Revisions', 'Priority Support', 'Custom Branding'], popular: true },
                  { name: 'Large Project', price: 'Custom Quote', unit: 'based on scope', features: ['Unlimited Views', '8K Quality', 'White Label', 'Dedicated Manager', 'API Access'] }
                ].map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className={`relative p-6 md:p-8 rounded-2xl border ${
                      plan.popular 
                        ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/50' 
                        : 'bg-white/5 border-white/10'
                    } backdrop-blur-xl`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">{plan.price}</div>
                    <div className="text-sm text-gray-500 mb-6">{plan.unit}</div>
                    <ul className="space-y-2 md:space-y-3 mb-8 text-left">
                      {plan.features.map(feature => (
                        <li key={feature} className="text-sm md:text-base text-gray-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-2.5 md:py-3 rounded-full font-medium transition-all text-sm md:text-base ${
                      plan.popular
                        ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}>
                      Get Started
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center relative py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-full text-sm font-medium backdrop-blur-sm">
                <FaEnvelope />
                Get in Touch
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Transform Your<br className="hidden md:block" /> Property Marketing?
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                Start creating stunning 3D experiences today. No credit card required.
              </p>

              {/* Contact Options */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
                >
                  <FaEnvelope className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 mb-4 mx-auto" />
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Email Us</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-4">Get a response within 24 hours</p>
                  <a href="mailto:hello@realview3d.com" className="text-cyan-400 hover:text-cyan-300 text-sm md:text-base">
                    hello@realview3d.com
                  </a>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
                >
                  <FaPhone className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 mb-4 mx-auto" />
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Call Us</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-4">Mon-Fri, 9AM-6PM EST</p>
                  <a href="tel:+1234567890" className="text-cyan-400 hover:text-cyan-300 text-sm md:text-base">
                    +1 (234) 567-890
                  </a>
                </motion.div>
              </div>

              {/* CTA */}
              <button className="px-8 md:px-12 py-3 md:py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full transition-all shadow-lg shadow-cyan-500/50 hover:scale-105 text-base md:text-lg">
                Request Demo
              </button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 md:py-12 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <FaCube className="text-white text-sm" />
                </div>
                <span className="text-white font-semibold">RealView3D<sup className="text-xs">™</sup></span>
              </div>
              <p className="text-gray-500 text-sm">
                © 2024 RealView3D. All rights reserved.
              </p>
              <div className="flex gap-4 md:gap-6 text-gray-400 text-sm">
                <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;