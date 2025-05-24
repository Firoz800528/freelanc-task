import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    fetch("https://server-psi-khaki.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const displayedTasks = tasks.slice(0, 6);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <button
        onClick={toggleTheme}
        className="lg:fixed top-10 right-0 z-50 p-2 cursor-pointer rounded bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showStatus={false}
        className="mb-10"
      >
        {[
          {
            title: "Find Freelancers Fast",
            desc: "Post your task and get competitive bids from top freelancers.",
            bg: "bg-blue-600",
          },
          {
            title: "Post Tasks with Ease",
            desc: "Posting a task is simple and takes just a minute. Start now.",
            bg: "bg-blue-700",
          },
          {
            title: "Secure and Reliable",
            desc: "Enjoy a secure and reliable platform for all your freelance needs.",
            bg: "bg-blue-800",
          },
          {
            title: "Support When You Need It",
            desc: "Our team is here to help you every step of the way.",
            bg: "bg-blue-900",
          },
          {
            title: "Trusted by Thousands",
            desc: "Join a growing community of users who get work done every day.",
            bg: "bg-indigo-700",
          },
        ].map((slide, i) => (
          <div key={i} className={`${slide.bg} text-white py-20 px-4 sm:px-8 text-center`}>
            <h1 className="text-2xl sm:text-4xl font-bold mb-4">{slide.title}</h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto">{slide.desc}</p>
          </div>
        ))}
      </Carousel>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Fade triggerOnce>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Featured Tasks</h2>
        </Fade>

        {loading ? (
          <LoadingSpinner />
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks posted yet.</p>
        ) : (
          <Fade cascade damping={0.1} triggerOnce>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedTasks.map((task) => (
                <div
                  key={task._id}
                  className={`border p-4 rounded shadow hover:shadow-lg transition ${
                    theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
                  }`}
                >
                  <h3 className="font-semibold text-lg sm:text-xl mb-2">{task.title}</h3>
                  <p className="text-sm mb-2">{task.description.substring(0, 100)}...</p>
                  <p className="text-xs text-gray-500 mb-1">
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-700 mb-2">Budget: ${task.budget}</p>
                  <Link to={`/tasks/${task._id}`} className="text-blue-600 hover:underline text-sm">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </Fade>
        )}
      </section>

      <Fade triggerOnce>
        <section className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} py-12`}>
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: "1. Post a Task",
                  desc: "Describe what you need done and your budget.",
                },
                {
                  title: "2. Receive Bids",
                  desc: "Freelancers bid on your task and you choose the best fit.",
                },
                {
                  title: "3. Get It Done",
                  desc: "Collaborate and complete your project efficiently.",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded shadow ${
                    theme === "dark" ? "bg-gray-700 text-white" : "bg-white"
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Fade>

      <Fade triggerOnce>
        <section className="py-12 max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Top Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
            {["Web Development", "Graphic Design", "Writing", "Marketing"].map((cat) => (
              <div
                key={cat}
                className={`p-4 border rounded shadow hover:bg-blue-100 transition text-sm sm:text-base font-medium ${
                  theme === "dark" ? "bg-gray-800 border-gray-600 text-white" : "bg-white"
                }`}
              >
                {cat}
              </div>
            ))}
          </div>
        </section>
      </Fade>
    </div>
  );
};

export default Home;
