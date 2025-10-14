import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import BorrowedBooksCard from "./BorrowedBooksCard";
import axios from "axios";
import { API_ENDPOINTS, dataTransformers } from "../../config/api";

const BorrowedBooks = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleReturn = async (id) => {
        try {
            const token = localStorage.getItem('access-token');
            await axios.patch(
                API_ENDPOINTS.RETURN_BOOK(id),
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                }
            );
            setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
        } catch (err) {
            console.error('Error returning book:', err);
            setError('Failed to return the book.');
        }
    };

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            if (user?.email) {
                const token = localStorage.getItem('access-token');
                try {
                    // Check admin status
                    const adminResponse = await axios.get(
                        API_ENDPOINTS.CHECK_ADMIN(user.email),
                        {
                            headers: { Authorization: `Bearer ${token}` },
                            withCredentials: true
                        }
                    );
                    const adminStatus = adminResponse.data.data?.admin || false;
                    setIsAdmin(adminStatus);

                    // Fetch borrowed books - admins get all, users get their own
                    const endpoint = adminStatus 
                        ? API_ENDPOINTS.ALL_BORROWED_BOOKS 
                        : `${API_ENDPOINTS.BORROWED_BOOKS}?email=${user.email}`;
                    
                    const response = await axios.get(endpoint, {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    });
                    // Handle new backend response format
                    const booksData = response.data.data || response.data;
                    const transformedBooks = booksData.map(book => dataTransformers.transformBorrowedBook(book));
                    setBooks(transformedBooks);
                } catch (err) {
                    console.error('Error fetching borrowed books:', err);
                    setError('Failed to fetch borrowed books.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchBorrowedBooks();
    }, [user?.email]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    // Show login prompt for non-authenticated users
    if (!user) {
    return (
        <div className="p-8">
                <h2 className="text-2xl text-center font-semibold mb-6">Borrowed Books</h2>
                <div className="text-center">
                    <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Login Required</h3>
                        <p className="text-blue-700 mb-4">
                            Please log in to view and manage borrowed books.
                        </p>
                        <Link 
                            to="/login" 
                            className="btn bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Go to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
                    {isAdmin ? 'All Borrowed Books' : 'Your Borrowed Books'}
                </h2>
                <p className="text-center text-gray-600">
                    {isAdmin ? 'View all borrowed books from all users' : 'Manage your borrowed books'}
                </p>
            </div>

            {books.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                    <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p className="text-xl text-gray-500">
                        {isAdmin ? 'No borrowed books found.' : 'You have not borrowed any books.'}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                <tr>
                                    <th className="text-center">#</th>
                                    <th>Book Name</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Rating</th>
                                    <th>Borrowed By</th>
                                    <th>Borrow Date</th>
                                    <th>Return Date</th>
                                    {!isAdmin && <th className="text-center">Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book, index) => {
                                    const formattedBorrowDate = new Date(book.borrowDate).toLocaleDateString();
                                    const formattedReturnDate = new Date(book.returnDate).toLocaleDateString();
                                    const isOverdue = new Date(book.returnDate) < new Date();
                                    
                                    return (
                                        <tr key={book._id} className="hover">
                                            <td className="text-center font-semibold">{index + 1}</td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={book.image} alt={book.bookName} />
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold">{book.bookName}</div>
                                                </div>
                                            </td>
                                            <td>{book.authorName}</td>
                                            <td>
                                                <span className="badge badge-info badge-sm">{book.category}</span>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-yellow-500">★</span>
                                                    <span>{book.rating || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="text-sm">{book.email}</td>
                                            <td>{formattedBorrowDate}</td>
                                            <td>
                                                <span className={`font-semibold ${isOverdue ? 'text-red-600' : 'text-green-600'}`}>
                                                    {formattedReturnDate}
                                                    {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
                                                </span>
                                            </td>
                                            {!isAdmin && (
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-sm btn-success"
                                                        onClick={() => handleReturn(book._id)}
                                                    >
                                                        Return
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-gray-50 border-t">
                        <p className="text-center text-gray-600">
                            Total Borrowed Books: <span className="font-bold text-blue-600">{books.length}</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BorrowedBooks;
BorrowedBooksCard