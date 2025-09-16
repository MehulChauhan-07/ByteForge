import { Fragment } from "react";
import EnhancedHero from "@/components/landing/default/EnhacedHero";
import FeaturesSection from "@/components/landing/default/FeaturesSection";
import LearningPathPreview from "@/components/landing/default/LearningPathPreview";
import CallToAction from "@/components/landing/default/CallToAction";

const EnhancedHome = () => {
  return (
    <Fragment>
      <EnhancedHero />
      <FeaturesSection />
      <LearningPathPreview />
      <CallToAction />
    </Fragment>
  );
};

export default EnhancedHome;
