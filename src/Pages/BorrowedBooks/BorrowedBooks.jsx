import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BorrowedBooksCard from "./BorrowedBooksCard";
import axios from "axios";

const BorrowedBooks = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleReturn = (id) => {
        axios.delete(`https://library-management-server-tau.vercel.app/delete/${id}`)
            .then(response => {
                const remaining = books.filter(book => book._id !== id);
                setBooks(remaining);
            })
            .catch(error => {
                console.error('Error returning book:', error);
                setError('Failed to return the book.');
            });
    };

    useEffect(() => {
        if (user?.email) {
            const token = localStorage.getItem('access-token');
            const url = `https://library-management-server-tau.vercel.app/borrow?email=${user.email}`;
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })
            .then(res => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching borrowed books:', error);
                setError('Failed to fetch borrowed books.');
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [user?.email]);
    


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl text-center font-semibold">Your Borrowed Books</h2>
            {books.length === 0 ? (
                <p className="text-center">You have not borrowed any books.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-3 my-3">
                    {books.map(book => (
                        <BorrowedBooksCard
                            key={book._id}
                            book={book}
                            handleReturn={handleReturn}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BorrowedBooks;
