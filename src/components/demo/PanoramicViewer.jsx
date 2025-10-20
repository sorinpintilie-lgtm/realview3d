import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaExpand, FaCompress, FaRedo } from 'react-icons/fa';

const PanoramicViewer = ({ roomId, onExit }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  // Handle mouse drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.2)),
      y: prev.y + deltaX * 0.3
    }));

    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support
  const handleTouchStart = (e) => {
    setIsDragging(true);
    startPosRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startPosRef.current.x;
    const deltaY = e.touches[0].clientY - startPosRef.current.y;

    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.2)),
      y: prev.y + deltaX * 0.3
    }));

    startPosRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Zoom with mouse wheel
  const handleWheel = (e) => {
    e.preventDefault();
    setZoom(prev => Math.max(1, Math.min(3, prev - e.deltaY * 0.001)));
  };

  // Reset view
  const handleReset = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onExit();
      if (e.key === 'r' || e.key === 'R') handleReset();
      if (e.key === 'ArrowLeft') setRotation(prev => ({ ...prev, y: prev.y - 5 }));
      if (e.key === 'ArrowRight') setRotation(prev => ({ ...prev, y: prev.y + 5 }));
      if (e.key === 'ArrowUp') setRotation(prev => ({ ...prev, x: Math.max(-90, prev.x - 5) }));
      if (e.key === 'ArrowDown') setRotation(prev => ({ ...prev, x: Math.min(90, prev.x + 5) }));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Panoramic Image with CSS 3D Transform */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `scale(${zoom})`,
          transition: isDragging ? 'none' : 'transform 0.3s ease'
        }}
      >
        <div
          className="w-[200%] h-[200%]"
          style={{
            backgroundImage: `url(${roomId.panorama})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat-x',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between">
        <div className="bg-black/70 backdrop-blur-xl px-6 py-3 rounded-full border border-cyan-500/30">
          <h3 className="text-white font-semibold">{roomId.name}</h3>
          <p className="text-cyan-400 text-sm">360° Panoramic View</p>
        </div>

        <button
          onClick={onExit}
          className="p-3 bg-black/70 backdrop-blur-xl hover:bg-black/90 rounded-full border border-white/10 text-white transition-colors"
        >
          <FaTimes className="w-6 h-6" />
        </button>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 bg-black/70 backdrop-blur-xl px-8 py-4 rounded-full border border-cyan-500/30">
        <button
          onClick={handleReset}
          className="p-3 hover:bg-cyan-600/20 rounded-lg transition-colors text-white"
          title="Reset View"
        >
          <FaRedo />
        </button>

        <div className="w-px h-6 bg-white/20" />

        <div className="text-white text-sm min-w-[100px] text-center">
          <span className="text-gray-400">Zoom:</span> {(zoom * 100).toFixed(0)}%
        </div>

        <div className="w-px h-6 bg-white/20" />

        <button
          onClick={toggleFullscreen}
          className="p-3 hover:bg-cyan-600/20 rounded-lg transition-colors text-white"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl px-8 py-6 rounded-2xl border border-cyan-500/30 text-center max-w-md pointer-events-none"
      >
        <h4 className="text-white text-xl font-bold mb-4">Navigate the Room</h4>
        <div className="space-y-2 text-gray-300 text-sm">
          <p>🖱️ Drag to look around</p>
          <p>🔍 Scroll to zoom in/out</p>
          <p>⌨️ Arrow keys to rotate</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PanoramicViewer;