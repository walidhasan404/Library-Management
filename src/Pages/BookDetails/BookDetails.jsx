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
    const { _id, image, name, author, author_name, category, description, rating } = book;

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
            bookName: name,  // Use book's name, not form input
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
        <div>
            <div className="mx-2 p-4">
                <h3 className="my-4 text-2xl text-center font-bold">Book Details</h3>
                <h3 className="text-center text-base font-medium my-2">{name}</h3>
                <img className="mb-2 mx-auto w-96 h-96 object-cover" src={image} alt={name} />
                <p className="text-center">{description}</p>
                <div className="p-2 text-center">
                    <p className="text-base font-medium">Author: <span className="text-sm font-normal">{author || author_name}</span></p>
                    <p className="text-base font-medium">Category: <span className="text-sm font-normal">{category}</span></p>
                    <p className="text-base font-medium">Rating: <span className="text-sm font-normal">{rating}</span></p>
                    <p className="text-base font-medium">Quantity: <span className="text-sm font-normal">{book.quantity}</span></p>
                    <div className="flex gap-2 justify-center">
                        <button 
                            className={`btn bg-sky-200 hover:bg-sky-400 my-2 ${(isBorrowed || isAdmin) ? 'cursor-not-allowed opacity-50' : ''}`} 
                            onClick={handleBorrowBtn} 
                            disabled={isBorrowed || isAdmin}
                        >
                            {isAdmin ? 'Admins Cannot Borrow' : isBorrowed ? 'Already Borrowed' : user ? 'Borrow' : 'Login to Borrow'}
                        </button>
                        {user?.email && (
                            <Link to={`/updateBook/${_id}`} className="btn bg-green-200 hover:bg-green-400 my-2">
                                Update Book
                            </Link>
                        )}
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
