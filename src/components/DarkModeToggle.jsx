import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    padding: "0.5rem 1rem",
    backgroundColor: darkMode ? "#ccc" : "#333",
    color: darkMode ? "#000" : "#fff",
    border: "none",
    borderRadius: "4px",
  }}
>
  {darkMode ? "Light Mode" : "Dark Mode"}
</button>

  );
};

export default DarkModeToggle;
