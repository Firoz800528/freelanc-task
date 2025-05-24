import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

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
    isActive ? "text-white font-bold underline" : "hover:underline";

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
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-col justify-between items-center relative">
        <NavLink to="/" className="font-bold text-2xl sm:text-3xl">
          Freelance<span className="text-[#432DD7]">Task</span>
        </NavLink>

        <button
          className="md:hidden text-2xl mt-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div
          ref={menuRef}
          className={`flex flex-col md:flex-col md:items-center  md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-all duration-300 ease-in-out z-50 ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
            <NavLink to="/" className={activeClass}>Home</NavLink>
            <NavLink to="/browse-tasks" className={activeClass}>Browse Tasks</NavLink>

            {user && (
              <>
                <NavLink to="/add-task" className={activeClass}>Add Task</NavLink>
                <NavLink to="/my-posted-tasks" className={activeClass}>My Posted Tasks</NavLink>
              </>
            )}

            {!user ? (
              <>
                <NavLink to="/login" className={activeClass}>Login</NavLink>
                <NavLink to="/register" className={activeClass}>Signup</NavLink>
              </>
            ) : (
              <>
                {user.photoURL ? (
                  <NavLink to="/my-profile" className="relative group">
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                    />
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-white text-black px-3 py-1 text-sm rounded shadow-lg">
                      {user.displayName || "My Profile"}
                    </div>
                  </NavLink>
                ) : (
                  <NavLink to="/my-profile" className="text-sm hover:underline">
                    {user.displayName || "My Profile"}
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="hover:underline text-left"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
