import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import Swal from 'sweetalert2';

const BookDetails = () => {
    const book = useLoaderData();
    const { user } = useContext(AuthContext);
    const [isBorrowed, setIsBorrowed] = useState(false);
    const [bookings, setBookings] = useState([]);
    const { _id, image, quantity, author, category, rating } = book;
    const [books, setBooks] = useState([]);
    const url = `https://library-management-server-tau.vercel.app/borrow?email=${user?.email}`
    useEffect(() => {

        axios.get(url, { withCredentials: true })
            .then(res => {
                setBooks(res.data);
            })
    }, [url])
    const handleConfirmBtn = () => {
        document.getElementById('my_modal_5').showModal();
        fetch(`https://library-management-server-tau.vercel.app/book/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    const remaining = bookings.filter(booking => booking._id !== _id);
                    const updated = bookings.find(booking => booking._id === _id);
                    updated.status = 'confirm'
                    const newBookings = [updated, ...remaining];
                    setBookings(newBookings);
                }
            })

    };

    const handleBorrow = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const date = new Date().toISOString().split('T')[0];
        const email = user?.email;

        const book = {
            name,
            email,
            date,
            image,
            author,
            category,
            rating,
        };

        fetch(`https://library-management-server-tau.vercel.app/book/${book._id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(book)
        })
            .then(res => res.json())
            .then(data => {
                setIsBorrowed(true);
                Swal.fire({
                    icon: 'success',
                    title: 'Book borrowed Successful',
                    text: 'Please return the book by given date',
                    confirmButtonText: 'OK'
                });
            })
            .catch(error => {
                console.error('Error borrowing book:', error);
            });
    };

    return (
        <div>
            <div className="mx-2 p-2">
                <h3 className="my-4 text-2xl text-center font-bold">Book Details</h3>
                <h3 className="text-center text-base font-medium my-2">{book.name}</h3>
                <img className="mb-2 mx-auto w-96" src={book.image} alt="" />
                <p className="text-center">{book.shortDescription}</p>
                <div className="p-2 text-center">
                    <p className="text-base font-medium">Author: <span className="text-sm font-normal">{book.author}</span></p>
                    <p className="text-base font-medium">Category: <span className="text-sm font-normal">{book.category}</span></p>
                    <p className="text-base font-medium">Quantity: <span className="text-sm font-normal">{book.quantity}</span></p>
                    {book.status === 'confirm' ? <span className="font-bold text-primary">Confirmed</span> :
                        <button onClick={() => handleConfirmBtn(_id)} className="btn btn-primary my-2">Borrow</button>}
                </div>
            </div>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-sky-100">
                    <h3 className="font-bold text-center text-lg">Wanna Borrow?</h3>
                    <form onSubmit={handleBorrow}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" required defaultValue={user?.displayName} name="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>
                                <input
                                    type="date"
                                    required
                                    name="date"
                                    disabled
                                    defaultValue={new Date().toISOString().split('T')[0]}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button
                                className="btn bg-sky-200 hover:bg-sky-400 my-2"
                                onClick={handleBorrow}
                                disabled={isBorrowed}
                            >
                                Borrow
                            </button>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default BookDetails;
