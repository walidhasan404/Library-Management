import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import BorrowedBooksCard from "./BorrowedBooksCard";
import axios from "axios";
import { API_ENDPOINTS, dataTransformers } from "../../config/api";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner";

const BorrowedBooks = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleReturn = async (id) => {
        try {
            const token = localStorage.getItem('access-token');
            const response = await axios.patch(
                API_ENDPOINTS.RETURN_BOOK(id),
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                }
            );
            Swal.fire('Success!', 'Return request submitted. Waiting for admin confirmation.', 'success');
            // Update the book status to return_pending
            setBooks(prevBooks => 
                prevBooks.map(book => 
                    book._id === id 
                        ? { ...book, status: 'return_pending' } 
                        : book
                )
            );
        } catch (err) {
            console.error('Error returning book:', err);
            Swal.fire('Error!', err.response?.data?.message || 'Failed to submit return request.', 'error');
        }
    };

    const handleEditReturnDate = async (bookId, currentReturnDate, editCount) => {
        // Check if edit limit reached
        if (editCount >= 2) {
            Swal.fire('Limit Reached', 'You can only edit the return date 2 times.', 'warning');
            return;
        }

        // Calculate max date (1 month from now)
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 1);
        const maxDateStr = maxDate.toISOString().split('T')[0];

        // Get today's date for min date
        const today = new Date().toISOString().split('T')[0];

        const { value: newDate } = await Swal.fire({
            title: 'Edit Return Date',
            html: `
                <p class="mb-4">Edits remaining: <strong>${2 - editCount}</strong></p>
                <input type="date" id="return-date" class="swal2-input" 
                    value="${new Date(currentReturnDate).toISOString().split('T')[0]}"
                    min="${today}"
                    max="${maxDateStr}">
                <p class="text-sm text-gray-600 mt-2">Maximum: 1 month from today</p>
            `,
            showCancelButton: true,
            confirmButtonText: 'Update',
            preConfirm: () => {
                const dateInput = document.getElementById('return-date').value;
                if (!dateInput) {
                    Swal.showValidationMessage('Please select a date');
                    return false;
                }
                return dateInput;
            }
        });

        if (newDate) {
            try {
                const token = localStorage.getItem('access-token');
                const response = await axios.patch(
                    API_ENDPOINTS.UPDATE_RETURN_DATE(bookId),
                    { returnDate: newDate },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    }
                );

                if (response.data.success) {
                    Swal.fire('Success!', 'Return date updated successfully!', 'success');
                    // Refresh the list
                    const endpoint = isAdmin 
                        ? API_ENDPOINTS.ALL_BORROWED_BOOKS 
                        : `${API_ENDPOINTS.BORROWED_BOOKS}?email=${user.email}`;
                    
                    const refreshResponse = await axios.get(endpoint, {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    });
                    const booksData = refreshResponse.data.data || refreshResponse.data;
                    const transformedBooks = booksData.map(book => dataTransformers.transformBorrowedBook(book));
                    setBooks(transformedBooks);
                }
            } catch (err) {
                console.error('Error updating return date:', err);
                Swal.fire('Error!', err.response?.data?.message || 'Failed to update return date.', 'error');
            }
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
        return <LoadingSpinner text="Loading borrowed books..." />;
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
                {isAdmin && (
                    <div className="mt-4 text-center">
                        <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                            Pending Returns: {books.filter(book => book.status === 'return_pending').length}
                        </span>
                    </div>
                )}
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
                            <thead className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                                <tr>
                                    <th className="text-center font-semibold py-4">#</th>
                                    <th className="font-semibold py-4">Book Name</th>
                                    <th className="font-semibold py-4">Author</th>
                                    <th className="font-semibold py-4">Category</th>
                                    <th className="font-semibold py-4">Rating</th>
                                    <th className="font-semibold py-4">Borrowed By</th>
                                    <th className="font-semibold py-4">Status</th>
                                    <th className="font-semibold py-4">Borrow Date</th>
                                    <th className="font-semibold py-4">Return Date</th>
                                    <th className="text-center font-semibold py-4">Action</th>
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
                                            <td className="text-sm">{book.userName || book.email}</td>
                                            <td>
                                                {book.status === 'return_pending' && (
                                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200 whitespace-nowrap">
                                                        Pending Return
                                                    </span>
                                                )}
                                                {book.status === 'borrowed' && (
                                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200 whitespace-nowrap">
                                                        Borrowed
                                                    </span>
                                                )}
                                                {book.status === 'returned' && (
                                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200 whitespace-nowrap">
                                                        Returned
                                                    </span>
                                                )}
                                            </td>
                                            <td>{formattedBorrowDate}</td>
                                            <td>
                                                <span className={`font-semibold ${isOverdue ? 'text-red-600' : 'text-green-600'}`}>
                                                    {formattedReturnDate}
                                                    {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                {isAdmin ? (
                                                    // Admin actions
                                                    <div className="flex gap-2 justify-center">
                                                                                                            {book.status === 'return_pending' && (
                                                        <>
                                                            <button
                                                                className="btn btn-sm btn-success"
                                                                onClick={async () => {
                                                                    try {
                                                                        const token = localStorage.getItem('access-token');
                                                                        await axios.patch(
                                                                            API_ENDPOINTS.CONFIRM_RETURN(book._id),
                                                                            { status: 'returned' },
                                                                            {
                                                                                headers: { Authorization: `Bearer ${token}` },
                                                                                withCredentials: true
                                                                            }
                                                                        );
                                                                        Swal.fire('Success!', 'Return confirmed! Book quantity increased.', 'success');
                                                                        // Remove from list
                                                                        setBooks(prevBooks => prevBooks.filter(b => b._id !== book._id));
                                                                    } catch (err) {
                                                                        console.error('Error confirming return:', err);
                                                                        Swal.fire('Error!', 'Failed to confirm return.', 'error');
                                                                    }
                                                                }}
                                                            >
                                                                Confirm Return
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-error"
                                                                onClick={async () => {
                                                                    const result = await Swal.fire({
                                                                        title: 'Are you sure?',
                                                                        text: 'This will reject the return request and keep the book as borrowed.',
                                                                        icon: 'warning',
                                                                        showCancelButton: true,
                                                                        confirmButtonText: 'Yes, reject it!',
                                                                        cancelButtonText: 'Cancel'
                                                                    });

                                                                    if (result.isConfirmed) {
                                                                        try {
                                                                            const token = localStorage.getItem('access-token');
                                                                            await axios.patch(
                                                                                API_ENDPOINTS.CONFIRM_RETURN(book._id),
                                                                                { status: 'borrowed' },
                                                                                {
                                                                                    headers: { Authorization: `Bearer ${token}` },
                                                                                    withCredentials: true
                                                                                }
                                                                            );
                                                                            Swal.fire('Rejected!', 'Return request has been rejected.', 'success');
                                                                            // Update status back to borrowed
                                                                            setBooks(prevBooks => 
                                                                                prevBooks.map(b => 
                                                                                    b._id === book._id 
                                                                                        ? { ...b, status: 'borrowed' } 
                                                                                        : b
                                                                                )
                                                                            );
                                                                        } catch (err) {
                                                                            console.error('Error rejecting return:', err);
                                                                            Swal.fire('Error!', 'Failed to reject return.', 'error');
                                                                        }
                                                                    }
                                                                }}
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    </div>
                                                ) : (
                                                    // User actions
                                                    book.status === 'borrowed' && (
                                                        <div className="flex gap-2 justify-center">
                                                            <button
                                                                className="btn btn-sm btn-info"
                                                                onClick={() => handleEditReturnDate(book._id, book.returnDate, book.returnDateEditCount || 0)}
                                                                title="Edit Return Date"
                                                            >
                                                                Edit Date
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-success"
                                                                onClick={() => handleReturn(book._id)}
                                                            >
                                                                Return
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </td>
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