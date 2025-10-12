import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { useEffect, useState } from "react";
import VantaBackground from "./VantaBackground"; // ⭐ your animated background

const Main = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      {/* ⭐ Background always behind everything */}
      <VantaBackground />

      {/* Content with proper z-index */}
      <div className="relative z-10">
        <Navbar handleTheme={handleTheme} theme={theme} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
