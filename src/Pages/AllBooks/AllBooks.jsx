import { useEffect, useState } from "react";
import BooksCard from "./BooksCard";
import BooksTable from "./BooksTable";
import { FaTableList } from "react-icons/fa6";
import { IoIosCard } from "react-icons/io";
import { API_ENDPOINTS, dataTransformers } from "../../config/api";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [view, setView] = useState('card');

    useEffect(() => {
        // Fetch books from MongoDB database
        fetch(API_ENDPOINTS.BOOKS)
            .then(res => res.json())
            .then(data => {
                // Handle backend response format
                const booksData = data.data || data; // Backend returns { success: true, data: [...] }
                const transformedBooks = booksData.map(book => dataTransformers.transformBook(book));
                setBooks(transformedBooks);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    const toggleView = () => {
        setView(prevView => prevView === 'card' ? 'table' : 'card');
    };

    const handleSort = () => {
        const sortedBooks = [...books].sort((a, b) => a.quantity - b.quantity);
        setBooks(sortedBooks);
    };

    return (
        <div className="bg-white dark:bg-slate-400 p-6 rounded-lg shadow-md">
            <h3 className="text-3xl text-center py-4 font-bold text-gray-800 dark:text-white">Library Collection</h3>
            <div className="flex justify-end mb-4">
                <button 
                    onClick={toggleView} 
                    className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 transition ease-in-out duration-200 p-2 rounded-md"
                    aria-label={view === 'card' ? 'Switch to Table View' : 'Switch to Card View'}
                >
                    {view === 'card' ? <FaTableList /> : <IoIosCard />}
                </button>
                {view === 'card' && (
                    <button 
                        onClick={handleSort} 
                        className="btn btn-primary ml-3 p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition ease-in-out duration-200"
                    >
                        Sort by Quantity
                    </button>
                )}
            </div>
            {view === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map(book => (
                        <BooksCard key={book._id} book={book} />
                    ))}
                </div>
            ) : (
                <BooksTable books={books} />
            )}
        </div>
    );
};

export default AllBooks;
