

const AddedBooksCard = ({ book }) => {

    const { _id, image, name, author_name, category, rating, status } = book;
    console.log(book);
    return (
        <div className="">
            <div className="card w-96 h-full bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={image} alt="Books" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{category}</p>
                    <p>{author_name}</p>
                    <div className="badge badge-outline">{status}</div>
                </div>
            </div>
        </div>
    );
};

export default AddedBooksCard;