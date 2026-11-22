import { motion } from 'motion/react';
import { PAIN_CARDS } from '../data/landingData';
import SpotlightCard from './SpotlightCard';

export default function ProblemSection() {
  return (
    <section
      id="problema"
      className="relative bg-[#202020] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-sm font-bold text-[#96E9C6]">El diagnóstico real</p>
          <h2
            className="mt-3 text-3xl font-black leading-[1.15] tracking-tight text-[#F5F5F5] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            El problema no es tener o no tener web. Es tener una presencia digital que no genera
            confianza ni trae clientes.
          </h2>
          <p className="mt-5 text-base leading-[1.65] text-[#F5F5F5]/80 sm:text-lg">
            Tener una web &ldquo;porque toca&rdquo; ya no sirve. En 2026, quien busca un producto o
            servicio compara y decide en segundos. Si tu web no existe o no tiene un buen diseño, va
            lenta o apenas se ve, no es que falte demanda: es que estás dejando que otros se lleven
            clientes que buscaban lo que tú ofreces.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PAIN_CARDS.map((pain, idx) => (
            <SpotlightCard key={pain.id} delay={idx * 0.1} className="p-7">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 pb-4">
                    <span className="font-mono-metrics text-sm font-bold text-[#96E9C6]">
                      {pain.index}
                    </span>
                    <span className="text-xs text-[#F5F5F5]/55">{pain.metricLabel}</span>
                  </div>

                  <div
                    aria-hidden="true"
                    className="h-[1px] w-full bg-gradient-to-r from-[#6C22A6]/50 via-white/10 to-transparent"
                  />

                  <h3 className="mt-5 text-xl font-bold leading-snug text-[#F5F5F5]">
                    {pain.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-bold text-[#96E9C6]/90">
                    {pain.subtitle}
                  </p>

                  <p className="mt-3 text-[15px] leading-[1.65] text-[#F5F5F5]/75">
                    {pain.description}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="surface-glass mt-10 rounded-2xl p-7 sm:p-9"
        >
          <p className="max-w-3xl text-lg font-bold leading-relaxed text-[#F5F5F5] sm:text-xl">
            Un buen producto no basta si se ve mal. Muchos clientes comparan en internet antes de
            comprar en tienda física, y si tu presencia visual falla,{' '}
            <span className="text-[#96E9C6]">
              eligen a la competencia antes de pisar tu local.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
