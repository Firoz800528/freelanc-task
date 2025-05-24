import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4">
        404
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl mb-6">
        Oops! Page not found.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded transition duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
