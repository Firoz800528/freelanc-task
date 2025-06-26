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
    fetch("https://server-4f8p.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  const displayedTasks = tasks.slice(0, 8); // showing 8 tasks

  // Sample blog posts (mock)
  const blogs = [
    {
      id: 1,
      title: "How to Choose the Right Freelancer",
      excerpt: "Tips and tricks to pick the best freelancer for your task...",
      image: "https://source.unsplash.com/400x250/?freelance,work",
      link: "#",
    },
    {
      id: 2,
      title: "Top 5 Freelance Skills in 2025",
      excerpt: "Explore the most in-demand skills in the freelance market...",
      image: "https://source.unsplash.com/400x250/?skills,freelance",
      link: "#",
    },
    {
      id: 3,
      title: "Maximize Your Earnings as a Freelancer",
      excerpt: "Strategies to increase your freelance income sustainably...",
      image: "https://source.unsplash.com/400x250/?money,freelance",
      link: "#",
    },
  ];

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>

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

      {/* Featured Tasks - "All Items" with 4 cards/row */}
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
                    theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"
                  }`}
                  style={{ minHeight: "360px" }} // uniform height
                >
                  {/* Use image if exists, else placeholder */}
                  <img
                    src={task.image || "https://i.imgur.com/KDlet48.png"}
                    alt={task.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                    <p className="text-sm flex-grow">{task.description?.substring(0, 80)}...</p>
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

      {/* Categories */}
      <section className={`mb-16 py-12 px-6 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
        <Fade triggerOnce>
          <h2 className="text-3xl font-bold text-center mb-8">Top Categories</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
            {["Web Development", "Graphic Design", "Writing", "Marketing", "SEO", "Video Editing", "App Development", "Digital Marketing"].map((cat) => (
              <div
                key={cat}
                className={`p-5 border rounded-lg shadow cursor-pointer hover:scale-105 transform transition ${
                  theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                {cat}
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* Blog Section */}
      <section className="mb-16 max-w-6xl mx-auto">
        <Fade triggerOnce>
          <h2 className="text-3xl font-bold text-center mb-10">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className={`rounded-lg shadow-md overflow-hidden flex flex-col ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
                }`}
              >
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-sm flex-grow">{blog.excerpt}</p>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-blue-600 hover:underline font-medium"
                  >
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Fade>
      </section>

      {/* Promotional Offer */}
      <section className={`mb-16 py-12 px-8 rounded-lg text-center ${theme === "dark" ? "bg-indigo-900 text-white" : "bg-indigo-100 text-indigo-900"}`}>
        <Fade triggerOnce>
          <h2 className="text-4xl font-extrabold mb-4">Limited Time Offer!</h2>
          <p className="text-lg max-w-xl mx-auto mb-6">
            Get 20% off on your first task post. Use code <span className="font-mono bg-yellow-300 px-2 rounded">FREELANCE20</span> at checkout.
          </p>
          <Link
            to="/add-task"
            className="inline-block bg-yellow-300 text-indigo-900 font-semibold py-3 px-6 rounded hover:bg-yellow-400 transition"
          >
            Post a Task Now
          </Link>
        </Fade>
      </section>

      {/* Newsletter */}
      <section className={`mb-20 px-6 py-12 rounded-lg max-w-6xl mx-auto text-center border ${
        theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
      }`}>
        <Fade triggerOnce>
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6 text-sm max-w-md mx-auto">
            Get the latest freelance tips, offers, and updates straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded px-6 py-3 transition"
            >
              Subscribe
            </button>
          </form>
        </Fade>
      </section>
    </div>
  );
};

export default Home;
