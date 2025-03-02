import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const HereWeGoTransition = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-violet-950/90 backdrop-blur-md"
    >
      <div className="relative">
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main text */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Here we go
            <motion.span
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ...
            </motion.span>
          </motion.h2>

          {/* Decorative sparkles */}
          <motion.div
            className="absolute -right-8 -top-8"
            animate={{
              rotate: [0, 180],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles className="w-6 h-6 text-purple-300" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HereWeGoTransition; 