import { useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';

export type PageRoute = 'home' | 'webs' | 'social-media';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigatePage: (page: PageRoute, sectionId?: string) => void;
  onNavigateToDiagnostic: () => void;
}

interface NavItem {
  id: string;
  label: string;
  page: PageRoute;
  sectionId?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Inicio', page: 'home', sectionId: 'inicio' },
  { id: 'ecosistema', label: 'Ecosistema', page: 'home', sectionId: 'ecosistema' },
  { id: 'webs', label: 'Webs', page: 'webs' },
  { id: 'social-media', label: 'Social Media', page: 'social-media' },
  { id: 'planes', label: 'Planes', page: 'home', sectionId: 'planes' },
];

export default function Navbar({
  currentPage,
  onNavigatePage,
  onNavigateToDiagnostic,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  const handleNavClick = (item: NavItem) => {
    setMobileOpen(false);
    onNavigatePage(item.page, item.sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#222222]/80 backdrop-blur-xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]">
      {/* Spring-smoothed top scroll progress indicator */}
      <motion.div
        aria-hidden="true"
        className="h-[2px] w-full origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(45deg, #6C22A6, #96E9C6)',
        }}
      />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            onNavigatePage('home', 'inicio');
          }}
          className="group flex items-center gap-2.5 text-xl font-black tracking-tight text-[#F5F5F5] whitespace-nowrap shrink-0 cursor-pointer"
          aria-label="Connect Agencia de Marketing Digital - Inicio"
        >
          <motion.svg
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
          >
            <defs>
              <linearGradient id="navMarkGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6C22A6" />
                <stop offset="100%" stopColor="#96E9C6" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="14" stroke="url(#navMarkGrad)" strokeWidth="2.2" />
            <path
              d="M9 20.5V11.5L13 16L17 11.5V20.5M19.5 11.5H21.8C24 11.5 25.2 13.3 25.2 16C25.2 18.7 24 20.5 21.8 20.5H19.5V11.5Z"
              stroke="#F5F5F5"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
          <span>Connect</span>
        </button>

        {/* Zone 2: 5 concise single-line text links */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActivePage =
              (item.id === 'webs' && currentPage === 'webs') ||
              (item.id === 'social-media' && currentPage === 'social-media') ||
              (item.id === 'home' && currentPage === 'home');

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`group relative py-1 text-sm font-bold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActivePage ? 'text-[#F5F5F5]' : 'text-[#F5F5F5]/75 hover:text-[#F5F5F5]'
                }`}
              >
                <span>{item.label}</span>
                {isActivePage ? (
                  <motion.span
                    layoutId="navActiveUnderline"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#6C22A6] to-[#96E9C6]"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-gradient-to-r from-[#6C22A6] to-[#96E9C6] transition-transform duration-200 group-hover:scale-x-100"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNavigateToDiagnostic}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#6C22A6] px-4 py-2 text-sm font-bold text-[#F5F5F5] shadow-[0_6px_20px_-6px_rgba(108,34,166,0.75)] transition-colors duration-150 hover:bg-[#7A29BA] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Diagnóstico gratuito
          </motion.button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/[0.06] text-[#F5F5F5] md:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Animated mobile slide-in navigation drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:hidden bg-[#222222]/95 backdrop-blur-xl px-6"
          >
            <nav aria-label="Navegación móvil" className="flex flex-col gap-2 py-5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className="rounded-lg px-2 py-2.5 text-left text-base font-bold text-[#F5F5F5]/90 hover:bg-white/[0.04] hover:text-[#96E9C6] cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onNavigateToDiagnostic();
                }}
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#6C22A6] px-5 py-3 text-sm font-bold text-[#F5F5F5] cursor-pointer"
              >
                Diagnóstico gratuito →
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
