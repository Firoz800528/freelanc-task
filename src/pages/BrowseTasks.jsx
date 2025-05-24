import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import LoadingSpinner from "../components/LoadingSpinner";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    fetch("https://server-psi-khaki.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Fade triggerOnce>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <h2 className="text-2xl sm:text-3xl font-semibold">Browse Tasks</h2>
        </div>
      </Fade>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-xl sm:text-2xl">
          🚫 There are no tasks available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Fade key={task._id} triggerOnce>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-md flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Category:</strong> {task.category}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Deadline:</strong>{" "}
                    {new Date(task.deadline).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
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
