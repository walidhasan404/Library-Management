import About from "../../About/About";
import History from "../../History/History";
import Banner from "../Banner/Banner";
import BookCategories from "../BookCategories/BookCategories";

const Home = () => {
    
    return (
        <div className="bg-white dark:bg-slate-400">
            <Banner></Banner>
            <BookCategories></BookCategories>
            <About></About>
            <History></History>
        </div>
    );
};

export default Home;