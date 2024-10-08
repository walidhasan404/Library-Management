import { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";

const BookDetails = () => {
    const book = useLoaderData();
    const { user } = useContext(AuthContext);
    const [isBorrowed, setIsBorrowed] = useState(false);
    const { _id, image, name, author, category, description, rating } = book;

    useEffect(() => {
        const checkIfBorrowed = async () => {
            if (user?.email) {
                try {
                    const token = localStorage.getItem('access-token');
                    const response = await axios.get(`https://library-management-server-tau.vercel.app/borrow?email=${user.email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                    const borrowedBooks = response.data;
                    const isAlreadyBorrowed = borrowedBooks.some(borrowedBook => borrowedBook._id === _id);
                    setIsBorrowed(isAlreadyBorrowed);
                } catch (error) {
                    console.error('Error checking borrowed books:', error);
                }
            }
        };

        checkIfBorrowed();
    }, [user, _id]);

    const handleBorrowBtn = () => {
        document.getElementById('borrow-modal').showModal();
    };

    const handleBorrow = async (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;

        const borrowedBook = {
            _id,
            name,
            email,
            date,
            image,
            author,
            category,
            rating,
        };

        try {
            const response = await fetch(`https://library-management-server-tau.vercel.app/book/${_id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                },
                body: JSON.stringify(borrowedBook)
            });
            const data = await response.json();
            if (data.success) {
                setIsBorrowed(true);
                document.getElementById('borrow-modal').close();
            }
        } catch (error) {
            console.error('Error borrowing book:', error);
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
                    <p className="text-base font-medium">Author: <span className="text-sm font-normal">{author}</span></p>
                    <p className="text-base font-medium">Category: <span className="text-sm font-normal">{category}</span></p>
                    <p className="text-base font-medium">Rating: <span className="text-sm font-normal">{rating}</span></p>
                    <p className="text-base font-medium">Quantity: <span className="text-sm font-normal">{book.quantity}</span></p>
                    <button 
                        className={`btn bg-sky-200 hover:bg-sky-400 my-2 ${isBorrowed ? 'cursor-not-allowed opacity-50' : ''}`} 
                        onClick={handleBorrowBtn} 
                        disabled={isBorrowed}
                    >
                        {isBorrowed ? 'Already Borrowed' : 'Borrow'}
                    </button>
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
                                    <span className="label-text">Date</span>
                                </label>
                                <input type="date" required name="date" className="input input-bordered" defaultValue={new Date().toISOString().split('T')[0]} />
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
