import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2'

const AddBooks = () => {

    const { user } = useContext(AuthContext);

    const handleAddBooks = event => {
        event.preventDefault();
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
            quantity,
            author,
            category,
            description,
            rating,
            image
        };
        console.log(newBook);

        fetch(`https://library-management-server-tau.vercel.app/added/${newBook._id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: "Good job!",
                        text: "This book added successfully",
                        icon: "success"
                    });
                }
            });
    };


    return (
        <div>
            <div className='mx-6 p-3 bg-sky-50'>
                <h2 className='text-center text-3xl'>Add a Book</h2>
                <form onSubmit={handleAddBooks}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" className="input input-bordered" placeholder="Book Name" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Quantity</span>
                            </label>
                            <input type="number" name="quantity" className="input input-bordered" placeholder="Quantity" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Author</span>
                            </label>
                            <input type="text" name="author" className="input input-bordered" placeholder="Author Name" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <input type="text" name="category" className="input input-bordered" placeholder="Category" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Short Description</span>
                        </label>
                        <textarea name="description" className="textarea textarea-bordered" rows="3" placeholder="Short Description"></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <input type="number" name="rating" min="1" max="5" className="input input-bordered" placeholder="Rating (1-5)" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input type="text" name="image" className="input input-bordered" placeholder="Image URL" />
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary btn-block" type="submit" value="Add to Cart" />
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddBooks;