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
    fetch(`https://server-psi-khaki.vercel.app/tasks/${id}`)
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

  if (loadingAuth) return <div className="p-4">Checking authentication...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (loading) return <div className="p-4"><LoadingSpinner /></div>;
  if (!task) return <div className="p-4">No task details found.</div>;

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

    fetch(`https://server-psi-khaki.vercel.app/tasks/${id}/bids`, {
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
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-6">
  
      <div className="mb-6">
        <MyBidStats />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold mb-4">{task.title}</h2>

      <div className="space-y-2 text-sm sm:text-base">
        <p><strong>Category:</strong> {task.category}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
        <p><strong>Budget:</strong> ${task.budget}</p>
        <p><strong>Bids:</strong> {task.bidsCount || 0}</p>
        <p><strong>Posted by:</strong> {task.userName || "N/A"}</p>
        <p><strong>Email:</strong> {task.userEmail || "N/A"}</p>
      </div>

      <div className="mt-6">
        <button
          className="w-full sm:w-auto bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          onClick={handleBid}
          disabled={isBidding}
        >
          {isBidding ? "Bidding..." : "Place a Bid"}
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
