import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaQuestionCircle, FaBug, FaUserShield } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const Support = () => {
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
      <div className="max-w-5xl mx-auto">
        <Fade triggerOnce>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
            Support <span className="text-[#FFDF20]">Center</span>
          </h2>
          <p
            className={`text-center text-lg mb-10 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Get help with your FreelanceTask experience. We’re here to assist you!
          </p>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Fade triggerOnce cascade damping={0.1}>
            <div
              className={`p-6 rounded-lg flex items-start gap-4 border transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              <FaQuestionCircle className="text-3xl text-[#432DD7]" />
              <div>
                <h4 className="font-semibold text-lg">FAQs</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Find answers to common questions about tasks, bids, payments, and more.
                </p>
              </div>
            </div>

            <div
              className={`p-6 rounded-lg flex items-start gap-4 border transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              <FaBug className="text-3xl text-[#432DD7]" />
              <div>
                <h4 className="font-semibold text-lg">Report a Bug</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Encounter a technical issue? Let us know so we can fix it quickly.
                </p>
              </div>
            </div>

            <div
              className={`p-6 rounded-lg flex items-start gap-4 border transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              <FaUserShield className="text-3xl text-[#432DD7]" />
              <div>
                <h4 className="font-semibold text-lg">Account & Security</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Need help managing your account or securing your data?
                </p>
              </div>
            </div>

            <div
              className={`p-6 rounded-lg flex items-start gap-4 border transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              <FaEnvelope className="text-3xl text-[#432DD7]" />
              <div>
                <h4 className="font-semibold text-lg">Still Need Help?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Contact us directly via our{" "}
                  <Link to="/contact" className="text-[#432DD7] underline">
                    contact page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Support;
