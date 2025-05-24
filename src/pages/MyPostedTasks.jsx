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

  useEffect(() => {
    if (!user) return;

    const fetchMyTasks = async () => {
      setLoading(true);
      try {
        const token = await user.getIdToken();

        const res = await fetch("http://localhost:5000/my-tasks", {
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

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Task deleted");

        const refreshed = await fetch("http://localhost:5000/my-tasks", {
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
    <div className="overflow-x-auto px-4 py-8">
      <Fade triggerOnce>
        <h1 className="text-4xl font-bold mb-6 text-center">My Posted Tasks</h1>
      </Fade>

      <Fade cascade damping={0.1} triggerOnce>
        {myTasks.length === 0 ? (
          <p className="text-center">You have not posted any tasks yet.</p>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
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
                <tr key={task._id}>
                  <th>{index + 1}</th>
                  <td>{task.title}</td>
                  <td>{new Date(task.deadline).toLocaleDateString()}</td>
                  <td>${task.budget}</td>
                  <td>{task.category}</td>
                  <td className="space-x-2">
                    <Link
                      to={`/update-task/${task._id}`}
                      className="btn btn-sm btn-outline"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/task-bids/${task._id}`}
                      className="btn btn-sm btn-accent"
                    >
                      Bids
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Fade>
    </div>
  );
};

export default MyPostedTasks;
