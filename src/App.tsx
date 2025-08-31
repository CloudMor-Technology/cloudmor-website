
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Industries from "./pages/Industries";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Sitemap from "./pages/Sitemap";
import WebDesignLanding from "./pages/WebDesignLanding";
import Colores from "./pages/Colores";
import BusinessCards from "./pages/BusinessCards";
import AliRahimi from "./pages/AliRahimi";
import Portal from "./pages/Portal";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";

// Support Pages
import SpeedTest from "./pages/support/SpeedTest";

// Service Pages
import ManagedIT from "./pages/services/ManagedIT";
import Cybersecurity from "./pages/services/Cybersecurity";
import CloudServices from "./pages/services/CloudServices";
import ProfessionalServices from "./pages/services/ProfessionalServices";
import ITStrategy from "./pages/services/ITStrategy";
import BusinessComms from "./pages/services/BusinessComms";
import FaceIDAuth from "./pages/services/FaceIDAuth";
import WebDevAutomation from "./pages/services/WebDevAutomation";
import WebDesignDevelopment from "./pages/services/WebDesignDevelopment";

const BaleenSpecialty = lazy(() => import("./pages/case-studies/BaleenSpecialty"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth" element={<Portal />} />
            <Route path="/web-design" element={<WebDesignLanding />} />
            <Route path="/colores" element={<Colores />} />
            <Route path="/bc" element={<BusinessCards />} />
            <Route path="/alirahimi" element={<AliRahimi />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/managed-it" element={<ManagedIT />} />
            <Route path="/services/cybersecurity" element={<Cybersecurity />} />
            <Route path="/services/cloud" element={<CloudServices />} />
            <Route path="/services/professional" element={<ProfessionalServices />} />
            <Route path="/services/it-strategy" element={<ITStrategy />} />
            <Route path="/services/business-comms" element={<BusinessComms />} />
            <Route path="/services/face-id-auth" element={<FaceIDAuth />} />
            <Route path="/services/web-dev-automation" element={<WebDevAutomation />} />
            <Route path="/services/web-design-development" element={<WebDesignDevelopment />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:industrySlug" element={<Industries />} />
            <Route path="/insights/case-studies" element={<CaseStudies />} />
            <Route path="/insights/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/case-studies/baleen-specialty" element={<BaleenSpecialty />} />
            <Route path="/support/speed-test" element={<SpeedTest />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
