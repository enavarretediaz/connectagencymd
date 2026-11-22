import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Check } from 'lucide-react';
import { PROCESS_STEPS } from '../data/landingData';
import SpotlightCard from './SpotlightCard';

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 78%', 'end 55%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (val) => {
      const idx = Math.floor(val * PROCESS_STEPS.length + 0.35);
      setActiveIndex(Math.min(PROCESS_STEPS.length, Math.max(0, idx)));
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <section
      id="proceso"
      className="relative bg-[#252525] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-sm font-bold text-[#96E9C6]">Proceso de trabajo</p>
          <h2
            className="mt-3 text-3xl font-black leading-[1.15] tracking-tight text-[#F5F5F5] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Así construimos tu ecosistema digital paso a paso.
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-5 top-4 bottom-4 w-[2px] rounded-full bg-white/[0.06] sm:left-6"
          />

          <motion.div
            aria-hidden="true"
            className="absolute left-5 top-4 bottom-4 w-[2px] origin-top rounded-full sm:left-6"
            style={{
              scaleY: smoothProgress,
              background: 'linear-gradient(180deg, #6C22A6 0%, #96E9C6 100%)',
              boxShadow: '0 0 14px rgba(150, 233, 198, 0.45)',
            }}
          />

          <ol className="space-y-5">
            {PROCESS_STEPS.map((step, index) => {
              const isCompleted = index < activeIndex;

              return (
                <li key={step.number} className="relative pl-14 sm:pl-16">
                  <motion.div
                    aria-hidden="true"
                    animate={{
                      scale: isCompleted ? 1 : 0.92,
                      backgroundColor: isCompleted ? '#6C22A6' : '#2C2C2C',
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    className={`absolute left-0 top-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full shadow-lg ${
                      isCompleted
                        ? 'text-[#96E9C6] shadow-[0_0_24px_rgba(150,233,198,0.38)]'
                        : 'text-[#F5F5F5]/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                    }`}
                  >
                    {isCompleted ? (
                      <motion.span
                        initial={{ scale: 0, rotate: -35 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                      >
                        <Check className="h-5 w-5" />
                      </motion.span>
                    ) : (
                      <span className="font-mono-metrics text-xs font-bold">{step.number}</span>
                    )}
                  </motion.div>

                  <SpotlightCard
                    featured={isCompleted}
                    delay={index * 0.05}
                    className="p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-[#F5F5F5] sm:text-xl">
                        <span className="font-mono-metrics mr-2.5 text-sm text-[#96E9C6]">
                          {step.number}.
                        </span>
                        {step.title}
                      </h3>
                      <span className="font-mono-metrics text-xs text-[#F5F5F5]/65">
                        {step.deliverable}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[15px] leading-[1.65] text-[#F5F5F5]/80">
                      {step.description}
                    </p>
                  </SpotlightCard>
                </li>
              );
            })}
          </ol>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="surface-glass mt-10 max-w-3xl rounded-2xl px-6 py-4 text-sm leading-relaxed text-[#F5F5F5]/80"
        >
          Cada negocio parte de un punto distinto según su sector y su competencia. No vendemos
          fórmulas mágicas; montamos un trabajo serio y ordenado que da resultados.
        </motion.p>
      </div>
    </section>
  );
}
