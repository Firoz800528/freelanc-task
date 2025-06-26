import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase.config";

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    // You can listen for theme changes here if you implement a global theme system
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      toast.success("Profile updated successfully!");
      navigate("/my-profile");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    }
  };

  if (!user)
    return (
      <p
        className={`p-4 text-center rounded ${
          theme === "dark" ? "text-white bg-gray-900" : "text-gray-800 bg-white"
        }`}
      >
        User not found.
      </p>
    );

  return (
    <div
      className={`max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } rounded-lg`}
    >
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Update Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Display Name</label>
            <input
              type="text"
              className={`w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-gray-700 border border-gray-600 text-white"
                  : "bg-white border border-gray-300 text-gray-900"
              }`}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              type="text"
              className={`w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-gray-700 border border-gray-600 text-white"
                  : "bg-white border border-gray-300 text-gray-900"
              }`}
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={`w-full rounded-lg py-2.5 font-medium transition-colors duration-200 ${
              theme === "dark"
                ? "bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            }`}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
