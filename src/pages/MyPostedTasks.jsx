import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { Fade } from "react-awesome-reveal";

const MyPostedTasks = () => {
  const { user } = useContext(AuthContext);
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (!user) return;

    const fetchMyTasks = async () => {
      setLoading(true);
      try {
        const token = await user.getIdToken();

        const res = await fetch("https://server-4f8p.vercel.app/my-tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        setMyTasks(data);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchMyTasks();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = await user.getIdToken();

      const res = await fetch(`https://server-4f8p.vercel.app/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Task deleted");

        const refreshed = await fetch("https://server-4f8p.vercel.app/my-tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const refreshedData = await refreshed.json();
        setMyTasks(refreshedData);
      } else {
        toast.error(data.error || "Failed to delete task");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 py-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <Fade triggerOnce>
        <h1
          className={`text-3xl sm:text-4xl font-bold mb-6 text-center ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          My Posted Tasks
        </h1>
      </Fade>

      <Fade cascade damping={0.1} triggerOnce>
        {myTasks.length === 0 ? (
          <p className={theme === "dark" ? "text-gray-300 text-center" : "text-gray-600 text-center"}>
            You have not posted any tasks yet.
          </p>
        ) : (
          <div className="overflow-auto rounded-lg shadow-sm">
            <table
              className={`table table-zebra w-full text-sm sm:text-base transition-colors duration-300 ${
                theme === "dark" ? "table-zebra-dark" : ""
              }`}
            >
              <thead
                className={`${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Deadline</th>
                  <th>Budget</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myTasks.map((task, index) => (
                  <tr
                    key={task._id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      theme === "dark" ? "text-gray-200" : ""
                    }`}
                  >
                    <td>{index + 1}</td>
                    <td className="whitespace-nowrap">{task.title}</td>
                    <td>{new Date(task.deadline).toLocaleDateString()}</td>
                    <td>${task.budget}</td>
                    <td>{task.category}</td>
                    <td className="flex flex-wrap gap-2 mt-1 sm:mt-0">
                      <Link to={`/update-task/${task._id}`} className="btn btn-sm btn-outline">
                        Update
                      </Link>
                      <button onClick={() => handleDelete(task._id)} className="btn btn-sm btn-error">
                        Delete
                      </button>
                      <Link to={`/task-bids/${task._id}`} className="btn btn-sm btn-accent">
                        Bids
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Fade>
    </div>
  );
};

export default MyPostedTasks;
