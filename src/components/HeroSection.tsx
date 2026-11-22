import { MouseEvent, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight, Globe, MapPin, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onPrimaryCta: () => void;
}

const HEADLINE_WORDS = [
  'Cada',
  'día',
  'pierdes',
  'clientes',
  'locales',
  'que',
  'buscan',
  'tu',
  'servicio',
  'y',
  'llaman',
  'a',
  'tu',
  'competencia.',
];

const HERO_MODULES = [
  {
    id: 'web',
    icon: Globe,
    title: 'Web que convierte',
    metric: 'Web Profesional',
    desc: 'Para que tu cliente pida cita, te llame o escriba fácil y para que cargue rápido en el móvil y convierta visitas en clientes.',
  },
  {
    id: 'seo',
    icon: MapPin,
    title: 'Visibilidad local',
    metric: 'Posicionamiento SEO',
    desc: 'Tu ficha de Google y tu web preparadas para que te vean primero cuando buscan cerca de ellos.',
  },
  {
    id: 'confianza',
    icon: ShieldCheck,
    title: 'Confianza digital',
    metric: 'SSL + Reseñas',
    desc: 'Opiniones reales de clientes, web segura y diseño claro para que te elijan a ti antes que a la competencia.',
  },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function HeroSection({ onPrimaryCta }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeModule, setActiveModule] = useState(0);

  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  const smoothBgX = useSpring(bgX, { stiffness: 70, damping: 20 });
  const smoothBgY = useSpring(bgY, { stiffness: 70, damping: 20 });

  const cardTiltX = useMotionValue(0);
  const cardTiltY = useMotionValue(0);
  const rotateX = useSpring(useTransform(cardTiltY, [-0.5, 0.5], [5, -5]), {
    stiffness: 160,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(cardTiltX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 160,
    damping: 22,
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const interval = window.setInterval(() => {
      setActiveModule((prev) => (prev + 1) % HERO_MODULES.length);
    }, 3200);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!sectionRef.current || window.innerWidth < 1024) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      bgX.set(Math.max(-15, Math.min(15, relX * 26)));
      bgY.set(Math.max(-15, Math.min(15, relY * 26)));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [bgX, bgY]);

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cardTiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    cardTiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleCardMouseLeave = () => {
    cardTiltX.set(0);
    cardTiltY.set(0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;
    let particles: Particle[] = [];

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = window.innerWidth < 768;
      const baseCount = Math.floor((width * height) / 16000);
      const count = isMobile
        ? Math.max(12, Math.floor(baseCount * 0.3))
        : Math.min(76, Math.max(32, baseCount));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: Math.random() * 1.5 + 0.9,
      }));
    };

    const drawFrame = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? 'rgba(150, 233, 198, 0.9)' : 'rgba(245, 245, 245, 0.65)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(150, 233, 198, ${(1 - dist / 110) * 0.35})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      if (!prefersReduced) {
        animationFrameId = window.requestAnimationFrame(drawFrame);
      }
    };

    setup();
    drawFrame();

    const handleResize = () => {
      setup();
      if (prefersReduced) drawFrame();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#252525] pt-16 pb-24 lg:pt-24 lg:pb-32"
    >
      <motion.canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
        style={{ x: smoothBgX, y: smoothBgY }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ x: smoothBgX, y: smoothBgY }}
      >
        <div
          className="animate-aurora-a absolute -top-24 right-[8%] h-[480px] w-[480px] rounded-full blur-[130px] opacity-30"
          style={{
            background:
              'radial-gradient(circle, #6C22A6 0%, rgba(108,34,166,0.2) 45%, transparent 72%)',
          }}
        />
        <div
          className="animate-aurora-b absolute -bottom-32 left-[4%] h-[420px] w-[420px] rounded-full blur-[130px] opacity-20"
          style={{
            background:
              'radial-gradient(circle, #96E9C6 0%, rgba(150,233,198,0.12) 45%, transparent 72%)',
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 text-sm font-bold tracking-wide text-[#96E9C6]"
            >
              Connect Agencia de Marketing Digital · España
            </motion.p>

            <h1
              className="max-w-2xl text-[clamp(2.1rem,4vw,3.45rem)] font-black leading-[1.09] tracking-tight text-[#F5F5F5]"
              style={{ textWrap: 'balance' }}
            >
              {HEADLINE_WORDS.map((word, index) => {
                const highlight =
                  word === 'llaman' ||
                  word === 'a' ||
                  word === 'tu' && index > 9 ||
                  word === 'competencia.';
                return (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.05 + index * 0.028,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block mr-[0.25em] ${highlight ? 'text-gradient-brand' : ''}`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-base leading-[1.65] text-[#F5F5F5]/80 sm:text-lg"
            >
              Si tu negocio físico no aparece cuando te buscan, tarda en cargar o no transmite
              confianza en los primeros segundos, el cliente se va antes de conocerte. Hacemos que tu
              web trabaje para traer llamadas, citas y clientes reales.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onPrimaryCta}
                className="btn-cta-glow inline-flex min-h-12 items-center gap-2.5 rounded-xl px-6 py-3.5 text-base font-bold text-[#F5F5F5] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Detectar dónde pierdes clientes</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </motion.button>

              <motion.a
                href="#ecosistema"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white/[0.04] px-5 py-3.5 text-sm font-bold text-[#F5F5F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>Ver cómo funciona</span>
                <ArrowDown className="h-4 w-4 text-[#96E9C6] shrink-0" aria-hidden="true" />
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              className="mt-6 text-sm text-[#F5F5F5]/65"
            >
              Sin compromiso · Respuesta en menos de 24h · Auditoría en ≤ 48h.
            </motion.p>
          </div>

          {/* Right Column: 3D-Tilted Borderless Tech Console */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
            style={{ perspective: 1000 }}
          >
            <motion.div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="surface-glass-featured relative overflow-hidden rounded-3xl p-6 sm:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-[70px] opacity-40"
                style={{ background: 'radial-gradient(circle, #96E9C6 0%, transparent 70%)' }}
              />

              <div className="relative flex items-center justify-between pb-5">
                <div>
                  <p className="text-xs font-bold text-[#96E9C6]">Arquitectura unificada</p>
                  <h2 className="mt-0.5 text-lg font-bold text-[#F5F5F5]">
                    Ecosistema Connect para PYMES
                  </h2>
                </div>
                <span className="font-mono-metrics text-xs text-[#F5F5F5]/65">3 pilares</span>
              </div>

              <div className="relative space-y-3">
                {HERO_MODULES.map((mod, idx) => {
                  const Icon = mod.icon;
                  const isActive = activeModule === idx;
                  return (
                    <motion.button
                      key={mod.id}
                      type="button"
                      onClick={() => setActiveModule(idx)}
                      onMouseEnter={() => setActiveModule(idx)}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full overflow-hidden rounded-2xl p-4 text-left cursor-pointer"
                    >
                      {isActive ? (
                        <motion.div
                          layoutId="heroConsoleActive"
                          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6C22A6]/40 via-[#2E253D]/80 to-[#96E9C6]/15 shadow-[inset_0_1px_0_rgba(150,233,198,0.22)]"
                        />
                      ) : (
                        <div className="absolute inset-0 rounded-2xl bg-[#1E1E1E]/65 transition-colors hover:bg-[#1E1E1E]/85" />
                      )}

                      <div className="relative z-10 flex items-start gap-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                            isActive
                              ? 'bg-[#96E9C6]/20 text-[#96E9C6]'
                              : 'bg-white/[0.06] text-[#F5F5F5]/75'
                          }`}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-bold text-[#F5F5F5]">{mod.title}</h3>
                            <span
                              className={`font-mono-metrics text-xs transition-colors whitespace-nowrap shrink-0 ${
                                isActive ? 'text-[#96E9C6]' : 'text-[#F5F5F5]/55'
                              }`}
                            >
                              {mod.metric}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-[#F5F5F5]/75">
                            {mod.desc}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="relative mt-6 flex items-center justify-between pt-2 text-xs text-[#F5F5F5]/65">
                <span>Auditoría inicial sin coste</span>
                <span className="font-mono-metrics text-[#96E9C6]">Informe en ≤ 48h</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
