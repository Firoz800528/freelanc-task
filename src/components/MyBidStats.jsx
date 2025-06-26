import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const MyBidStats = () => {
  const { user } = useAuth();
  const [bidCount, setBidCount] = useState(null);

  useEffect(() => {
    console.log("User email:", user?.email);
    const fetchBidCount = async () => {
      if (!user?.email) return;

      const res = await fetch(
        `https://server-4f8p.vercel.app/bids/user/count?email=${encodeURIComponent(user.email)}`
      );

      const data = await res.json();
      setBidCount(data.totalBids);
    };

    fetchBidCount();
  }, [user]);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-800 shadow rounded w-full max-w-xl mx-auto">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
        You bid for{" "}
        <span className="text-green-600 dark:text-green-400">
          {bidCount !== null ? bidCount : "Loading..."}
        </span>{" "}
        opportunities
      </p>
    </div>
  );
};

export default MyBidStats;
