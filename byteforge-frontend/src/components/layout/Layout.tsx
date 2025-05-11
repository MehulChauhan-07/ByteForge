import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";
// import Navbar from "@components/temp/Navbar";
import Footer from "./Footer";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import ModernFooter from "./Enhanced/ModernFooter";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    // <AnimatedRoute
    //   animationType="flip"
    //   element={
    <>
      {/* Add any additional components or elements here */}
      <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0}}
            className="flex min-h-screen flex-col"
          >
            <Navbar />
            <main className="flex-1">
              <Outlet /> {children}
            </main>
            <ModernFooter />
            {/* <Footer /> */}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
    // }
    // />
  );
};

export default Layout;
