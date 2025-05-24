import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaGithub, FaEnvelope } from "react-icons/fa";

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
    "inline-block mx-1 px-3 py-1 rounded-md transition-colors duration-200 cursor-pointer hover:underline";

  const linkActive =
    "font-bold border-b-2 border-gray-900 dark:border-white text-gray-900 dark:text-white";

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
   
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              FreelanceTask
            </h3>
            <p className="text-sm">
              Empowering freelancers and clients to collaborate and succeed.
            </p>
          </div>

     
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
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
                  to="/tasks"
                  className={`${linkBase} ${isActive("/tasks") ? linkActive : ""}`}
                >
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/add-task"
                  className={`${linkBase} ${isActive("/add-task") ? linkActive : ""}`}
                >
                  Post a Task
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
                    className={`${linkBase} text-left w-full`}
                  >
                    Log out
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Connect</h4>
            <div className="flex justify-center md:justify-start space-x-4 text-xl">
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
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300 dark:border-gray-700" />

        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} FreelanceTask Marketplace. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
