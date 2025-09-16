import { Fragment } from "react";
import ModernHeroSection from "@/components/landing/v2/ModernEnhancedHero";
import ModernFeaturesSection from "@/components/landing/v2/ModernFeaturesSection";
import ModernLearningPathPreview from "@/components/landing/v2/ModernLearningPathPreview";
import ModernTestimonialSection from "@/components/landing/v2/ModernTestimonialSection";
import ModernCallToAction from "@/components/landing/v2/ModernCallToAction";
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
