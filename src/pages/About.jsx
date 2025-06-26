import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const About = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // Sync with theme changes
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

  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <Fade triggerOnce>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            About Freelance<span className="text-[#FFDF20]">Task</span>
          </h2>
          <p
            className={`max-w-3xl mx-auto text-lg sm:text-xl mb-8 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            FreelanceTask is a powerful platform designed to connect skilled freelancers with clients in need of professional work. Whether you're looking to hire talent or showcase your abilities, FreelanceTask makes the process simple, secure, and efficient.
          </p>
        </Fade>

        <Fade cascade triggerOnce damping={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {[
              {
                title: "For Freelancers",
                text: "Discover tasks that match your skills, bid on projects, and get paid securely. Build your portfolio and grow your freelance career.",
              },
              {
                title: "For Clients",
                text: "Post tasks, receive competitive bids from professionals, and hire with confidence. Manage work and payments with ease.",
              },
              {
                title: "Secure & Reliable",
                text: "FreelanceTask ensures secure communication and payment protection for both freelancers and clients through a trusted platform.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow border transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2 text-[#432DD7]">
                  {card.title}
                </h3>
                <p className="text-sm">{card.text}</p>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default About;
