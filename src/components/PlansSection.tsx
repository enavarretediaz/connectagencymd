import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import {
  NeedOptionId,
  PLAN_CATEGORIES,
  PlanCardItem,
  PlanCategoryId,
} from '../data/landingData';
import SpotlightCard from './SpotlightCard';

interface PlansSectionProps {
  onSelectPlan: (planName: string, needId: NeedOptionId) => void;
}

export default function PlansSection({ onSelectPlan }: PlansSectionProps) {
  const [activeTab, setActiveTab] = useState<PlanCategoryId>('social');

  const currentGroup =
    PLAN_CATEGORIES.find((cat) => cat.id === activeTab) || PLAN_CATEGORIES[0];

  return (
    <section
      id="planes"
      className="relative overflow-hidden bg-[#252525] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-sm font-bold text-[#96E9C6]">Planes y Servicios</p>
            <h2
              className="mt-3 text-3xl font-black leading-[1.15] tracking-tight text-[#F5F5F5] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Elige el nivel que necesita hoy tu negocio.
            </h2>
            <p className="mt-3 text-sm font-bold text-[#F5F5F5]/65">
              {currentGroup.contextLine}
            </p>
          </motion.div>

          {/* Two-option switch: Social Media | Diseño Web */}
          <div
            role="tablist"
            aria-label="Categoría de planes"
            className="surface-glass relative inline-flex self-start rounded-xl p-1 lg:self-auto"
          >
            {PLAN_CATEGORIES.map((category) => {
              const isSelected = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(category.id)}
                  className="relative rounded-lg px-5 py-2.5 text-xs font-bold text-[#F5F5F5] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isSelected && (
                    <motion.span
                      layoutId="planCategoryPill"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="absolute inset-0 rounded-lg bg-[#6C22A6] shadow-[0_4px_16px_rgba(108,34,166,0.55)]"
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Always 2 centered cards in a row on desktop, stacked on mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGroup.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-7 md:grid-cols-2 md:items-stretch"
          >
            {currentGroup.plans.map((plan: PlanCardItem, idx) => {
              const isPopular = Boolean(plan.popular);

              return (
                <div key={plan.id} className="relative flex">
                  {isPopular && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-3 rounded-3xl opacity-35 blur-2xl"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 30%, #6C22A6 0%, rgba(150,233,198,0.4) 55%, transparent 75%)',
                      }}
                    />
                  )}

                  <SpotlightCard
                    featured={isPopular}
                    delay={idx * 0.08}
                    className="flex w-full flex-col p-7 sm:p-8"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-3 pb-4">
                          <span className="text-xs font-bold text-[#F5F5F5]/70">
                            {plan.subtitle ? plan.subtitle : currentGroup.label}
                          </span>
                          {isPopular && (
                            <span className="font-mono-metrics text-xs font-bold tracking-wide text-[#96E9C6]">
                              MÁS POPULAR
                            </span>
                          )}
                        </div>

                        <div
                          aria-hidden="true"
                          className="h-[1px] w-full bg-gradient-to-r from-[#6C22A6]/55 via-white/10 to-transparent"
                        />

                        <h3 className="mt-5 text-2xl font-black tracking-tight text-[#F5F5F5]">
                          {plan.name}
                        </h3>
                        <p className="mt-2 text-sm font-bold text-[#96E9C6]/95">
                          {plan.availability}
                        </p>

                        <ul className="mt-6 space-y-3.5">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-3 text-sm leading-relaxed text-[#F5F5F5]/85"
                            >
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#96E9C6]"
                                aria-hidden="true"
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-4">
                        {plan.footnote && (
                          <p className="mb-4 text-xs text-[#F5F5F5]/60">{plan.footnote}</p>
                        )}
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onSelectPlan(plan.name, plan.needId)}
                          className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                            isPopular
                              ? 'btn-cta-glow text-[#F5F5F5]'
                              : 'bg-white/[0.06] text-[#F5F5F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/[0.11]'
                          }`}
                        >
                          <span>{plan.ctaLabel}</span>
                          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                        </motion.button>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
