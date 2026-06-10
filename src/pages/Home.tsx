import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import WorkflowSection from "@/components/home/WorkflowSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import DashboardPreviewSection from "@/components/home/DashboardPreviewSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import CTABannerSection from "@/components/home/CTABannerSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <BenefitsSection />
      <DashboardPreviewSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTABannerSection />
    </main>
  );
}
