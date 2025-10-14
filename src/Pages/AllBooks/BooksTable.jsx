import { Link } from "react-router-dom";

const BooksTable = ({ books }) => {
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
                        <th className="px-4 py-2 text-gray-600 dark:text-gray-800 font-semibold">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book._id} className="border-b dark:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-400 transition-all duration-200">
                            <td className="px-4 py-2">
                                <img src={book.image} alt={book.name} className="h-12 w-12 object-cover rounded-lg shadow-sm" />
                            </td>
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-900 font-medium">{book.name}</td>
                            <td className="px-4 py-2 text-gray-600 dark:text-gray-800">{book.author}</td>
                            <td className="px-4 py-2 text-gray-600 dark:text-gray-800">{book.category}</td>
                            <td className="px-4 py-2 text-gray-600 dark:text-gray-800">{book.rating}</td>
                            <td className="px-4 py-2">
                                <Link to={`/book/${book._id}`}>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-200">
                                        View
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BooksTable;
