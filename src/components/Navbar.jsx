import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
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
    isActive
      ? "hover:underline font-bold border-b-2 border-white"
      : "hover:underline";

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <NavLink to="/" className="font-bold text-3xl">
        Freelance<span className="text-[#432DD7]">Task</span> 
      </NavLink>

      <div className="flex items-center space-x-4">
        <NavLink to="/" className={activeClass}>
          Home
        </NavLink>
        <NavLink to="/browse-tasks" className={activeClass}>
          Browse Tasks
        </NavLink>

        {user && (
          <>
            <NavLink to="/add-task" className={activeClass}>
              Add Task
            </NavLink>
            <NavLink to="/my-posted-tasks" className={activeClass}>
              My Posted Tasks
            </NavLink>
          </>
        )}

        {!user ? (
          <>
            <NavLink to="/login" className={activeClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={activeClass}>
              Signup
            </NavLink>
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
                <div className="absolute bottom-full -mb-20 hidden group-hover:block bg-white text-black px-2 py-1 text-sm rounded shadow-lg">
                  {user.displayName || "My Profile"}
                </div>
              </NavLink>
            ) : (
              <NavLink
                to="/my-profile"
                className="text-sm hover:underline"
              >
                {user.displayName || "My Profile"}
              </NavLink>
            )}
            <button onClick={handleLogout} className="hover:underline">
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
