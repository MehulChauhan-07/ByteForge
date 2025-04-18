import { Fragment } from "react";
import ModernHeroSection from "@/components/landing/modern-enhanced/ModernEnhancedHero";
import ModernFeaturesSection from "@/components/landing/modern-enhanced/ModernFeaturesSection";
import ModernLearningPathPreview from "@/components/landing/modern-enhanced/ModernLearningPathPreview";
import ModernTestimonialSection from "@/components/landing/modern-enhanced/ModernTestimonialSection";
import ModernCallToAction from "@/components/landing/modern-enhanced/ModernCallToAction";
import MainLayout from "@/components/layout/Enhanced/MainLayout";
// import Footer from "@/components/layout/Footer"; // Assuming you have this component

const HomePage = () => {
  return (
    <Fragment>
      <ModernHeroSection />
      <ModernFeaturesSection />
      <ModernLearningPathPreview />
      {/* <ModernTestimonialSection /> */}
      <ModernCallToAction />
      {/* <Footer /> */}
      </Fragment>
  );
};

export default HomePage;
