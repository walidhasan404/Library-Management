import About from "../../About/About";
import Banner from "../Banner/Banner";
import BookCategories from "../BookCategories/BookCategories";

const Home = () => {
    return (
        <div className="bg-transparent text-gray-900 dark:text-gray-200 min-h-screen">
            <Banner />
            <section className="py-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <BookCategories />
            </section>
            <div className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
                <About />
            </div>
        </div>
    );
};

export default Home;
