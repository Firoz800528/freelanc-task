import { useContext, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const Login = () => {
  const { login, loginWithGoogle } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData((fd) => ({ ...fd, [e.target.name]: e.target.value }));
  };

  const showSuccess = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const showError = (message) => {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: message,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      showSuccess("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      let msg;
      switch (err.code) {
        case "auth/user-not-found":
          msg = "User not found. Please register first.";
          break;
        case "auth/wrong-password":
          msg = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          msg = "Invalid email format.";
          break;
        case "auth/invalid-credential":
          msg = "Invalid email or password.";
          break;
        default:
          msg = "Something went wrong. Please try again.";
      }
      showError(msg);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      showSuccess("Google login successful!");
      navigate(from, { replace: true });
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
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-secondary w-full mt-4"
        >
          Login with Google
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register here
          </Link>
        </p>
      </div>
    </Fade>
  );
};

export default Login;
