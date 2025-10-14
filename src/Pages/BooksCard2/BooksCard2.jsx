import ReactRating from 'react-rating';
import { Link } from 'react-router-dom';

const BooksCard = ({ book }) => {
    const { _id, image, name, author, category, rating } = book;

    return (
        <div className="card w-full max-w-xs bg-white dark:bg-slate-700 border-2 dark:border-slate-600 rounded-lg overflow-hidden">
            <figure className="relative">
                <img src={image} alt={`${name} cover`} className="w-full h-60 object-cover rounded-t-lg" />
            </figure>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{name}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-1"><span className="font-medium">Author:</span> {author}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2"><span className="font-medium">Category:</span> {category}</p>
                <div className="mb-2">
                    <ReactRating
                        initialRating={rating}
                        readonly
                        fullSymbol="⭐"
                        emptySymbol="☆"
                        className="text-yellow-500"
                    />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Rating: {rating}</p>
                <div className="text-center">
                    <Link to={`/book/${_id}`}>
                        <button className="btn btn-primary bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                            Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BooksCard;
