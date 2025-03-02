import { useNavigate } from 'react-router-dom';
import { Stars, Sparkles, Bike, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import HereWeGoTransition from '../components/HereWeGoTransition';

// Add this new component for the initial burst animation
const PageLoadCelebration = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2, delay: 1.5 }}
      className="fixed inset-0 pointer-events-none z-50"
    >
      {/* Central Burst */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ 
          scale: [0.2, 1.5, 2],
          opacity: [0, 1, 0] 
        }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-400 to-purple-500 blur-xl" />
      </motion.div>

      {/* Confetti Particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: '50vw',
            y: '50vh',
            scale: 0,
            opacity: 1 
          }}
          animate={{
            x: `${50 + (Math.random() - 0.5) * 100}vw`,
            y: `${50 + (Math.random() - 0.5) * 100}vh`,
            scale: [0, 1, 0.5],
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            delay: Math.random() * 0.2
          }}
          className={`absolute w-2 h-2 rounded-full ${
            ['bg-violet-400', 'bg-purple-400', 'bg-pink-400', 'bg-fuchsia-400'][Math.floor(Math.random() * 4)]
          }`}
        />
      ))}

      {/* Sparkle Rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{
            scale: [0.2, 2 + i],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.2
          }}
          className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 border-2 border-purple-300 rounded-full"
        />
      ))}

      {/* Floating Sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
            rotate: [0, 180]
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 0.5
          }}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          <Sparkles className="w-6 h-6 text-purple-300" />
        </motion.div>
      ))}

      {/* Add Floating Bikes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`bike-${i}`}
          initial={{ 
            x: '50vw',
            y: '50vh',
            scale: 0,
            rotate: 0,
            opacity: 0 
          }}
          animate={{
            x: `${50 + (Math.random() - 0.5) * 120}vw`,
            y: `${50 + (Math.random() - 0.5) * 120}vh`,
            scale: [0, 1.5, 1],
            rotate: [0, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            ease: "easeOut",
            delay: 0.2 + Math.random() * 0.3
          }}
        >
          <Bike className={`w-8 h-8 ${
            ['text-violet-400', 'text-purple-400', 'text-fuchsia-400'][Math.floor(Math.random() * 3)]
          }`} />
        </motion.div>
      ))}

      {/* Add Floating Motorcycles alongside existing bikes */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`moto-${i}`}
          initial={{ 
            x: '50vw',
            y: '50vh',
            scale: 0,
            rotate: 0,
            opacity: 0 
          }}
          animate={{
            x: `${50 + (Math.random() - 0.5) * 120}vw`,
            y: `${50 + (Math.random() - 0.5) * 120}vh`,
            scale: [0, 1.5, 1],
            rotate: [0, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            ease: "easeOut",
            delay: 0.4 + Math.random() * 0.3
          }}
        >
        </motion.div>
      ))}
    </motion.div>
  );
};

// Add this floating elements animation
const FloatingElements = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Floating Circles */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={`circle-${i}`}
        className="absolute w-32 h-32 rounded-full bg-purple-500/10"
        initial={{ scale: 0 }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: i * 1.2,
        }}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          filter: 'blur(20px)',
        }}
      />
    ))}

    {/* Twinkling Stars */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={`star-${i}`}
        className="absolute w-1 h-1 bg-violet-200"
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: Math.random() * 3,
        }}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
);

// Update the LoadingTransition component
const LoadingTransition = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-violet-950/90 backdrop-blur-sm z-50 flex items-center justify-center"
  >
    <div className="relative w-32 h-32">
      {/* Track for motorcycle */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
      
      {/* Moving Motorcycle */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FontAwesomeIcon 
            icon={faMotorcycle} 
            className="w-10 h-10 text-violet-200 transform -rotate-12"
            style={{ 
              filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))',
            }} 
          />
        </motion.div>
      </motion.div>

      {/* Glowing effect */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full bg-violet-500/20 blur-xl"
      />
    </div>
  </motion.div>
);

const WelcomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/timeline');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <PageLoadCelebration />
      <AnimatedBackground />

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="relative z-10 min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center max-w-2xl mx-auto space-y-12">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-200 via-purple-200 to-fuchsia-200 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Happy Birthday Seja!
            </motion.h1>
            
            {/* Decorative Elements */}
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Sparkles className="w-6 h-6 text-purple-400" />
              <Stars className="w-6 h-6 text-pink-400" />
              <PartyPopper className="w-6 h-6 text-purple-400" />
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="relative mx-auto w-72 md:w-80"
          >
            {/* Glowing background effect */}
            <motion.div
              className="absolute inset-0 -m-6 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Image container */}
            <motion.div
              className="relative rounded-2xl overflow-hidden border-2 border-violet-500/20 shadow-lg shadow-purple-500/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="./images/1.jpg"
                alt="Birthday Memory"
                className="w-full aspect-[3/4] object-cover rounded-2xl"
                style={{
                  objectPosition: 'center center'
                }}
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-950/30 via-transparent to-transparent" />

              {/* Sparkle decorations */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${20 + i * 30}%`,
                    left: i % 2 === 0 ? '-10px' : 'auto',
                    right: i % 2 === 0 ? 'auto' : '-10px',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <Sparkles className="w-5 h-5 text-purple-300" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-violet-200 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Welcome to your special birthday celebration! 
            Get ready for an amazing journey filled with memories and surprises.
          </motion.p>

          {/* Button Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pt-6"
          >
            <motion.button
              onClick={handleNavigate}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-violet-600 to-purple-500 
                text-white px-8 py-4 rounded-full 
                font-semibold shadow-lg hover:shadow-xl 
                transition-all duration-300 
                flex items-center gap-3 mx-auto group"
            >
              <span className="text-lg">Start Your Journey</span>
              <FontAwesomeIcon 
                icon={faMotorcycle} 
                className="w-5 h-5 group-hover:translate-x-2 transition-transform" 
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Here We Go Transition */}
      <AnimatePresence>
        {isLoading && <HereWeGoTransition />}
      </AnimatePresence>
    </div>
  );
};

export default WelcomePage;