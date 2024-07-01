import ReactRating from 'react-rating';
import { Link } from 'react-router-dom';

const BooksCard = ({ book }) => {

    const { _id, image, name, author, category, rating } = book;
    console.log(_id);

    return (
        <div>
            <div className="card w-96 h-full bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={image} alt="Books" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p><span className="font-medium">Author: </span>{author}</p>
                    <p><span className="font-medium">Category: </span>{category}</p>
                    <p>
                        <ReactRating
                            initialRating={rating}
                        />
                    </p>
                    <p>{rating}</p>
                    <div className="card-actions">
                        <Link to={`/book/${_id}`}><button className="btn btn-primary">Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksCard;