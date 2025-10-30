import ReactRating from 'react-rating';
import { Link } from 'react-router-dom';

const BooksCard = ({ book }) => {
    const { _id, image, name, author, author_name, category, rating } = book;

    return (
        <div className="group relative w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-slate-700 h-full flex flex-col">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-slate-700/50 dark:to-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            
            <figure className="relative overflow-hidden flex-shrink-0">
                <img 
                    src={image} 
                    alt={`${name} cover`} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Book+Image';
                        e.target.alt = 'Book Image Placeholder';
                    }}
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm bg-opacity-90">
                        {category}
                    </span>
                </div>
                {/* Rating Badge */}
                <div className="absolute top-3 right-3">
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-lg">
                        <span className="text-yellow-500 text-sm">⭐</span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{rating || 'N/A'}</span>
                    </div>
                </div>
            </figure>
            
            <div className="p-5 relative z-20 flex flex-col flex-grow min-h-[200px]">
                <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {name}
                </h2>
                
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">👤</span>
                        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium truncate">{author || author_name}</p>
                    </div>
                </div>
                
                {/* Rating Display */}
                {rating !== undefined && rating !== null && (
                    <div className="mb-4">
                        <ReactRating
                            initialRating={rating || 0}
                            readonly
                            fullSymbol={<span className="text-yellow-400 text-lg">★</span>}
                            emptySymbol={<span className="text-gray-300 text-lg">★</span>}
                            className="flex gap-1"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Based on {rating || 0} reviews</p>
                    </div>
                )}
                
                {/* Action Button - Always at the bottom */}
                <div className="text-center mt-auto pt-4">
                    <Link to={`/book/${_id}`} className="block">
                        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm h-12 flex items-center justify-center">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
};

export default BooksCard;
