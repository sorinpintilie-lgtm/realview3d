import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingCover from '../components/demo/LandingCover';
import Building360Viewer from '../components/demo/Building360Viewer';

const FullDemo = () => {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
  };

  const handleExit = () => {
    window.location.href = '/';
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <LandingCover key="landing" onEnter={handleEnter} />
        ) : (
          <Building360Viewer key="viewer" onExit={handleExit} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullDemo;