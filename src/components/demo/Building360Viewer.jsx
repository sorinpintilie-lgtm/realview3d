import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaArrowUp, FaArrowDown, FaBars } from 'react-icons/fa';

// Simplified Video Player - Single Event Handler
const DualVideoPlayer = ({ segment, stopFrame, onComplete }) => {
  const videoRef = useRef(null);
  const hasStartedRef = useRef(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    hasStartedRef.current = false;
    const PART_DURATION = 7.5;
    const isBackward = segment.direction === 'backward';
    
    const getPartTime = (part, isReverse) => {
      if (!isReverse) {
        return (part - 1) * PART_DURATION;
      } else {
        const reverseMap = { 1: 0, 2: 22.5, 3: 15, 4: 7.5 };
        return reverseMap[part];
      }
    };
    
    const startTime = isBackward
      ? getPartTime(segment.from, true)
      : getPartTime(segment.from, false);
    const endTime = isBackward
      ? getPartTime(segment.to, true)
      : getPartTime(segment.to, false);

    console.log(`Setting up video: ${isBackward ? 'REVERSE' : 'FORWARD'} from ${startTime}s to ${endTime}s`);

    const handleLoadedData = () => {
      if (hasStartedRef.current) return; // Prevent multiple starts
      hasStartedRef.current = true;
      
      video.currentTime = startTime;
      setVideoReady(true);
      
      console.log(`Video loaded, starting playback`);
      video.play().catch(err => {
        console.error('Autoplay failed:', err);
        onComplete(segment.to);
      });
    };

    const handleTimeUpdate = () => {
      if (!hasStartedRef.current) return;
      
      const currentTime = video.currentTime;
      const reachedEnd = Math.abs(currentTime - endTime) < 0.3 || currentTime > endTime;
      
      if (reachedEnd) {
        console.log(`Completed at ${currentTime}s`);
        video.pause();
        video.removeEventListener('timeupdate', handleTimeUpdate);
        onComplete(segment.to);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData, { once: true });
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.load();

    return () => {
      hasStartedRef.current = false;
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [segment, onComplete]);

  const videoSrc = segment.direction === 'backward'
    ? '/assets/video30sec/var2-reverse.mp4'
    : '/assets/video30sec/var2.mp4';

  return (
    <>
      <img
        src={stopFrame}
        alt="Current view"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: videoReady ? 29 : 30 }}
      />
      
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: videoReady ? 30 : 29 }}
        muted
        playsInline
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </>
  );
};

const Building360Viewer = ({ onExit }) => {
  const [mode, setMode] = useState('exterior');
  const [currentPart, setCurrentPart] = useState(1);
  const [currentFloor, setCurrentFloor] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBlur, setShowBlur] = useState(false);

  // Stop frames for each part - using panoramic images as placeholders
  const stopFrames = {
    1: '/assets/panoramic 360/afara.jpg',
    2: '/assets/panoramic 360/0001.jpg',
    3: '/assets/panoramic 360/0002.jpg',
    4: '/assets/panoramic 360/0003.jpg'
  };

  // Floor plan images
  const floorImages = {
    floor2: '/assets/top view etaje/et2.jpg',
    floor1: '/assets/top view etaje/et1.jpg',
    floor0: '/assets/top view etaje/parter.jpg'
  };

  // Navigate to next part
  const goToNextPart = () => {
    if (isTransitioning) return;
    const nextPart = currentPart === 4 ? 1 : currentPart + 1;
    setIsTransitioning(true);
    setMode('video-transition');
    
    window.videoSegment = {
      from: currentPart,
      to: nextPart,
      direction: 'forward'
    };
  };

  // Navigate to previous part
  const goToPreviousPart = () => {
    if (isTransitioning) return;
    const prevPart = currentPart === 1 ? 4 : currentPart - 1;
    setIsTransitioning(true);
    setMode('video-transition');
    
    window.videoSegment = {
      from: currentPart,
      to: prevPart,
      direction: 'backward'
    };
  };

  // Go inside building
  const goInside = () => {
    setIsTransitioning(true);
    setMode('transition-in');
  };

  const handleTransitionInEnd = () => {
    setShowBlur(true);
    setTimeout(() => {
      setMode('interior');
      setCurrentFloor('floor2');
      setShowBlur(false);
      setIsTransitioning(false);
    }, 400);
  };

  // Go outside building
  const goOutside = () => {
    setIsTransitioning(true);
    setShowBlur(true);
    
    setTimeout(() => {
      setMode('exterior');
      setCurrentFloor(null);
      setShowBlur(false);
      setIsTransitioning(false);
    }, 1400);
  };

  // Change floor
  const changeFloor = (floor) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowBlur(true);
    
    setTimeout(() => {
      setCurrentFloor(floor);
      setShowBlur(false);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 bg-black">
      {/* Hamburger Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 left-6 z-50 p-4 bg-black/70 backdrop-blur-xl hover:bg-black/90 rounded-full border border-cyan-500/30 text-white transition-colors"
      >
        {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>

      {/* Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-full w-80 bg-black/95 backdrop-blur-2xl border-r border-cyan-500/20 z-40 p-8"
          >
            <h2 className="text-white text-2xl font-bold mb-8 mt-16">Menu</h2>
            <nav className="space-y-4">
              <button
                onClick={onExit}
                className="w-full text-left px-4 py-3 text-white hover:bg-cyan-600/20 rounded-lg transition-colors flex items-center gap-2"
              >
                <FaTimes />
                Exit Experience
              </button>
              {mode === 'interior' && (
                <button
                  onClick={goOutside}
                  className="w-full text-left px-4 py-3 text-white hover:bg-cyan-600/20 rounded-lg transition-colors flex items-center gap-2"
                >
                  <FaArrowDown />
                  Go Outside
                </button>
              )}
              {mode === 'exterior' && (
                <button
                  onClick={goInside}
                  className="w-full text-left px-4 py-3 text-white hover:bg-cyan-600/20 rounded-lg transition-colors flex items-center gap-2"
                >
                  <FaArrowUp />
                  Go Inside
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blur Overlay */}
      <AnimatePresence>
        {showBlur && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 backdrop-blur-xl bg-black/50"
          />
        )}
      </AnimatePresence>

      {/* EXTERIOR MODE - Stop Frame */}
      {mode === 'exterior' && (
        <motion.div
          key={`exterior-${currentPart}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-full"
        >
          <img
            src={stopFrames[currentPart]}
            alt={`Building view ${currentPart}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />

          {/* Navigation Arrows - Larger touch targets on mobile */}
          <button
            onClick={goToPreviousPart}
            disabled={isTransitioning}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-4 md:p-6 bg-black/70 backdrop-blur-xl hover:bg-cyan-600/20 rounded-full border border-cyan-500/30 text-white transition-all disabled:opacity-50 z-20 touch-manipulation"
          >
            <FaChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={goToNextPart}
            disabled={isTransitioning}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-4 md:p-6 bg-black/70 backdrop-blur-xl hover:bg-cyan-600/20 rounded-full border border-cyan-500/30 text-white transition-all disabled:opacity-50 z-20 touch-manipulation"
          >
            <FaChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* See Inside Button - Better mobile sizing */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
            <button
              onClick={goInside}
              disabled={isTransitioning}
              className="px-6 md:px-8 py-3 md:py-4 bg-cyan-500 hover:bg-cyan-600 text-white text-sm md:text-base font-semibold rounded-full transition-all shadow-lg shadow-cyan-500/50 hover:scale-105 disabled:opacity-50 flex items-center gap-2 touch-manipulation"
            >
              <FaArrowUp className="w-4 h-4 md:w-5 md:h-5" />
              See Inside
            </button>
          </div>

          {/* Part Indicator */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-xl px-6 py-3 rounded-full border border-cyan-500/30 z-20">
            <p className="text-white font-medium">View {currentPart} of 4</p>
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center text-white/60 text-sm z-20"
          >
            <p>← → Rotate building • ↑ Go inside</p>
          </motion.div>
        </motion.div>
      )}

      {/* VIDEO TRANSITION MODE - Dual Video System with Smooth Transition */}
      {mode === 'video-transition' && (
        <DualVideoPlayer
          segment={window.videoSegment || { from: currentPart, to: currentPart === 4 ? 1 : currentPart + 1, direction: 'forward' }}
          stopFrame={stopFrames[currentPart]}
          onComplete={(targetPart) => {
            setCurrentPart(targetPart);
            setMode('exterior');
            setIsTransitioning(false);
          }}
        />
      )}

      {/* TRANSITION IN - Going Up with Blur at End - Optimized for mobile */}
      {mode === 'transition-in' && (
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover z-30"
            autoPlay
            muted
            playsInline
            preload="metadata"
            onTimeUpdate={(e) => {
              if (e.target.duration - e.target.currentTime < 0.3) {
                setShowBlur(true);
              }
            }}
            onEnded={handleTransitionInEnd}
          >
            <source src="/assets/video 1 sec/0001-0063.mp4" type="video/mp4" />
          </video>
        </>
      )}

      {/* INTERIOR MODE - Floor Plans */}
      {mode === 'interior' && currentFloor && (
        <motion.div
          key={`interior-${currentFloor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-full bg-black"
        >
          {/* Floor Plan Image */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={floorImages[currentFloor]}
              alt={`Floor plan ${currentFloor}`}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                console.error('Failed to load floor image:', floorImages[currentFloor]);
              }}
            />
          </div>

          {/* Floor Selector - Mobile optimized */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col md:flex-row gap-2 md:gap-3 bg-black/70 backdrop-blur-xl px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-full border border-cyan-500/30">
            <button
              onClick={() => changeFloor('floor2')}
              disabled={isTransitioning}
              className={`px-4 md:px-6 py-2 md:py-2 rounded-full font-medium transition-all text-sm md:text-base touch-manipulation ${
                currentFloor === 'floor2'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-white/10 text-white hover:bg-white/20'
              } disabled:opacity-50`}
            >
              2nd Floor
            </button>
            <button
              onClick={() => changeFloor('floor1')}
              disabled={isTransitioning}
              className={`px-4 md:px-6 py-2 md:py-2 rounded-full font-medium transition-all text-sm md:text-base touch-manipulation ${
                currentFloor === 'floor1'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-white/10 text-white hover:bg-white/20'
              } disabled:opacity-50`}
            >
              1st Floor
            </button>
            <button
              onClick={() => changeFloor('floor0')}
              disabled={isTransitioning}
              className={`px-4 md:px-6 py-2 md:py-2 rounded-full font-medium transition-all text-sm md:text-base touch-manipulation ${
                currentFloor === 'floor0'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-white/10 text-white hover:bg-white/20'
              } disabled:opacity-50`}
            >
              Ground
            </button>
          </div>

          {/* Go Outside Button */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={goOutside}
              disabled={isTransitioning}
              className="px-6 py-3 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white font-medium rounded-full transition-all border border-white/20 disabled:opacity-50 flex items-center gap-2"
            >
              <FaArrowDown />
              Go Outside
            </button>
          </div>

          {/* Floor Title */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-xl px-6 py-3 rounded-full border border-cyan-500/30 z-20">
            <p className="text-white font-semibold">
              {currentFloor === 'floor2' ? '2nd Floor' : currentFloor === 'floor1' ? '1st Floor' : 'Ground Floor'}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Building360Viewer;