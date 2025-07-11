import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const Login = () => {
  const { login, loginWithGoogle } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Sync with localStorage
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
      <div
        className={`min-h-screen flex items-center justify-center px-4 sm:px-6 transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div
          className={`w-full max-w-md rounded-lg shadow-md p-6 sm:p-8 transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className={`input input-bordered w-full ${
                theme === "dark"
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-black"
              }`}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className={`input input-bordered w-full ${
                theme === "dark"
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-black"
              }`}
            />
            <button
              type="submit"
              className="btn btn-primary w-full text-white text-sm sm:text-base"
            >
              Login
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-secondary w-full mt-4 text-sm sm:text-base"
          >
            Login with Google
          </button>

          <p
            className={`mt-4 text-center text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </Fade>
  );
};

export default Login;
