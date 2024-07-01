import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BorrowedBooksCard from "./BorrowedBooksCard";
import axios from "axios";

const BorrowedBooks = () => {

    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const handleReturn = (id) => {
        axios.delete(`https://library-management-server-tau.vercel.app/delete/${id}`)
            .then(response => {
                console.log(response.data);
            })
        const remaining = books.filter(book => book._id !== id);
        setBooks(remaining)
    };
    const url = `https://library-management-server-tau.vercel.app/borrow?email=${user?.email}`
    useEffect(() => {

        axios.get(url, { withCredentials: true })
            .then(res => {
                setBooks(res.data);
            })
    }, [url])

    return (
        <div>
            <h2 className="text-2xl text-center font-semibold">Your Borrowed Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-3 my-3">
                {
                    books.map(book => <BorrowedBooksCard
                        key={book._id}
                        book={book}
                        handleReturn={handleReturn}
                    ></BorrowedBooksCard>)
                }
            </div>
        </div>
    );
};

export default BorrowedBooks;