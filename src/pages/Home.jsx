import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://server-psi-khaki.vercel.app/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  const displayedTasks = tasks.slice(0, 6);

  return (
    <div>
      <Carousel
  showThumbs={false}
  autoPlay
  infiniteLoop
  interval={2000}
  showStatus={false}
>
  <div className="bg-blue-600 text-white py-20 px-6 text-center">
    <h1 className="text-4xl font-bold mb-4">Find Freelancers Fast</h1>
    <p className="text-lg max-w-2xl mx-auto">
      Post your task and get competitive bids from top freelancers.
    </p>
  </div>
  <div className="bg-blue-700 text-white py-20 px-6 text-center">
    <h1 className="text-4xl font-bold mb-4">Post Tasks with Ease</h1>
    <p className="text-lg max-w-2xl mx-auto">
      Posting a task is simple and takes just a minute. Start now.
    </p>
  </div>
  <div className="bg-blue-800 text-white py-20 px-6 text-center">
    <h1 className="text-4xl font-bold mb-4">Secure and Reliable</h1>
    <p className="text-lg max-w-2xl mx-auto">
      Enjoy a secure and reliable platform for all your freelance needs.
    </p>
  </div>
  <div className="bg-blue-900 text-white py-20 px-6 text-center">
    <h1 className="text-4xl font-bold mb-4">Support When You Need It</h1>
    <p className="text-lg max-w-2xl mx-auto">
      Our team is here to help you every step of the way.
    </p>
  </div>
  <div className="bg-indigo-700 text-white py-20 px-6 text-center">
    <h1 className="text-4xl font-bold mb-4">Trusted by Thousands</h1>
    <p className="text-lg max-w-2xl mx-auto">
      Join a growing community of users who get work done every day.
    </p>
  </div>
</Carousel>


      <section className="max-w-6xl mx-auto p-6">
        <Fade triggerOnce>
          <h2 className="text-3xl font-bold mb-6">Featured Tasks</h2>
        </Fade>

        {loading ? (
          <LoadingSpinner />
        ) : tasks.length === 0 ? (
          <p>No tasks posted yet.</p>
        ) : (
          <Fade cascade damping={0.1} triggerOnce>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayedTasks.map((task) => (
                <div
                  key={task._id}
                  className="border p-4 rounded shadow hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-xl mb-2">{task.title}</h3>
                  <p className="mb-2">
                    {task.description.substring(0, 100)}...
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    Budget: ${task.budget}
                  </p>
                  <Link
                    to={`/tasks/${task._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </Fade>
        )}
      </section>

      <Fade triggerOnce>
        <section className="bg-gray-100 py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-4 bg-white rounded shadow">
                <h3 className="font-semibold text-lg mb-2">1. Post a Task</h3>
                <p>Describe what you need done and your budget.</p>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <h3 className="font-semibold text-lg mb-2">2. Receive Bids</h3>
                <p>Freelancers bid on your task and you choose the best fit.</p>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <h3 className="font-semibold text-lg mb-2">3. Get It Done</h3>
                <p>Collaborate and complete your project efficiently.</p>
              </div>
            </div>
          </div>
        </section>
      </Fade>

      <Fade triggerOnce>
        <section className="py-12 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Top Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {["Web Development", "Graphic Design", "Writing", "Marketing"].map((cat) => (
              <div
                key={cat}
                className="p-4 border rounded shadow hover:bg-blue-100 transition"
              >
                <p className="font-semibold">{cat}</p>
              </div>
            ))}
          </div>
        </section>
      </Fade>
    </div>
  );
};

export default Home;
