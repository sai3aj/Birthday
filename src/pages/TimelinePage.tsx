import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Plus, Star, Sparkles, ArrowLeft, Bike, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import PageTransition from '../components/PageTransition';

const timelineEvents = [
  {
    year: 2024,
    image: "./images/2.jpg",
    
  },
  {
    year: 2023,
    image: "./images/3.jpg",
    
  },
  {
    year: 2022,
    image: "./images/5.png",
    
  },
  {
    year: 2021,
    image: "./images/6.png",
    
  },
  {
    year: 2020,
    image: "./images/7.png",
    
  },
];

// Add video URLs at the top with your timelineEvents
const timelineVideos = {
  2023: "https://player.vimeo.com/video/123456789?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1", // Replace with actual video URL
  2021: "../videos"  // Replace with actual video URL
};

// Add this new component for the confetti burst
const CrackerBurst = ({ isActive }: { isActive: boolean }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Main burst particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute w-1.5 h-1.5 rounded-full ${
                ['bg-pink-500', 'bg-purple-500', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400'][i % 5]
              }`}
              initial={{
                scale: 0,
                x: '50%',
                y: '50%',
                opacity: 1,
              }}
              animate={{
                scale: [0, 1.5, 1],
                x: `${50 + (Math.random() - 0.5) * 200}%`,
                y: `${50 + (Math.random() - 0.5) * 200}%`,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 0.6,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            />
          ))}

          {/* Circular wave effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-20 h-20 rounded-full border-2 border-yellow-400/50" />
          </motion.div>

          {/* Multiple sparkle bursts */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, rotate: i * 45, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 0],
                rotate: [i * 45, i * 45 + 90],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          ))}

          {/* Center flash */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

// Update the CustomBike component to be slightly smaller
const CustomBike = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.g className="text-purple-600">
      {/* Wheels with spokes effect */}
      <motion.circle 
        cx="5" cy="19" r="3" 
        className="stroke-current" 
        strokeWidth="1.5"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle 
        cx="19" cy="19" r="3" 
        className="stroke-current" 
        strokeWidth="1.5"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Bike Frame with gradient */}
      <path 
        d="M12,19 L5,19 L9,10 L17,10 M17,19 L12,19 M9,10 L12,19" 
        className="stroke-current" 
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Handlebars with glow effect */}
      <path 
        d="M17,10 C17,7 18,6 20,6" 
        className="stroke-current" 
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Decorative elements */}
      <circle cx="17" cy="10" r="1" className="fill-pink-500" />
      <circle cx="9" cy="10" r="1" className="fill-purple-500" />
    </motion.g>
  </svg>
);

// Update the MovingBike component
const MovingBike = () => {
  return (
    <motion.div
      className="absolute inset-0 z-30 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <svg
        className="w-full h-full absolute"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.div
          style={{
            position: 'absolute',
            offsetPath: "path('M50,0 Q60,50 50,100')",
            offsetRotate: "auto",
          }}
          animate={{
            offsetDistance: ['0%', '100%']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <motion.div
            animate={{ y: [-1, 1, -1] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Glowing effect behind bike */}
            <div className="absolute inset-[-8px] blur-md bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full" />
            
            {/* Bike with tilt based on curve */}
            <motion.div
              style={{ 
                transformOrigin: 'center',
                rotate: 'auto'
              }}
            >
              <CustomBike />
            </motion.div>
          </motion.div>
        </motion.div>
      </svg>
    </motion.div>
  );
};

// Add this animation component
const FloatingTimelineElements = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Glowing Orbs */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={`orb-${i}`}
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          y: [-20, 20, -20],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: i * 0.7,
        }}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(8px)',
        }}
      />
    ))}

    {/* Floating Lines */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={`line-${i}`}
        className="absolute h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"
        style={{
          width: '200px',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `rotate(${Math.random() * 180}deg)`,
        }}
        animate={{
          opacity: [0, 0.5, 0],
          x: [-100, 100, -100],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      />
    ))}
  </div>
);

// Add this new component for space background
const SpaceBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Twinkling Stars */}
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={`star-${i}`}
        className="absolute rounded-full"
        style={{
          width: Math.random() * 3 + 1 + 'px',
          height: Math.random() * 3 + 1 + 'px',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          background: 'white',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
      />
    ))}

    {/* Floating Nebulas */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={`nebula-${i}`}
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, ${
            ['rgba(139,92,246,0.3)', 'rgba(168,85,247,0.3)', 'rgba(217,70,239,0.3)'][i % 3]
          } 0%, transparent 70%)`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}

    {/* Shooting Stars */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`shooting-star-${i}`}
        className="absolute h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent"
        style={{
          width: '100px',
          rotate: '45deg',
        }}
        initial={{ 
          x: '-10%', 
          y: '-10%',
          opacity: 0,
        }}
        animate={{
          x: '120%',
          y: '120%',
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 4 + Math.random() * 2,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

// Add this new space burst animation component
const SpaceBurst = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Central Energy Burst */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 2, 2.5],
        opacity: [0, 0.5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatDelay: 2
      }}
    >
      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 blur-xl" />
    </motion.div>

    {/* Radiating Rings */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`ring-${i}`}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-violet-400/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 2 + i],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.2,
          repeatDelay: 2
        }}
      />
    ))}

    {/* Energy Particles */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-violet-300/50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 0.5],
          opacity: [0, 1, 0],
          x: [0, Math.cos(i * 30 * (Math.PI / 180)) * 100],
          y: [0, Math.sin(i * 30 * (Math.PI / 180)) * 100],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 2
        }}
      />
    ))}
  </div>
);

// Update the SpaceEntrance component
const SpaceEntrance = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2, delay: 4 }}
      className="fixed inset-0 z-50 bg-violet-950 flex items-center justify-center"
    >
      {/* Central Portal Effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.5, 3],
          opacity: [0, 1, 0] 
        }}
        transition={{ duration: 3 }}
        className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-2xl"
      />

      {/* Radiating Light Beams */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5],
            opacity: [0, 0.5, 0],
            rotate: i * 30
          }}
          transition={{
            duration: 2,
            ease: "easeOut"
          }}
          className="absolute w-2 h-40 bg-gradient-to-t from-transparent via-violet-400 to-transparent"
          style={{
            transformOrigin: 'center',
            transform: `rotate(${i * 30}deg)`
          }}
        />
      ))}

      {/* Exploding Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.5],
            x: (Math.random() - 0.5) * 500,
            y: (Math.random() - 0.5) * 500,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            delay: Math.random() * 0.5
          }}
          className="absolute w-2 h-2 rounded-full bg-violet-200"
        />
      ))}

      {/* Updated Central Text with enhanced styling */}
      <div className="relative flex items-center justify-center w-full">
        {/* First Message */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: [0.5, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 3,
            times: [0, 0.2, 0.8, 1] 
          }}
          className="absolute text-6xl md:text-7xl font-bold text-center"
        >
          <span className="bg-gradient-to-r from-violet-200 via-purple-300 to-pink-200 bg-clip-text text-transparent drop-shadow-lg">
            Back to the memories...
          </span>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -right-12 -top-6"
          >
            <Sparkles className="w-8 h-8 text-purple-300" />
          </motion.div>
        </motion.div>

        {/* Second Message - Updated timing */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: [0.5, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 3,
            times: [0, 0.2, 0.8, 1],
            delay: 2.5
          }}
          className="absolute text-7xl md:text-8xl font-bold text-center"
        >
          {/* Enhanced background ring with better visibility */}
          <motion.div
            className="absolute inset-[-40px] rounded-full bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 blur-2xl"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="bg-gradient-to-r from-violet-200 via-purple-300 to-pink-200 bg-clip-text text-transparent drop-shadow-lg relative z-10">
            Here we go!
          </span>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute -left-12 -top-6"
          >
            <Sparkles className="w-8 h-8 text-purple-300" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Update the MemoryRevealBurst component
const MemoryRevealBurst = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0 pointer-events-none overflow-hidden z-0"
  >
    {/* Enhanced Central Burst */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 2],
        opacity: [0.8, 0],
      }}
      transition={{ 
        duration: 1.2,
        ease: "easeOut"
      }}
      className="absolute inset-0 bg-gradient-to-r from-violet-500/40 to-fuchsia-500/40 rounded-2xl blur-xl"
    />

    {/* Radiating Particles */}
    {[...Array(16)].map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1],
          opacity: [1, 0],
          x: [0, Math.cos(i * 22.5 * (Math.PI / 180)) * 100],
          y: [0, Math.sin(i * 22.5 * (Math.PI / 180)) * 100],
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut"
        }}
        className="absolute top-1/2 left-1/2 w-2 h-2 bg-violet-300/70 rounded-full"
        style={{
          transformOrigin: 'center',
        }}
      />
    ))}

    {/* Expanding Rings */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`ring-${i}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [1, 2 + i * 0.5],
          opacity: [0.7, 0],
        }}
        transition={{ 
          duration: 1.2 + i * 0.2,
          ease: "easeOut"
        }}
        className="absolute inset-2 rounded-2xl border-2 border-violet-400/40"
      />
    ))}

    {/* Additional Sparkle Effects */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={`sparkle-${i}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1,
          delay: Math.random() * 0.5,
          ease: "easeOut"
        }}
        className="absolute w-4 h-4 bg-violet-300/50 rounded-full blur-sm"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </motion.div>
);

const TimelinePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [burstIndex, setBurstIndex] = useState<number | null>(null);
  const [showBike, setShowBike] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showEntrance, setShowEntrance] = useState(false);

  const handleEventClick = (index: number) => {
    if (selectedEvent !== index) {
      setBurstIndex(index);
      setSelectedEvent(index);
      setTimeout(() => setBurstIndex(null), 1500);
    } else {
      setSelectedEvent(null);
    }
  };

  const handleNavigate = async (direction: 'back' | 'forward') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate(direction === 'back' ? '/' : '/wishes'); // Updated navigation paths
  };

  useEffect(() => {
    // Check if we're coming from the welcome page
    if (location.state?.from === 'welcome') {
      setShowEntrance(true);
      const timer = setTimeout(() => {
        setShowEntrance(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [location.state]); // Update dependency to location.state

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-violet-900 to-violet-950 py-12 px-4 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {showEntrance && <SpaceEntrance />}
      </AnimatePresence>

      {/* Add SpaceBackground before other elements */}
      <SpaceBackground />
      <SpaceBurst />  {/* Add the new burst animation */}
      
      {/* Back Button - Updated onClick */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => handleNavigate('back')}
        className="fixed top-6 left-6 z-50 bg-violet-800/20 backdrop-blur-sm p-2 rounded-full 
          shadow-lg hover:shadow-xl transition-all duration-300 group
          hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-500"
      >
        <ArrowLeft className="w-6 h-6 text-violet-200 group-hover:text-white transition-colors" />
      </motion.button>

      <FloatingTimelineElements />

      <AnimatedBackground variant="timeline" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + Math.random() * 2,
              delay: i * 0.3,
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Star className="w-3 h-3 text-purple-300/50" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
        <div className="relative pb-32">
          {/* Curved Road Path - Make responsive */}
          <div className="absolute left-0 right-0 top-0 bottom-32 hidden md:block">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Main Road */}
              <path
                d="M50,0 Q60,50 50,100"
                className="stroke-[6] stroke-violet-700"
                strokeLinecap="round"
                fill="none"
              />
              {/* Road Lines */}
              <path
                d="M50,0 Q60,50 50,100"
                className="stroke-[0.5] stroke-violet-500"
                strokeDasharray="2 4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            
            {/* Bike Animation */}
            {showBike && <MovingBike />}
          </div>

          {/* Mobile Road - Show only on small screens */}
          <div className="absolute left-1/2 top-0 bottom-32 w-1 bg-violet-700 md:hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />
          </div>

          {/* Timeline Events - Updated spacing */}
          <div className="relative py-12 md:py-20">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="mb-24 md:mb-32 last:mb-0 relative"
              >
                {/* Timeline Node - Updated Responsive positioning */}
                <div className={`
                  absolute 
                  md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                  left-[-12px] top-8 
                  z-20
                `}>
                  <div className="relative">
                    {/* Background circle - Smaller on mobile */}
                    <div className="absolute inset-[-4px] md:inset-[-4px] rounded-full bg-white" />
                    {/* Bullet point - Smaller on mobile */}
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg relative">
                      <div className="absolute inset-[-2px] rounded-full bg-white/50 animate-ping" />
                    </div>
                  </div>
                </div>

                {/* Mobile vertical line connector */}
                <div className="absolute left-[-12px] top-[48px] h-[calc(100%-48px)] w-[2px] 
                  bg-gradient-to-b from-purple-500/50 to-transparent md:hidden" 
                />

                {/* Updated Grid Layout with Better Spacing */}
                <div 
                  className={`
                    grid grid-cols-1 md:grid-cols-[minmax(300px,1fr)_auto_minmax(300px,1fr)]
                    items-start md:items-center 
                    gap-6 md:gap-12
                    pl-6 md:pl-0
                    ${index % 2 === 0 ? '' : 'md:direction-rtl'}
                  `}
                >
                  {/* Card Container with Fixed Width */}
                  <div className={`
                    col-span-1 
                    md:col-span-1 
                    ${index % 2 === 0 
                      ? 'md:text-right md:pr-12 md:ml-auto' 
                      : 'md:col-start-3 md:pl-12 md:mr-auto'
                    }
                    mx-auto md:mx-0
                    w-full md:w-[400px]
                    relative
                  `}>
                    <motion.div
                      className={`
                        w-full
                        bg-violet-900/30 backdrop-blur-sm rounded-2xl 
                        shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 
                        relative group ${selectedEvent === index ? 'scale-105 z-10' : ''}
                        md:hover:translate-y-[-4px]
                      `}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleEventClick(index)}
                    >
                      <AnimatePresence>
                        {selectedEvent === index && <MemoryRevealBurst />}
                      </AnimatePresence>
                      
                      <CrackerBurst isActive={burstIndex === index} />
                      
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <AnimatePresence mode="wait">
                        {selectedEvent === index ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="p-6"
                          >
                            {/* Image/Video Section */}
                            <div className="relative w-full aspect-[3/4] overflow-hidden mb-4">
                              <img
                                src={event.image}
                                alt={`Memory from ${event.year}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-violet-950 via-violet-950/50 to-transparent" />
                              
                              {/* Year Badge */}
                              <motion.div
                                className="absolute top-4 right-4 bg-violet-600/90 backdrop-blur-sm px-3 py-1 rounded-full"
                                whileHover={{ scale: 1.1 }}
                              >
                                <span className="text-violet-100 font-semibold">{event.year}</span>
                              </motion.div>

                              {/* Description Overlay */}
                              <div className="absolute bottom-0 left-0 right-0 p-6">
                                <p className="text-violet-100 text-lg font-medium mb-2">
                                  {event.description}
                                </p>
                                <div className="flex gap-2">
                                  {index === 0 && <Crown className="w-5 h-5 text-yellow-400" />}
                                  <Star className="w-5 h-5 text-purple-400" fill="currentColor" />
                                  <Sparkles className="w-5 h-5 text-violet-400" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-6 flex items-center gap-6"
                          >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 flex items-center justify-center shadow-inner">
                              <Plus className="w-8 h-8 text-violet-300 transform group-hover:rotate-180 transition-transform duration-500" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent mb-1">
                                {event.year}
                              </h3>
                              <p className="text-violet-200/80 font-medium">
                                Click to reveal memory
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Updated Connector Line */}
                      <div 
                        className={`
                          absolute top-1/2 hidden md:block
                          ${index % 2 === 0 ? 'right-[-24px]' : 'left-[-24px]'}
                          w-6 h-[2px] bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} 
                          from-purple-300 to-transparent transform -translate-y-1/2
                        `}
                      />
                    </motion.div>
                  </div>

                  {/* Center Timeline */}
                  <div className="hidden md:block w-1 relative">
                    <div className="absolute inset-0 bg-violet-700/50 w-[2px] left-1/2 -translate-x-1/2" />
                  </div>

                  {/* Empty slot with equal width */}
                  <div className={`hidden md:block ${index % 2 === 0 ? 'col-start-3' : ''}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Button - Responsive positioning */}
        <div className="relative z-10 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center"
          >
            <button
              onClick={() => handleNavigate('forward')}
              className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-purple-500 
                text-white px-6 sm:px-8 py-3 rounded-full 
                font-semibold shadow-lg hover:shadow-xl transition-all duration-300 
                flex items-center justify-center mx-auto group hover:scale-105"
              disabled={isLoading}
            >
              <span className="text-sm sm:text-base">
                {isLoading ? 'Loading...' : 'Continue to Birthday Wishes'}
              </span>
              <ChevronRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isLoading && <PageTransition />}
      </AnimatePresence>
    </div>
  );
};

export default TimelinePage;