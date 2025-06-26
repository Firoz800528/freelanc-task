import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import LoadingSpinner from "../components/LoadingSpinner";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    fetch("https://server-4f8p.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
        setLoading(false);
      });
  }, []);

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

  if (loading) return <LoadingSpinner />;

  // Filter + Sort Logic
  const filteredTasks = tasks
    .filter((task) =>
      filterCategory === "all" ? true : task.category === filterCategory
    )
    .sort((a, b) => {
      const aValue = a.title.toLowerCase();
      const bValue = b.title.toLowerCase();
      if (sortOrder === "asc") return aValue.localeCompare(bValue);
      else return bValue.localeCompare(aValue);
    });

  // Get unique categories for filter dropdown
  const uniqueCategories = [...new Set(tasks.map((task) => task.category))];

  return (
    <div
      className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <Fade triggerOnce>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Browse Tasks</h2>
          <div className="flex flex-wrap gap-3">
            {/* Filter Dropdown */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border rounded px-3 py-1 bg-inherit"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded px-3 py-1 bg-inherit"
            >
              <option value="asc">Sort: A → Z</option>
              <option value="desc">Sort: Z → A</option>
            </select>
          </div>
        </div>
      </Fade>

      {filteredTasks.length === 0 ? (
        <div
          className={`text-center mt-10 text-xl sm:text-2xl ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          🚫 No tasks match the selected filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <Fade key={task._id} triggerOnce>
              <div
                className={`border p-5 rounded-xl shadow-md flex flex-col justify-between h-full transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                  <p className="text-sm mb-1">
                    <strong>Category:</strong> {task.category}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Deadline:</strong>{" "}
                    {new Date(task.deadline).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <strong>Budget:</strong> ${task.budget}
                  </p>
                </div>

                <Link
                  to={`/tasks/${task._id}`}
                  className="btn btn-sm btn-primary mt-4 self-start"
                >
                  See Details
                </Link>
              </div>
            </Fade>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseTasks;
