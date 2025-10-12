import Swal from 'sweetalert2'
import { useLoaderData } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';

const UpdateBooks = () => {

    const updateBook = useLoaderData();
    const { _id, image, name, author_name, author, category, rating } = updateBook;

    const handleUpdateBook = event => {
        event.preventDefault();
        const form = event.target;
        const image = form.image.value;
        const name = form.name.value;
        const author = form.author.value;
        const category = form.category.value;
        const rating = form.rating.value;

        const updatedBook = {
            image,
            name,
            author_name: author, // Backend expects author_name
            category,
            rating: parseFloat(rating)
        };
        
        const token = localStorage.getItem('access-token');
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
        <div className="m-4 p-2 bg-blue-50">
            <h2 className="text-center text-xl font-semibold">Update this book</h2>
            <form onSubmit={handleUpdateBook}>
                <div>
                    <div className="flex gap-3 mb-4">
                        <div className="w-1/2">
                            <label className="input input-bordered flex items-center w-full gap-2">
                                <input name="name" defaultValue={name} type="text" className="grow" placeholder="Name" />
                            </label>
                        </div>
                        <div className="w-1/2">
                            <label className="input input-bordered flex items-center w-full gap-2">
                                <input name="author" defaultValue={author_name || author} type="text" className="grow" placeholder="Author Name" />
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 mb-4">
                        <div className="w-1/2">
                            <label className="input input-bordered flex items-center w-full gap-2">
                                <input name="image" defaultValue={image} type="text" className="grow" placeholder="Image URL" />
                            </label>
                        </div>
                        <div>
                            <label className="select select-bordered">
                                <span className="select-content navbar-end">
                                    <select name="category" defaultValue={category}>
                                        <option disabled>Choose Category</option>
                                        <option value="Novel">Novel</option>
                                        <option value="Science Fiction">Science Fiction</option>
                                        <option value="Horror">Horror</option>
                                        <option value="Thriller">Thriller</option>
                                    </select>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 mb-4">
                        <div className="w-1/2">
                            <label className="input input-bordered flex items-center w-full gap-2">
                                <input name="rating" defaultValue={rating} type="text" className="grow" placeholder="Rating" />
                            </label>
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