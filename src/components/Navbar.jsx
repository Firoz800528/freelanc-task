import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Theme state synced with localStorage
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const syncTheme = () => {
      const stored = localStorage.getItem("theme") || "light";
      setTheme(stored);
    };
    window.addEventListener("storage", syncTheme);
    window.addEventListener("themeChange", syncTheme);
    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("themeChange", syncTheme);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  const activeClass = ({ isActive }) =>
    isActive ? "text-yellow-300 font-bold underline" : "hover:underline";

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav
      className={`px-4 py-3 shadow-md sticky top-0 z-50 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-primary text-white"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-center relative">
        <NavLink to="/" className="font-bold text-2xl sm:text-3xl mb-2 md:mb-0">
          Freelance<span className="text-yellow-300">Task</span>
        </NavLink>

        <button
          className="md:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div
          ref={menuRef}
          className={`flex flex-col md:flex-row md:items-center w-full md:w-auto transition-all duration-300 ease-in-out z-50 ${
            menuOpen ? "block" : "hidden md:flex"
          } ${theme === "dark" ? "bg-gray-900" : "bg-primary md:bg-transparent"}`}
        >
          <div
            className={`flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0 ${
              theme === "dark" ? "text-gray-100" : "text-white"
            }`}
          >
            <NavLink to="/" className={activeClass}>
              Home
            </NavLink>
            <NavLink to="/browse-tasks" className={activeClass}>
              All Items
            </NavLink>

            

            {!user ? (
              <>
                <NavLink to="/login" className={activeClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={activeClass}>
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/support" className={activeClass}>
                  Support
                </NavLink>
                <NavLink to="/about" className={activeClass}>
                  About
                </NavLink>

                {/* Dashboard link shown only if logged in */}
            {user && (
              <NavLink to="/dashboard" className={activeClass}>
                Dashboard
              </NavLink>
            )}

                <NavLink to="/my-profile" className="relative group flex items-center space-x-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-yellow-300 cursor-pointer"
                    />
                  ) : (
                    <span className="text-sm hover:underline">{user.displayName || "My Profile"}</span>
                  )}
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="hover:underline cursor-pointer text-left"
                >
                  Log out
                </button>
              </>
            )}

            {/* Theme Toggle Button */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
