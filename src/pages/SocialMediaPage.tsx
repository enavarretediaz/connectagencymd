import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Share2 } from 'lucide-react';
import { SOCIAL_CHANNELS, SOCIAL_COPY_PILLARS } from '../data/landingData';
import SpotlightCard from '../components/SpotlightCard';

interface SocialMediaPageProps {
  onRequestSocialDiagnostic: () => void;
}

export default function SocialMediaPage({
  onRequestSocialDiagnostic,
}: SocialMediaPageProps) {
  const [activeChannel, setActiveChannel] = useState<'instagram' | 'linkedin' | 'local'>(
    'instagram'
  );
  const [imgError, setImgError] = useState(false);

  const currentChannel =
    SOCIAL_CHANNELS.find((c) => c.id === activeChannel) || SOCIAL_CHANNELS[0];

  return (
    <>
      {/* Hero Social Media */}
      <section className="relative overflow-hidden bg-[#252525] pt-16 pb-20 lg:pt-24 lg:pb-24">
        <div
          aria-hidden="true"
          className="animate-aurora-b pointer-events-none absolute -top-20 left-[8%] h-[420px] w-[420px] rounded-full blur-[130px] opacity-20"
          style={{
            background:
              'radial-gradient(circle, #96E9C6 0%, rgba(108,34,166,0.22) 48%, transparent 72%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="text-sm font-bold text-[#96E9C6]"
              >
                Social Media y estrategia de contenido · España
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 text-[clamp(2.25rem,4.2vw,3.5rem)] font-black leading-[1.08] tracking-tight text-[#F5F5F5]"
                style={{ textWrap: 'balance' }}
              >
                Redes sociales con criterio editorial y{' '}
                <span className="text-gradient-brand">retorno medible.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-base leading-[1.7] text-[#F5F5F5]/80 sm:text-lg"
              >
                Publicar tres veces por semana sin rumbo solo consume tiempo y da sensación de
                esfuerzo vacío. En Connect diseñamos mensajes que suenan a tu negocio real,
                educan al cliente antes de que pregunte precio y derivan tráfico constante hacia tu
                web, tu WhatsApp o tu agenda de reservas.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onRequestSocialDiagnostic}
                  className="btn-cta-glow inline-flex min-h-12 items-center gap-2.5 rounded-xl px-6 py-3.5 text-base font-bold text-[#F5F5F5] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Impulsar mis redes sociales</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </motion.button>
                <a
                  href="#enfoque-copy"
                  className="inline-flex min-h-12 items-center rounded-xl bg-white/[0.04] px-5 py-3.5 text-sm font-bold text-[#F5F5F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/[0.08] whitespace-nowrap shrink-0"
                >
                  Cómo trabajamos el contenido
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="surface-glass-featured overflow-hidden rounded-3xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1D1D1D]">
                  {!imgError ? (
                    <img
                      src="/src/assets/images/social_media_produccion_1795291653792.jpg"
                      alt="Producción audiovisual y grabación de vídeo vertical para redes sociales de negocio local"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#6C22A6]/25 via-[#252525] to-[#96E9C6]/15 p-6 text-center">
                      <Share2 className="h-9 w-9 text-[#96E9C6]" aria-hidden="true" />
                      <span className="text-sm font-bold text-[#F5F5F5]">
                        Producción y Copy Editorial
                      </span>
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#242424] via-transparent to-transparent"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold text-[#96E9C6]">Contenido conectado a negocio</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#F5F5F5]/80">
                    Guiones, rodaje ágil, edición y copywriting alineados con tus servicios más
                    rentables.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deep Copy Pillars (2x2) */}
      <section id="enfoque-copy" className="bg-[#202020] py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#96E9C6]">Profundidad editorial</p>
            <h2
              className="mt-3 text-3xl font-black leading-[1.15] tracking-tight text-[#F5F5F5] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              El texto y la narrativa deciden quién confía en ti antes de escribirte.
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-[#F5F5F5]/80">
              No escribimos frases genéricas ni copiamos modas pasajeras. Traducimos la experiencia
              real de tu negocio a piezas claras que generan conversación y solicitudes directas.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {SOCIAL_COPY_PILLARS.map((item, idx) => (
              <SpotlightCard key={item.index} delay={idx * 0.08} className="p-7">
                <div className="flex items-center justify-between gap-4 pb-3">
                  <span className="font-mono-metrics text-sm font-bold text-[#96E9C6]">
                    {item.index}
                  </span>
                  <span className="text-xs text-[#F5F5F5]/60">{item.subtitle}</span>
                </div>
                <div
                  aria-hidden="true"
                  className="h-[1px] w-full bg-gradient-to-r from-[#6C22A6]/50 via-white/10 to-transparent"
                />
                <h3 className="mt-5 text-xl font-bold text-[#F5F5F5]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.72] text-[#F5F5F5]/80">{item.body}</p>
              </SpotlightCard>
            ))}
          </div>

          {/* Interactive Channel Strategy Switcher */}
          <div className="surface-glass-featured mt-14 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold text-[#96E9C6]">Estrategia por canal</p>
                <h3 className="mt-1 text-2xl font-black text-[#F5F5F5]">
                  Cómo adaptamos el copy a cada plataforma
                </h3>
              </div>

              <div
                role="tablist"
                aria-label="Canales de Social Media"
                className="surface-glass inline-flex flex-wrap rounded-xl p-1"
              >
                {SOCIAL_CHANNELS.map((ch) => {
                  const isActive = activeChannel === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveChannel(ch.id)}
                      className="relative rounded-lg px-4 py-2 text-xs font-bold text-[#F5F5F5] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="socialChannelPill"
                          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                          className="absolute inset-0 rounded-lg bg-[#6C22A6] shadow-[0_4px_16px_rgba(108,34,166,0.55)]"
                        />
                      )}
                      <span className="relative z-10">{ch.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentChannel.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-12"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <p className="text-xs font-bold text-[#F5F5F5]/60">Ideal para</p>
                    <p className="mt-1 text-base font-bold text-[#F5F5F5]">
                      {currentChannel.focus}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#F5F5F5]/60">Enfoque de copywriting</p>
                    <p className="mt-1 text-sm leading-[1.7] text-[#F5F5F5]/82">
                      {currentChannel.copyApproach}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-3 rounded-2xl bg-[#1D1D1D]/75 p-5">
                  <p className="text-xs font-bold text-[#96E9C6]">Formatos clave</p>
                  <ul className="mt-3 space-y-2.5 text-sm text-[#F5F5F5]/85">
                    {currentChannel.formats.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#96E9C6]"
                          aria-hidden="true"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-3 rounded-2xl bg-[#1D1D1D]/75 p-5">
                  <p className="text-xs font-bold text-[#96E9C6]">Métricas que importan</p>
                  <ul className="mt-3 space-y-2.5 text-sm text-[#F5F5F5]/85">
                    {currentChannel.metrics.map((m) => (
                      <li key={m} className="font-mono-metrics text-xs font-bold text-[#F5F5F5]">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
