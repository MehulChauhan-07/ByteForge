import { Fragment } from "react";
import EnhancedHero from "@components/landing/EnhacedHero";
import FeaturesSection from "@components/landing/FeaturesSection";
import LearningPathPreview from "@components/landing/LearningPathPreview";
import CallToAction from "@components/landing/CallToAction";

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
