import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className='p-10 text-center bg-yellow-200 m-4'>
            <img className="mx-auto mb-6" src="https://i.ibb.co/PmWSJd3/Best-Coming-Soon-and-404-Error-Page-Templates-for-Your-Unique-Websites.jpg" alt="" />
            <Link to="/">Go back to home</Link>
        </div>
    );
};

export default ErrorPage;