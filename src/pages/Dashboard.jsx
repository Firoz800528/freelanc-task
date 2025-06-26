import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // Sync theme on mount
  useEffect(() => {
    const syncTheme = () => setTheme(localStorage.getItem("theme") || "light");
    window.addEventListener("storage", syncTheme);
    window.addEventListener("themeChange", syncTheme);
    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("themeChange", syncTheme);
    };
  }, []);

  const activeClass = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
      : "hover:text-yellow-400";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Welcome back, <span className="font-semibold">{user?.displayName}</span>!
          </p>
        </header>

        {/* Responsive Navigation Tabs */}
       <nav
  className="flex flex-wrap sm:flex-nowrap overflow-x-auto no-scrollbar gap-3 sm:gap-6 border-b border-gray-300 dark:border-gray-700 mb-6 pb-2 sm:pb-0"
>
  <NavLink to="/dashboard" end className={activeClass}>
    Overview
  </NavLink>
  <NavLink to="/dashboard/my-profile" className={activeClass}>
    My Profile
  </NavLink>
  <NavLink to="/dashboard/add-item" className={activeClass}>
    Add Task
  </NavLink>
  <NavLink to="/dashboard/my-items" className={activeClass}>
    My Posted Tasks
  </NavLink>
</nav>


        {/* Outlet for nested routes */}
        <div className="pt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
