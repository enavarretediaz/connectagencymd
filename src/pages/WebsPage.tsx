import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Globe } from 'lucide-react';
import { WEB_COPY_PILLARS, WEB_PROJECTS, WebProject } from '../data/landingData';
import SpotlightCard from '../components/SpotlightCard';

interface WebsPageProps {
  onRequestWebDiagnostic: () => void;
}

function ProjectCard({ project, index }: { project: WebProject; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <SpotlightCard delay={index * 0.1} className="flex flex-col">
      <div className="flex h-full flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1D1D1D]">
          {!imgError ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#6C22A6]/25 via-[#252525] to-[#96E9C6]/15 p-6 text-center">
              <Globe className="h-9 w-9 text-[#96E9C6]" aria-hidden="true" />
              <span className="text-sm font-bold text-[#F5F5F5]">{project.title}</span>
            </div>
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#242424] via-[#242424]/25 to-transparent"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
          <div>
            <p className="text-xs font-bold text-[#96E9C6]">{project.category}</p>
            <h3 className="mt-2 text-xl font-bold text-[#F5F5F5]">{project.title}</h3>
            <p className="mt-1 text-xs text-[#F5F5F5]/60">{project.clientType}</p>

            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="font-bold text-[#F5F5F5]/65">Punto de partida</dt>
                <dd className="mt-1 leading-relaxed text-[#F5F5F5]/80">{project.challenge}</dd>
              </div>
              <div>
                <dt className="font-bold text-[#F5F5F5]/65">Solución aplicada</dt>
                <dd className="mt-1 leading-relaxed text-[#F5F5F5]/85">{project.solution}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 pt-4">
            <div
              aria-hidden="true"
              className="mb-4 h-[1px] w-full bg-gradient-to-r from-[#6C22A6]/45 via-white/10 to-transparent"
            />
            <ul className="space-y-2">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs font-bold text-[#96E9C6]">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="font-mono-metrics leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function WebsPage({ onRequestWebDiagnostic }: WebsPageProps) {
  return (
    <>
      {/* Concise Hero for Webs */}
      <section className="relative overflow-hidden bg-[#252525] pt-16 pb-20 lg:pt-24 lg:pb-24">
        <div
          aria-hidden="true"
          className="animate-aurora-a pointer-events-none absolute -top-24 right-[10%] h-[420px] w-[420px] rounded-full blur-[130px] opacity-25"
          style={{
            background:
              'radial-gradient(circle, #6C22A6 0%, rgba(108,34,166,0.2) 45%, transparent 72%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-sm font-bold text-[#96E9C6]"
            >
              Diseño y desarrollo web · España
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-[clamp(2.15rem,4.1vw,3.4rem)] font-black leading-[1.09] tracking-tight text-[#F5F5F5]"
              style={{ textWrap: 'balance' }}
            >
              Webs hechas para que quien te busca en internet te elija a ti{' '}
              <span className="text-gradient-brand">y no a tu competencia.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-base leading-[1.7] text-[#F5F5F5]/80 sm:text-lg"
            >
              Alrededor del 70% de las visitas a una web se abren desde el móvil. Tu cliente te está
              buscando por ahí: si la web se ve mal, tarda en cargar, esconde cómo contactarte o no
              deja claro por qué elegirte en los primeros segundos, el cliente no te elige.
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
                onClick={onRequestWebDiagnostic}
                className="btn-cta-glow inline-flex min-h-12 items-center gap-2.5 rounded-xl px-6 py-3.5 text-base font-bold text-[#F5F5F5] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Solicitar diagnóstico web</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </motion.button>
              <a
                href="#proyectos-web"
                className="inline-flex min-h-12 items-center rounded-xl bg-white/[0.04] px-5 py-3.5 text-sm font-bold text-[#F5F5F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/[0.08] whitespace-nowrap shrink-0"
              >
                Ver proyectos seleccionados
              </a>
            </motion.div>
          </div>

          {/* 3 Deep-Copy Pillars */}
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {WEB_COPY_PILLARS.map((pillar, idx) => (
              <SpotlightCard key={pillar.index} delay={idx * 0.08} className="p-7">
                <span className="font-mono-metrics text-sm font-bold text-[#96E9C6]">
                  {pillar.index}
                </span>
                <div
                  aria-hidden="true"
                  className="mt-3 h-[1px] w-full bg-gradient-to-r from-[#6C22A6]/50 via-white/10 to-transparent"
                />
                <h2 className="mt-4 text-lg font-bold text-[#F5F5F5]">{pillar.title}</h2>
                <p className="mt-2.5 text-[15px] leading-[1.68] text-[#F5F5F5]/78">
                  {pillar.body}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Web Projects Showcase */}
      <section id="proyectos-web" className="bg-[#202020] py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-[#96E9C6]">Proyectos seleccionados</p>
              <h2
                className="mt-2 text-3xl font-black leading-[1.15] tracking-tight text-[#F5F5F5] sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                Estructura clara, carga rápida y foco en que el visitante dé el paso.
              </h2>
            </div>
            <p className="text-xs text-[#F5F5F5]/65">
              Ejemplos ilustrativos de proyectos y enfoques de arquitectura web en Connect.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-3">
            {WEB_PROJECTS.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
