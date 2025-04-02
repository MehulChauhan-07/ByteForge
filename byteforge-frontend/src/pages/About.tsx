// About.tsx by Me
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedRoute } from "@/components/common/motion-layout";

const AboutPage = () => {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <AnimatedRoute
            animationType="scale"
            element={
              <>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About ByteForge
                </h1>

                <p className="text-slate-500 md:text-xl dark:text-slate-400">
                  Empowering Beginners to Master Java
                </p>
              </>
            }
          />
        </div>

        <AnimatedRoute
          animationType="slide"
          element={
            <>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">🚀 Our Mission</h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  At ByteForge, we believe that learning Java should be
                  accessible, engaging, and effective for everyone. Whether
                  you're taking your first steps into programming or refining
                  your skills, ByteForge is here to guide you every step of the
                  way.
                </p>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Our mission is simple: to make Java programming approachable
                  and fun while equipping learners with the skills they need to
                  succeed in the real world.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">💡 Why ByteForge?</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg mt-4 leading-relaxed">
                  ByteForge isn’t just another coding platform—it’s a complete
                  Java learning ecosystem. Here’s what sets us apart:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li className="text-slate-500 dark:text-slate-400  list-none">
                    <strong>✔ Learn by Doing:</strong> We believe the best way
                    to master Java is by writing code. That’s why ByteForge
                    emphasizes hands-on learning from day one.
                  </li>
                  <li className="text-slate-500 dark:text-slate-400  list-none">
                    <strong>✔ Integrated Java Compiler:</strong> Write, run, and
                    debug Java code directly in your browser.
                  </li>
                  <li className="text-slate-500 dark:text-slate-400  list-none">
                    <strong>✔ Real-Time Feedback:</strong> Get instant results
                    and error explanations to improve your skills faster.
                  </li>
                  <li className="text-slate-500 dark:text-slate-400  list-none">
                    <strong>✔ Structured Learning Paths:</strong> Our curriculum
                    is designed to take you from an absolute beginner to an
                    advanced Java developer. Core Java: Variables, loops,
                    functions, and OOP principles. Advanced Topics:
                    Multithreading, file handling, and collections.
                    Project-Based Learning: Build real-world projects to
                    solidify your skills.
                  </li>
                  <li className="text-slate-500 dark:text-slate-400  list-none">
                    <strong>✔ AI-Powered Assistance:</strong> Stuck on a concept
                    or debugging an error? Our AI chatbot is here to help.
                    Instant Explanations: Get clear, concise answers to your
                    Java questions. Code Suggestions: Learn best practices and
                    write cleaner, more efficient code.
                  </li>
                  <li className="text-slate-500 dark:text-slate-400  list-none">
                    <strong>✔ Notes Keeper:</strong> Save your learning notes
                    and important snippets.
                  </li>
                  <li className="text-slate-500 dark:text-slate-400  list-none">
                    <strong>✔ Beginner-Friendly UI:</strong> Designed to guide
                    you through each concept step by step.
                  </li>
                  <li className="text-slate-500 dark:text-slate-400  list-none">
                    <strong>✔ Community Support:</strong> Join a vibrant
                    community of learners and educators to share knowledge and
                    experiences.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  🌍 Accessible Learning for Everyone
                </h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  We believe education should be accessible to all. ByteForge
                  offers:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li className="text-slate-500 dark:text-slate-400   list-none">
                    🆓 <strong>Free Learning Content:</strong> We believe in
                    free and open education. All our learning content is
                    available without paywalls or hidden fees.
                  </li>
                  <li className="text-slate-500 dark:text-slate-400   list-none">
                    🆓 <strong>Free Sign-Up:</strong> Save your progress, notes,
                    and code snippets. Features like code execution,
                    note-taking, and AI chatbot support require a free sign-up
                    to store your data, but the learning experience remains
                    accessible to all.
                  </li>
                  <li className="text-slate-500 dark:text-slate-400   list-none">
                    🆓 <strong>Community Resources:</strong> Access forums,
                    tutorials, and additional materials to enhance your learning
                    experience.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">👨‍💻 Our Team</h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  ByteForge is built by a dedicated team of software engineers,
                  educators, and designers, committed to providing the best Java
                  learning experience. Our content is crafted by experienced
                  Java professionals and is regularly updated to ensure it
                  reflects the latest industry best practices and Java language
                  updates.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  🌟 Join the ByteForge Community!
                </h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  ByteForge isn’t just a platform - it’s your gateway to
                  mastering Java. Whether you’re just starting or looking to
                  refine your skills, we’re here to help you code with
                  confidence. Start your Java journey today and become a part of
                  the ByteForge community! 🚀
                </p>
              </div>
            </>
          }
        />

        <AnimatedRoute
          animationType="flip"
          element={
            <>
              <div className="flex justify-center pt-8">
                <Button asChild size="lg">
                  <Link to="/signup">🔹 Join ByteForge Today</Link>
                </Button>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default AboutPage;
