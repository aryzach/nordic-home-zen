import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Index from "./pages/Index";
import Specs from "./pages/Specs";
import Installs from "./pages/Installs";
import FAQPage from "./pages/FAQPage";
import Deposit from "./pages/Deposit";
import DepositSuccess from "./pages/DepositSuccess";


import HowItStarted from "./pages/HowItStarted";
import History from "./pages/History";
import HeaterInferno from "./pages/HeaterInferno";
import InstallPower from "./pages/InstallPower";
import Policies from "./pages/Policies";
import LearnHub from "./pages/LearnHub";
import Contact from "./pages/Contact";
import ContactPage from "./pages/ContactPage";
import Media from "./pages/Media";
import LearnMore from "./pages/LearnMore";
import ServiceAreas from "./pages/ServiceAreas";
import EmailMoreInfo from "./pages/EmailMoreInfo";
import ThankYou from "./pages/ThankYou";
import ReservationPaymentOrScheduleCall from "./pages/ReservationPaymentOrScheduleCall";

import SaunaPlanningConsultation from "./pages/SaunaPlanningConsultation";
import ElectricalCompatibilityQuiz from "./pages/ElectricalCompatibilityQuiz";
import ElectricalAssessmentSubmitted from "./pages/ElectricalAssessmentSubmitted";
import LeaveReview from "./pages/LeaveReview";
import SevenQuestionsHomeSauna from "./pages/SevenQuestionsHomeSauna";
import NotFound from "./pages/NotFound";
import OldHeroVideo from "./pages/OldHeroVideo";

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
  "/buy-your-anywhere-sauna": { content_name: "Anywhere Sauna", content_category: "Product" },
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
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/specs" element={<Specs />} />
          <Route path="/installs" element={<Installs />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/deposit-success" element={<DepositSuccess />} />
          
          
          <Route path="/how-it-started" element={<HowItStarted />} />
          <Route path="/history" element={<History />} />
          <Route path="/heater-inferno" element={<HeaterInferno />} />
          <Route path="/superhotsuperfast" element={<Navigate to="/heater-inferno" replace />} />
          <Route path="/install-power" element={<InstallPower />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/learn" element={<LearnHub />} />
          <Route path="/reserve-your-sauna" element={<Contact />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/media" element={<Media />} />
          <Route path="/climate-performance" element={<ServiceAreas />} />
          <Route path="/email-more-info" element={<EmailMoreInfo />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/buy-your-anywhere-sauna" element={<ReservationPaymentOrScheduleCall />} />
          <Route path="/reservation-payment-or-schedule-call" element={<Navigate to="/buy-your-anywhere-sauna" replace />} />
          
          <Route path="/sauna-planning-consultation" element={<SaunaPlanningConsultation />} />
          <Route path="/sauna-electrical-fit-consultation" element={<Navigate to="/sauna-planning-consultation" replace />} />
          <Route path="/electric-checklist" element={<Navigate to="/sauna-planning-consultation" replace />} />
          <Route path="/leave-review" element={<LeaveReview />} />
          <Route path="/electrical-compatibility-quiz" element={<ElectricalCompatibilityQuiz />} />
          <Route path="/electrical-assessment-submitted" element={<ElectricalAssessmentSubmitted />} />
          <Route path="/7-questions-before-buying-a-home-sauna" element={<SevenQuestionsHomeSauna />} />
          <Route path="/old-hero-video" element={<OldHeroVideo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
