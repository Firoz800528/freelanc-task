import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const MainLayout = () => (
  <div className="flex flex-col min-h-screen">

    <Fade direction="down" triggerOnce>
      <Navbar />
    </Fade>

    
    <main className="flex-grow container mx-auto px-4 py-6">
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
