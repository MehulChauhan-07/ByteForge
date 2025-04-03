import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";
// import Navbar from "@components/temp/Navbar";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const Layout = () => {
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="flex min-h-screen flex-col"
          >
            {/* <AnimatedRoute animationType="scale" element={<Navbar />} /> */}
            <Navbar />
            <motion.main
              className="flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.main>
            <Footer />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
    // }
    // />
  );
};

export default Layout;
