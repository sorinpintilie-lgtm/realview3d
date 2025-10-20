import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCube, FaExpand, FaEye, FaPlay } from 'react-icons/fa';
import Viewer360 from '../viewer/Viewer360';

const Showcase3D = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Exterior View',
      location: 'Main Entrance',
      type: '360° Panoramic',
      image: '/assets/panoramic 360/afara.jpg',
      views: '360° View',
      features: ['Full Rotation', 'HD Quality', 'Interactive'],
      panoramicImages: [
        '/assets/panoramic 360/afara.jpg',
        '/assets/panoramic 360/0001.jpg',
        '/assets/panoramic 360/0002.jpg',
        '/assets/panoramic 360/0003.jpg',
      ]
    },
    {
      id: 2,
      title: 'Rooftop Terrace',
      location: 'Top Floor',
      type: '360° Panoramic',
      image: '/assets/panoramic 360/terasa acoperis.jpg',
      views: 'Interactive Tour',
      features: ['Panoramic View', 'Premium Space', 'Outdoor Area'],
      panoramicImages: [
        '/assets/panoramic 360/terasa acoperis.jpg',
        '/assets/panoramic 360/0001.jpg',
        '/assets/panoramic 360/0002.jpg',
      ]
    },
    {
      id: 3,
      title: 'Master Bathroom',
      location: 'Interior Space',
      type: '360° Panoramic',
      image: '/assets/panoramic 360/BaiaMAREEEE.jpg',
      views: '3D Walkthrough',
      features: ['Luxury Finishes', 'Spacious', 'Modern Design'],
      panoramicImages: [
        '/assets/panoramic 360/BaiaMAREEEE.jpg',
        '/assets/panoramic 360/0001.jpg',
        '/assets/panoramic 360/0002.jpg',
      ]
    }
  ];

  const handleViewIn3D = (project) => {
    setSelectedProject(project);
    setViewerOpen(true);
  };

  return (
    <>
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
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-full text-sm font-medium backdrop-blur-sm"
            >
              <FaCube className="animate-spin" style={{ animationDuration: '3s' }} />
              3D Project Showcase
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Experience Buildings in 3D
            </h2>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our portfolio of stunning 3D architectural visualizations. Each project is fully interactive and photorealistic.
            </p>
          </motion.div>
          
          {/* 3D Project Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative"
              >
                {/* Card Container */}
                <div className="relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500">
                  {/* Image Container with 3D Effect */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredCard === project.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                    
                    {/* 3D View Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredCard === project.id ? 1 : 0,
                        y: hoveredCard === project.id ? 0 : 20
                      }}
                      className="absolute top-4 right-4 px-3 py-1.5 bg-cyan-600 text-white text-xs font-medium rounded-full flex items-center gap-1"
                    >
                      <FaCube className="text-xs" />
                      {project.views}
                    </motion.div>
                    
                    {/* Play Button Overlay */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: hoveredCard === project.id ? 1 : 0,
                        scale: hoveredCard === project.id ? 1 : 0.8
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-16 h-16 bg-cyan-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-cyan-400/40">
                        <FaPlay className="text-cyan-400 text-xl ml-1" />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Type Badge */}
                    <div className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-full mb-3">
                      {project.type}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {project.location}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.features.map((feature, idx) => (
                        <span key={idx} className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewIn3D(project)}
                        className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
                      >
                        <FaEye />
                        View in 3D
                      </button>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
                        <FaExpand />
                      </button>
                    </div>
                  </div>
                  
                  {/* Glow Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                      opacity: hoveredCard === project.id ? 1 : 0,
                    }}
                    style={{
                      background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.1), transparent 70%)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:scale-105 flex items-center gap-2 mx-auto">
              <FaCube />
              Explore All 3D Projects
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 360 Viewer Modal */}
      {selectedProject && (
        <Viewer360
          isOpen={viewerOpen}
          onClose={() => {
            setViewerOpen(false);
            setSelectedProject(null);
          }}
          images={selectedProject.panoramicImages}
          title={selectedProject.title}
        />
      )}
    </>
  );
};

export default Showcase3D;