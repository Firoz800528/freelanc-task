import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal"; 

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <div className="p-4 text-center">No user data available.</div>;
  }

  return (
    <Fade triggerOnce>
      <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">My Profile</h2>
        
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <img
            src={user.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border"
          />

          <Fade cascade damping={0.1} triggerOnce>
            <p className="text-sm sm:text-base"><strong>Name:</strong> {user.displayName || "N/A"}</p>
            <p className="text-sm sm:text-base"><strong>Email:</strong> {user.email}</p>
            <p className="text-sm sm:text-base"><strong>UID:</strong> {user.uid}</p>
          </Fade>

          <button
            onClick={() => navigate("/update-profile")}
            className="mt-4 px-6 py-2 text-sm sm:text-base cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Update Profile
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default MyProfile;
