import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal"; 

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <div className="p-4">No user data available.</div>;
  }

  return (
    <Fade triggerOnce>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-3xl font-bold mb-4 text-center">My Profile</h2>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={user.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full border"
          />
          <Fade cascade damping={0.1} triggerOnce>
            <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UID:</strong> {user.uid}</p>
          </Fade>
          <button
            onClick={() => navigate("/update-profile")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default MyProfile;
