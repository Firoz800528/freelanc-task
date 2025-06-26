import React, { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import MyBidStats from "../components/MyBidStats";

const TaskDetails = () => {
  const { id } = useParams();
  const { user, loadingAuth } = useContext(AuthContext);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBidding, setIsBidding] = useState(false);

  const fetchTask = () => {
    if (!id) return;

    setLoading(true);
    fetch(`https://server-4f8p.vercel.app/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          setTask(null);
        } else {
          setTask(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch task details");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (loadingAuth) return <div className="p-6 text-center text-gray-500">Checking authentication...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (loading) return <div className="p-6 text-center"><LoadingSpinner /></div>;
  if (!task) return <div className="p-6 text-center text-red-500">No task details found.</div>;

  const handleBid = () => {
    if (isBidding) return;
    setIsBidding(true);

    const amountStr = prompt("Enter your expected bid amount (USD):");
    const amount = parseFloat(amountStr);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Invalid bid amount");
      setIsBidding(false);
      return;
    }

    fetch(`https://server-4f8p.vercel.app/tasks/${id}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        userEmail: user.email,
        bidderName: user.displayName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Bid submitted successfully!");
          fetchTask();
        }
        setIsBidding(false);
      })
      .catch((err) => {
        console.error("Error placing bid:", err);
        toast.error("Failed to submit bid");
        setIsBidding(false);
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 bg-white rounded-lg shadow-sm">
      <div className="mb-8">
        <MyBidStats />
      </div>

      <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">
        {task.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm sm:text-base text-gray-700">
        <p><span className="font-medium text-gray-900">Category:</span> {task.category}</p>
        <p><span className="font-medium text-gray-900">Deadline:</span> {new Date(task.deadline).toLocaleDateString()}</p>
        <p className="sm:col-span-2"><span className="font-medium text-gray-900">Description:</span> {task.description}</p>
        <p><span className="font-medium text-gray-900">Budget:</span> ${task.budget}</p>
        <p><span className="font-medium text-gray-900">Bids:</span> {task.bidsCount || 0}</p>
        <p><span className="font-medium text-gray-900">Posted by:</span> {task.userName || "N/A"}</p>
        <p><span className="font-medium text-gray-900">Email:</span> {task.userEmail || "N/A"}</p>
      </div>

      <div className="mt-8">
        <button
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg shadow-md disabled:opacity-60"
          onClick={handleBid}
          disabled={isBidding}
        >
          {isBidding ? "Submitting..." : "Place a Bid"}
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
