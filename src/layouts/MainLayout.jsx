// src/layout/MainLayout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const MainLayout = () => (
  <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    {/* Sticky Navbar */}
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <Fade direction="down" triggerOnce>
        <Navbar />
      </Fade>
    </div>

    {/* Main Content */}
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Fade triggerOnce cascade>
        <Outlet />
      </Fade>
    </main>

    {/* Footer */}
    <Fade direction="up" triggerOnce>
      <Footer />
    </Fade>
  </div>
);

export default MainLayout;
