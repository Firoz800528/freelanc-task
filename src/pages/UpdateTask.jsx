import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const UpdateTask = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      const token = await user.getIdToken();
      const res = await fetch(`https://server-psi-khaki.vercel.app/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTask(data);
      } else {
        toast.error(data.error || "Failed to load task");
      }
      setLoading(false);
    };

    if (user) fetchTask();
  }, [id, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedTask = {
      title: form.title.value,
      description: form.description.value,
      deadline: form.deadline.value,
      budget: parseFloat(form.budget.value),
      category: form.category.value,
    };

    const token = await user.getIdToken();
    const res = await fetch(`https://server-psi-khaki.vercel.app/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Task updated successfully");
      navigate("/my-posted-tasks");
    } else {
      toast.error(data.error || "Failed to update task");
    }
  };

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (!task) return <p className="p-4 text-center">Task not found</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white shadow-md rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Update Task</h1>
        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Read-only Name */}
          <div>
            <label className="block text-sm font-medium mb-1">User Name</label>
            <input
              type="text"
              value={user.displayName || "N/A"}
              readOnly
              className="w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Read-only Email */}
          <div>
            <label className="block text-sm font-medium mb-1">User Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              defaultValue={task.title}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              defaultValue={task.description}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Deadline</label>
            <input
              type="date"
              name="deadline"
              defaultValue={task.deadline.split("T")[0]}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Budget (USD)</label>
            <input
              type="number"
              name="budget"
              defaultValue={task.budget}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Budget"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              name="category"
              defaultValue={task.category}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Category"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
