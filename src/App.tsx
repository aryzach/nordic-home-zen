import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useRef } from "react";
import Index from "./pages/Index";

// Route-level code splitting: every non-homepage route is a separate chunk.
const Specs = lazy(() => import("./pages/Specs"));
const Installs = lazy(() => import("./pages/Installs"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const Deposit = lazy(() => import("./pages/Deposit"));
const DepositSuccess = lazy(() => import("./pages/DepositSuccess"));
const Compare = lazy(() => import("./pages/Compare"));
const Terms = lazy(() => import("./pages/Terms"));
const HowItStarted = lazy(() => import("./pages/HowItStarted"));
const History = lazy(() => import("./pages/History"));

const InstallPower = lazy(() => import("./pages/InstallPower"));
const Policies = lazy(() => import("./pages/Policies"));

const ContactPage = lazy(() => import("./pages/ContactPage"));
const EmailSignedUp = lazy(() => import("./pages/EmailSignedUp"));
const ContactThanks = lazy(() => import("./pages/ContactThanks"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const SaunaPlanningConsultation = lazy(() => import("./pages/SaunaPlanningConsultation"));
const ElectricalCompatibilityQuiz = lazy(() => import("./pages/ElectricalCompatibilityQuiz"));
const SaunaCompatibilityQuiz = lazy(() => import("./pages/SaunaCompatibilityQuiz"));
const ElectricalAssessmentSubmitted = lazy(() => import("./pages/ElectricalAssessmentSubmitted"));
const LeaveReview = lazy(() => import("./pages/LeaveReview"));
const SevenQuestionsHomeSauna = lazy(() => import("./pages/SevenQuestionsHomeSauna"));
const NotFound = lazy(() => import("./pages/NotFound"));
const OldHeroVideo = lazy(() => import("./pages/OldHeroVideo"));

import { trackEvent } from "./lib/analytics";


const queryClient = new QueryClient();

const ROUTE_EVENT_MAP: Record<string, string> = {
  "/sauna-planning-consultation": "view_consultation_page",
  "/electrical-assessment-submitted": "assessment_submitted",
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const VIEW_CONTENT_ROUTES: Record<string, { content_name: string; content_category: string }> = {
  "/deposit": { content_name: "Anywhere Sauna", content_category: "Product" },
  "/electrical-compatibility-quiz": { content_name: "Electrical Compatibility Quiz", content_category: "Quiz" },
  "/sauna-planning-consultation": { content_name: "Sauna Planning Consultation", content_category: "Consultation" },
};

const GAPageView = () => {
  const location = useLocation();
  const firstRun = useRef(true);

  useEffect(() => {
    const path = window.location.pathname + window.location.search;
    // Push a SPA page_view to GTM's dataLayer; configure a GA4 page_view tag in GTM.
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'page_view',
      page_path: path,
      page_location: window.location.href,
      page_title: typeof document !== 'undefined' ? document.title : undefined,
    });
    if (typeof (window as any).fbq === 'function') {
      // PageView already fires on initial load via the base pixel in index.html.
      if (!firstRun.current) (window as any).fbq('track', 'PageView');
      const vc = VIEW_CONTENT_ROUTES[window.location.pathname];
      if (vc) (window as any).fbq('track', 'ViewContent', vc);
    }

    const routeEvent = ROUTE_EVENT_MAP[location.pathname];
    if (routeEvent) {
      // Defer so document.title reflects the new page's <title>.
      setTimeout(() => trackEvent(routeEvent), 0);
    }

    firstRun.current = false;
  }, [location.pathname, location.search]);

  return null;
};

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;

    const delays = [200, 1000, 2000, 3500];
    const timeouts = delays.map((delay) =>
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [location.pathname, location.hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollToHash />
        <GAPageView />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/specs" element={<Specs />} />
            <Route path="/installs" element={<Installs />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/deposit-success" element={<DepositSuccess />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/how-it-started" element={<HowItStarted />} />
            <Route path="/history" element={<History />} />
            <Route path="/install-power" element={<InstallPower />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/reserve-your-sauna" element={<Navigate to="/deposit" replace />} />

            <Route path="/contact" element={<ContactPage />} />
            <Route path="/email-signed-up" element={<EmailSignedUp />} />
            <Route path="/contact-thanks" element={<ContactThanks />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/buy-your-anywhere-sauna" element={<Navigate to="/deposit" replace />} />
            <Route path="/reservation-payment-or-schedule-call" element={<Navigate to="/deposit" replace />} />
            <Route path="/sauna-planning-consultation" element={<SaunaPlanningConsultation />} />
            <Route path="/sauna-electrical-fit-consultation" element={<Navigate to="/sauna-planning-consultation" replace />} />
            <Route path="/electric-checklist" element={<Navigate to="/sauna-planning-consultation" replace />} />
            <Route path="/leave-review" element={<LeaveReview />} />
            <Route path="/electrical-compatibility-quiz" element={<ElectricalCompatibilityQuiz />} />
            <Route path="/sauna-compatibility-quiz" element={<SaunaCompatibilityQuiz />} />
            <Route path="/electrical-assessment-submitted" element={<ElectricalAssessmentSubmitted />} />
            <Route path="/7-questions-before-buying-a-home-sauna" element={<SevenQuestionsHomeSauna />} />
            <Route path="/old-hero-video" element={<OldHeroVideo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
