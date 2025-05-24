
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
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
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
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
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

  if (loading) return <p className="p-4">Loading...</p>;
  if (!task) return <p className="p-4">Task not found</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Task</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="title"
          defaultValue={task.title}
          className="input input-bordered w-full"
          placeholder="Title"
        />
        <textarea
          name="description"
          defaultValue={task.description}
          className="textarea textarea-bordered w-full"
          placeholder="Description"
        ></textarea>
        <input
          type="date"
          name="deadline"
          defaultValue={task.deadline.split("T")[0]}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="budget"
          defaultValue={task.budget}
          className="input input-bordered w-full"
          placeholder="Budget"
        />
        <input
          name="category"
          defaultValue={task.category}
          className="input input-bordered w-full"
          placeholder="Category"
        />
        <button type="submit" className="btn btn-primary w-full">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
