
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCard } from '../types';
import { X, Share2, Heart, Volume2, VolumeX, ExternalLink, RefreshCw, ChevronRight, Play } from 'lucide-react';

interface RevealedMessageProps {
  card: MessageCard;
  onClose: () => void;
  onDrawNew: () => void;
  onPrevious: () => void;
  hasPrevious: boolean;
}

export const RevealedMessage: React.FC<RevealedMessageProps> = ({ 
  card, 
  onClose, 
  onDrawNew, 
  onPrevious,
  hasPrevious 
}) => {
  // Mobile browsers REQUIRE videos to be muted to autoplay. 
  // We start true to ensure it plays, user can unmute manually.
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Reset video state when card changes
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load(); // Force reload for new source
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay failed (likely due to sound), ensuring muted:", error);
          // Safety net: ensure mute is active if autoplay failed
          if (!isMuted) {
            setIsMuted(true);
            if(videoRef.current) {
                videoRef.current.muted = true;
                videoRef.current.play().catch(e => console.error("Retry play failed", e));
            }
          }
        });
      }
    }
  }, [card]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-[380px] h-[85vh] md:h-[750px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col"
    >
      {/* Video Container - Full Height */}
      <div className="absolute inset-0 z-0 bg-gray-900">
        <video 
          ref={videoRef}
          src={card.videoUrl} 
          poster={card.imageUrl}
          autoPlay 
          loop 
          muted={isMuted}
          playsInline 
          webkit-playsinline="true"
          className="w-full h-full object-cover"
        />
        {/* Gradients for readability */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-[450px] bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none"></div>
      </div>
      
      {/* Top Controls */}
      <div className="absolute top-0 left-0 w-full p-4 z-30 flex justify-between items-start">
        <button 
          onClick={onClose}
          className="bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-md text-white transition border border-white/10"
        >
          <X size={20} />
        </button>
        
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-md text-white transition border border-white/10"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Content Overlay - Bottom */}
      <div className="relative z-20 mt-auto p-4 pb-6 flex flex-col items-start text-right" dir="rtl">
        
        {/* Profile Info */}
        <div className="flex items-center gap-3 mb-3 w-full">
           <div className="w-10 h-10 rounded-full border border-white/50 overflow-hidden shadow-lg relative bg-gray-800">
             <img src={card.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
           </div>
           <div className="flex flex-col flex-1">
             <h3 className="text-white font-bold text-sm drop-shadow-md">Vivi World</h3>
             <a 
               href={card.profileUrl || "#"} 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-gray-300 text-xs flex items-center gap-1 hover:text-white transition"
             >
               @welcometoviviworld <ExternalLink size={10} />
             </a>
           </div>
           
           {/* Like / Share vertical stack on the left (LTR layout relative to container but visuals right) */}
           <div className="flex flex-col gap-4 items-center absolute left-4 bottom-56">
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-gray-800/60 rounded-full text-white group-hover:bg-pink-600 transition backdrop-blur-md">
                   <Heart size={20} className="fill-transparent group-hover:fill-white" />
                </div>
                <span className="text-white text-[10px] font-medium drop-shadow-md">אהבתי</span>
              </button>
              
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-gray-800/60 rounded-full text-white group-hover:bg-green-600 transition backdrop-blur-md">
                   <Share2 size={20} />
                </div>
                <span className="text-white text-[10px] font-medium drop-shadow-md">שתף</span>
              </button>
           </div>
        </div>

        {/* Text Content */}
        <div className="pr-2 pl-12 w-full mb-4 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <motion.div
             key={card.id}
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
          >
             <h2 className="text-xl font-bold text-white mb-2 drop-shadow-lg leading-tight">
               {card.title}
             </h2>
             <p className="text-white/95 text-sm leading-relaxed whitespace-pre-wrap font-light">
              {card.content}
             </p>
          </motion.div>
        </div>
        
        {/* Navigation Buttons Row */}
        <div className="flex gap-3 w-full mb-3">
          {hasPrevious && (
            <button 
              onClick={onPrevious}
              className="flex-1 bg-gray-800/80 hover:bg-gray-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition backdrop-blur-sm border border-white/10"
            >
              <ChevronRight size={18} />
              <span>למסר הקודם</span>
            </button>
          )}
          
          <button 
            onClick={onDrawNew}
            className={`flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg backdrop-blur-sm border border-white/10 ${!hasPrevious ? 'w-full' : ''}`}
          >
            <RefreshCw size={18} />
            <span>מסר נוסף</span>
          </button>
        </div>

        {/* Original Video Link - Large Button */}
        <a 
          href={card.videoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition backdrop-blur-md group"
        >
          <div className="bg-white text-black rounded-full p-1 group-hover:scale-110 transition-transform">
            <Play size={14} fill="currentColor" />
          </div>
          <span>צפייה בסרטון המקורי</span>
        </a>

      </div>
    </motion.div>
  );
};
