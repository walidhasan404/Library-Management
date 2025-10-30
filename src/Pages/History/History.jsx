import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import { Link } from "react-router-dom";

const History = () => {
    const { user } = useContext(AuthContext);
    const [historyBooks, setHistoryBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (user?.email) {
                try {
                    const token = localStorage.getItem('access-token');
                    // Fetch returned books for history
                    const response = await axios.get(
                        `${API_ENDPOINTS.BORROWED_BOOKS}?email=${user.email}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                            withCredentials: true,
                            params: { status: 'returned' }
                        }
                    );
                    const booksData = response.data.data || [];
                    setHistoryBooks(booksData);
                } catch (err) {
                    console.error('Error fetching history:', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user?.email]);

    if (loading) {
        return <div className="text-center p-8">Loading history...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
                    Your Borrowing History
                </h2>
                <p className="text-center text-gray-600">
                    View all the books you have returned
                </p>
            </div>

            {historyBooks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                    <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xl text-gray-500">No history yet.</p>
                    <p className="text-gray-400 mt-2">Borrow and return books to see your history here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {historyBooks.map((book) => (
                        <div key={book._id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                            <div className="p-4">
                                <div className="flex items-start gap-3">
                                    <img 
                                        src={book.image} 
                                        alt={book.bookName} 
                                        className="w-16 h-20 object-cover rounded"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/64x80/4F46E5/FFFFFF?text=Book';
                                        }}
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-gray-800">{book.bookName}</h3>
                                        <p className="text-sm text-gray-600">By {book.authorName}</p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="badge badge-success badge-sm">Returned</span>
                                        </div>
                                        <Link 
                                            to={`/book/${book.book?._id || book.book}`}
                                            className="btn btn-sm btn-primary mt-3"
                                        >
                                            View Book
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;