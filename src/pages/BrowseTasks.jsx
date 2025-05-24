import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import LoadingSpinner from "../components/LoadingSpinner";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    fetch("https://server-psi-khaki.vercel.app/tasks")
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch tasks:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Fade triggerOnce>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl">Browse Tasks</h2>
        </div>
      </Fade>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-3xl">
          🚫 There are no tasks available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map(task => (
            <Fade key={task._id} triggerOnce>
              <div className="border p-4 rounded shadow">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p><strong>Category:</strong> {task.category}</p>
                <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
                <p><strong>Budget:</strong> ${task.budget}</p>
                <Link
                  to={`/tasks/${task._id}`}
                  className="btn btn-sm btn-primary mt-3"
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
