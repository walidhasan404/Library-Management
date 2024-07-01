import React, { useContext, useEffect, useState } from 'react';
import AddedBooksCard from './AddedBooksCard';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';

const AddedBooks = () => {

    const { user } = useContext(AuthContext);

    const [books, setBooks] = useState([]);


    const url = 'https://library-management-server-tau.vercel.app/added'
    useEffect(() => {

        axios.get(url)
            .then(res => {
                setBooks(res.data);
            })
    }, [url])

    return (
        <div className='bg-lime-50 p-2'>
            <h3 className="text-3xl text-center font-bold">All Added Books</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2 my-3">
                {
                    books.map(book => <AddedBooksCard
                        key={book._id}
                        book={book}
                    ></AddedBooksCard>)
                }
            </div>
        </div>
    );
};

export default AddedBooks;