import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import PreloaderMD from './components/PreloaderMD';
import Navbar, { PageRoute } from './components/Navbar';
import HeroSection from './components/HeroSection';
import { NeedOptionId } from './data/landingData';

const ProblemSection = lazy(() => import('./components/ProblemSection'));
const MetricsSection = lazy(() => import('./components/MetricsSection'));
const EcosystemSection = lazy(() => import('./components/EcosystemSection'));
const ProcessSection = lazy(() => import('./components/ProcessSection'));
const CasesSection = lazy(() => import('./components/CasesSection'));
const PlansSection = lazy(() => import('./components/PlansSection'));
const FaqSection = lazy(() => import('./components/FaqSection'));
const WebsPage = lazy(() => import('./pages/WebsPage'));
const SocialMediaPage = lazy(() => import('./pages/SocialMediaPage'));
const DiagnosticFormSection = lazy(() => import('./components/DiagnosticFormSection'));
const Footer = lazy(() => import('./components/Footer'));

function SectionFallback() {
  return <div className="h-48 w-full bg-[#252525]" aria-hidden="true" />;
}

function getInitialRouteFromHash(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash;
  if (hash === '#/webs') return 'webs';
  if (hash === '#/social-media') return 'social-media';
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialRouteFromHash);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [preselectedNeed, setPreselectedNeed] = useState<NeedOptionId | null>(null);
  const [activeModalKey, setActiveModalKey] = useState<string | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/webs') {
        setCurrentPage('webs');
      } else if (hash === '#/social-media') {
        setCurrentPage('social-media');
      } else if (hash === '' || hash === '#/' || hash === '#inicio') {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const scrollToDiagnostic = useCallback((need?: NeedOptionId) => {
    if (need) {
      setPreselectedNeed(need);
    }
    const el = document.getElementById('diagnostico');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const firstInput = document.getElementById('wizard-nombre');
      if (firstInput) {
        window.setTimeout(() => firstInput.focus({ preventScroll: true }), 450);
      }
    }
  }, []);

  const handleNavigatePage = useCallback(
    (page: PageRoute, sectionId?: string) => {
      setCurrentPage(page);

      if (page === 'webs') {
        window.history.replaceState(null, '', '#/webs');
      } else if (page === 'social-media') {
        window.history.replaceState(null, '', '#/social-media');
      } else {
        window.history.replaceState(null, '', '#/');
      }

      if (sectionId) {
        window.setTimeout(() => {
          const target = document.getElementById(sectionId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    []
  );

  const handleSelectPlan = useCallback(
    (planName: string, needId: NeedOptionId) => {
      setSelectedPlan(planName);
      scrollToDiagnostic(needId);
    },
    [scrollToDiagnostic]
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#252525] text-[#F5F5F5]">
        <PreloaderMD />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[#6C22A6] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#F5F5F5]"
        >
          Saltar al contenido principal
        </a>

        <Navbar
          currentPage={currentPage}
          onNavigatePage={handleNavigatePage}
          onNavigateToDiagnostic={() => scrollToDiagnostic()}
        />

        <main id="main-content">
          {currentPage === 'home' && (
            <>
              <HeroSection onPrimaryCta={() => scrollToDiagnostic()} />

              <Suspense fallback={<SectionFallback />}>
                <ProblemSection />
              </Suspense>

              <Suspense fallback={<SectionFallback />}>
                <MetricsSection />
              </Suspense>

              <Suspense fallback={<SectionFallback />}>
                <EcosystemSection onCtaClick={() => scrollToDiagnostic('web')} />
              </Suspense>

              <Suspense fallback={<SectionFallback />}>
                <ProcessSection />
              </Suspense>

              <Suspense fallback={<SectionFallback />}>
                <CasesSection />
              </Suspense>

              <Suspense fallback={<SectionFallback />}>
                <PlansSection onSelectPlan={handleSelectPlan} />
              </Suspense>

              <Suspense fallback={<SectionFallback />}>
                <FaqSection />
              </Suspense>
            </>
          )}

          {currentPage === 'webs' && (
            <Suspense fallback={<SectionFallback />}>
              <WebsPage onRequestWebDiagnostic={() => scrollToDiagnostic('web')} />
            </Suspense>
          )}

          {currentPage === 'social-media' && (
            <Suspense fallback={<SectionFallback />}>
              <SocialMediaPage onRequestSocialDiagnostic={() => scrollToDiagnostic('social')} />
            </Suspense>
          )}

          <Suspense fallback={<SectionFallback />}>
            <DiagnosticFormSection
              selectedPlan={selectedPlan}
              preselectedNeed={preselectedNeed}
              onClearPlan={() => setSelectedPlan(null)}
              onOpenPrivacyModal={() => setActiveModalKey('privacidad')}
            />
          </Suspense>
        </main>

        <Suspense fallback={<SectionFallback />}>
          <Footer
            activeModalKey={activeModalKey}
            onOpenModal={(key) => setActiveModalKey(key)}
            onCloseModal={() => setActiveModalKey(null)}
            onNavigatePage={handleNavigatePage}
          />
        </Suspense>
      </div>
    </MotionConfig>
  );
}
