import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Fade } from "react-awesome-reveal";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

    if (!user || !user.email || !user.displayName) {
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
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <div>
      <Fade triggerOnce>
        <h1 className="text-4xl font-bold mb-6 text-center">Add New Task</h1>
      </Fade>

      <Fade cascade damping={0.1} triggerOnce>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-4"
          autoComplete="off"
        >
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="input input-bordered w-full"
            value={form.title}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            className="select select-bordered w-full"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Marketing">Marketing</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            value={form.description}
            onChange={handleChange}
            required
            rows={5}
          />

          <input
            type="date"
            name="deadline"
            className="input input-bordered w-full"
            value={form.deadline}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            className="input input-bordered w-full"
            value={form.budget}
            onChange={handleChange}
            min="1"
            required
          />

          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />

          <button type="submit" className="btn btn-primary w-full">
            Add Task
          </button>
        </form>
      </Fade>
    </div>
  );
};

export default AddTask;
