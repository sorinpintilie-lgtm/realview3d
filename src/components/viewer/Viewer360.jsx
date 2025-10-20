import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaExpand, FaCompress, FaRedo, FaMousePointer, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Viewer360 = ({ isOpen, onClose, images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  // Handle drag to rotate
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const diff = e.clientX - startX;
    const sensitivity = 5; // pixels per image
    
    if (Math.abs(diff) > sensitivity) {
      const direction = diff > 0 ? -1 : 1;
      setCurrentImageIndex((prev) => {
        const newIndex = prev + direction;
        if (newIndex < 0) return images.length - 1;
        if (newIndex >= images.length) return 0;
        return newIndex;
      });
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const diff = e.touches[0].clientX - startX;
    const sensitivity = 5;
    
    if (Math.abs(diff) > sensitivity) {
      const direction = diff > 0 ? -1 : 1;
      setCurrentImageIndex((prev) => {
        const newIndex = prev + direction;
        if (newIndex < 0) return images.length - 1;
        if (newIndex >= images.length) return 0;
        return newIndex;
      });
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose]);

  // Reset view
  const handleReset = () => {
    setCurrentImageIndex(0);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        <div
          ref={containerRef}
          className="relative w-full h-full max-w-7xl mx-auto p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
            <div className="bg-black/50 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10">
              <h3 className="text-white font-semibold">{title}</h3>
              <p className="text-cyan-400 text-sm">360° Panoramic View</p>
            </div>
            
            <button
              onClick={onClose}
              className="p-3 bg-black/50 backdrop-blur-xl hover:bg-black/70 rounded-full border border-white/10 text-white transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image */}
          <div
            className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`View ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              draggable={false}
            />

            {/* Drag Hint */}
            {!isDragging && currentImageIndex === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-xl px-6 py-3 rounded-full border border-cyan-500/30 text-white flex items-center gap-2"
              >
                <FaMousePointer className="text-cyan-400" />
                <span>Drag to rotate 360°</span>
              </motion.div>
            )}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-black/50 backdrop-blur-xl hover:bg-black/70 rounded-full border border-white/10 text-white transition-colors"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            className="absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-black/50 backdrop-blur-xl hover:bg-black/70 rounded-full border border-white/10 text-white transition-colors"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-xl px-6 py-4 rounded-full border border-white/10">
            <button
              onClick={handleReset}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
              title="Reset View"
            >
              <FaRedo />
            </button>

            <div className="w-px h-6 bg-white/20" />

            <div className="text-white text-sm">
              <span className="text-gray-400">Frame:</span> {currentImageIndex + 1} / {images.length}
            </div>

            <div className="w-px h-6 bg-white/20" />

            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-24 left-8 right-8">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{
                  width: `${((currentImageIndex + 1) / images.length) * 100}%`
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Viewer360;