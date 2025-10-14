import { Link } from "react-router-dom";

const BooksCard = ({ book, isAdmin }) => {
    const { _id, image, name, author, author_name, quantity, category, rating } = book;

    return (
        <div className="flex justify-center items-center">
            <div className="card w-96 h-full bg-white dark:bg-slate-700 shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl">
                <figure className="px-6 pt-6">
                    <img src={image} alt={`${name}`} className="rounded-lg h-48 object-cover" />
                </figure>
                <div className="card-body text-center">
                    <h2 className="card-title text-2xl font-semibold text-gray-800 dark:text-white">{name}</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">{author || author_name}</p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Available:</span> {quantity}
                    </p>
                    <div className="card-actions mt-4 flex gap-2">
                        {isAdmin ? (
                            <>
                                <Link to={`/updateBook/${_id}`} className="flex-1">
                                    <button className="btn bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full transition duration-300 w-full">
                                        Update
                                    </button>
                                </Link>
                                <Link to={`/book/${_id}`} className="flex-1">
                                    <button className="btn bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition duration-300 w-full">
                                        View
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <Link to={`/book/${_id}`} className="flex-1">
                                <button className="btn bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition duration-300 w-full">
                                    View Details
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksCard;
