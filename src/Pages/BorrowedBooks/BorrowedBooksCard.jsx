import ReactRating from 'react-rating';

const BorrowedBooksCard = ({ book, handleReturn }) => {
    const { _id, image, name, author, category, rating, email, date } = book;
    const borrowDate = new Date(date);
    const returnDate = new Date(borrowDate.getTime() + 15 * 24 * 60 * 60 * 1000);
    const formattedReturnDate = returnDate.toDateString();

    return (
        <div className="card w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <figure className="p-4">
                <img src={image} alt={`Cover of ${name}`} className="w-full h-96 object-cover rounded-lg" />
            </figure>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{name}</h3>
                <p className="text-gray-700 mb-2"><strong>Author:</strong> {author}</p>
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
                <p className="text-gray-700 mb-2"><strong>Collected by:</strong> {name}</p>
                <p className="text-gray-700 mb-2"><strong>Email:</strong> {email}</p>
                <p className="text-gray-700 mb-2"><strong>Borrowed on:</strong> {new Date(date).toDateString()}</p>
                <p className="text-gray-700 mb-4"><strong>Return by:</strong> {formattedReturnDate}</p>
                <button
                    className="btn btn-primary w-full"
                    onClick={() => handleReturn(_id)}
                >
                    Return
                </button>
            </div>
        </div>
    );
};

export default BorrowedBooksCard;
