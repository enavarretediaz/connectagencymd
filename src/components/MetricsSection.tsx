import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { KEY_METRICS, MetricItem } from '../data/landingData';
import SpotlightCard from './SpotlightCard';

function formatMetricValue(item: MetricItem, value: number): string {
  const rounded = Math.round(value);
  if (item.displayFormat === 'ratio10') {
    return `${rounded} de cada 10`;
  }
  if (item.displayFormat === 'multiplier') {
    return `${rounded}x más visitas`;
  }
  return `${rounded}%`;
}

export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [triggered, setTriggered] = useState(false);
  const [counts, setCounts] = useState<number[]>(KEY_METRICS.map(() => 0));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCounts(KEY_METRICS.map((m) => m.target));
      return;
    }

    const duration = 1350;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(KEY_METRICS.map((item) => item.target * eased));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        setCounts(KEY_METRICS.map((m) => m.target));
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [triggered]);

  return (
    <section
      id="datos"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#252525] py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #6C22A6 0%, #96E9C6 55%, transparent 75%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-sm font-bold text-[#96E9C6]">Datos e impacto en negocio</p>
          <h2
            className="mt-3 text-3xl font-black leading-[1.15] tracking-tight text-[#F5F5F5] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Los datos importan cuando se traducen en clientes que llaman o compran.
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {KEY_METRICS.map((metric, idx) => (
            <SpotlightCard key={metric.id} delay={idx * 0.08} className="p-6">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-[#F5F5F5]/65">{metric.context}</p>
                  <div className="mt-4 font-mono-metrics text-3xl font-bold leading-tight text-gradient-brand sm:text-4xl">
                    {formatMetricValue(metric, counts[idx])}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#F5F5F5]/80">{metric.label}</p>
                </div>

                <div className="mt-6">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: triggered ? metric.barRatio : 0 }}
                      transition={{ duration: 1.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="relative h-full w-full origin-left overflow-hidden rounded-full"
                      style={{
                        background: 'linear-gradient(45deg, #6C22A6, #96E9C6)',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="animate-bar-shimmer absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-3xl text-base leading-[1.65] text-[#F5F5F5]/80 sm:text-lg"
        >
          Estos datos no son teoría. Son personas reales que cada día eligen al negocio que aparece
          primero, abre rápido y da confianza. La pregunta no es si necesitas una web que funcione.{' '}
          <strong className="font-bold text-[#F5F5F5]">
            Es cuántos clientes más vas a perder antes de tenerla.
          </strong>
        </motion.p>
      </div>
    </section>
  );
}
