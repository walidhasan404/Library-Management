import ReactRating from 'react-rating';

const BorrowedBooksCard = ({ book, handleReturn, isAdmin }) => {
    const { _id, image, bookName, authorName, category, rating, email, borrowDate, returnDate } = book;
    const formattedBorrowDate = new Date(borrowDate).toDateString();
    const formattedReturnDate = new Date(returnDate).toDateString();

    return (
        <div className="group relative w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-slate-700">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-slate-700/50 dark:to-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            
            <figure className="relative p-4 overflow-hidden">
                <img 
                    src={image} 
                    alt={`Cover of ${bookName}`} 
                    className="w-full h-64 object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" 
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
                <div className="absolute top-6 right-6">
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-lg">
                        <span className="text-yellow-500 text-sm">⭐</span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{rating}</span>
                    </div>
                </div>
            </figure>
            
            <div className="p-6 relative z-20">
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {bookName}
                </h3>
                
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">👤</span>
                        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">{authorName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">📧</span>
                        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">{email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">📅</span>
                        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">Borrowed: {formattedBorrowDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">⏰</span>
                        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                            Return by: <span className="text-red-600 dark:text-red-400 font-semibold">{formattedReturnDate}</span>
                        </p>
                    </div>
                </div>
                
                {/* Rating Display */}
                <div className="mb-4">
                    <ReactRating
                        initialRating={rating || 0}
                        readonly
                        fullSymbol={<span className="text-yellow-400 text-lg">★</span>}
                        emptySymbol={<span className="text-gray-300 text-lg">★</span>}
                        className="flex gap-1"
                    />
                </div>
                
                {/* Return Button */}
                {!isAdmin && (
                    <div className="text-center mt-2">
                        <button
                            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm h-12 flex items-center justify-center"
                            onClick={() => handleReturn(_id)}
                        >
                            Return Book
                        </button>
                    </div>
                )}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
};

export default BorrowedBooksCard;
