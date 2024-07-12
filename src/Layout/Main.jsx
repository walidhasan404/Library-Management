import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { useEffect, useState } from "react";

const Main = () => {

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme : "light";
    });

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme)
    }, [theme])

    const handleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <div>
            <Navbar handleTheme={handleTheme} theme={theme} />
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;