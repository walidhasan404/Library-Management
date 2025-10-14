import { Link } from "react-router-dom";

const BooksTable = ({ books, isAdmin }) => {
    return (
        <div className="overflow-x-auto bg-white dark:bg-slate-300 p-4 rounded-lg shadow-md">
            <table className="table-auto w-full text-left">
                <thead>
                    <tr className="bg-gray-100 dark:bg-slate-400">
                        <th className="px-4 py-2 text-gray-600 dark:text-gray-800 font-semibold">Image</th>
                        <th className="px-4 py-2 text-gray-600 dark:text-gray-800 font-semibold">Name</th>
                        <th className="px-4 py-2 text-gray-600 dark:text-gray-800 font-semibold">Author</th>
                        <th className="px-4 py-2 text-gray-600 dark:text-gray-800 font-semibold">Category</th>
                        <th className="px-4 py-2 text-gray-600 dark:text-gray-800 font-semibold">Rating</th>
                        <th className="px-4 py-2 text-gray-600 dark:text-gray-800 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book._id} className="border-b dark:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-400 transition-all duration-200">
                            <td className="px-4 py-2">
                                <img src={book.image} alt={book.name} className="h-12 w-12 object-cover rounded-lg shadow-sm" />
                            </td>
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-900 font-medium">{book.name}</td>
                            <td className="px-4 py-2 text-gray-600 dark:text-gray-800">{book.author || book.author_name}</td>
                            <td className="px-4 py-2 text-gray-600 dark:text-gray-800">{book.category}</td>
                            <td className="px-4 py-2 text-gray-600 dark:text-gray-800">{book.rating}</td>
                            <td className="px-4 py-2">
                                <div className="flex gap-2">
                                    {isAdmin && (
                                        <Link to={`/updateBook/${book._id}`}>
                                            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-200">
                                                Update
                                            </button>
                                        </Link>
                                    )}
                                    <Link to={`/book/${book._id}`}>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-200">
                                            {isAdmin ? 'View' : 'View Details'}
                                        </button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BooksTable;
