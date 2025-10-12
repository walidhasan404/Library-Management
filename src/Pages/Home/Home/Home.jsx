import About from "../../About/About";
import Banner from "../Banner/Banner";
import BookCategories from "../BookCategories/BookCategories";

const Home = () => {
    return (
        <div className="bg-transparent text-gray-900 dark:text-gray-200 min-h-screen">
            <Banner />
            <section className="py-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <BookCategories />
            </section>
            <div className="py-8 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm shadow-lg">
                <About />
            </div>
        </div>
    );
};

export default Home;
