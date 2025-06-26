import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Fade } from "react-awesome-reveal";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // Optional: Sync theme if you have a global theme context or toggle elsewhere
  // useEffect(() => {
  //   const storedTheme = localStorage.getItem("theme") || "light";
  //   setTheme(storedTheme);
  // }, []);

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    deadline: "",
    budget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "budget" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email || !user?.displayName) {
      toast.error("You must be logged in to post a task");
      return;
    }

    const { title, category, description, deadline, budget } = form;

    if (!title || !category || !description || !deadline || !budget) {
      toast.error("Please fill all fields");
      return;
    }

    const newTask = {
      ...form,
      userEmail: user.email,
      userName: user.displayName,
    };

    try {
      const res = await fetch("https://server-4f8p.vercel.app/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Task posted successfully");
        navigate("/my-posted-tasks");
      } else {
        toast.error(data.error || "Failed to post task");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    }
  };

  return (
    <div
      className={`px-4 sm:px-6 lg:px-8 py-8 max-w-3xl mx-auto min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <Fade triggerOnce>
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Add New Task</h1>
      </Fade>

      <Fade cascade damping={0.1} triggerOnce>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={`space-y-5 p-6 rounded-lg shadow-md transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className={`input input-bordered w-full transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-600"
            }`}
            value={form.title}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            className={`select select-bordered w-full transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-gray-900"
            }`}
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="" className={theme === "dark" ? "bg-gray-700" : ""}>
              Select Category
            </option>
            <option value="Web Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Marketing">Marketing</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            rows={5}
            className={`textarea textarea-bordered w-full transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-600"
            }`}
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="deadline"
            className={`input input-bordered w-full transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-600"
            }`}
            value={form.deadline}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            min="1"
            className={`input input-bordered w-full transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-600"
            }`}
            value={form.budget}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className={`input input-bordered w-full cursor-not-allowed transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-600 border-gray-500 text-gray-300"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
            />
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className={`input input-bordered w-full cursor-not-allowed transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-600 border-gray-500 text-gray-300"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full transition-colors duration-300 ${
              theme === "dark" ? "bg-blue-700 hover:bg-blue-800" : ""
            }`}
          >
            Add Task
          </button>
        </form>
      </Fade>
    </div>
  );
};

export default AddTask;
