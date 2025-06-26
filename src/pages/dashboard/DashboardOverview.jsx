import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const [totalTasks, setTotalTasks] = useState(0);
  const [myTasksCount, setMyTasksCount] = useState(0);

  // Fetch total tasks and my tasks count
  useEffect(() => {
    // Fetch total tasks count
    fetch("https://server-4f8p.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => setTotalTasks(data.length))
      .catch(() => setTotalTasks(0));

    if (user) {
      // Fetch my tasks count
      fetch("https://server-4f8p.vercel.app/my-tasks", {
        headers: {
          Authorization: `Bearer ${user.accessToken || ""}`, // Assuming token is here, or replace accordingly
        },
      })
        .then((res) => res.json())
        .then((data) => setMyTasksCount(data.length))
        .catch(() => setMyTasksCount(0));
    }
  }, [user]);

  useEffect(() => {
    const syncTheme = () => setTheme(localStorage.getItem("theme") || "light");
    window.addEventListener("storage", syncTheme);
    window.addEventListener("themeChange", syncTheme);
    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("themeChange", syncTheme);
    };
  }, []);

  const cardClasses =
    "p-6 rounded-lg shadow-md flex flex-col justify-center items-center text-center";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div
        className={`${cardClasses} ${
          theme === "dark" ? "bg-gray-800 text-yellow-300" : "bg-yellow-100 text-yellow-800"
        }`}
      >
        <p className="text-5xl font-extrabold">{totalTasks}</p>
        <p className="mt-2 text-lg font-semibold">Total Tasks</p>
      </div>

      <div
        className={`${cardClasses} ${
          theme === "dark" ? "bg-blue-800 text-blue-300" : "bg-blue-100 text-blue-800"
        }`}
      >
        <p className="text-5xl font-extrabold">{myTasksCount}</p>
        <p className="mt-2 text-lg font-semibold">My Tasks</p>
      </div>

      <div
        className={`${cardClasses} ${
          theme === "dark" ? "bg-green-800 text-green-300" : "bg-green-100 text-green-800"
        }`}
      >
        <p className="text-5xl font-extrabold">{user?.displayName}</p>
        <p className="mt-2 text-lg font-semibold">Logged-in User</p>
      </div>
    </div>
  );
};

export default DashboardOverview;
