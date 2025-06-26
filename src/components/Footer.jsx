import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaGithub, FaEnvelope, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // State that will update whenever 'theme' in localStorage changes
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Function to sync theme from localStorage
    const syncTheme = () => {
      const currentTheme = localStorage.getItem("theme") || "light";
      setTheme(currentTheme);
    };

    // Listen to 'storage' event - triggered when localStorage changes in other tabs/windows
    window.addEventListener("storage", syncTheme);

    // Also listen to a custom event to cover same-tab changes (optional)
    window.addEventListener("themeChange", syncTheme);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("themeChange", syncTheme);
    };
  }, []);

  // Optional: if you toggle theme in the same tab, you can dispatch a custom event like this:
  // window.dispatchEvent(new Event('themeChange'));

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  const isActive = (path) => location.pathname === path;

  const linkBase =
    "inline-block px-3 py-1 rounded-md transition-colors duration-200 cursor-pointer hover:underline";

  const linkActive =
    theme === "dark"
      ? "font-bold border-b-2 border-white text-white"
      : "font-bold border-b-2 border-gray-900 text-gray-900";

  const footerBg = theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";

  return (
    <footer className={`${footerBg} pt-10 pb-6 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center sm:text-left">

          {/* Logo/Intro */}
          <div>
            <h3 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Freelance<span className="text-[#FFDF20]">Task</span>
            </h3>
            <p className="text-sm">
              Empowering freelancers and clients to collaborate and succeed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className={`${linkBase} ${isActive("/") ? linkActive : theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse-tasks" className={`${linkBase} ${isActive("/browse-tasks") ? linkActive : theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link to="/add-task" className={`${linkBase} ${isActive("/add-task") ? linkActive : theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Add Task
                </Link>
              </li>
              {!user ? (
                <>
                  <li>
                    <Link to="/login" className={`${linkBase} ${isActive("/login") ? linkActive : theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className={`${linkBase} ${isActive("/register") ? linkActive : theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      SignUp
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={handleLogout} className={linkBase}>
                    Log out
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Contact
            </h4>
            <ul className="space-y-1 text-sm">
              <li>Email: info@freelancetask.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Freelance St, Remote City</li>
            </ul>
            <Link to="/terms" className="text-sm hover:underline font-bold block mt-3">
              Terms & Conditions
            </Link>
          </div>

          {/* Socials */}
          <div>
            <h4 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Follow Us
            </h4>
            <div className="flex justify-center sm:justify-start space-x-5 text-xl">
              <a href="mailto:info@freelancetask.com" className="hover:text-blue-600">
                <FaEnvelope />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={theme === "dark" ? "hover:text-white" : "hover:text-gray-800"}>
                <FaGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <hr className={`my-6 ${borderColor}`} />
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} FreelanceTask Marketplace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
