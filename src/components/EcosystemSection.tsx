import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { ECOSYSTEM_PILLARS, PillarItem } from '../data/landingData';

interface EcosystemSectionProps {
  onCtaClick: () => void;
}

export default function EcosystemSection({ onCtaClick }: EcosystemSectionProps) {
  const [activePillar, setActivePillar] = useState<PillarItem['id']>('web');

  const currentPillar =
    ECOSYSTEM_PILLARS.find((p) => p.id === activePillar) || ECOSYSTEM_PILLARS[0];

  return (
    <section
      id="ecosistema"
      className="relative overflow-hidden bg-[#202020] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-sm font-bold text-[#96E9C6]">La solución: Ecosistema Connect</p>
          <h2
            className="mt-3 text-3xl font-black leading-[1.15] tracking-tight text-[#F5F5F5] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Un sistema pensado para que te encuentren, confíen y te contacten.
          </h2>
          <p className="mt-4 text-base leading-[1.65] text-[#F5F5F5]/80 sm:text-lg">
            No te entregamos piezas sueltas que se quedan paradas. Preparamos tu web, tu presencia
            local y tu imagen digital para que las búsquedas se conviertan en clientes reales.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Interactive Light-Driven Ecosystem Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="surface-glass-featured relative overflow-hidden rounded-3xl p-5 sm:p-8">
              <div className="flex items-center justify-between pb-3 text-xs text-[#F5F5F5]/65">
                <span>Sistema conectado</span>
                <span>Explora cada nodo</span>
              </div>

              <svg
                viewBox="0 0 480 390"
                className="mt-2 h-auto w-full select-none"
                role="img"
                aria-label="Diagrama interactivo del Ecosistema Connect: Web profesional, SEO local y Confianza digital conectados al núcleo de conversión"
              >
                <defs>
                  <linearGradient id="ecoLineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6C22A6" />
                    <stop offset="100%" stopColor="#96E9C6" />
                  </linearGradient>
                  <radialGradient id="ecoCenterGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(150, 233, 198, 0.3)" />
                    <stop offset="50%" stopColor="rgba(108, 34, 166, 0.25)" />
                    <stop offset="100%" stopColor="rgba(32, 32, 32, 0)" />
                  </radialGradient>
                  <radialGradient id="nodeActiveOrb" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#5D248C" />
                    <stop offset="100%" stopColor="#262626" />
                  </radialGradient>
                  <radialGradient id="nodeIdleOrb" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#353535" />
                    <stop offset="100%" stopColor="#242424" />
                  </radialGradient>
                  <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Ambient volumetric core glow */}
                <circle cx="240" cy="185" r="155" fill="url(#ecoCenterGlow)" />

                {/* Subtle orbital satellites */}
                <g className="ecosystem-orbit-ring" style={{ transformOrigin: '240px 185px' }}>
                  <circle cx="240" cy="40" r="3.5" fill="#96E9C6" opacity="0.75" />
                  <circle cx="385" cy="185" r="3" fill="#C084FC" opacity="0.7" />
                  <circle cx="95" cy="185" r="3" fill="#96E9C6" opacity="0.55" />
                  <circle cx="240" cy="330" r="2.5" fill="#C084FC" opacity="0.5" />
                </g>

                {/* Hairline connection beams + traveling light pulses */}
                {ECOSYSTEM_PILLARS.map((pillar) => {
                  const isActive = activePillar === pillar.id;
                  return (
                    <g key={`beam-${pillar.id}`}>
                      <line
                        x1="240"
                        y1="185"
                        x2={pillar.nodePosition.x}
                        y2={pillar.nodePosition.y}
                        stroke={isActive ? 'url(#ecoLineGrad)' : 'rgba(245,245,245,0.12)'}
                        strokeWidth={isActive ? 2 : 1}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-width 250ms ease, opacity 250ms ease' }}
                      />
                      {isActive && (
                        <motion.circle
                          r="4.5"
                          fill="#96E9C6"
                          filter="url(#softGlow)"
                          initial={{
                            cx: pillar.nodePosition.x,
                            cy: pillar.nodePosition.y,
                            opacity: 0,
                          }}
                          animate={{
                            cx: [pillar.nodePosition.x, 240],
                            cy: [pillar.nodePosition.y, 185],
                            opacity: [0, 1, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      )}
                    </g>
                  );
                })}

                {/* Central Hub Orb: Connect */}
                <g transform="translate(240, 185)">
                  <motion.circle
                    r="50"
                    fill="rgba(108, 34, 166, 0.25)"
                    style={{ transformOrigin: '0px 0px' }}
                    animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <circle r="44" fill="#2A2236" />
                  <text
                    y="-4"
                    textAnchor="middle"
                    fill="#F5F5F5"
                    fontSize="13"
                    fontWeight="900"
                    fontFamily="Lato, sans-serif"
                  >
                    CONNECT
                  </text>
                  <text
                    y="14"
                    textAnchor="middle"
                    fill="#96E9C6"
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    CLIENTES
                  </text>
                </g>

                {/* Interactive Pillar Orbs: Static SVG translate wrapper + inner motion.g scale so hover never breaks position */}
                {ECOSYSTEM_PILLARS.map((pillar) => {
                  const isActive = activePillar === pillar.id;
                  const { x, y } = pillar.nodePosition;
                  return (
                    <g key={pillar.id} transform={`translate(${x}, ${y})`}>
                      <motion.g
                        onClick={() => setActivePillar(pillar.id)}
                        onMouseEnter={() => setActivePillar(pillar.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActivePillar(pillar.id);
                          }
                        }}
                        style={{ transformOrigin: '0px 0px' }}
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Explorar pilar ${pillar.title}`}
                        aria-pressed={isActive}
                        className="cursor-pointer focus:outline-none"
                      >
                        {isActive && (
                          <motion.circle
                            r="48"
                            fill="rgba(150, 233, 198, 0.16)"
                            style={{ transformOrigin: '0px 0px' }}
                            animate={{ scale: [0.95, 1.08, 0.95] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        )}
                        <circle
                          r="38"
                          fill={isActive ? 'url(#nodeActiveOrb)' : 'url(#nodeIdleOrb)'}
                        />
                        <text
                          y="-4"
                          textAnchor="middle"
                          fill="#96E9C6"
                          fontSize="10"
                          fontWeight="700"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          {pillar.index}
                        </text>
                        <text
                          y="13"
                          textAnchor="middle"
                          fill="#F5F5F5"
                          fontSize="12"
                          fontWeight="700"
                          fontFamily="Lato, sans-serif"
                        >
                          {pillar.shortLabel}
                        </text>
                      </motion.g>
                    </g>
                  );
                })}
              </svg>

              {/* Animated Pillar Quick Summary */}
              <div className="mt-3 rounded-2xl bg-[#1E1E1E]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPillar.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono-metrics text-xs font-bold text-[#96E9C6]">
                        Pilar {currentPillar.index}
                      </span>
                      <span className="text-xs text-[#F5F5F5]/60">Conectado al sistema</span>
                    </div>
                    <p className="mt-1.5 text-base font-bold text-[#F5F5F5]">
                      {currentPillar.title}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      {currentPillar.highlights.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 text-xs text-[#F5F5F5]/85"
                        >
                          <Check
                            className="h-3.5 w-3.5 text-[#96E9C6] shrink-0"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* 3 Pillars Interactive Stack */}
          <div className="lg:col-span-6 space-y-4">
            {ECOSYSTEM_PILLARS.map((pillar) => {
              const isActive = activePillar === pillar.id;
              return (
                <motion.button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActivePillar(pillar.id)}
                  onMouseEnter={() => setActivePillar(pillar.id)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full overflow-hidden rounded-2xl p-6 text-left cursor-pointer"
                >
                  {isActive ? (
                    <motion.div
                      layoutId="activePillarSurface"
                      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                      className="surface-glass-featured absolute inset-0 rounded-2xl"
                    />
                  ) : (
                    <div className="surface-glass absolute inset-0 rounded-2xl opacity-75 transition-opacity hover:opacity-100" />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl font-bold text-[#F5F5F5]">{pillar.title}</h3>
                      <span
                        className={`font-mono-metrics text-xs font-bold ${
                          isActive ? 'text-[#96E9C6]' : 'text-[#F5F5F5]/50'
                        }`}
                      >
                        {pillar.index}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[15px] leading-[1.65] text-[#F5F5F5]/80">
                      {pillar.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}

            <div className="pt-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCtaClick}
                className="btn-cta-glow inline-flex min-h-12 items-center gap-2.5 rounded-xl px-6 py-3.5 text-base font-bold text-[#F5F5F5] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Quiero mi web para conseguir clientes</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
