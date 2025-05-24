import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaGithub, FaEnvelope, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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
    "font-bold border-b-2 border-gray-900 dark:border-white text-gray-900 dark:text-white";

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-10 pb-6 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center sm:text-left">
          
          
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Freelance<span className="text-[#432DD7]">Task</span>
            </h3>
            <p className="text-sm">
              Empowering freelancers and clients to collaborate and succeed.
            </p>
          </div>

         
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className={`${linkBase} ${isActive("/") ? linkActive : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/browse-tasks"
                  className={`${linkBase} ${isActive("/browse-tasks") ? linkActive : ""}`}
                >
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/add-task"
                  className={`${linkBase} ${isActive("/add-task") ? linkActive : ""}`}
                >
                  Add Task
                </Link>
              </li>
              {!user ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      className={`${linkBase} ${isActive("/login") ? linkActive : ""}`}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className={`${linkBase} ${isActive("/register") ? linkActive : ""}`}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className={`${linkBase}`}
                  >
                    Log out
                  </button>
                </li>
              )}
            </ul>
          </div>

          
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <ul className="space-y-1 text-sm">
              <li>Email: info@freelancetask.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Freelance St, Remote City</li>
            </ul>
            <Link to="/terms" className="text-sm hover:underline font-bold block mt-3">
              Terms & Conditions
            </Link>
          </div>

          
          <div>
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <div className="flex justify-center sm:justify-start space-x-5 text-xl">
              <a
                href="mailto:info@freelancetask.com"
                className="hover:text-blue-600"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-800 dark:hover:text-white"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        
        <hr className="my-6 border-gray-300 dark:border-gray-700" />
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} FreelanceTask Marketplace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
