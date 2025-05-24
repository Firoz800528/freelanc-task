import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const MainLayout = () => (
  <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    
    <Fade direction="down" triggerOnce>
      <Navbar />
    </Fade>

    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Fade triggerOnce cascade>
        <Outlet />
      </Fade>
    </main>

    <Fade direction="up" triggerOnce>
      <Footer />
    </Fade>
  </div>
);

export default MainLayout;
