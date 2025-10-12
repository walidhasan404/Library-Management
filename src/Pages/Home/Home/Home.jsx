import About from "../../About/About";
import Banner from "../Banner/Banner";
import BookCategories from "../BookCategories/BookCategories";

const Home = () => {
    return (
        <div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-200">
            <Banner />
            <section className="py-12">
                <BookCategories />
            </section>
            <div className="py-8 bg-white dark:bg-slate-700 rounded-lg shadow-lg">
                <About />
            </div>
        </div>
    );
};

export default Home;
