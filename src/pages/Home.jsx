import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme] = useState(() => localStorage.getItem("theme") || "light");

  const [email, setEmail] = useState("");
  const [subscribedEmails, setSubscribedEmails] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New state for selected category in Top Categories section
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("https://server-4f8p.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    if (subscribedEmails.includes(email)) {
      Swal.fire({
        icon: "info",
        title: "Already Subscribed",
        text: "This email is already subscribed.",
        confirmButtonColor: "#6366F1",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setSubscribedEmails((prev) => [...prev, email]);
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "You’ve successfully subscribed to our newsletter.",
        confirmButtonColor: "#6366F1",
      });
      setIsSubmitting(false);
      setEmail("");
    }, 1000);
  };

  const displayedTasks = tasks.slice(0, 4);


  // Categories for Top Categories buttons
  const categories = ["Web Development", "Marketing", "Design"];

  // Filtered tasks for the selected category in Top Categories section
  const tasksInCategory = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : [];

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Hero/Carousel */}
      <div style={{ height: "65vh" }} className="mb-12 relative">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={4000}
          showStatus={false}
          showIndicators={true}
          className="h-full"
          swipeable
          emulateTouch
          dynamicHeight={false}
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
            <div
              key={i}
              className={`${slide.bg} flex flex-col justify-center items-center h-[65vh] px-6 text-center`}
            >
              <h1
                className={`text-3xl sm:text-5xl font-extrabold mb-4 max-w-3xl ${
                  theme === "dark" ? "text-black" : "text-white"
                }`}
              >
                {slide.title}
              </h1>
              <p
                className={`text-lg sm:text-xl max-w-xl ${
                  theme === "dark" ? "text-black" : "text-white"
                }`}
              >
                {slide.desc}
              </p>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Featured Tasks */}
      <section className="mb-16">
        <Fade triggerOnce>
          <h2 className="text-3xl font-bold text-center mb-8">Featured Tasks</h2>
        </Fade>

        {loading ? (
          <LoadingSpinner />
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks posted yet.</p>
        ) : (
          <Fade cascade damping={0.1} triggerOnce>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedTasks.map((task) => (
                <div
                  key={task._id}
                  className={`border rounded-lg shadow-md flex flex-col transition hover:shadow-xl ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-200"
                  }`}
                  style={{ minHeight: "360px" }}
                >
                  <img
                    src={task.image || "https://i.imgur.com/KDlet48.png"}
                    alt={task.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                    <p className="text-sm flex-grow">
                      {task.description?.substring(0, 80)}...
                    </p>
                    <Link
                      to={`/tasks/${task._id}`}
                      className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                    >
                      See More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        )}
      </section>

      {/* Top Categories Section with filtering tasks */}
      <section
        className={`mb-16 py-12 px-6 rounded-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <Fade triggerOnce>
          <h2 className="text-3xl font-bold text-center mb-8">Top Categories</h2>

          {/* Category Buttons */}
          <div className="max-w-5xl mx-auto flex justify-center gap-6 flex-wrap mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-lg font-semibold cursor-pointer transition transform hover:scale-105
                  ${
                    selectedCategory === cat
                      ? theme === "dark"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-600 text-white"
                      : theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-900 border border-gray-300"
                  }
                `}
              >
                {cat}
              </button>
            ))}

            
          </div>

          {/* Tasks filtered by selected category */}
          {selectedCategory ? (
            tasksInCategory.length === 0 ? (
              <p className="text-center text-gray-500">
                No tasks found in {selectedCategory}.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {tasksInCategory.map((task) => (
                  <div
                    key={task._id}
                    className={`border rounded-lg shadow-md flex flex-col transition hover:shadow-xl ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-200"
                    }`}
                    
                  >
                    <div className="flex flex-col flex-grow p-4">
                      <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                      <p className="text-sm flex-grow">
                        {task.description?.substring(0, 80)}...
                      </p>
                      <Link
                        to={`/tasks/${task._id}`}
                        className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                      >
                        See More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <p className="text-center text-gray-500">
              Please select a category to see tasks.
            </p>
          )}
        </Fade>
      </section>

      {/* Promotional Offer */}
      <section
        className={`mb-16 py-12 px-8 rounded-lg text-center ${
          theme === "dark" ? "bg-indigo-900 text-white" : "bg-indigo-100 text-indigo-900"
        }`}
      >
        <Fade triggerOnce>
          <h2 className="text-4xl font-extrabold mb-4">Limited Time Offer!</h2>
          <p className="text-lg max-w-xl mx-auto mb-6">
            Get 20% off on your first task post. Use code{" "}
            <span className="font-mono bg-yellow-300 px-2 rounded">FREELANCE20</span>{" "}
            at checkout.
          </p>
          <Link
            to="/add-task"
            className="inline-block bg-yellow-300 text-indigo-900 font-semibold py-3 px-6 rounded hover:bg-yellow-400 transition"
          >
            Post a Task Now
          </Link>
        </Fade>
      </section>

          <section
  className={`py-16 transition-colors duration-300 ${
    theme === "dark"
      ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      : "bg-gradient-to-b from-white to-gray-100 text-gray-900"
  }`}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold">
        Why Choose{" "}
        <span className="text-indigo-600">
          Freelance
          <span className="text-[#FFDF20]">Task</span>
        </span>
      </h2>
      <p
        className={`mt-4 text-lg max-w-2xl mx-auto ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        We empower clients and freelancers with tools and trust to get work done efficiently.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {[
        {
          icon: "🛡️",
          title: "Secure & Safe",
          desc: "Your data and transactions are protected with advanced encryption and secure gateways.",
        },
        {
          icon: "✅",
          title: "Vetted Freelancers",
          desc: "Work with experienced professionals who are verified and reviewed by the community.",
        },
        {
          icon: "⚡",
          title: "Fast Delivery",
          desc: "Projects get done quickly with real-time communication and smart task management.",
        },
        {
          icon: "📈",
          title: "Quality Assurance",
          desc: "Ratings, reviews, and dispute resolution ensure consistent high-quality work.",
        },
      ].map((feature, idx) => (
        <div
          key={idx}
          className={`rounded-lg shadow-md p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {feature.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* Newsletter */}
      <section
        className={`mb-20 px-6 py-12 rounded-lg max-w-6xl mx-auto text-center border ${
          theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        <Fade triggerOnce>
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6 text-sm max-w-md mx-auto">
            Get the latest freelance tips, offers, and updates straight to your inbox.
          </p>
          <form
            className="flex flex-col sm:flex-row justify-center gap-4"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              required
              disabled={subscribedEmails.includes(email)}
            />
            <button
              type="submit"
              disabled={isSubmitting || subscribedEmails.includes(email)}
              className={`${
                subscribedEmails.includes(email) || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white font-semibold rounded px-6 py-3 transition`}
            >
              {subscribedEmails.includes(email) ? "Subscribed" : "Subscribe"}
            </button>
          </form>
        </Fade>
      </section>
    </div>
  );
};

export default Home;
