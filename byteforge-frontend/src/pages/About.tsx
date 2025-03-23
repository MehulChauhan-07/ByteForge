import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About ByteForge
          </h1>
          <p className="text-slate-500 md:text-xl dark:text-slate-400">
            {/* Our mission is to make Java programming accessible to everyone */}
            Empowering Beginners to Master Java
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">🚀 Our Mission</h2>
          <p className="text-slate-500 dark:text-slate-400">
            At ByteForge, we believe that learning Java should be accessible,
            engaging, and effective for everyone. Whether you're taking your
            first steps into programming or refining your skills, ByteForge is
            here to guide you every step of the way.
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            Our mission is simple: to make Java programming approachable and fun
            while equipping learners with the skills they need to succeed in the
            real world.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">💡 Why ByteForge?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mt-4">
            ByteForge isn’t just another coding platform—it’s a complete Java
            learning ecosystem. Here’s what sets us apart:
          </p>
          <p className="text-slate-500 dark:text-slate-400">✔ Learn by Doing</p>
          <p className="text-slate-500 dark:text-slate-400">
            We believe the best way to master Java is by writing code. That’s
            why ByteForge emphasizes hands-on learning from day one.
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            Integrated Java Compiler: Write, run, and debug Java code directly
            in your browser.
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            Real-Time Feedback: Get instant results and error explanations to
            improve your skills faster.
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            ✔ Structured Learning Paths Our curriculum is designed to take you
            from absolute beginner to advanced Java developer. Core Java:
            Variables, loops, functions, and OOP principles. Advanced Topics:
            Multithreading, file handling, and collections. Project-Based
            Learning: Build real-world projects to solidify your skills.
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            ✔ AI-Powered Assistance Stuck on a concept or debugging an error?
            Our AI chatbot is here to help. Instant Explanations: Get clear,
            concise answers to your Java questions. Code Suggestions: Learn best
            practices and write cleaner, more efficient code.
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            ✔ Notes Keeper – Save your learning notes and important snippets.
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            ✔ Beginner-Friendly UI – Designed to guide you through each concept
            step by step.
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            ✔ Community Support – Join a vibrant community of learners and
            educators to share knowledge and experiences.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            🌍 Accessible Learning for Everyone
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            We believe education should be accessible to all, what is ByteForge
            offers:
            <p />
            <p className="text-slate-500 dark:text-slate-400">
              🆓 Free Learning Content – We believe in free and open education.
              All our learning content is available without paywalls or hidden
              fees.
            </p>
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            🆓 Free Sign-Up – Save your progress, notes, and code snippets.
            Features like code execution, note-taking, and AI chatbot support
            require a free sign-up to store your data, but the learning
            experience remains accessible to all.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">👨‍💻 Our Team</h2>
          <p className="text-slate-500 dark:text-slate-400">
            ByteForge is built by a dedicated team of software engineers,
            educators, and designers, committed to providing the best Java
            learning experience. Our content is crafted by experienced Java
            professionals and is regularly updated to ensure it reflects the
            latest industry best practices and Java language updates.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            🌟 Join the ByteForge Community!
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            ByteForge isn’t just a platform - it’s your gateway to mastering
            Java. Whether you’re just starting or looking to refine your skills,
            we’re here to help you code with confidence. Start your Java journey
            today and become a part of the ByteForge community! 🚀
          </p>
        </div>

        <div className="flex justify-center pt-8">
          <Button asChild size="lg">
            <Link to="/signup">🔹 Join ByteForge Today</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
// import { Button } from "../components/ui/button";
// import { Link } from "react-router-dom";

// const AboutPage = () => {
//   return (
//     <div className="container py-12 md:py-16 lg:py-20">
//       <div className="mx-auto max-w-3xl space-y-8">
//         <div className="space-y-2 text-center">
//           <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//             About ByteForge
//           </h1>
//           <p className="text-slate-500 md:text-xl dark:text-slate-400">
//             {/* Our mission is to make Java programming accessible to everyone */}
//             Empowering Beginners to Master Java
//           </p>
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-2xl font-bold">🚀 Our Story</h2>
//           <p className="text-slate-500 dark:text-slate-400">
//             ByteForge was created with a single goal: to make Java programming
//             accessible, engaging, and effective for everyone. As passionate
//             software developers and educators, we noticed a gap in existing
//             learning platforms-some were too complex for beginners, while others
//             were too simplistic for advanced learners.
//           </p>
//           <p className="text-slate-500 dark:text-slate-400">
//             To bridge this gap, we designed ByteForge, an interactive learning
//             platform that provides a structured, hands-on approach to Java
//             programming. Whether you’re a beginner or looking to refine your
//             skills, ByteForge offers step-by-step learning paths, real-time code
//             execution, and an AI-powered assistant to help you every step of the
//             way.
//           </p>
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-2xl font-bold">
//             💡 Our Approach: Learn by Doing
//           </h2>
//           <p className="text-slate-500 dark:text-slate-400">
//             At ByteForge, we believe the best way to learn Java is by writing
//             code. That’s why our platform emphasizes practical coding exercises
//             from the very first lesson.
//           </p>
//           <p className="text-slate-500 dark:text-slate-400">
//             ✔ Integrated Java Compiler – Write and run Java code directly in
//             your browser.
//           </p>
//           <p className="text-slate-500 dark:text-slate-400">
//             ✔ AI Chatbot Assistance – Get real-time help and explanations on
//             Java concepts.
//           </p>
//           <p className="text-slate-500 dark:text-slate-400">
//             ✔ Notes Keeper – Save your learning notes and important snippets.
//           </p>
//           <p className="text-slate-500 dark:text-slate-400">
//             ✔ Beginner-Friendly UI – Designed to guide you through each concept
//             step by step.
//           </p>
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-2xl font-bold">
//             🌍 Accessible Learning for Everyone
//           </h2>
//           <p className="text-slate-500 dark:text-slate-400">
//             We believe in free and open education. All our learning content is
//             available without paywalls or hidden fees. Features like code
//             execution, note-taking, and AI chatbot support require a free
//             sign-up to store your data, but the learning experience remains
//             accessible to all.
//           </p>
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-2xl font-bold">👨‍💻 Our Team</h2>
//           <p className="text-slate-500 dark:text-slate-400">
//             ByteForge is built by a dedicated team of software engineers,
//             educators, and designers, committed to providing the best Java
//             learning experience. Our content is crafted by experienced Java
//             professionals and is regularly updated to ensure it reflects the
//             latest industry best practices and Java language updates.
//           </p>
//         </div>

//         <div className="flex justify-center pt-8">
//           <Button asChild size="lg">
//             <Link to="/signup">🔹 Join ByteForge Today</Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutPage;
