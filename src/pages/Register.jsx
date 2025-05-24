import React, { useContext, useState } from "react";
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
  const navigate = useNavigate();

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
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            className="w-full p-2 border rounded"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default Register;
