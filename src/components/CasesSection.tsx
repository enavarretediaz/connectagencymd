import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2 } from 'lucide-react';
import { CASE_SCENARIOS, CaseScenario } from '../data/landingData';
import SpotlightCard from './SpotlightCard';

function CaseCard({ scenario, index }: { scenario: CaseScenario; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <SpotlightCard delay={index * 0.1} className="flex flex-col">
      <div className="flex h-full flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1D1D1D]">
          {!imgError ? (
            <img
              src={scenario.image}
              alt={scenario.imageAlt}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#6C22A6]/25 via-[#252525] to-[#96E9C6]/15 p-6 text-center">
              <Building2 className="h-9 w-9 text-[#96E9C6]" aria-hidden="true" />
              <span className="text-sm font-bold text-[#F5F5F5]">{scenario.sector}</span>
            </div>
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#242424] via-[#242424]/25 to-transparent"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
          <div>
            <p className="text-xs font-bold text-[#96E9C6]">{scenario.tag}</p>
            <h3 className="mt-2 text-xl font-bold leading-snug text-[#F5F5F5]">
              {scenario.sector}
            </h3>

            <dl className="mt-5 space-y-3.5 text-sm">
              <div>
                <dt className="font-bold text-[#F5F5F5]/65">Contexto inicial</dt>
                <dd className="mt-1 leading-relaxed text-[#F5F5F5]/85">{scenario.contexto}</dd>
              </div>
              <div>
                <dt className="font-bold text-[#F5F5F5]/65">Enfoque aplicado</dt>
                <dd className="mt-1 leading-relaxed text-[#F5F5F5]/85">{scenario.enfoque}</dd>
              </div>
            </dl>

            <div className="mt-5 pt-4">
              <div
                aria-hidden="true"
                className="mb-4 h-[1px] w-full bg-gradient-to-r from-[#6C22A6]/45 via-white/10 to-transparent"
              />
              <p className="text-xs font-bold text-[#F5F5F5]/65">Resultados</p>
              <ul className="mt-2.5 space-y-1.5">
                {scenario.resultados.map((res) => (
                  <li
                    key={res}
                    className="font-mono-metrics text-sm font-bold text-[#96E9C6]"
                  >
                    {res}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <blockquote className="mt-6 rounded-xl bg-[#1E1E1E]/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <p className="text-sm italic leading-relaxed text-[#F5F5F5]/90">
              &ldquo;{scenario.cita}&rdquo;
            </p>
            <footer className="mt-2 text-xs font-bold text-[#F5F5F5]/60">
              — {scenario.autor}
            </footer>
          </blockquote>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function CasesSection() {
  return (
    <section
      id="casos"
      className="bg-[#202020] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-sm font-bold text-[#96E9C6]">Nuestros clientes</p>
          <h2
            className="mt-3 text-3xl font-black leading-[1.15] tracking-tight text-[#F5F5F5] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Negocios que dejaron de perder oportunidades online.
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {CASE_SCENARIOS.map((scenario, idx) => (
            <CaseCard key={scenario.id} scenario={scenario} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
