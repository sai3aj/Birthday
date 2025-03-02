import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';

const PageTransition = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-violet-950/90 backdrop-blur-md z-50 flex items-center justify-center"
  >
    <div className="relative w-40 h-24">
      {/* Animated Track */}
      <motion.div 
        className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Moving Motorcycle */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ 
          x: '100%',
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ 
            y: [-2, 2, -2],
            rotate: [-5, 5, -5]
          }}
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

        {/* Enhanced Glow Effect */}
        <motion.div
          className="absolute inset-0 blur-lg bg-violet-400/30 rounded-full scale-150"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1.5, 1.8, 1.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-violet-200 font-medium"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Loading...
      </motion.div>
    </div>
  </motion.div>
);

export default PageTransition; 