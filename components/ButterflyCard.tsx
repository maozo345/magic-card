import React from 'react';
import { motion } from 'framer-motion';

interface ButterflyCardProps {
  onClick?: () => void;
  className?: string;
}

export const ButterflyCard: React.FC<ButterflyCardProps> = ({ onClick, className }) => {
  return (
    <motion.div
      className={`relative w-64 h-96 rounded-2xl cursor-pointer transform-style-3d perspective-1000 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-black rounded-2xl border-2 border-indigo-500/30 shadow-2xl overflow-hidden">
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>

        {/* Glowing Center - The Butterfly Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col items-center justify-center">
          
          {/* Glow behind butterfly */}
          <div className="absolute w-40 h-40 bg-blue-500 blur-[80px] opacity-40 animate-pulse"></div>

          {/* Butterfly SVG Representation */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-32 text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10"
          >
            <motion.path
              d="M12 3V21M12 3L8 8M12 3L16 8"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeLinecap="round"
              className="opacity-50"
            />
            {/* Left Wing */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              d="M12 12C12 12 2 10 2 6C2 2 6 2 12 12Z"
              fill="rgba(56, 189, 248, 0.2)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
             <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.1 }}
              d="M12 12C12 12 4 18 4 20C4 22 10 20 12 12Z"
              fill="rgba(56, 189, 248, 0.2)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            
            {/* Right Wing */}
             <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              d="M12 12C12 12 22 10 22 6C22 2 18 2 12 12Z"
              fill="rgba(56, 189, 248, 0.2)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
             <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.1 }}
              d="M12 12C12 12 20 18 20 20C20 22 14 20 12 12Z"
              fill="rgba(56, 189, 248, 0.2)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          <h3 className="mt-6 text-xl font-serif text-cyan-100 tracking-widest uppercase drop-shadow-lg">
            מסר קסום
          </h3>
        </div>

        {/* Border Glow */}
        <div className="absolute inset-0 rounded-2xl border border-cyan-400/30 box-border"></div>
      </div>
    </motion.div>
  );
};