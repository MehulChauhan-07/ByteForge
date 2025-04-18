import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Java Programming Journey?
          </h2>

          <p className="text-lg md:text-xl mb-8 text-white/90">
            Join thousands of learners who have mastered Java programming with
            ByteForge. Start your learning journey today and build the skills
            for tomorrow's opportunities.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-slate-100"
              onClick={() => navigate("/signup")}
            >
              Create Free Account
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate("/topics")}
            >
              Explore Topics
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/75">
            No credit card required. Start learning immediately.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
