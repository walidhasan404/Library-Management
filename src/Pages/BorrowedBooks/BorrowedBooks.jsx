import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BorrowedBooksCard from "./BorrowedBooksCard";
import axios from "axios";
import { API_ENDPOINTS, dataTransformers } from "../../config/api";

const BorrowedBooks = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    const response = await axios.get(`${API_ENDPOINTS.BORROWED_BOOKS}?email=${user.email}`, {
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

    return (
        <div className="p-8">
            <h2 className="text-2xl text-center font-semibold mb-6">Your Borrowed Books</h2>
            {books.length === 0 ? (
                <p className="text-center text-gray-500">You have not borrowed any books.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map(book => (
                        <BorrowedBooksCard
                            key={book._id}
                            book={book}
                            handleReturn={handleReturn}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BorrowedBooks;
BorrowedBooksCard