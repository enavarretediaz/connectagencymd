import { FormEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Globe,
  Layers,
  Share2,
  Shield,
  X,
} from 'lucide-react';
import { NEED_OPTIONS, NeedOptionId } from '../data/landingData';

interface DiagnosticFormSectionProps {
  selectedPlan: string | null;
  preselectedNeed: NeedOptionId | null;
  onClearPlan: () => void;
  onOpenPrivacyModal: () => void;
}

interface FormValues {
  nombre: string;
  negocio: string;
  necesidad: NeedOptionId;
  email: string;
  telefono: string;
}

type StepNumber = 1 | 2 | 3 | 4;

interface StepErrors {
  nombre?: string;
  negocio?: string;
  email?: string;
  telefono?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const NEED_ICONS: Record<NeedOptionId, typeof Globe> = {
  web: Globe,
  social: Share2,
  both: Layers,
};

export default function DiagnosticFormSection({
  selectedPlan,
  preselectedNeed,
  onClearPlan,
  onOpenPrivacyModal,
}: DiagnosticFormSectionProps) {
  const [step, setStep] = useState<StepNumber>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [values, setValues] = useState<FormValues>({
    nombre: '',
    negocio: '',
    necesidad: preselectedNeed ?? 'both',
    email: '',
    telefono: '',
  });
  const [errors, setErrors] = useState<StepErrors>({});
  const [submittedData, setSubmittedData] = useState<
    (FormValues & { plan: string | null }) | null
  >(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  const nombreInputRef = useRef<HTMLInputElement | null>(null);
  const negocioInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectedPlan) {
      setSubmittedData(null);
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (preselectedNeed) {
      setValues((prev) => ({ ...prev, necesidad: preselectedNeed }));
      setSubmittedData(null);
    }
  }, [preselectedNeed]);

  // Move focus softly on step navigation only when user explicitly changed step
  const focusStepInput = (targetStep: StepNumber) => {
    window.setTimeout(() => {
      if (targetStep === 1) nombreInputRef.current?.focus({ preventScroll: true });
      if (targetStep === 2) negocioInputRef.current?.focus({ preventScroll: true });
      if (targetStep === 4) emailInputRef.current?.focus({ preventScroll: true });
    }, 180);
  };

  const validateNombre = (val: string) =>
    val.trim().length < 2 ? 'Introduce tu nombre para continuar.' : undefined;

  const validateNegocio = (val: string) =>
    val.trim().length < 2 ? 'Indica el nombre de tu negocio o tu sector.' : undefined;

  const validateEmail = (val: string) =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim())
      ? 'Introduce un correo electrónico válido.'
      : undefined;

  const validateTelefono = (val: string) => {
    const digits = val.trim().replace(/\D/g, '');
    return digits.length < 9 || digits.length > 15
      ? 'Introduce un teléfono de contacto válido (mínimo 9 dígitos).'
      : undefined;
  };

  const goToNextStep = () => {
    if (step === 1) {
      const err = validateNombre(values.nombre);
      if (err) {
        setErrors({ nombre: err });
        setLiveAnnouncement(err);
        return;
      }
      setErrors({});
      setDirection(1);
      setStep(2);
      setLiveAnnouncement('Paso 2 de 4: nombre de tu negocio o sector.');
      focusStepInput(2);
      return;
    }

    if (step === 2) {
      const err = validateNegocio(values.negocio);
      if (err) {
        setErrors({ negocio: err });
        setLiveAnnouncement(err);
        return;
      }
      setErrors({});
      setDirection(1);
      setStep(3);
      setLiveAnnouncement('Paso 3 de 4: selecciona qué necesita hoy tu negocio.');
      return;
    }

    if (step === 3) {
      setErrors({});
      setDirection(1);
      setStep(4);
      setLiveAnnouncement('Paso 4 de 4: datos de contacto y envío.');
      focusStepInput(4);
    }
  };

  const goToPrevStep = () => {
    if (step <= 1) return;
    setErrors({});
    setDirection(-1);
    const prevStep = (step - 1) as StepNumber;
    setStep(prevStep);
    setLiveAnnouncement(`Paso ${prevStep} de 4.`);
    focusStepInput(prevStep);
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      goToNextStep();
    }
  };

  const triggerRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      goToNextStep();
      return;
    }

    const emailErr = validateEmail(values.email);
    const telErr = validateTelefono(values.telefono);
    if (emailErr || telErr) {
      setErrors({ email: emailErr, telefono: telErr });
      setLiveAnnouncement(emailErr || telErr || 'Revisa los datos de contacto.');
      return;
    }

    setErrors({});
    setSubmittedData({
      ...values,
      plan: selectedPlan,
    });
    setLiveAnnouncement('Solicitud de diagnóstico gratuito enviada correctamente.');
  };

  const selectedNeedObj =
    NEED_OPTIONS.find((opt) => opt.id === values.necesidad) || NEED_OPTIONS[0];

  const inputBaseClass =
    'mt-2.5 w-full rounded-xl bg-[#1D1D1D]/90 px-4 py-3.5 text-base text-[#F5F5F5] placeholder-[#F5F5F5]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-200 focus:outline-none focus:bg-[#191919] focus:shadow-[0_0_0_2px_rgba(150,233,198,0.45),0_0_24px_rgba(108,34,166,0.45)]';

  return (
    <section
      id="diagnostico"
      className="relative overflow-hidden bg-[#252525] py-20 lg:py-28"
    >
      {/* Ambient volumetric backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-0 h-[440px] w-[440px] rounded-full blur-[140px] opacity-25"
        style={{ background: 'radial-gradient(circle, #6C22A6 0%, transparent 72%)' }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Header & Value Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="font-mono-metrics text-xs font-bold tracking-wider text-[#96E9C6]">
              06 · Diagnóstico gratuito
            </p>
            <h2
              className="mt-3 text-3xl font-black leading-[1.15] tracking-tight text-[#F5F5F5] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              ¿Hablamos de tu negocio?
            </h2>
            <p className="mt-4 text-base leading-[1.65] text-[#F5F5F5]/80 sm:text-lg">
              Cuéntame qué necesitas y te preparo una propuesta clara. Sin compromiso.
            </p>

            <div className="surface-glass mt-8 space-y-4 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3">
                <span className="text-sm font-bold text-[#F5F5F5]">Qué incluye tu diagnóstico</span>
                <span className="font-mono-metrics text-xs font-bold text-[#96E9C6]">0 €</span>
              </div>
              <div
                aria-hidden="true"
                className="h-[1px] w-full bg-gradient-to-r from-[#6C22A6]/50 via-white/10 to-transparent"
              />
              <ul className="space-y-3 pt-1 text-sm text-[#F5F5F5]/80">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#96E9C6]"
                    aria-hidden="true"
                  />
                  <span>Revisión de velocidad y experiencia móvil de tu presencia actual.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#96E9C6]"
                    aria-hidden="true"
                  />
                  <span>Visibilidad local en Google Maps y contenido en redes sociales.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#96E9C6]"
                    aria-hidden="true"
                  />
                  <span>Propuesta accionable entregada en un máximo de 48 horas.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Interactive 4-Step Wizard + Data Protection Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="surface-glass-featured rounded-3xl p-6 sm:p-8">
              {/* Screen-reader live region for step changes & feedback */}
              <div className="sr-only" aria-live="polite" aria-atomic="true">
                {liveAnnouncement}
              </div>

              {!submittedData && (
                <div className="mb-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono-metrics text-xs font-bold text-[#96E9C6]">
                      Paso {step} de 4
                    </span>
                    <span className="font-mono-metrics text-xs text-[#F5F5F5]/55">
                      {Math.round((step / 4) * 100)}%
                    </span>
                  </div>
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <motion.div
                      initial={false}
                      animate={{ scaleX: step / 4 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                      className="relative h-full w-full origin-left overflow-hidden rounded-full"
                      style={{
                        background: 'linear-gradient(45deg, #6C22A6, #96E9C6)',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="animate-bar-shimmer absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait" custom={direction}>
                {submittedData ? (
                  <motion.div
                    key="confirmation"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="py-3 text-left"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#96E9C6]/15 text-[#96E9C6]"
                    >
                      <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                    </motion.div>

                    <h3 className="mt-5 text-2xl font-black text-[#F5F5F5]">
                      Diagnóstico solicitado, {submittedData.nombre}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-[#F5F5F5]/80">
                      Hemos recibido tu solicitud para{' '}
                      <strong className="text-[#F5F5F5]">{submittedData.negocio}</strong>. Te
                      responderemos en menos de 24h y enviaremos tu propuesta en un máximo de 48h a{' '}
                      <span className="text-[#96E9C6]">{submittedData.email}</span>.
                    </p>

                    <dl className="mt-6 grid grid-cols-1 gap-4 rounded-2xl bg-[#1D1D1D]/80 p-5 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-xs text-[#F5F5F5]/55">Nombre</dt>
                        <dd className="mt-1 font-bold text-[#F5F5F5]">{submittedData.nombre}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-[#F5F5F5]/55">Negocio / sector</dt>
                        <dd className="mt-1 font-bold text-[#F5F5F5]">{submittedData.negocio}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-xs text-[#F5F5F5]/55">Opción elegida</dt>
                        <dd className="mt-1 font-bold text-[#96E9C6]">
                          {NEED_OPTIONS.find((o) => o.id === submittedData.necesidad)?.title}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-[#F5F5F5]/55">Email</dt>
                        <dd className="mt-1 text-[#F5F5F5]">{submittedData.email}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-[#F5F5F5]/55">Teléfono</dt>
                        <dd className="mt-1 font-mono-metrics text-[#F5F5F5]">
                          {submittedData.telefono}
                        </dd>
                      </div>
                      {submittedData.plan && (
                        <div className="sm:col-span-2">
                          <dt className="text-xs text-[#F5F5F5]/55">Plan de referencia</dt>
                          <dd className="mt-1 font-bold text-[#96E9C6]">{submittedData.plan}</dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSubmittedData(null);
                          setStep(4);
                        }}
                        className="inline-flex min-h-11 items-center rounded-xl bg-white/[0.08] px-5 py-2.5 text-sm font-bold text-[#F5F5F5] hover:bg-white/[0.14] cursor-pointer"
                      >
                        Editar datos
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSubmittedData(null);
                          setStep(1);
                          setValues({
                            nombre: '',
                            negocio: '',
                            necesidad: preselectedNeed ?? 'both',
                            email: '',
                            telefono: '',
                          });
                        }}
                        className="inline-flex min-h-11 items-center rounded-xl bg-[#6C22A6]/60 px-5 py-2.5 text-sm font-bold text-[#F5F5F5] hover:bg-[#6C22A6]/80 cursor-pointer"
                      >
                        Enviar otra consulta
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <AnimatePresence mode="wait" custom={direction}>
                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          initial={{ opacity: 0, x: direction * 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction * -20 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-5"
                        >
                          <div>
                            <h3 className="text-2xl font-black text-[#F5F5F5]">¿Cómo te llamas?</h3>
                            <p className="mt-1.5 text-sm text-[#F5F5F5]/70">
                              Son cuatro preguntas. Tardas menos de un minuto.
                            </p>
                          </div>

                          <div>
                            <label
                              htmlFor="wizard-nombre"
                              className="block text-sm font-bold text-[#F5F5F5]"
                            >
                              Nombre
                            </label>
                            <input
                              ref={nombreInputRef}
                              id="wizard-nombre"
                              name="nombre"
                              type="text"
                              autoComplete="name"
                              required
                              placeholder="Ej. Laura Martínez"
                              value={values.nombre}
                              onChange={(e) => {
                                setValues((prev) => ({ ...prev, nombre: e.target.value }));
                                if (errors.nombre) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    nombre: validateNombre(e.target.value),
                                  }));
                                }
                              }}
                              onKeyDown={handleEnterKey}
                              aria-invalid={Boolean(errors.nombre)}
                              aria-describedby={errors.nombre ? 'wizard-err-nombre' : undefined}
                              className={`${inputBaseClass} ${
                                errors.nombre ? 'shadow-[0_0_0_2px_rgba(251,113,133,0.7)]' : ''
                              }`}
                            />
                            {errors.nombre && (
                              <p
                                id="wizard-err-nombre"
                                className="mt-2 flex items-center gap-1.5 text-xs font-bold text-rose-300"
                              >
                                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                <span>{errors.nombre}</span>
                              </p>
                            )}
                          </div>

                          <div className="flex justify-end pt-2">
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={goToNextStep}
                              className="btn-cta-glow inline-flex min-h-12 items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-[#F5F5F5] cursor-pointer"
                            >
                              <span>Siguiente</span>
                              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          initial={{ opacity: 0, x: direction * 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction * -20 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-5"
                        >
                          <div>
                            <h3 className="text-2xl font-black text-[#F5F5F5]">
                              Encantado, {values.nombre.trim()}. ¿Cómo se llama tu negocio o a qué te
                              dedicas?
                            </h3>
                          </div>

                          <div>
                            <label
                              htmlFor="wizard-negocio"
                              className="block text-sm font-bold text-[#F5F5F5]"
                            >
                              Nombre del negocio / sector
                            </label>
                            <input
                              ref={negocioInputRef}
                              id="wizard-negocio"
                              name="negocio"
                              type="text"
                              autoComplete="organization"
                              required
                              placeholder="Ej. Clínica Dental Mirador / Restaurante / Reformas"
                              value={values.negocio}
                              onChange={(e) => {
                                setValues((prev) => ({ ...prev, negocio: e.target.value }));
                                if (errors.negocio) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    negocio: validateNegocio(e.target.value),
                                  }));
                                }
                              }}
                              onKeyDown={handleEnterKey}
                              aria-invalid={Boolean(errors.negocio)}
                              aria-describedby={errors.negocio ? 'wizard-err-negocio' : undefined}
                              className={`${inputBaseClass} ${
                                errors.negocio ? 'shadow-[0_0_0_2px_rgba(251,113,133,0.7)]' : ''
                              }`}
                            />
                            {errors.negocio && (
                              <p
                                id="wizard-err-negocio"
                                className="mt-2 flex items-center gap-1.5 text-xs font-bold text-rose-300"
                              >
                                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                <span>{errors.negocio}</span>
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-4 pt-2">
                            <button
                              type="button"
                              onClick={goToPrevStep}
                              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white/[0.06] px-5 py-3 text-sm font-bold text-[#F5F5F5] hover:bg-white/[0.11] cursor-pointer"
                            >
                              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                              <span>Atrás</span>
                            </button>
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={goToNextStep}
                              className="btn-cta-glow inline-flex min-h-12 items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-[#F5F5F5] cursor-pointer"
                            >
                              <span>Siguiente</span>
                              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step-3"
                          initial={{ opacity: 0, x: direction * 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction * -20 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-5"
                        >
                          <div>
                            <h3 className="text-2xl font-black text-[#F5F5F5]">
                              ¿Qué necesita hoy tu negocio?
                            </h3>
                          </div>

                          {selectedPlan && (
                            <div className="flex items-center justify-between gap-4 rounded-xl bg-[#1D1D1D]/85 px-4 py-3 text-xs sm:text-sm shadow-[inset_0_1px_0_rgba(150,233,198,0.18)]">
                              <div>
                                <span className="text-[#F5F5F5]/70">Plan preseleccionado: </span>
                                <strong className="font-bold text-[#96E9C6]">{selectedPlan}</strong>
                              </div>
                              <button
                                type="button"
                                onClick={onClearPlan}
                                aria-label="Cambiar o quitar plan preseleccionado"
                                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-[#F5F5F5]/70 hover:bg-white/10 hover:text-[#F5F5F5] cursor-pointer"
                              >
                                <span>Cambiar</span>
                                <X className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          )}

                          <div
                            role="radiogroup"
                            aria-label="¿Qué necesita hoy tu negocio?"
                            className="space-y-3"
                          >
                            {NEED_OPTIONS.map((option) => {
                              const isSelected = values.necesidad === option.id;
                              const Icon = NEED_ICONS[option.id];
                              return (
                                <button
                                  key={option.id}
                                  type="button"
                                  role="radio"
                                  aria-checked={isSelected}
                                  onClick={() =>
                                    setValues((prev) => ({ ...prev, necesidad: option.id }))
                                  }
                                  className={`relative flex w-full items-start gap-4 overflow-hidden rounded-2xl p-4 text-left transition-all duration-200 cursor-pointer ${
                                    isSelected
                                      ? 'bg-gradient-to-r from-[#6C22A6]/45 via-[#2E253D]/90 to-[#96E9C6]/15 shadow-[inset_0_1px_0_rgba(150,233,198,0.28)]'
                                      : 'bg-[#1D1D1D]/75 hover:bg-[#1D1D1D]'
                                  }`}
                                >
                                  <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                      isSelected
                                        ? 'bg-[#96E9C6]/20 text-[#96E9C6]'
                                        : 'bg-white/[0.06] text-[#F5F5F5]/70'
                                    }`}
                                  >
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-base font-bold text-[#F5F5F5]">
                                      {option.title}
                                    </p>
                                    <p className="mt-0.5 text-sm text-[#F5F5F5]/75">
                                      {option.description}
                                    </p>
                                  </div>
                                  <div
                                    aria-hidden="true"
                                    className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                      isSelected
                                        ? 'bg-[#96E9C6] text-[#1E1E1E]'
                                        : 'bg-white/[0.08] text-transparent'
                                    }`}
                                  >
                                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between gap-4 pt-2">
                            <button
                              type="button"
                              onClick={goToPrevStep}
                              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white/[0.06] px-5 py-3 text-sm font-bold text-[#F5F5F5] hover:bg-white/[0.11] cursor-pointer"
                            >
                              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                              <span>Atrás</span>
                            </button>
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={goToNextStep}
                              className="btn-cta-glow inline-flex min-h-12 items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-[#F5F5F5] cursor-pointer"
                            >
                              <span>Siguiente</span>
                              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}

                      {step === 4 && (
                        <motion.div
                          key="step-4"
                          initial={{ opacity: 0, x: direction * 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction * -20 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-5"
                        >
                          <div>
                            <h3 className="text-2xl font-black text-[#F5F5F5]">
                              ¿Dónde te enviamos el diagnóstico?
                            </h3>
                            <p className="mt-1.5 text-sm text-[#F5F5F5]/70">
                              Para <strong className="text-[#F5F5F5]">{values.negocio}</strong> ·{' '}
                              <span className="text-[#96E9C6]">{selectedNeedObj.title}</span>
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor="wizard-email"
                                className="block text-sm font-bold text-[#F5F5F5]"
                              >
                                Email
                              </label>
                              <input
                                ref={emailInputRef}
                                id="wizard-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="laura@tunegocio.es"
                                value={values.email}
                                onChange={(e) => {
                                  setValues((prev) => ({ ...prev, email: e.target.value }));
                                  if (errors.email) {
                                    setErrors((prev) => ({
                                      ...prev,
                                      email: validateEmail(e.target.value),
                                    }));
                                  }
                                }}
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? 'wizard-err-email' : undefined}
                                className={`${inputBaseClass} ${
                                  errors.email ? 'shadow-[0_0_0_2px_rgba(251,113,133,0.7)]' : ''
                                }`}
                              />
                              {errors.email && (
                                <p
                                  id="wizard-err-email"
                                  className="mt-2 flex items-center gap-1.5 text-xs font-bold text-rose-300"
                                >
                                  <AlertCircle
                                    className="h-3.5 w-3.5 shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span>{errors.email}</span>
                                </p>
                              )}
                            </div>

                            <div>
                              <label
                                htmlFor="wizard-telefono"
                                className="block text-sm font-bold text-[#F5F5F5]"
                              >
                                Teléfono
                              </label>
                              <input
                                id="wizard-telefono"
                                name="telefono"
                                type="tel"
                                autoComplete="tel"
                                required
                                placeholder="+34 600 000 000"
                                value={values.telefono}
                                onChange={(e) => {
                                  setValues((prev) => ({ ...prev, telefono: e.target.value }));
                                  if (errors.telefono) {
                                    setErrors((prev) => ({
                                      ...prev,
                                      telefono: validateTelefono(e.target.value),
                                    }));
                                  }
                                }}
                                aria-invalid={Boolean(errors.telefono)}
                                aria-describedby={
                                  errors.telefono ? 'wizard-err-telefono' : undefined
                                }
                                className={`${inputBaseClass} ${
                                  errors.telefono ? 'shadow-[0_0_0_2px_rgba(251,113,133,0.7)]' : ''
                                }`}
                              />
                              {errors.telefono && (
                                <p
                                  id="wizard-err-telefono"
                                  className="mt-2 flex items-center gap-1.5 text-xs font-bold text-rose-300"
                                >
                                  <AlertCircle
                                    className="h-3.5 w-3.5 shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span>{errors.telefono}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-[#F5F5F5]/65">
                            Respuesta en menos de 24h y diagnóstico en máximo 48h. Sin spam.
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                            <button
                              type="button"
                              onClick={goToPrevStep}
                              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white/[0.06] px-5 py-3 text-sm font-bold text-[#F5F5F5] hover:bg-white/[0.11] cursor-pointer"
                            >
                              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                              <span>Atrás</span>
                            </button>

                            <motion.button
                              type="submit"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.985 }}
                              onClick={triggerRipple}
                              className="btn-cta-glow relative overflow-hidden inline-flex min-h-12 flex-1 sm:flex-initial items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-bold text-[#F5F5F5] cursor-pointer"
                            >
                              {ripples.map((r) => (
                                <span
                                  key={r.id}
                                  aria-hidden="true"
                                  className="animate-ripple pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#96E9C6]/45"
                                  style={{ left: r.x, top: r.y }}
                                />
                              ))}
                              <span className="relative z-10">Solicitar diagnóstico gratuito</span>
                              <ArrowRight
                                className="relative z-10 h-4 w-4 shrink-0"
                                aria-hidden="true"
                              />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                )}
              </AnimatePresence>
            </div>

            {/* Data Protection Collapsible Block: Cómo tratamos tus datos */}
            <div className="surface-glass rounded-2xl px-6 py-1">
              <button
                type="button"
                id="privacy-toggle-btn"
                aria-expanded={privacyOpen}
                aria-controls="privacy-details-panel"
                onClick={() => setPrivacyOpen((prev) => !prev)}
                className="flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left text-sm font-bold text-[#F5F5F5]/85 hover:text-[#96E9C6] cursor-pointer"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Shield className="h-4 w-4 text-[#96E9C6] shrink-0" aria-hidden="true" />
                  <span>Cómo tratamos tus datos</span>
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: privacyOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-[#F5F5F5]/65" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {privacyOpen && (
                  <motion.div
                    id="privacy-details-panel"
                    role="region"
                    aria-labelledby="privacy-toggle-btn"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <dl className="space-y-3 pb-5 pt-2 text-xs leading-relaxed text-[#F5F5F5]/75">
                      <div>
                        <dt className="font-bold text-[#F5F5F5]">Responsable:</dt>
                        <dd>Connect Agencia de Marketing Digital.</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-[#F5F5F5]">Finalidad:</dt>
                        <dd>
                          Atender tu solicitud de diagnóstico gratuito y preparar una propuesta
                          adaptada a tu negocio.
                        </dd>
                      </div>
                      <div>
                        <dt className="font-bold text-[#F5F5F5]">Legitimación:</dt>
                        <dd>Tu consentimiento al enviar el formulario.</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-[#F5F5F5]">Destinatarios y herramientas:</dt>
                        <dd>
                          No se ceden datos a terceros fuera de obligación legal o proveedores
                          técnicos necesarios para gestionar la solicitud y el envío de correos.
                        </dd>
                      </div>
                      <div>
                        <dt className="font-bold text-[#F5F5F5]">Derechos:</dt>
                        <dd>
                          Acceso, rectificación, supresión, limitación, oposición y portabilidad.{' '}
                          <button
                            type="button"
                            onClick={onOpenPrivacyModal}
                            className="font-bold text-[#96E9C6] underline underline-offset-2 hover:text-[#F5F5F5] cursor-pointer"
                          >
                            Ver política de privacidad completa
                          </button>
                          .
                        </dd>
                      </div>
                    </dl>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
