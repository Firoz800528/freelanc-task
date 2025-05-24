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
    <div className="max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <Link
        to="/my-tasks"
        className="inline-block mb-4 text-blue-600 hover:underline text-sm sm:text-base"
      >
        ← Back to My Tasks
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Task Bids</h1>

      {bids.length === 0 ? (
        <p className="text-center text-sm sm:text-base">No bids found for this task.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border rounded shadow-sm text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Bidder Email</th>
                <th className="px-4 py-2 text-center">Expected Amount</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr key={bid._id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{bid.userEmail || "N/A"}</td>
                  <td className="px-4 py-2 text-center">
                    ${parseFloat(bid.amount).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(bid.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xs sm:text-sm px-3 py-1 rounded"
                      onClick={() => handleDelete(bid._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskBids;
