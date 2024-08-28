import { Link } from "react-router-dom";

const BooksCard = ({ book }) => {
    const { _id, image, name, author, quantity, category, rating } = book;

    return (
        <div className="flex justify-center items-center">
            <div className="card w-96 h-full bg-white dark:bg-slate-300 shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl">
                <figure className="px-6 pt-6">
                    <img src={image} alt={`${name}`} className="rounded-lg h-48 object-cover" />
                </figure>
                <div className="card-body text-center">
                    <h2 className="card-title text-2xl font-semibold text-gray-800 dark:text-gray-900">{name}</h2>
                    <p className="text-gray-600 dark:text-gray-800 font-medium mb-2">{author}</p>
                    <p className="text-gray-700 dark:text-gray-900">
                        <span className="font-semibold">Available:</span> {quantity}
                    </p>
                    <div className="card-actions mt-4">
                        <Link to={`/updateBook/${_id}`}>
                            <button className="btn bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition duration-300">
                                Update
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksCard;
