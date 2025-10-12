import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../../config/api';

const AddBooks = () => {
    const { user } = useContext(AuthContext);

    const handleAddBooks = (event) => {
        event.preventDefault();
        
        // Check if user is logged in
        const token = localStorage.getItem('access-token');
        if (!token) {
            Swal.fire({
                title: "Login Required",
                text: "Please log in to add books to the library.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Go to Login",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login';
                }
            });
            return;
        }

        const form = event.target;
        const name = form.name.value;
        const quantity = parseInt(form.quantity.value);
        const author = form.author.value;
        const category = form.category.value;
        const description = form.description.value;
        const rating = parseInt(form.rating.value);
        const image = form.image.value;

        const newBook = {
            name,
            author_name: author, // Backend expects author_name
            category,
            description,
            rating,
            image,
            isbn: '', // Optional field
            publishedYear: null // Optional field
        };

        fetch(API_ENDPOINTS.ADD_BOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newBook)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    Swal.fire({
                        title: "Success!",
                        text: "The book has been added to your suggestions and will appear in 'Added Books'.",
                        icon: "success"
                    });
                    form.reset();
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: data.message || "There was an error adding the book. Please try again.",
                        icon: "error"
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: "There was an error adding the book. Please try again.",
                    icon: "error"
                });
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Suggest a New Book</h2>
                <p className="text-center text-gray-600 mb-6">
                    Add book suggestions that will appear in your "Added Books" section
                </p>
                
                {!user && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800 text-center">
                            <strong>Note:</strong> You need to be logged in to suggest books. 
                            <Link to="/login" className="text-blue-600 hover:underline ml-1">
                                Click here to login
                            </Link>
                        </p>
                    </div>
                )}
                
                <form onSubmit={handleAddBooks} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label text-gray-600 font-medium">Book Name</label>
                            <input type="text" name="name" className="input input-bordered" placeholder="Enter book name" required />
                        </div>
                        <div className="form-control">
                            <label className="label text-gray-600 font-medium">Quantity</label>
                            <input type="number" name="quantity" className="input input-bordered" placeholder="Enter quantity" min="1" required />
                        </div>
                        <div className="form-control">
                            <label className="label text-gray-600 font-medium">Author</label>
                            <input type="text" name="author" className="input input-bordered" placeholder="Enter author name" required />
                        </div>
                        <div className="form-control">
                            <label className="label text-gray-600 font-medium">Category</label>
                            <input type="text" name="category" className="input input-bordered" placeholder="Enter category" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label text-gray-600 font-medium">Short Description</label>
                        <textarea name="description" className="textarea textarea-bordered" rows="3" placeholder="Enter a brief description" required></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label text-gray-600 font-medium">Rating</label>
                        <input type="number" name="rating" min="1" max="5" className="input input-bordered" placeholder="Enter rating (1-5)" required />
                    </div>
                    <div className="form-control">
                        <label className="label text-gray-600 font-medium">Image URL</label>
                        <input type="text" name="image" className="input input-bordered" placeholder="Enter image URL" required />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary w-full text-lg">Suggest Book</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBooks;
