import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/features/ScrollToTop";
import { useScrollTop } from "@/hooks/useScrollTop";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import FAQ from "@/pages/FAQ";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import Courses from "@/pages/Courses";
import Certifications from "@/pages/Certifications";
import ITServices from "@/pages/ITServices";
import CareerHub from "@/pages/CareerHub";
import HelpCenter from "@/pages/HelpCenter";
import ServiceRequests from "@/pages/ServiceRequests";
import NotFound from "@/pages/NotFound";

function AppContent() {
  useScrollTop();
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
            border: "1px solid hsl(var(--border))",
            fontSize: "13px",
          },
        }}
        richColors
      />
      <Routes>
        {/* Standalone pages — no Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Profile & Settings redirect to dashboard with tab param */}
        <Route path="/profile" element={<Navigate to="/dashboard?tab=profile" replace />} />
        <Route path="/settings" element={<Navigate to="/dashboard?tab=settings" replace />} />

        {/* Main layout pages */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/services" element={<ITServices />} />
                <Route path="/career" element={<CareerHub />} />
                <Route path="/career-hub" element={<CareerHub />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/service-requests" element={<ServiceRequests />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
