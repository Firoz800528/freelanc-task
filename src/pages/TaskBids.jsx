import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const TaskBids = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBids = async () => {
      setLoading(true);
      try {
        const token = await user.getIdToken();

        const res = await fetch(`https://server-psi-khaki.vercel.app/tasks/${id}/bids`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch bids");

        const data = await res.json();
        setBids(data);
      } catch (error) {
        toast.error("Failed to load bids");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [user, id]);

  const handleDelete = async (bidId) => {
    if (!window.confirm("Are you sure you want to delete this bid?")) return;

    try {
      const token = await user.getIdToken();
      const res = await fetch(`https://server-psi-khaki.vercel.app/bids/${bidId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete bid");

      setBids((prevBids) => prevBids.filter((bid) => bid._id !== bidId));
      toast.success("Bid deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete bid");
    }
  };

  if (loading) return <p className="text-center my-8">Loading bids...</p>;

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <Link to="/my-tasks" className="btn btn-outline mb-4">
        ← Back to My Tasks
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Task Bids</h1>
      {bids.length === 0 ? (
        <p className="text-center">No bids found for this task.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th >Bidder Email</th>
              <th className="text-center">Expected Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {bids.map((bid, index) => (
              <tr key={bid._id}>
                <td>{index + 1}</td>
                <td>{bid.userEmail || "N/A"}</td>
                <td className="text-center">${parseFloat(bid.amount).toFixed(2)}</td>
                <td>{new Date(bid.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(bid._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskBids;
