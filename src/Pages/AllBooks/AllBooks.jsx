import { useEffect, useState } from "react";
import BooksCard from "./BooksCard";
import BooksTable from "./BooksTable";
import { FaTableList } from "react-icons/fa6";
import { IoIosCard } from "react-icons/io";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [view, setView] = useState('card');

    useEffect(() => {
        fetch('https://library-management-server-tau.vercel.app/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data);
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
        <div>
            <h3 className="text-2xl text-center font-semibold">All Books</h3>
            <div className="flex justify-end mb-3">
                <button onClick={toggleView} className="btn bg-gray-200">{view === 'card' ? <FaTableList /> : <IoIosCard />}</button>
                {view === 'card' && <button onClick={handleSort} className="btn btn-primary ml-3">Sort by Quantity</button>}
            </div>
            {view === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2 my-3">
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
