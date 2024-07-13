import ReactRating from 'react-rating';

const BorrowedBooksCard = ({ book, handleReturn }) => {
    const { _id, image, name, author, category, rating, email, date } = book;
    const borrowDate = new Date(date);
    const returnDate = new Date(borrowDate.getTime() + 15 * 24 * 60 * 60 * 1000);
    const formattedReturnDate = returnDate.toDateString();
    return (
        <div>
            <div className="card w-96 h-full bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={image} alt="Books" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <p><span className="font-medium">Author: </span>{author}</p>
                    <p><span className="font-medium">Category: </span>{category}</p>
                    <p>
                        <ReactRating
                            initialRating={rating}
                        />
                    </p>
                    <p>{rating}</p>
                    <h2 className=""><span className='text-lg font-medium'>Collected by:</span> {name}</h2>
                    <p><span className='text-lg font-medium'>Email:</span> {email}</p>
                    <div>
                        <p><span className='text-lg font-medium'>Borrowed in:</span> {date}</p>
                        <p><span className='text-lg font-medium'>Return by:</span> {formattedReturnDate}</p>
                         <button className="btn btn-accent " onClick={()=>handleReturn(_id)}>Return</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BorrowedBooksCard;
