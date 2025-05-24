import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"; // or however you get the user

const MyBidStats = () => {
  const { user } = useAuth(); // assume user.email is available
  const [bidCount, setBidCount] = useState(null);

  useEffect(() => {
    const fetchBidCount = async () => {
      if (!user?.email) return;

      const res = await fetch(
        `http://localhost:5000/bids/user/count?email=${encodeURIComponent(user.email)}`
      );

      const data = await res.json();
      setBidCount(data.totalBids);
    };

    fetchBidCount();
  }, [user]);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-2">My Total Bids</h2>
      <p className="text-lg">{bidCount !== null ? bidCount : "Loading..."}</p>
    </div>
  );
};

export default MyBidStats;
