import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-950 via-violet-950 to-slate-950 overflow-hidden">
      {/* Glowing orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute h-40 w-40 rounded-full"
          style={{
            background: `radial-gradient(circle, 
              ${i % 2 === 0 
                ? 'rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%'
                : 'rgba(167, 139, 250, 0.15) 0%, rgba(167, 139, 250, 0) 70%'
              })`,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Stars */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          initial={{
            opacity: Math.random(),
            scale: Math.random() * 0.5 + 0.5,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star 
            className={`w-2 h-2 ${
              Math.random() > 0.5 ? 'text-violet-200/40' : 'text-purple-200/40'
            }`}
            fill="currentColor"
          />
        </motion.div>
      ))}

      {/* Sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          initial={{
            opacity: Math.random(),
            scale: Math.random() * 0.5 + 0.5,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        >
          <Sparkles className="w-3 h-3 text-fuchsia-200/30" />
        </motion.div>
      ))}

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute h-px w-20 bg-gradient-to-r from-transparent via-violet-200 to-transparent"
          initial={{
            opacity: 0,
            x: -100,
            y: Math.random() * window.innerHeight,
            rotate: 25,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: window.innerWidth + 200,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 7 + Math.random() * 5,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Nebula effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/5 to-violet-950/10" />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(49,_46,_129,_0.2)_100%)]" />
    </div>
  );
};

export default AnimatedBackground; 