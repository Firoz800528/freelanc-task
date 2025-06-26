// src/pages/dashboard/Overview.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import toast from "react-hot-toast";

const Overview = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [stats, setStats] = useState({ totalItems: 0, myItems: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const token = await user.getIdToken();
        const res = await fetch("https://server-4f8p.vercel.app/items/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load stats");
        const data = await res.json();
        setStats({
          totalItems: data.totalItems || 0,
          myItems: data.myItems || 0,
        });
      } catch (error) {
        toast.error("Could not load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading)
    return (
      <p
        className={`text-center py-6 ${
          theme === "dark" ? "text-white" : "text-gray-700"
        }`}
      >
        Loading stats...
      </p>
    );

  const cardBase =
    "rounded-lg p-6 shadow-md flex flex-col items-center justify-center";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
      <div
        className={`${cardBase} bg-blue-600 text-white hover:bg-blue-700 transition cursor-default`}
      >
        <h2 className="text-xl font-semibold mb-2">Total Items</h2>
        <p className="text-4xl font-bold">{stats.totalItems}</p>
      </div>

      <div
        className={`${cardBase} bg-green-600 text-white hover:bg-green-700 transition cursor-default`}
      >
        <h2 className="text-xl font-semibold mb-2">My Items</h2>
        <p className="text-4xl font-bold">{stats.myItems}</p>
      </div>
    </div>
  );
};

export default Overview;
