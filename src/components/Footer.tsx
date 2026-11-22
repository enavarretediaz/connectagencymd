import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { MODAL_DOCUMENTS, ModalDocument } from '../data/landingData';
import { PageRoute } from './Navbar';

interface FooterProps {
  activeModalKey: string | null;
  onOpenModal: (docKey: string) => void;
  onCloseModal: () => void;
  onNavigatePage: (page: PageRoute, sectionId?: string) => void;
}

export default function Footer({
  activeModalKey,
  onOpenModal,
  onCloseModal,
  onNavigatePage,
}: FooterProps) {
  const activeDoc: ModalDocument | null = activeModalKey
    ? MODAL_DOCUMENTS[activeModalKey] || null
    : null;

  useEffect(() => {
    if (!activeDoc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeDoc, onCloseModal]);

  return (
    <footer className="bg-[#1B1B1B] py-16 text-sm text-[#F5F5F5]/75">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-12">
          {/* Brand & Tagline */}
          <div className="md:col-span-4">
            <button
              type="button"
              onClick={() => onNavigatePage('home', 'inicio')}
              className="inline-flex items-center gap-2.5 text-xl font-black tracking-tight text-[#F5F5F5] cursor-pointer"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="footerMarkGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6C22A6" />
                    <stop offset="100%" stopColor="#96E9C6" />
                  </linearGradient>
                </defs>
                <circle cx="16" cy="16" r="14" stroke="url(#footerMarkGrad)" strokeWidth="2.2" />
                <path
                  d="M9 20.5V11.5L13 16L17 11.5V20.5M19.5 11.5H21.8C24 11.5 25.2 13.3 25.2 16C25.2 18.7 24 20.5 21.8 20.5H19.5V11.5Z"
                  stroke="#F5F5F5"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Connect</span>
            </button>
            <p className="mt-4 max-w-xs leading-relaxed text-[#F5F5F5]/70">
              Ecosistemas digitales que convierten búsquedas en clientes.
            </p>
          </div>

          {/* 4 Footer Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
                Servicios
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('webs')}
                    className="hover:text-[#96E9C6] transition-colors cursor-pointer text-left"
                  >
                    Web profesional
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('home', 'ecosistema')}
                    className="hover:text-[#96E9C6] transition-colors cursor-pointer text-left"
                  >
                    SEO local
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('social-media')}
                    className="hover:text-[#96E9C6] transition-colors cursor-pointer text-left"
                  >
                    Social Media
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('webs', 'proyectos-web')}
                    className="hover:text-[#96E9C6] transition-colors cursor-pointer text-left"
                  >
                    Proyectos Web
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
                Empresa
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal('nosotros')}
                    className="hover:text-[#96E9C6] transition-colors cursor-pointer text-left"
                  >
                    Sobre nosotros
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('home', 'casos')}
                    className="hover:text-[#96E9C6] transition-colors cursor-pointer text-left"
                  >
                    Casos de éxito
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal('blog')}
                    className="hover:text-[#96E9C6] transition-colors cursor-pointer text-left"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <a href="#diagnostico" className="hover:text-[#96E9C6] transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
                Legal
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal('aviso')}
                    className="hover:text-[#96E9C6] transition-colors cursor-pointer text-left"
                  >
                    Aviso legal
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal('privacidad')}
                    className="hover:text-[#96E9C6] transition-colors cursor-pointer text-left"
                  >
                    Privacidad
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal('cookies')}
                    className="hover:text-[#96E9C6] transition-colors cursor-pointer text-left"
                  >
                    Cookies
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
                Redes
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="https://www.instagram.com/connectagencyes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#96E9C6] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/connect-agencia-marketing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#96E9C6] transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#diagnostico" className="hover:text-[#96E9C6] transition-colors">
                    Google Business
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="h-[1px] w-full bg-gradient-to-r from-[#6C22A6]/40 via-white/10 to-transparent"
        />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-[#F5F5F5]/55 sm:flex-row sm:items-center">
          <p>© 2026 Connect Agencia de Marketing Digital. Todos los derechos reservados.</p>
          <p>España · Ecosistemas Digitales para Negocios</p>
        </div>
      </div>

      {/* Animated Modal Dialog */}
      <AnimatePresence>
        {activeDoc && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-doc-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            onClick={onCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="surface-glass-featured w-full max-w-lg rounded-3xl p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 pb-4">
                <div>
                  <p className="text-xs font-bold text-[#96E9C6]">{activeDoc.category}</p>
                  <h2 id="modal-doc-title" className="mt-1 text-xl font-black text-[#F5F5F5]">
                    {activeDoc.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onCloseModal}
                  aria-label="Cerrar ventana"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-[#F5F5F5] hover:bg-white/[0.12] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                aria-hidden="true"
                className="h-[1px] w-full bg-gradient-to-r from-[#6C22A6]/50 via-white/10 to-transparent"
              />

              <div className="mt-5 space-y-5">
                {activeDoc.sections.map((sec) => (
                  <div key={sec.heading}>
                    <h3 className="text-sm font-bold text-[#F5F5F5]">{sec.heading}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#F5F5F5]/80">{sec.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex justify-end">
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="rounded-xl bg-[#6C22A6] px-5 py-2.5 text-sm font-bold text-[#F5F5F5] hover:bg-[#7D2BBE] cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
