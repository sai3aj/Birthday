import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, ChevronRight, Sparkles, Star, Rocket, Lock, Key, 
  Heart, Bike, Crown, Compass 
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

const MESSAGE_STORAGE_KEY = 'message-revealed-state';

const FloatingElements = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Enhanced Floating Stars */}
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={`star-${i}`}
        className="absolute"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
      >
        <Star 
          className={`w-3 h-3 ${
            Math.random() > 0.5 ? 'text-purple-300/40' : 'text-pink-300/40'
          }`} 
          fill="currentColor" 
        />
      </motion.div>
    ))}

    {/* Enhanced Glowing Orbs */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={`orb-${i}`}
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${
            ['rgba(139,92,246,0.3)', 'rgba(168,85,247,0.3)', 'rgba(217,70,239,0.3)', 'rgba(236,72,153,0.3)'][i % 4]
          } 0%, transparent 70%)`,
        }}
        initial={{ 
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const RevealEffect = ({ isRevealed }: { isRevealed: boolean }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    animate={{
      opacity: isRevealed ? [1, 0] : 0,
      scale: isRevealed ? [1, 2] : 1,
    }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-full h-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-xl" />
  </motion.div>
);

const SectionContent = ({ type, isRevealed }: { type: 'dreams' | 'future' | 'passion' | 'adventure'; isRevealed: boolean }) => {
  const contents = {
    dreams: {
      icon: <Rocket className="w-12 h-12 text-purple-400" />,
      title: "Your Dreams Await",
      text: "Like a shooting star across the night sky, your dreams have no limits. Keep riding towards your goals with that unstoppable spirit!",
 // Replace with actual video URL
    },
    future: {
      icon: <Crown className="w-12 h-12 text-pink-400" />,
      title: "Your Bright Future",
      text: "The road ahead is filled with endless possibilities. Your adventurous spirit will lead you to amazing destinations!",
      video: "https://player.vimeo.com/video/123456790?background=1" // Replace with actual video URL
    },
    passion: {
      icon: <Heart className="w-12 h-12 text-purple-400" fill="currentColor" />,
      title: "Your Passion",
      text: "Your love for riding isn't just a hobby, it's your superpower. Keep embracing that freedom and joy!",
      video: "https://player.vimeo.com/video/123456791?background=1" // Replace with actual video URL
    },
    adventure: {
      icon: <Compass className="w-12 h-12 text-pink-400" />,
      title: "New Adventures",
      text: "Every road leads to a new story, and your journey is just beginning. Here's to countless more amazing rides!",
      video: "https://player.vimeo.com/video/123456792?background=1" // Replace with actual video URL
    }
  };

  const content = contents[type];

  return (
    <motion.div
      initial={isRevealed ? { opacity: 0, scale: 0.8 } : false}
      animate={isRevealed ? { opacity: 1, scale: 1 } : false}
      className="space-y-6"
    >
      {/* Video Player */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative aspect-video rounded-lg overflow-hidden"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950 via-transparent to-transparent z-10" />
        
        {/* Video Background Glow */}
        <motion.div
          className="absolute inset-[-2px] rounded-lg"
          animate={{
            boxShadow: [
              '0 0 20px rgba(139, 92, 246, 0.3)',
              '0 0 40px rgba(139, 92, 246, 0.5)',
              '0 0 20px rgba(139, 92, 246, 0.3)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Video iFrame */}
        <iframe
          src={content.video}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ 
            opacity: 0.8,
            filter: 'saturate(1.2) contrast(1.1)'
          }}
        />

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-2 right-2 z-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {content.icon}
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="space-y-3">
        <motion.div
          animate={isRevealed ? {
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          } : false}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          {content.icon}
          <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-pink-200 bg-clip-text text-transparent">
            {content.title}
          </h3>
        </motion.div>
        <p className="text-violet-200/90 leading-relaxed">
          {content.text}
        </p>
      </div>

      {/* Decorative Sparkles */}
      <motion.div
        className="absolute bottom-4 right-4"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-5 h-5 text-purple-300/50" />
      </motion.div>
    </motion.div>
  );
};

const MessagePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  const [revealedSections, setRevealedSections] = useState<Set<string>>(() => {
    if (location.state?.preserveState) {
      return new Set(['dreams', 'future', 'passion', 'adventure']);
    }
    const stored = sessionStorage.getItem(MESSAGE_STORAGE_KEY);
    if (stored) {
      const state = JSON.parse(stored);
      return new Set(state.revealedSections);
    }
    return new Set();
  });

  const [showFinalMessage, setShowFinalMessage] = useState(() => {
    if (location.state?.preserveState) {
      return true;
    }
    const stored = sessionStorage.getItem(MESSAGE_STORAGE_KEY);
    if (stored) {
      const state = JSON.parse(stored);
      return state.showFinalMessage;
    }
    return false;
  });

  const controls = useAnimation();

  useEffect(() => {
    sessionStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify({
      revealedSections: Array.from(revealedSections),
      showFinalMessage
    }));
  }, [revealedSections, showFinalMessage]);

  const handleReveal = async (section: string) => {
    if (location.state?.preserveState) return;
    if (revealedSections.has(section)) return;

    await controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    });

    setRevealedSections(prev => new Set([...prev, section]));
    
    if (revealedSections.size === 3) {
      setTimeout(() => setShowFinalMessage(true), 1000);
    }
  };

  const handleForwardNavigate = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/wishes');
    }, 2000);
  };

  const handleBackNavigate = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/timeline');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-violet-900 to-violet-950 relative overflow-hidden">
      <FloatingElements />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={handleBackNavigate}
        className="fixed top-6 left-6 z-50 bg-violet-800/20 backdrop-blur-sm p-2 rounded-full 
          shadow-lg hover:shadow-xl transition-all duration-300 group
          hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-500"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-6 h-6 text-violet-200 group-hover:text-white transition-colors" />
      </motion.button>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
        {/* Add this new heading section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-200 via-purple-300 to-pink-200 bg-clip-text text-transparent mb-3"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundSize: '200% auto',
            }}
          >
            Unlock Your Birthday Journey
          </motion.h1>
          <motion.p
            className="text-violet-200/80 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Click each card to reveal a special message
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block ml-2"
            >
              ✨
            </motion.span>
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {['dreams', 'future', 'passion', 'adventure'].map((section) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.random() * 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                animate={controls}
                className={`bg-violet-900/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl relative overflow-hidden cursor-pointer
                  ${!revealedSections.has(section) ? 'hover:shadow-purple-500/20' : ''}`}
                onClick={() => handleReveal(section)}
              >
                <RevealEffect isRevealed={revealedSections.has(section)} />
                
                {!revealedSections.has(section) ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-48 space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Lock className="w-12 h-12 text-purple-400" />
                    <p className="text-violet-200 text-lg font-medium">
                      Unlock {section.charAt(0).toUpperCase() + section.slice(1)}
                    </p>
                    <Key className="w-6 h-6 text-purple-300 animate-bounce" />
                  </motion.div>
                ) : (
                  <SectionContent 
                    type={section as 'dreams' | 'future' | 'passion' | 'adventure'} 
                    isRevealed={revealedSections.has(section)} 
                  />
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
              className="mt-12 max-w-2xl w-full text-center"
            >
              <motion.div
                className="bg-violet-900/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl relative overflow-hidden"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 blur-xl"
                />
                <div className="relative z-10">
                  <motion.p
                    className="text-2xl text-violet-200 font-medium mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Dear Seja, may your birthday be the beginning of a year filled with 
                    wonderful surprises and unforgettable adventures!
                  </motion.p>
                  <motion.div
                    className="flex justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <Star className="w-6 h-6 text-pink-400" fill="currentColor" />
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Continue Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8"
              >
                <button
                  onClick={handleForwardNavigate}
                  className="bg-gradient-to-r from-violet-600 to-purple-500 
                    text-white px-8 py-3 rounded-full 
                    font-semibold shadow-lg hover:shadow-xl transition-all duration-300 
                    flex items-center justify-center mx-auto group hover:scale-105"
                  disabled={isLoading}
                >
                  <span className="text-base">
                    {isLoading ? 'Loading...' : 'Continue to Birthday Wishes'}
                  </span>
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading transition */}
      <AnimatePresence>
        {isLoading && <PageTransition />}
      </AnimatePresence>
    </div>
  );
};

export default MessagePage; 