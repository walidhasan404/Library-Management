import Swal from 'sweetalert2'
import { useLoaderData, Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';
import { useState, useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const UpdateBooks = () => {
    const updateBook = useLoaderData();
    const { _id, image, name, author_name, author, category, rating } = updateBook;
    const { user } = useContext(AuthContext);
    
    const [selectedCategory, setSelectedCategory] = useState(category || 'CSE');
    const categories = ['CSE', 'EEE', 'Civil', 'Non-Tech'];

    const handleUpdateBook = event => {
        event.preventDefault();
        
        // Check if user is logged in
        const token = localStorage.getItem('access-token');
        if (!token) {
            Swal.fire({
                title: "Login Required",
                text: "Please log in to update books.",
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
        const image = form.image.value;
        const name = form.name.value;
        const author = form.author.value;
        const category = selectedCategory; // Use selected category from tabs
        const rating = parseFloat(form.rating.value);

        const updatedBook = {
            image,
            name,
            author_name: author, // Backend expects author_name
            category,
            rating: parseFloat(rating)
            // Note: user and email are automatically handled by backend from JWT token
        };
        
        fetch(API_ENDPOINTS.BOOK_BY_ID(_id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedBook)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    Swal.fire({
                        title: "Good job!",
                        text: "This Book updated successfully",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: data.message || "Failed to update the book",
                        icon: "error"
                    });
                }
            })
            .catch(error => {
                console.error('Error updating book:', error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update the book. Please try again.",
                    icon: "error"
                });
            });

    };


    return (
        <div className="m-4 p-2 bg-blue-50 dark:bg-slate-800 min-h-screen">
            <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white">Update this book</h2>
            
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200 text-center">
                    <strong>Note:</strong> You need to be logged in to update books. 
                    <Link to="/login" className="text-yellow-600 dark:text-yellow-400 hover:underline ml-1">
                        Click here to login
                    </Link>
                </p>
            </div>
            
            <form onSubmit={handleUpdateBook}>
                <div>
                    <div className="flex gap-3 mb-4">
                        <div className="w-1/2">
                            <label className="input input-bordered dark:bg-slate-600 dark:border-slate-500 flex items-center w-full gap-2">
                                <input name="name" defaultValue={name} type="text" className="grow dark:text-white" placeholder="Name" />
                            </label>
                        </div>
                        <div className="w-1/2">
                            <label className="input input-bordered dark:bg-slate-600 dark:border-slate-500 flex items-center w-full gap-2">
                                <input name="author" defaultValue={author_name || author} type="text" className="grow dark:text-white" placeholder="Author Name" />
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 mb-4">
                        <div className="w-1/2">
                            <label className="input input-bordered dark:bg-slate-600 dark:border-slate-500 flex items-center w-full gap-2">
                                <input name="image" defaultValue={image} type="text" className="grow dark:text-white" placeholder="Image URL" />
                            </label>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            selectedCategory === cat
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-500'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <input type="hidden" name="category" value={selectedCategory} />
                        </div>
                    </div>
                    <div className="flex gap-3 mb-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                            <input 
                                name="rating" 
                                defaultValue={rating} 
                                type="number" 
                                min="0" 
                                max="5" 
                                step="0.1" 
                                className="input input-bordered dark:bg-slate-600 dark:border-slate-500 dark:text-white w-full" 
                                placeholder="Rating (0.0-5.0)" 
                            />
                        </div>
                    </div>
                    <div className="mt-4 mx-2">
                        <input type="submit" value="Submit" className="btn btn-primary my-4 w-full" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateBooks;