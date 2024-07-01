import { Link } from "react-router-dom";

const BookCategories = () => {
    return (
        <div className="my-4 p-6">
            <h2 className="text-3xl text-center font-bold mb-4">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="card w-full bg-orange-50 p-3 shadow-xl">
                    <figure><img src="https://i.ibb.co/NKXjLFt/images.jpg" alt="books" /></figure>
                    <div className="card-body">
                        <h2 className="text-center font-bold">Novel</h2>
                        
                        <div className="card-actions mx-auto">
                            <Link to="/books/Novel"><button className="btn bg-sky-300">Books</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-full bg-orange-50 p-3 shadow-xl">
                    <figure><img src="https://i.ibb.co/tKyymB0/download-9.jpg" alt="books" /></figure>
                    <div className="card-body">
                        <h2 className="text-center font-bold">Science Fiction</h2>
                        <div className="card-actions mx-auto">
                            <Link to="/books/Science Fiction"><button className="btn bg-sky-300">Books</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-full bg-orange-50 p-3 shadow-xl">
                    <figure><img src="https://i.ibb.co/0hcD8c2/images-1.jpg" alt="books" /></figure>
                    <div className="card-body">
                        <h2 className="text-center font-bold">Horror</h2>
                        <div className="card-actions mx-auto">
                            <Link to="/books/Horror"><button className="btn bg-sky-300">Books</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-full bg-orange-50 p-3 shadow-xl">
                    <figure><img src="https://i.ibb.co/ccyHKKg/download-10.jpg" alt="books" /></figure>
                    <div className="card-body">
                        <h2 className="text-center font-bold">Thriller</h2>
                        <div className="card-actions mx-auto">
                            <Link to="/books/Thriller"><button className="btn bg-sky-300">Books</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCategories;