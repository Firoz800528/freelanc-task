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
    <div className="max-w-4xl mx-auto p-4">
      {/* Display user's total bids */}
      <div className="mb-6">
        <MyBidStats />
      </div>

      <p className="mb-4 text-lg font-semibold text-center">
        You bid for {task.bidsCount || 0} opportunities.
      </p>

      <h2 className="text-3xl font-bold mb-4">{task.title}</h2>
      <p className="mb-2">
        <strong>Category:</strong> {task.category}
      </p>
      <p className="mb-2">
        <strong>Description:</strong> {task.description}
      </p>
      <p className="mb-2">
        <strong>Deadline:</strong>{" "}
        {new Date(task.deadline).toLocaleDateString()}
      </p>
      <p className="mb-2">
        <strong>Budget:</strong> ${task.budget}
      </p>
      <p className="mb-2">
        <strong>Bids:</strong> {task.bidsCount || 0}
      </p>

      <div className="mb-4">
        <p>
          <strong>Posted by:</strong> {task.userName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {task.userEmail || "N/A"}
        </p>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleBid}
        disabled={isBidding}
      >
        {isBidding ? "Bidding..." : "Place a Bid"}
      </button>
    </div>
  );
};

export default TaskDetails;
