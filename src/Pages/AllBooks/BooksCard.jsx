import { Link } from "react-router-dom";

const BooksCard = ({ book, isAdmin }) => {
    const { _id, image, name, author, author_name, quantity, category, rating } = book;

    return (
        <div className="flex justify-center items-center">
            <div className="group relative w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-slate-700">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-slate-700/50 dark:to-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                
                <figure className="relative px-4 pt-4 overflow-hidden">
                    <img 
                        src={image} 
                        alt={`${name}`} 
                        className="rounded-xl h-56 object-cover w-full transition-transform duration-500 group-hover:scale-110" 
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Book+Image';
                            e.target.alt = 'Book Image Placeholder';
                        }}
                    />
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm bg-opacity-90">
                            {category}
                        </span>
                    </div>
                    {/* Rating Badge */}
                    {rating && (
                        <div className="absolute top-6 right-6">
                            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-lg">
                                <span className="text-yellow-500 text-sm">⭐</span>
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{rating}</span>
                            </div>
                        </div>
                    )}
                </figure>
                
                <div className="card-body text-center relative z-20 p-4">
                    <h2 className="card-title text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 mb-2">
                        {name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-1 flex items-center justify-center gap-2">
                        <span className="text-gray-500">👤</span>
                        {author || author_name}
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-gray-500">📚</span>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            <span className="font-semibold">Available:</span> {quantity}
                        </p>
                    </div>
                    
                    <div className="card-actions mt-4 flex flex-row gap-3 items-center justify-center">
                        {isAdmin ? (
                            <>
                                <Link to={`/updateBook/${_id}`} className="flex-1">
                                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm h-11 flex items-center justify-center">
                                        Update
                                    </button>
                                </Link>
                                <Link to={`/book/${_id}`} className="flex-1">
                                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm h-11 flex items-center justify-center">
                                        View
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <Link to={`/book/${_id}`} className="w-full">
                                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm h-11 flex items-center justify-center">
                                    View Details
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
        </div>
    );
};

export default BooksCard;
