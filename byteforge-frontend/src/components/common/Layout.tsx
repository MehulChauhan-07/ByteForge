import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import Navbar from "@components/temp/Navbar";
import Footer from "./Footer";
import { AnimatedRoute } from "./motion-layout";

const Layout = () => {
  return (
    // <AnimatedRoute
    //   animationType="flip"
    //   element={
    <>
      {/* Add any additional components or elements here */}
      <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
        {/* <AnimatedRoute animationType="scale" element={<Navbar />} /> */}
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
    // }
    // />
  );
};

export default Layout;
