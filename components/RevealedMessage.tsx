
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCard } from '../types';
import { X, Share2, Heart, Volume2, VolumeX, ExternalLink, RefreshCw, ChevronRight, Play, Copy, Check } from 'lucide-react';

const WHATSAPP_NOTIFY_URL =
  'https://wa.me/972536260735?text=היי%20התחברתי%20למסר%20הקסום%20שלך😊%0Aאשמח%20לשמוע%20פרטים%20לשיחת%20תקשור%20איתך';

const APP_URL = typeof window !== 'undefined' ? window.location.href : 'https://magic-card.app';

// ── Social share helpers ──────────────────────────────────────────────────────
const SHARE_NETWORKS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    color: '#25D366',
    bg: 'bg-[#25D366]',
    getUrl: (text: string, url: string) =>
      `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`,
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <path d="M23.5 8.5C21.6 6.6 19.1 5.5 16.4 5.5C10.9 5.5 6.4 10 6.4 15.5C6.4 17.3 6.9 19.1 7.8 20.6L6.3 26L11.8 24.5C13.3 25.3 14.8 25.8 16.4 25.8C21.9 25.8 26.4 21.3 26.4 15.8C26.4 13.1 25.3 10.5 23.5 8.5ZM16.4 24C14.9 24 13.5 23.6 12.2 22.8L11.9 22.6L8.7 23.5L9.6 20.4L9.4 20.1C8.5 18.7 8.1 17.1 8.1 15.5C8.1 11 11.9 7.2 16.4 7.2C18.6 7.2 20.6 8.1 22.1 9.6C23.6 11.1 24.5 13.1 24.5 15.5C24.7 20.1 20.9 24 16.4 24ZM20.9 17.7C20.6 17.5 19.2 16.8 19 16.7C18.8 16.6 18.6 16.5 18.4 16.8C18.2 17.1 17.7 17.7 17.5 17.9C17.3 18.1 17.1 18.1 16.9 18C15.5 17.3 14.6 16.7 13.7 15.2C13.5 14.9 13.9 14.9 14.3 14.1C14.4 13.9 14.3 13.7 14.3 13.6C14.2 13.4 13.7 12 13.5 11.5C13.3 11 13.1 11.1 12.9 11.1H12.4C12.2 11.1 11.9 11.2 11.7 11.4C11.5 11.7 10.9 12.3 10.9 13.7C10.9 15.1 11.7 16.4 11.9 16.6C12.1 16.8 13.7 19.3 16.2 20.5C17.9 21.3 18.6 21.3 19.5 21.2C20 21.1 21.1 20.5 21.3 19.9C21.6 19.2 21.6 18.6 21.5 18.5C21.4 18.1 21.2 18 20.9 17.7Z" fill="white" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'Facebook',
    color: '#1877F2',
    bg: 'bg-[#1877F2]',
    getUrl: (_: string, url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    color: '#E1306C',
    bg: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]',
    getUrl: (_: string, url: string) =>
      `https://www.instagram.com/`,  // Instagram doesn't support direct share URLs
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: 'telegram',
    label: 'Telegram',
    color: '#0088cc',
    bg: 'bg-[#0088cc]',
    getUrl: (text: string, url: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    id: 'twitter',
    label: 'X (Twitter)',
    color: '#000000',
    bg: 'bg-black',
    getUrl: (text: string, url: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    color: '#010101',
    bg: 'bg-[#010101]',
    getUrl: (_: string, url: string) =>
      `https://www.tiktok.com/`,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
      </svg>
    ),
  },
];

// WhatsApp SVG icon (for notification)
const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <path
      d="M23.5 8.5C21.6 6.6 19.1 5.5 16.4 5.5C10.9 5.5 6.4 10 6.4 15.5C6.4 17.3 6.9 19.1 7.8 20.6L6.3 26L11.8 24.5C13.3 25.3 14.8 25.8 16.4 25.8C21.9 25.8 26.4 21.3 26.4 15.8C26.4 13.1 25.3 10.5 23.5 8.5ZM16.4 24C14.9 24 13.5 23.6 12.2 22.8L11.9 22.6L8.7 23.5L9.6 20.4L9.4 20.1C8.5 18.7 8.1 17.1 8.1 15.5C8.1 11 11.9 7.2 16.4 7.2C18.6 7.2 20.6 8.1 22.1 9.6C23.6 11.1 24.5 13.1 24.5 15.5C24.7 20.1 20.9 24 16.4 24ZM20.9 17.7C20.6 17.5 19.2 16.8 19 16.7C18.8 16.6 18.6 16.5 18.4 16.8C18.2 17.1 17.7 17.7 17.5 17.9C17.3 18.1 17.1 18.1 16.9 18C15.5 17.3 14.6 16.7 13.7 15.2C13.5 14.9 13.9 14.9 14.3 14.1C14.4 13.9 14.3 13.7 14.3 13.6C14.2 13.4 13.7 12 13.5 11.5C13.3 11 13.1 11.1 12.9 11.1H12.4C12.2 11.1 11.9 11.2 11.7 11.4C11.5 11.7 10.9 12.3 10.9 13.7C10.9 15.1 11.7 16.4 11.9 16.6C12.1 16.8 13.7 19.3 16.2 20.5C17.9 21.3 18.6 21.3 19.5 21.2C20 21.1 21.1 20.5 21.3 19.9C21.6 19.2 21.6 18.6 21.5 18.5C21.4 18.1 21.2 18 20.9 17.7Z"
      fill="white"
    />
  </svg>
);

type NotifPhase = 'hidden' | 'banner' | 'bubble';

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
  hasPrevious,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Like state
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 800) + 200);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  // Share modal
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  // Notification state
  const [notifPhase, setNotifPhase] = useState<NotifPhase>('hidden');
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset on card change
  useEffect(() => {
    setNotifPhase('hidden');
    setLiked(false);
    setShowShare(false);
    if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);

    bannerTimerRef.current = setTimeout(() => {
      setNotifPhase('banner');
      bubbleTimerRef.current = setTimeout(() => setNotifPhase('bubble'), 5000);
    }, 26000);

    return () => {
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, [card]);

  // Video autoplay: muted → fade volume up
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    video.currentTime = 0;
    video.muted = true;
    video.volume = 0;
    video.load();

    video.play()
      .then(() => {
        video.muted = false;
        setIsMuted(false);
        const TARGET = 0.7, STEPS = 20, MS = 50;
        let step = 0;
        fadeIntervalRef.current = setInterval(() => {
          step++;
          if (video) video.volume = Math.min(TARGET, (step / STEPS) * TARGET);
          if (step >= STEPS && fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }, MS);
      })
      .catch((e) => console.warn('Autoplay failed', e));

    return () => { if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current); };
  }, [card]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (!isMuted && videoRef.current.volume === 0) videoRef.current.volume = 0.7;
    }
  }, [isMuted]);

  // Like handler
  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(c => c + 1);
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
    } else {
      setLiked(false);
      setLikeCount(c => c - 1);
    }
  };

  // Share handler
  const handleShare = (getUrl: (text: string, url: string) => string) => {
    const text = `✨ ${card.title}\n${card.content?.slice(0, 80)}...`;
    const url = getUrl(text, APP_URL);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(APP_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Native share (mobile)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: card.content?.slice(0, 100),
          url: APP_URL,
        });
        return;
      } catch { /* user cancelled */ }
    }
    setShowShare(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-[380px] h-[85vh] md:h-[750px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col"
    >
      {/* ── Share Modal ── */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            key="share-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] flex items-end justify-center"
            onClick={() => setShowShare(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full bg-[#111] rounded-t-3xl p-5 pb-8 border-t border-white/10"
              dir="rtl"
            >
              {/* Handle */}
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5" />

              <h3 className="text-white font-bold text-lg mb-4 text-center">שתף את המסר</h3>

              {/* Social grid */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {SHARE_NETWORKS.map((net) => (
                  <motion.button
                    key={net.id}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleShare(net.getUrl)}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${net.bg} flex items-center justify-center shadow-lg`}>
                      {net.icon}
                    </div>
                    <span className="text-white/70 text-[11px] font-medium">{net.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Copy link */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl py-3 px-4 transition"
              >
                {copied ? (
                  <>
                    <Check size={18} className="text-green-400" />
                    <span className="text-green-400 font-medium text-sm">הקישור הועתק!</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} className="text-white/70" />
                    <span className="text-white/70 font-medium text-sm">העתק קישור</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WhatsApp Notification Banner ── */}
      <AnimatePresence>
        {notifPhase === 'banner' && (
          <motion.a
            key="banner"
            href={WHATSAPP_NOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute top-4 left-4 right-4 z-50 flex items-center gap-3 bg-[#1a1a1a]/95 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 shadow-2xl cursor-pointer"
            dir="rtl"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
              <WhatsAppIcon />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[11px] text-gray-400 font-medium mb-0.5">WhatsApp • עכשיו</span>
              <p className="text-white text-sm font-semibold leading-snug">היי זאת אביב 😊</p>
              <p className="text-gray-300 text-xs leading-snug truncate">התחברת למסר ? רוצה לתאם שיחה איתי?</p>
            </div>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setNotifPhase('bubble'); }}
              className="text-gray-500 hover:text-white transition flex-shrink-0 p-1"
            >
              <X size={14} />
            </button>
          </motion.a>
        )}
      </AnimatePresence>

      {/* ── Floating WhatsApp Bubble ── */}
      <AnimatePresence>
        {notifPhase === 'bubble' && (
          <motion.a
            key="bubble"
            href={WHATSAPP_NOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.4, x: 40, y: -40 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="absolute top-4 right-4 z-50 w-14 h-14 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] transition-shadow"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              <WhatsAppIcon />
            </motion.div>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Video */}
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
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[450px] bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none" />
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 w-full p-4 z-30 flex justify-between items-start">
        <button
          onClick={onClose}
          className="bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-md text-white transition border border-white/10"
        >
          <X size={20} />
        </button>
        {notifPhase !== 'bubble' && (
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-md text-white transition border border-white/10"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 mt-auto p-4 pb-6 flex flex-col items-start text-right" dir="rtl">

        {/* Profile Info */}
        <div className="flex items-center gap-3 mb-3 w-full">
          <div className="w-10 h-10 rounded-full border border-white/50 overflow-hidden shadow-lg bg-gray-800">
            <img src={card.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col flex-1">
            <h3 className="text-white font-bold text-sm drop-shadow-md">Vivi World</h3>
            <a
              href={card.profileUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 text-xs flex items-center gap-1 hover:text-white transition"
            >
              @welcometoviviworld <ExternalLink size={10} />
            </a>
          </div>

          {/* Like / Share vertical stack */}
          <div className="flex flex-col gap-4 items-center absolute left-4 bottom-56">

            {/* Like button */}
            <div className="relative flex flex-col items-center gap-1">
              {/* Heart burst particles */}
              <AnimatePresence>
                {showHeartBurst && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-pink-400 text-lg pointer-events-none"
                        initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                        animate={{
                          opacity: 0,
                          scale: 1.5,
                          x: Math.cos((i / 6) * Math.PI * 2) * 30,
                          y: Math.sin((i / 6) * Math.PI * 2) * 30,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      >
                        ♥
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>

              <motion.button
                onClick={handleLike}
                whileTap={{ scale: 0.75 }}
                className="flex flex-col items-center gap-1 group"
              >
                <motion.div
                  animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-full transition backdrop-blur-md ${liked ? 'bg-pink-600' : 'bg-gray-800/60 group-hover:bg-pink-600'}`}
                >
                  <Heart
                    size={20}
                    className={`transition-all duration-200 ${liked ? 'fill-white text-white' : 'fill-transparent text-white group-hover:fill-white'}`}
                  />
                </motion.div>
                <span className="text-white text-[10px] font-medium drop-shadow-md">
                  {likeCount.toLocaleString()}
                </span>
              </motion.button>
            </div>

            {/* Share button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleNativeShare}
              className="flex flex-col items-center gap-1 group"
            >
              <div className="p-3 bg-gray-800/60 rounded-full text-white group-hover:bg-blue-600 transition backdrop-blur-md">
                <Share2 size={20} />
              </div>
              <span className="text-white text-[10px] font-medium drop-shadow-md">שתף</span>
            </motion.button>
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
            <h2 className="text-xl font-bold text-white mb-2 drop-shadow-lg leading-tight">{card.title}</h2>
            <p className="text-white/95 text-sm leading-relaxed whitespace-pre-wrap font-light">{card.content}</p>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
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

        {/* Original Video Link */}
        <a
          href={card.originalUrl || card.videoUrl}
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