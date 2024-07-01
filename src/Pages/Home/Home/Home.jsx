import About from "../../About/About";
import History from "../../History/History";
import Banner from "../Banner/Banner";
import BookCategories from "../BookCategories/BookCategories";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";

const Home = () => {

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme])

    const handleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }
    
    return (
        <div className="bg-white dark:bg-slate-400">
            <div className="flex justify-end mr-4">
                <button onClick={handleTheme} className="btn bg-red-100 hover:bg-red-200">
                    <MdOutlineDarkMode />
                </button>
            </div>
            <Banner></Banner>
            <BookCategories></BookCategories>
            <About></About>
            <History></History>
        </div>
    );
};

export default Home;