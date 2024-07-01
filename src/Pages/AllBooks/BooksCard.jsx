import { Link } from "react-router-dom";

const BooksCard = ({ book }) => {

    const { _id, image, name, author, quantity, category, rating } = book;

    return (
        <div>
            <div className="card w-96 h-full bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={image} alt="Books" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{author}</p>
                    <p><span className="card-title">Available:</span> {quantity}</p>
                    <div className="card-actions">
                        <Link to={`/updateBook/${_id}`}><button className="btn btn-primary">Update</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksCard;