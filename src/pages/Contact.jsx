import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const Contact = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

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
      <div className="max-w-4xl mx-auto">
        <Fade triggerOnce>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
            Contact <span className="text-[#432DD7]">Us</span>
          </h2>
          <p
            className={`text-center text-lg mb-10 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Have questions or need help? Reach out and we’ll get back to you shortly.
          </p>
        </Fade>

        <Fade triggerOnce>
          <form
            className={`grid grid-cols-1 gap-6 p-8 rounded-lg shadow border transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div>
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#432DD7] transition ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#432DD7] transition ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Message</label>
              <textarea
                rows="5"
                placeholder="Type your message here..."
                className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#432DD7] transition ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#432DD7] hover:bg-[#341cc0] text-white font-semibold py-2 rounded transition"
            >
              Send Message
            </button>
          </form>
        </Fade>
      </div>
    </section>
  );
};

export default Contact;
