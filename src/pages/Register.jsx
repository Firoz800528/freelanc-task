import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const Register = () => {
  const { register, loginWithGoogle } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  // Sync theme from localStorage
  useEffect(() => {
    const syncTheme = () => {
      const stored = localStorage.getItem("theme") || "light";
      setTheme(stored);
    };
    window.addEventListener("storage", syncTheme);
    window.addEventListener("themeChange", syncTheme);
    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("themeChange", syncTheme);
    };
  }, []);

  const showSuccess = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const showError = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      showError("Password must be at least 6 characters");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      showError("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      showError("Password must contain at least one lowercase letter");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      showError("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) return;

    try {
      const result = await register(email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      showSuccess("Registration successful!");
      navigate("/");
    } catch (err) {
      let msg;
      switch (err.code) {
        case "auth/email-already-in-use":
          msg = "Email is already in use.";
          break;
        case "auth/invalid-email":
          msg = "Invalid email format.";
          break;
        case "auth/weak-password":
          msg = "Password is too weak.";
          break;
        default:
          msg = "Registration failed. Please try again.";
      }
      showError(msg);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      showSuccess("Google login successful!");
      navigate("/");
    } catch (err) {
      const msg =
        err.code === "auth/popup-closed-by-user"
          ? "Google login popup closed. Try again."
          : "Google login failed. Please try again.";
      showError(msg);
    }
  };

  return (
    <Fade triggerOnce>
      <div
        className={`w-full max-w-md mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-8 shadow-lg rounded-lg transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full p-3 border rounded text-sm sm:text-base ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            className={`w-full p-3 border rounded text-sm sm:text-base ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 border rounded text-sm sm:text-base ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 border rounded text-sm sm:text-base ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full p-3 border rounded text-sm sm:text-base ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4 text-sm sm:text-base">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white cursor-pointer py-3 rounded hover:bg-red-600 transition duration-200 text-sm sm:text-base"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default Register;
