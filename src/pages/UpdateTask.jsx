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
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`https://server-4f8p.vercel.app/tasks/${id}`, {
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
      } catch (err) {
        toast.error("Failed to load task");
      } finally {
        setLoading(false);
      }
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

    try {
      const token = await user.getIdToken();
      const res = await fetch(`https://server-4f8p.vercel.app/tasks/${id}`, {
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
    } catch {
      toast.error("Failed to update task");
    }
  };

  if (loading)
    return (
      <p
        className={`p-4 text-center ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        Loading...
      </p>
    );
  if (!task)
    return (
      <p
        className={`p-4 text-center ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        Task not found
      </p>
    );

  const inputBaseClasses =
    "w-full rounded-lg px-3 py-2 border focus:outline-none transition-colors duration-200 ";
  const inputLightClasses = "bg-gray-100 text-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-500";
  const inputDarkClasses = "bg-gray-700 text-gray-200 border-gray-600 focus:ring-2 focus:ring-blue-400";

  return (
    <div
      className={`max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div
        className={`shadow-md rounded-xl p-6 sm:p-8 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-2xl sm:text-3xl font-bold mb-6 text-center ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Update Task
        </h1>
        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Read-only Name */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              User Name
            </label>
            <input
              type="text"
              value={user.displayName || "N/A"}
              readOnly
              className={`${inputBaseClasses} ${
                theme === "dark" ? inputDarkClasses : inputLightClasses
              } cursor-not-allowed`}
            />
          </div>

          {/* Read-only Email */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              User Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className={`${inputBaseClasses} ${
                theme === "dark" ? inputDarkClasses : inputLightClasses
              } cursor-not-allowed`}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Title
            </label>
            <input
              name="title"
              defaultValue={task.title}
              className={`${inputBaseClasses} ${
                theme === "dark" ? inputDarkClasses : inputLightClasses
              }`}
              placeholder="Title"
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Description
            </label>
            <textarea
              name="description"
              defaultValue={task.description}
              className={`${inputBaseClasses} h-32 resize-none ${
                theme === "dark" ? inputDarkClasses : inputLightClasses
              }`}
              placeholder="Description"
              required
            ></textarea>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              defaultValue={task.deadline.split("T")[0]}
              className={`${inputBaseClasses} ${
                theme === "dark" ? inputDarkClasses : inputLightClasses
              }`}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Budget (USD)
            </label>
            <input
              type="number"
              name="budget"
              defaultValue={task.budget}
              className={`${inputBaseClasses} ${
                theme === "dark" ? inputDarkClasses : inputLightClasses
              }`}
              placeholder="Budget"
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Category
            </label>
            <input
              name="category"
              defaultValue={task.category}
              className={`${inputBaseClasses} ${
                theme === "dark" ? inputDarkClasses : inputLightClasses
              }`}
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
