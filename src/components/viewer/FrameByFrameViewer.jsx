import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaCompress, FaPlay, FaPause } from 'react-icons/fa';

const FrameByFrameViewer = ({ isOpen, onClose }) => {
  const [currentPart, setCurrentPart] = useState(1); // 1, 2, 3, or 4
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  // Total frames: 300 frames (every 3rd frame) divided into 4 parts = 75 frames per part
  const FRAMES_PER_PART = 75;
  const TOTAL_FRAMES = 300;
  const FRAME_STEP = 3; // We're using every 3rd frame

  // Get frame path based on current part and frame
  const getFramePath = (frameNumber) => {
    const actualFrame = frameNumber * FRAME_STEP;
    const paddedFrame = String(actualFrame).padStart(4, '0');
    return `/assets/video30sec/frames var2/${paddedFrame}.jpg`;
  };

  // Calculate which frames to show for current part
  const getPartFrameRange = (part) => {
    const startFrame = (part - 1) * FRAMES_PER_PART;
    const endFrame = part * FRAMES_PER_PART - 1;
    return { startFrame, endFrame };
  };

  // Navigate to next part
  const goToNextPart = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const nextPart = currentPart === 4 ? 1 : currentPart + 1;
    const { startFrame } = getPartFrameRange(nextPart);
    
    // Animate transition
    setCurrentFrame(startFrame);
    setCurrentPart(nextPart);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Navigate to previous part
  const goToPreviousPart = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const prevPart = currentPart === 1 ? 4 : currentPart - 1;
    const { startFrame } = getPartFrameRange(prevPart);
    
    // Animate transition
    setCurrentFrame(startFrame);
    setCurrentPart(prevPart);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const { startFrame, endFrame } = getPartFrameRange(currentPart);
    let frame = currentFrame;

    const animate = () => {
      frame++;
      if (frame > endFrame) {
        frame = startFrame;
      }
      setCurrentFrame(frame);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, currentPart]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPreviousPart();
      } else if (e.key === 'ArrowRight') {
        goToNextPart();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPart, isPlaying, onClose]);

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

  // Initialize on open
  useEffect(() => {
    if (isOpen) {
      setCurrentPart(1);
      setCurrentFrame(0);
      setIsPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const { startFrame, endFrame } = getPartFrameRange(currentPart);
  const progress = ((currentFrame - startFrame) / (endFrame - startFrame)) * 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        onClick={onClose}
      >
        <div
          ref={containerRef}
          className="relative w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
            <div className="bg-black/70 backdrop-blur-xl px-6 py-3 rounded-full border border-cyan-500/30">
              <h3 className="text-white font-semibold">Interactive 360° Building Tour</h3>
              <p className="text-cyan-400 text-sm">Part {currentPart} of 4</p>
            </div>
            
            <button
              onClick={onClose}
              className="p-3 bg-black/70 backdrop-blur-xl hover:bg-black/90 rounded-full border border-white/10 text-white transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Main Frame Display */}
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.img
              key={currentFrame}
              src={getFramePath(currentFrame)}
              alt={`Frame ${currentFrame}`}
              className="max-w-full max-h-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              draggable={false}
            />

            {/* Loading indicator for first load */}
            {currentFrame === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white text-center">
                  <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p>Loading 360° Experience...</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPreviousPart}
            disabled={isTransitioning}
            className="absolute left-8 top-1/2 -translate-y-1/2 p-6 bg-black/70 backdrop-blur-xl hover:bg-cyan-600/20 rounded-full border border-cyan-500/30 text-white transition-all disabled:opacity-50 group"
          >
            <FaChevronLeft className="w-8 h-8 group-hover:text-cyan-400 transition-colors" />
          </button>

          <button
            onClick={goToNextPart}
            disabled={isTransitioning}
            className="absolute right-8 top-1/2 -translate-y-1/2 p-6 bg-black/70 backdrop-blur-xl hover:bg-cyan-600/20 rounded-full border border-cyan-500/30 text-white transition-all disabled:opacity-50 group"
          >
            <FaChevronRight className="w-8 h-8 group-hover:text-cyan-400 transition-colors" />
          </button>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/70 backdrop-blur-xl px-8 py-4 rounded-full border border-cyan-500/30">
            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 hover:bg-cyan-600/20 rounded-lg transition-colors text-white"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <FaPause className="w-5 h-5" /> : <FaPlay className="w-5 h-5" />}
            </button>

            <div className="w-px h-6 bg-white/20" />

            {/* Part Indicators */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((part) => (
                <button
                  key={part}
                  onClick={() => {
                    setCurrentPart(part);
                    const { startFrame } = getPartFrameRange(part);
                    setCurrentFrame(startFrame);
                  }}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    currentPart === part
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  {part}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-white/20" />

            {/* Frame Counter */}
            <div className="text-white text-sm min-w-[120px] text-center">
              <span className="text-gray-400">Frame:</span> {currentFrame} / {TOTAL_FRAMES}
            </div>

            <div className="w-px h-6 bg-white/20" />

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-3 hover:bg-cyan-600/20 rounded-lg transition-colors text-white"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <FaCompress className="w-5 h-5" /> : <FaExpand className="w-5 h-5" />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-24 left-8 right-8">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50"
                style={{
                  width: `${progress}%`
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Instructions Overlay (shows briefly on open) */}
          <AnimatePresence>
            {!isPlaying && currentFrame === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.5 }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl px-8 py-6 rounded-2xl border border-cyan-500/30 text-center max-w-md"
              >
                <h4 className="text-white text-xl font-bold mb-4">Navigate the Building</h4>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>← → Use arrows to rotate 360°</p>
                  <p>1-4 Jump to different views</p>
                  <p>▶ Play automatic rotation</p>
                </div>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-colors shadow-lg shadow-cyan-500/50"
                >
                  Start Tour
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FrameByFrameViewer;