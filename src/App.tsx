import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";

import HowItStarted from "./pages/HowItStarted";
import History from "./pages/History";
import SuperHotSuperFast from "./pages/SuperHotSuperFast";
import InstallPower from "./pages/InstallPower";
import Policies from "./pages/Policies";
import LearnHub from "./pages/LearnHub";
import Contact from "./pages/Contact";
import ContactPage from "./pages/ContactPage";
import Media from "./pages/Media";
import LearnMore from "./pages/LearnMore";
import InHomeSaunaSF from "./pages/InHomeSaunaSF";
import FinnishSaunaSF from "./pages/FinnishSaunaSF";
import SaunaRentalSanFrancisco from "./pages/SaunaRentalSanFrancisco";
import SaunaRentalOakland from "./pages/SaunaRentalOakland";
import SaunaRentalBerkeley from "./pages/SaunaRentalBerkeley";
import SaunaRentalMarin from "./pages/SaunaRentalMarin";
import SaunaRentalPaloAlto from "./pages/SaunaRentalPaloAlto";
import SaunaRentalMountainView from "./pages/SaunaRentalMountainView";
import ServiceAreas from "./pages/ServiceAreas";
import SouthEndRowingClub from "./pages/SouthEndRowingClub";
import FitnessSFFillmore from "./pages/FitnessSFFillmore";
import EmailMoreInfo from "./pages/EmailMoreInfo";
import ThankYou from "./pages/ThankYou";
import ReservationPaymentOrScheduleCall from "./pages/ReservationPaymentOrScheduleCall";
import IndoorInfraredLanding from "./pages/IndoorInfraredLanding";
import PrefabSaunaInstallationForm from "./pages/PrefabSaunaInstallationForm";
import ElectricChecklist from "./pages/ElectricChecklist";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const GAPageView = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('config', 'G-K2RGWZH97X', {
        page_path: window.location.pathname + window.location.search
      });
    }
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
          <Route path="/pricing" element={<Pricing />} />
          
          <Route path="/how-it-started" element={<HowItStarted />} />
          <Route path="/history" element={<History />} />
          <Route path="/superhotsuperfast" element={<SuperHotSuperFast />} />
          <Route path="/install-power" element={<InstallPower />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/learn" element={<LearnHub />} />
          <Route path="/reserve-your-sauna" element={<Contact />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/media" element={<Media />} />
          <Route path="/in-home-sauna-san-francisco" element={<InHomeSaunaSF />} />
          <Route path="/finnish-sauna-san-francisco" element={<FinnishSaunaSF />} />
          <Route path="/sauna-rental-san-francisco" element={<SaunaRentalSanFrancisco />} />
          <Route path="/sauna-rental-oakland" element={<SaunaRentalOakland />} />
          <Route path="/sauna-rental-berkeley" element={<SaunaRentalBerkeley />} />
          <Route path="/sauna-rental-marin" element={<SaunaRentalMarin />} />
          <Route path="/sauna-rental-palo-alto" element={<SaunaRentalPaloAlto />} />
          <Route path="/sauna-rental-mountain-view" element={<SaunaRentalMountainView />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/sauna-review/south-end-rowing-club" element={<SouthEndRowingClub />} />
          <Route path="/sauna-review/fitness-sf-fillmore" element={<FitnessSFFillmore />} />
          <Route path="/email-more-info" element={<EmailMoreInfo />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/buy-your-anywhere-sauna" element={<ReservationPaymentOrScheduleCall />} />
          <Route path="/reservation-payment-or-schedule-call" element={<Navigate to="/buy-your-anywhere-sauna" replace />} />
          <Route path="/indoor-infrared-sauna-rental" element={<IndoorInfraredLanding />} />
          <Route path="/pre-fab-sauna-installation-form" element={<PrefabSaunaInstallationForm />} />
          <Route path="/electric-checklist" element={<ElectricChecklist />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
