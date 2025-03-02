import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowLeft, 
  Gift, 
  PartyPopper, 
  Star, 
  ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import MinesGame from '../components/MinesGame';

const STORAGE_KEY = 'wishes-revealed-state';

const photos = [
  "https://media.discordapp.net/attachments/833304819556024341/1344348319048007782/WhatsApp_Image_2025-02-26_at_22.09.54_bc4fc9c6.jpg?ex=67c3e130&is=67c28fb0&hm=df79414aa3da2d8cbd8ec78e91ede7654f37acabcd94252a87fbe773c1e4e317&=&format=webp&width=779&height=960",
  "https://media.discordapp.net/attachments/1342233210075091046/1342604427802185892/c8bcdb14-fc80-4277-a098-6f17fed9cf33.png?ex=67ba3d4f&is=67b8ebcf&hm=6eb6e31058f605a81d1d2bebde64ab6333cbba3b0733bf762e097ea949dec49f&=&format=webp&quality=lossless&width=334&height=594",
  "https://images.unsplash.com/photo-1496843916299-590492c751f4?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80"
];

const wishes = [
  {
    image: "./images/8.png"
  },
  {
    image: "./images/9.png"
  },
  {
    image: "./images/10.png"
  }
];

const FloatingWishesElements = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Floating Hearts */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={`heart-${i}`}
        className="absolute"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.5, 0.5],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: i * 0.3,
        }}
        style={{
          bottom: `${Math.random() * 30}%`,
          left: `${Math.random() * 100}%`,
        }}
      >
        <div className="w-3 h-3 bg-purple-400/30 rounded-full blur-sm" />
      </motion.div>
    ))}

    {/* Shimmering Effect */}
    <motion.div
      className="absolute inset-0"
      animate={{
        background: [
          'radial-gradient(circle, rgba(139,92,246,0) 0%, rgba(0,0,0,0) 100%)',
          'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(0,0,0,0) 100%)',
          'radial-gradient(circle, rgba(139,92,246,0) 0%, rgba(0,0,0,0) 100%)',
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
  </div>
);

const PhotoModal = ({ photo, index, onClose }: { photo: string; index: number; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 bg-violet-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
  >
    {/* Photo Container with Surprise Animation */}
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 20 }}
      transition={{ type: "spring", duration: 0.5 }}
      onClick={(e) => e.stopPropagation()}
      className="relative max-w-3xl w-full bg-violet-800/30 rounded-2xl overflow-hidden shadow-2xl"
    >
      {/* Surprise Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 blur-xl"
      />
      
      {/* Floating Stars */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          <Star className="w-4 h-4 text-violet-200/50" fill="currentColor" />
        </motion.div>
      ))}

      {/* Photo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <img
          src={photo}
          alt={`Memory ${index + 1}`}
          className="w-full object-cover"
        />
        
        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-violet-950/90 to-transparent"
        >
          <p className="text-xl text-violet-200 font-medium text-center">
            Memory {index + 1}
          </p>
        </motion.div>
      </motion.div>

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-4 right-4 z-20 bg-violet-800/50 p-2 rounded-full hover:bg-violet-700/50 transition-colors"
      >
        <X className="w-6 h-6 text-violet-200" />
      </motion.button>
    </motion.div>
  </motion.div>
);

const SpaceBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {/* Deep Space Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-violet-950 via-violet-900 to-violet-950">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 50%)',
            'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.20) 0%, rgba(0,0,0,0) 60%)',
            'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 50%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>

    {/* Twinkling Stars */}
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={`star-${i}`}
        className="absolute rounded-full bg-white"
        style={{
          width: Math.random() * 3 + 1 + 'px',
          height: Math.random() * 3 + 1 + 'px',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
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

    {/* Aurora Effect */}
    <motion.div
      className="absolute inset-0 opacity-10"
      style={{
        background: 'linear-gradient(45deg, transparent 0%, rgba(139,92,246,0.3) 50%, transparent 100%)',
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%'],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </div>
);

const WishesPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [revealedWishes, setRevealedWishes] = useState<Set<number>>(new Set());
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      setRevealedWishes(new Set(JSON.parse(savedState)));
    }
  }, []);

  const handleReveal = (index: number) => {
    const newRevealedWishes = new Set(revealedWishes);
    newRevealedWishes.add(index);
    setRevealedWishes(newRevealedWishes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newRevealedWishes)));

    if (newRevealedWishes.size === wishes.length) {
      setTimeout(() => setShowFinalMessage(true), 1000);
    }
  };

  const handleNavigate = async (direction: 'back' | 'forward') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate(direction === 'back' ? '/timeline' : '/wishes');
  };

  return (
    <div className="min-h-screen bg-violet-950 py-16 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900 via-violet-950 to-violet-950" />
      
      {/* Navigation */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => handleNavigate('back')}
          className="fixed top-4 left-4 z-50 text-violet-200 hover:text-violet-100 
            transition-colors duration-300 flex items-center gap-2"
          whileHover={{ x: -3 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-purple-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Main title container */}
          <motion.div
            className="relative"
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Sparkle decorations */}
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </motion.div>

            {/* Main heading with gradient */}
            <h1 className="text-5xl md:text-6xl font-bold mb-4 relative z-10">
              <motion.span
                className="inline-block bg-gradient-to-r from-violet-200 via-fuchsia-200 to-purple-200 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Happy Birthday Sejaaa
              </motion.span>
            </h1>

            {/* Decorative stars */}
            <div className="flex justify-center gap-4 mt-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 360, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  <Star 
                    className="w-6 h-6 text-yellow-300" 
                    fill="currentColor"
                  />
                </motion.div>
              ))}
            </div>

            {/* Additional sparkle effects */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className={`absolute ${i === 0 ? '-left-4' : '-right-4'} top-1/2 transform -translate-y-1/2`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut"
                }}
              >
                <PartyPopper className="w-6 h-6 text-purple-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* Subtle description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-violet-200 mt-4 text-lg"
          >
            May your day be a magical tapestry of endless happiness, cherished memories, and all the love your beautiful heart deserves. Keep shining like the brightest star, keep smiling like the sunshine that lights up every room, and keep being the incredible, radiant soul that makes the world a better place. Today is all about you celebrate, laugh, and soak in every precious moment! ✨
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {wishes.map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <motion.div
                className="bg-violet-900/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl 
                  hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer h-[400px]"
                onClick={() => handleReveal(index)}
              >
                {!revealedWishes.has(index) ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex flex-col items-center gap-6"
                    >
                      <Gift className="w-16 h-16 text-violet-200" />
                      <p className="text-violet-200 text-xl font-medium text-center">
                        Tap to Open
                      </p>
                      <motion.div
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      >
                        <Star className="w-8 h-8 text-yellow-400" fill="currentColor" />
                      </motion.div>
                    </motion.div>
                    {/* Decorative elements */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      animate={{
                        background: [
                          'radial-gradient(circle at center, rgba(139,92,246,0.3) 0%, transparent 70%)',
                          'radial-gradient(circle at center, rgba(139,92,246,0.1) 0%, transparent 70%)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                    />
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full relative"
                  >
                    <img
                      src={wish.image}
                      alt={wish.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-950/90 via-violet-950/50 to-transparent 
                      p-6 flex flex-col justify-end text-center">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {wish.title}
                      </h3>
                      <p className="text-violet-100 text-lg">
                        {wish.description}
                      </p>
                      <motion.div
                        className="absolute top-4 right-4"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Final Message */}
        <AnimatePresence>
          {showFinalMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 text-center"
            >
              <div className="max-w-xl mx-auto mb-8">
                <MinesGame />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate('forward')}
                className="bg-gradient-to-r from-violet-600 to-purple-500 text-white px-8 py-3 rounded-full 
                  font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading Transition */}
      <AnimatePresence>
        {isLoading && <PageTransition />}
      </AnimatePresence>
    </div>
  );
};

export default WishesPage;