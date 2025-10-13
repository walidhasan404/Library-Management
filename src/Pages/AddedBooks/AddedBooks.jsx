import React, { useContext, useEffect, useState } from 'react';
import AddedBooksCard from './AddedBooksCard';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';
import { API_ENDPOINTS, dataTransformers } from '../../config/api';

const AddedBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (user?.email) {
      const token = localStorage.getItem('access-token');
      axios.get(`${API_ENDPOINTS.ADDED_BOOKS}?email=${encodeURIComponent(user.email)}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      })
        .then(res => {
          // Handle new backend response format
          const booksData = res.data.data || res.data;
          const transformedBooks = booksData.map(book => dataTransformers.transformAddedBook(book));
          setBooks(transformedBooks);
        })
        .catch(error => {
          console.error('Error fetching added books:', error);
        });
    }
  }, [user]);

  return (
    <div className='bg-lime-50 p-2'>
      <h3 className="text-3xl text-center font-bold">Books You Added</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2 my-3">
        {
          books.length > 0 ? (
            books.map(book => (
              <AddedBooksCard
                key={book._id}
                book={book}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No books added yet.</p>
          )
        }
      </div>
    </div>
  );
};

export default AddedBooks;
