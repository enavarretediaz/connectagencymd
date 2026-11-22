import { MouseEvent, ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  featured?: boolean;
  delay?: number;
}

export default function SpotlightCard({
  children,
  className = '',
  featured = false,
  delay = 0,
}: SpotlightCardProps) {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-300);
    mouseY.set(-300);
  };

  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(150, 233, 198, 0.11), rgba(108, 34, 166, 0.14) 45%, transparent 75%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl ${
        featured ? 'surface-glass-featured' : 'surface-glass'
      } ${className}`}
    >
      {/* Dynamic cursor-tracking ambient light sheen */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* Subtle top-edge light sweep on hover (replaces hard borders) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-30 transition-opacity duration-300 group-hover:opacity-90"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #6C22A6 35%, #96E9C6 65%, transparent 100%)',
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
