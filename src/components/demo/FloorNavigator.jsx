import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';

const FloorNavigator = ({ currentFloor, onFloorChange, onRoomSelect, onExit, isTransitioning }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const floors = {
    floor2: {
      name: '2nd Floor',
      image: '/assets/top view etaje/et2.jpg',
      rooms: [
        { id: 'room2-1', x: 40, y: 40, name: 'Master Bedroom', panorama: '/assets/panoramic 360/0001.jpg' },
        { id: 'room2-2', x: 75, y: 72, name: 'Guest Room', panorama: '/assets/panoramic 360/0002.jpg' }
      ]
    },
    floor1: {
      name: '1st Floor',
      image: '/assets/top view etaje/et1.jpg',
      rooms: [
        { id: 'room1-1', x: 65, y: 27, name: 'Balcony', panorama: '/assets/panoramic 360/0003.jpg' },
        { id: 'room1-2', x: 38, y: 35, name: 'Bedroom 1', panorama: '/assets/panoramic 360/afara.jpg' },
        { id: 'room1-3', x: 65, y: 35, name: 'Bedroom 2', panorama: '/assets/panoramic 360/terasa acoperis.jpg' },
        { id: 'room1-4', x: 16, y: 75, name: 'Terrace', panorama: '/assets/panoramic 360/BaiaMAREEEE.jpg' }
      ]
    },
    floor0: {
      name: 'Ground Floor',
      image: '/assets/top view etaje/parter.jpg',
      rooms: [
        { id: 'room0-1', x: 75, y: 75, name: 'Bathroom', panorama: '/assets/panoramic 360/BaiaMAREEEE.jpg' },
        { id: 'room0-2', x: 45, y: 39, name: 'Living Room', panorama: '/assets/panoramic 360/afara.jpg' },
        { id: 'room0-3', x: 35, y: 70, name: 'Office', panorama: '/assets/panoramic 360/0001.jpg' }
      ]
    }
  };

  const currentFloorData = floors[currentFloor];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0"
    >
      {/* Blur Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 backdrop-blur-xl bg-black/50"
          />
        )}
      </AnimatePresence>

      {/* Floor Plan Background */}
      <motion.div
        key={currentFloor}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${currentFloorData.image})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#000'
        }}
      />

      {/* Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Hamburger Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 left-6 z-50 p-4 bg-black/50 backdrop-blur-xl hover:bg-black/70 rounded-full border border-white/10 text-white transition-colors"
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
            className="fixed left-0 top-0 h-full w-80 bg-black/90 backdrop-blur-2xl border-r border-white/10 z-40 p-8"
          >
            <h2 className="text-white text-2xl font-bold mb-8 mt-16">Menu</h2>
            <nav className="space-y-4">
              <button
                onClick={onExit}
                className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                ← Back to Home
              </button>
              <div className="border-t border-white/10 my-4" />
              <p className="text-gray-400 text-sm px-4">
                Use arrow keys or click rooms to navigate
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floor Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-black/50 backdrop-blur-xl px-6 py-3 rounded-full border border-cyan-500/30">
        <h2 className="text-white font-semibold text-lg">{currentFloorData.name}</h2>
      </div>

      {/* Room Hotspots */}
      <div className="relative z-20">
        {currentFloorData.rooms.map((room, index) => (
          <motion.button
            key={room.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            whileHover={{ scale: 1.3 }}
            onMouseEnter={() => setHoveredRoom(room.id)}
            onMouseLeave={() => setHoveredRoom(null)}
            onClick={() => onRoomSelect(room)}
            className="absolute w-6 h-6 bg-cyan-500 border-2 border-white rounded-full shadow-lg shadow-cyan-500/50 hover:bg-cyan-400 transition-all cursor-pointer"
            style={{
              left: `${room.x}%`,
              top: `${room.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Pulse Animation */}
            <motion.div
              className="absolute inset-0 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            />

            {/* Room Label */}
            <AnimatePresence>
              {hoveredRoom === room.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 backdrop-blur-xl px-4 py-2 rounded-lg border border-cyan-500/30"
                >
                  <p className="text-white font-medium text-sm">{room.name}</p>
                  <p className="text-cyan-400 text-xs">Click to view 360°</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Floor Selector */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3 bg-black/50 backdrop-blur-xl px-6 py-4 rounded-full border border-white/10">
        {Object.entries(floors).map(([floorKey, floorData]) => (
          <button
            key={floorKey}
            onClick={() => onFloorChange(floorKey)}
            disabled={isTransitioning}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              currentFloor === floorKey
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-white/10 text-white hover:bg-white/20'
            } disabled:opacity-50`}
          >
            {floorData.name}
          </button>
        ))}
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center text-white/60 text-sm"
      >
        <p>Click on the blue dots to explore rooms in 360°</p>
      </motion.div>
    </motion.div>
  );
};

export default FloorNavigator;