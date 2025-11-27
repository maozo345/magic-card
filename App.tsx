
import React, { useState, useRef, useEffect } from 'react';
import { MESSAGES } from './constants';
import { ButterflyCard } from './components/ButterflyCard';
import { RevealedMessage } from './components/RevealedMessage';
import { MessageCard, AppState } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const MAGIC_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2067/2067-preview.mp3";

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  // History management
  const [history, setHistory] = useState<MessageCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(MAGIC_SOUND_URL);
    audioRef.current.volume = 0.6;
  }, []);

  const playMagicSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.warn("Audio blocked", e));
    }
  };

  const handleDrawCard = () => {
    playMagicSound();
    setAppState(AppState.SHUFFLING);
    
    // Simulate shuffling duration
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * MESSAGES.length);
      const newCard = MESSAGES[randomIndex];
      
      setHistory(prev => [...prev, newCard]);
      setCurrentIndex(prev => prev + 1); // Move to the new end of the array
      setAppState(AppState.REVEALED);
    }, 2500); // 2.5 seconds of shuffle
  };

  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setHistory([]);
    setCurrentIndex(-1);
  };

  const currentCard = currentIndex >= 0 ? history[currentIndex] : null;
  const hasPrevious = currentIndex > 0;

  return (
    <div className="h-[100dvh] w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a1e] to-black flex flex-col items-center p-4 relative overflow-hidden">
      
      {/* Background Ambient Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-10 left-10 w-32 h-32 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
         <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* IDLE STATE: Show Single Deck/Card to Click */}
        {appState === AppState.IDLE && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10 flex flex-col items-center justify-evenly h-full w-full py-6 md:py-10"
          >
            <div className="text-center space-y-1 flex-shrink-0">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-indigo-400 drop-shadow-[0_0_15px_rgba(165,180,252,0.5)]"
                animate={{ textShadow: ["0 0 15px rgba(165,180,252,0.5)", "0 0 25px rgba(165,180,252,0.8)", "0 0 15px rgba(165,180,252,0.5)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                המסר הקסום
              </motion.h1>
              <p className="text-blue-200/60 text-base md:text-lg font-light tracking-wide">גלה מה היקום רוצה לספר לך היום</p>
            </div>

            {/* Card Container with responsive scaling to ensure fit */}
            <div className="relative group scale-[0.65] xs:scale-75 sm:scale-90 md:scale-100 flex-shrink-0">
               {/* Stack effect behind the card */}
               <div className="absolute top-2 right-2 w-64 h-96 bg-indigo-900/40 rounded-2xl rotate-3 transition-transform group-hover:rotate-6 duration-500"></div>
               <div className="absolute top-1 right-1 w-64 h-96 bg-indigo-800/40 rounded-2xl rotate-1 transition-transform group-hover:rotate-3 duration-500"></div>
               
               <ButterflyCard onClick={handleDrawCard} className="relative z-10 shadow-[0_0_40px_rgba(79,70,229,0.3)] transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(79,70,229,0.6)]" />
            </div>

            <motion.button
              onClick={handleDrawCard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-3 md:px-12 md:py-4 bg-transparent overflow-hidden rounded-full group flex-shrink-0"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity blur-md"></span>
              <span className="absolute inset-0 w-full h-full border border-white/30 rounded-full"></span>
              <span className="relative flex items-center gap-2 text-white text-lg md:text-xl font-bold tracking-wider">
                <Sparkles size={20} className="animate-spin-slow" />
                תפתח מסר
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* SHUFFLING STATE: Animation of cards */}
        {appState === AppState.SHUFFLING && (
          <motion.div 
            key="shuffling"
            className="z-10 flex flex-col items-center justify-center h-full w-full relative"
          >
             <h2 className="text-2xl text-blue-200 mb-12 animate-pulse font-light">מערבב את הקלפים...</h2>
             <div className="relative w-64 h-96 scale-75 md:scale-100">
                {[0, 1, 2, 3, 4].map((index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 to-indigo-900 rounded-2xl border border-indigo-400/30"
                    initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                    animate={{ 
                      x: [0, (index % 2 === 0 ? 100 : -100), 0],
                      rotate: [0, (index * 5), 0],
                      zIndex: [index, 10, index]
                    }}
                    transition={{ 
                      duration: 0.5,
                      repeat: 4,
                      delay: index * 0.1,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                       <div className="w-16 h-16 bg-blue-500/20 blur-xl rounded-full"></div>
                    </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* REVEALED STATE: Show the result */}
        {appState === AppState.REVEALED && currentCard && (
          <motion.div 
            key="revealed"
            className="z-20 w-full h-full flex justify-center items-center"
          >
            <RevealedMessage 
              card={currentCard} 
              onClose={handleReset} 
              onDrawNew={handleDrawCard}
              onPrevious={handlePreviousCard}
              hasPrevious={hasPrevious}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Footer */}
      <div className="fixed bottom-2 text-center text-[10px] md:text-xs text-gray-500 font-light z-0 pointer-events-none">
        בהשראת Vivi World • נוצר באהבה
      </div>
    </div>
  );
};

export default App;
