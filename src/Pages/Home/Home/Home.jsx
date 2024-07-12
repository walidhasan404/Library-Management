import About from "../../About/About";
import Banner from "../Banner/Banner";
import BookCategories from "../BookCategories/BookCategories";

const Home = () => {

    return (
        <div className="bg-white dark:bg-slate-400">
            <Banner></Banner>
            <BookCategories></BookCategories>
            <div id="about">
                <About></About>
            </div>
        </div>
    );
};

export default Home;