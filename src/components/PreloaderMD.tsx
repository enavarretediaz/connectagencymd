import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function PreloaderMD() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setVisible(false), 1150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D1D1D] pointer-events-none"
        >
          <div className="relative flex flex-col items-center gap-4">
            <motion.div
              aria-hidden="true"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.7, 1.15, 1], opacity: [0, 0.7, 0.4] }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -inset-8 rounded-full blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(150,233,198,0.35), rgba(108,34,166,0.45), transparent 70%)',
              }}
            />

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#252525]/90 shadow-[0_0_40px_rgba(108,34,166,0.5)]"
            >
              <svg
                width="54"
                height="54"
                viewBox="0 0 92 92"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="preloaderGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6C22A6" />
                    <stop offset="100%" stopColor="#96E9C6" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="46"
                  cy="46"
                  r="40"
                  stroke="url(#preloaderGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.path
                  d="M24 58V34L36 48L48 34V58M54 34H62C68 34 71 39 71 46C71 53 68 58 62 58H54V34Z"
                  stroke="#F5F5F5"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="font-mono-metrics text-xs tracking-[0.25em] text-[#96E9C6]"
            >
              CONNECT
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
