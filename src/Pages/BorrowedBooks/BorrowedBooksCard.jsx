import ReactRating from 'react-rating';

const BorrowedBooksCard = ({ book, handleReturn, isAdmin }) => {
    const { _id, image, bookName, authorName, category, rating, email, borrowDate, returnDate } = book;
    const formattedBorrowDate = new Date(borrowDate).toDateString();
    const formattedReturnDate = new Date(returnDate).toDateString();

    return (
        <div className="card w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <figure className="p-4">
                <img src={image} alt={`Cover of ${bookName}`} className="w-full h-96 object-cover rounded-lg" />
            </figure>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{bookName}</h3>
                <p className="text-gray-700 mb-2"><strong>Author:</strong> {authorName}</p>
                <p className="text-gray-700 mb-2"><strong>Category:</strong> {category}</p>
                <div className="mb-2">
                    <ReactRating
                        initialRating={rating}
                        readonly
                        emptySymbol="fa fa-star-o"
                        fullSymbol="fa fa-star"
                        className="text-yellow-500"
                    />
                    <span className="ml-2 text-gray-600">{rating}</span>
                </div>
                <p className="text-gray-700 mb-2"><strong>Borrowed by:</strong> {email}</p>
                <p className="text-gray-700 mb-2"><strong>Borrowed on:</strong> {formattedBorrowDate}</p>
                <p className="text-gray-700 mb-4"><strong>Return by:</strong> <span className="text-red-600 font-semibold">{formattedReturnDate}</span></p>
                {!isAdmin && (
                    <button
                        className="btn btn-primary w-full"
                        onClick={() => handleReturn(_id)}
                    >
                        Return
                    </button>
                )}
            </div>
        </div>
    );
};

export default BorrowedBooksCard;
