import { Link } from "react-router-dom";

const BooksTable = ({ books }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book._id}>
                            <td>
                                <img src={book.image} alt={book.name} className="h-12 w-12 object-cover rounded-lg" />
                            </td>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>{book.rating}</td>
                            <td>
                            <Link to={`/updateBook/${book._id}`}><button className="btn btn-primary">Update</button></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BooksTable;
