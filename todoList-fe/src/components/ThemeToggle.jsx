import { useState, useEffect } from "react";
import LightMode from "../assets/icons/Light_mode_icon.svg";
import DarkMode from "../assets/icons/NightMode.svg";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      setIsDarkMode(true);
      root.classList.add("dark");
    } else {
      setIsDarkMode(false);
      root.classList.remove("dark");
    }
  }, []);

  const toggleMode = () => {
    const root = document.documentElement;
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <img
      src={isDarkMode ? DarkMode : LightMode}
      alt={isDarkMode ? "Dark Mode" : "Light Mode"}
      className="rounded-full cursor-pointer"
      onClick={toggleMode}
    />
  );
};

export default ThemeToggle;
