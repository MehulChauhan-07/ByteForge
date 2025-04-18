import { ReactNode } from "react";
import ModernNavbar from "./ModernNavabr";
import ModernFooter from "./ModernFooter";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <ModernNavbar />
      <main className="flex-grow pt-16 md:pt-20">{children}</main>
      <ModernFooter />
    </div>
  );
};

export default MainLayout;
