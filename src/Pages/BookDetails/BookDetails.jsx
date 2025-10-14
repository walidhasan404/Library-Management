import { useContext, useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { API_ENDPOINTS, dataTransformers } from "../../config/api";
import Swal from "sweetalert2";

const BookDetails = () => {
    const book = useLoaderData();
    const { user } = useContext(AuthContext);
    const [isBorrowed, setIsBorrowed] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { _id, image, name: bookName, author, author_name, category, description, shortDescription, rating } = book;

    useEffect(() => {
        const checkIfBorrowed = async () => {
            if (user?.email) {
                try {
                    const token = localStorage.getItem('access-token');
                    
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
                    
                    // Check borrowed books
                    const response = await axios.get(`${API_ENDPOINTS.BORROWED_BOOKS}?email=${user.email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                    const borrowedBooks = response.data.data || response.data;
                    const isAlreadyBorrowed = borrowedBooks.some(borrowedBook => borrowedBook.book === _id);
                    setIsBorrowed(isAlreadyBorrowed);
                } catch (error) {
                    console.error('Error checking borrowed books:', error);
                }
            }
        };

        checkIfBorrowed();
    }, [user, _id]);

    const handleBorrowBtn = () => {
        // Check if user is authenticated
        if (!user) {
            Swal.fire({
                title: 'Authentication Required',
                text: 'Please log in to borrow books. You need to be authenticated to borrow books.',
                icon: 'warning',
                confirmButtonText: 'Go to Login',
                showCancelButton: true,
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Navigate to login page
                    window.location.href = '/login';
                }
            });
            return;
        }
        document.getElementById('borrow-modal').showModal();
    };

    const handleBorrow = async (event) => {
        event.preventDefault();

        const form = event.target;
        const userName = form.name.value;
        const date = form.date.value;
        const email = user?.email;

        const borrowedBook = {
            bookId: _id,
            email,
            returnDate: date,
            bookName: bookName,  // Use book's name variable
            authorName: author_name || author,
            category,
            image,
            userName: userName || user?.displayName || user?.email  // Add user's name
        };

        console.log('Borrowing book with data:', borrowedBook);

        try {
            const response = await fetch(API_ENDPOINTS.BORROW_BOOK, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                },
                body: JSON.stringify(borrowedBook)
            });
            const data = await response.json();
            console.log('Borrow response:', data);
            
            if (data.success) {
                Swal.fire('Success!', 'Book borrowed successfully!', 'success');
                setIsBorrowed(true);
                document.getElementById('borrow-modal').close();
            } else {
                Swal.fire('Error!', data.message || 'Failed to borrow book', 'error');
            }
        } catch (error) {
            console.error('Error borrowing book:', error);
            Swal.fire('Error!', 'Failed to borrow book. Please try again.', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link to="/all" className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Back to All Books
                    </Link>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        {/* Left Side - Image */}
                        <div className="flex items-center justify-center">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                                <img 
                                    src={image} 
                                    alt={bookName} 
                                    className="relative w-full h-[500px] object-cover rounded-2xl shadow-xl"
                                />
                            </div>
                        </div>

                        {/* Right Side - Details */}
                        <div className="flex flex-col justify-center">
                            <div className="mb-6">
                                <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-full mb-4">
                                    {category}
                                </span>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                    {bookName}
                                </h1>
                                <p className="text-xl text-gray-600 mb-4">
                                    by <span className="font-semibold text-gray-800">{author || author_name}</span>
                                </p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-6 h-6 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-2xl font-bold text-gray-800">{rating}</span>
                                <span className="text-gray-600">/ 5.0</span>
                            </div>

                            {/* Short Description */}
                            {shortDescription && (
                                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-l-4 border-blue-500">
                                    <p className="text-gray-700 leading-relaxed italic">{shortDescription}</p>
                                </div>
                            )}

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">About This Book</h3>
                                <p className="text-gray-600 leading-relaxed">{description || shortDescription || 'No description available.'}</p>
                            </div>

                            {/* Availability */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${book.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="font-semibold text-gray-800">
                                        {book.quantity > 0 ? 'Available' : 'Not Available'}
                                    </span>
                                </div>
                                <div className="text-gray-600">
                                    <span className="font-semibold">{book.quantity}</span> copies in stock
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex gap-3">
                                {!isAdmin && (
                        <button 
                                        className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 ${
                                            (isBorrowed || isAdmin || book.quantity === 0) 
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105'
                                        }`}
                            onClick={handleBorrowBtn} 
                                        disabled={isBorrowed || isAdmin || book.quantity === 0}
                        >
                                        {isBorrowed ? '✓ Already Borrowed' : book.quantity === 0 ? 'Out of Stock' : user ? '📚 Borrow This Book' : '🔐 Login to Borrow'}
                        </button>
                                )}
                                {isAdmin && (
                                    <div className="flex-1 py-4 px-6 rounded-xl font-semibold text-lg bg-gradient-to-r from-gray-400 to-gray-500 text-white text-center">
                                        👑 Admin View Only
                                    </div>
                                )}
                            </div>

                            {/* Info Cards */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-blue-50 rounded-xl p-4 text-center">
                                    <p className="text-sm text-gray-600 mb-1">Category</p>
                                    <p className="font-bold text-gray-800">{category}</p>
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 text-center">
                                    <p className="text-sm text-gray-600 mb-1">Rating</p>
                                    <p className="font-bold text-gray-800">{rating} / 5.0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <dialog id="borrow-modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-sky-100">
                    <h3 className="font-bold text-center text-lg">Wanna Borrow?</h3>
                    <form onSubmit={handleBorrow}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" required defaultValue={user?.displayName} name="name" className="input input-bordered" readOnly />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Return Date</span>
                                </label>
                                <input 
                                    type="date" 
                                    required 
                                    name="date" 
                                    className="input input-bordered" 
                                    min={new Date().toISOString().split('T')[0]}
                                    max={(() => {
                                        const maxDate = new Date();
                                        maxDate.setMonth(maxDate.getMonth() + 1);
                                        return maxDate.toISOString().split('T')[0];
                                    })()}
                                    defaultValue={(() => {
                                        const defaultDate = new Date();
                                        defaultDate.setDate(defaultDate.getDate() + 7);
                                        return defaultDate.toISOString().split('T')[0];
                                    })()} 
                                />
                                <label className="label">
                                    <span className="label-text-alt text-gray-600">Max: 1 month from today</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" defaultValue={user?.email} className="input input-bordered" readOnly />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button
                                className={`btn bg-sky-200 hover:bg-sky-400 ${isBorrowed ? 'cursor-not-allowed opacity-50' : ''}`}
                                type="submit"
                                disabled={isBorrowed}
                            >
                                Borrow
                            </button>
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="button" onClick={() => document.getElementById('borrow-modal').close()}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default BookDetails;
