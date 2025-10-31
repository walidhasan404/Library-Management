import { useEffect, useState, useContext } from "react";
import BooksCard from "./BooksCard";
import BooksTable from "./BooksTable";
import { FaTableList } from "react-icons/fa6";
import { IoIosCard } from "react-icons/io";
import { API_ENDPOINTS, dataTransformers } from "../../config/api";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import LoadingSpinner from "../../Components/LoadingSpinner";

const AllBooks = () => {
    const { user } = useContext(AuthContext);
    const [allBooks, setAllBooks] = useState([]); // Store all books
    const [books, setBooks] = useState([]); // Current page books
    const [view, setView] = useState('card');
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(9); // Items per page for client-side pagination
    const [loading, setLoading] = useState(false);

    // Function to update displayed books based on current page (client-side pagination)
    const updateDisplayedBooks = (allBooksArray, page) => {
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        const paginatedBooks = allBooksArray.slice(startIndex, endIndex);
        setBooks(paginatedBooks);
        setCurrentPage(page);
    };

    // Function to fetch all books
    const fetchAllBooks = async () => {
        setLoading(true);
        try {
            // Fetch all books by requesting with a very high limit
            let allBooksData = [];
            let page = 1;
            let hasMore = true;
            
            while (hasMore) {
                const response = await fetch(`${API_ENDPOINTS.BOOKS}?page=${page}&limit=100`);
                const data = await response.json();
                
                if (data.success && data.data.books) {
                    const booksData = data.data.books || [];
                    if (booksData.length === 0) {
                        hasMore = false;
                    } else {
                        allBooksData = [...allBooksData, ...booksData];
                        // Check if there are more pages
                        const paginationData = data.data.pagination || {};
                        if (!paginationData.hasNextPage || page >= 100) { // Safety limit
                            hasMore = false;
                        } else {
                            page++;
                        }
                    }
                } else {
                    hasMore = false;
                }
            }
            
            // Transform books and ensure uniqueness by _id
            const transformedBooks = allBooksData.map(book => dataTransformers.transformBook(book));
            
            // Remove duplicates based on _id
            const uniqueBooks = transformedBooks.filter((book, index, self) => 
                index === self.findIndex(b => b._id === book._id)
            );
            
            setAllBooks(uniqueBooks);
            updateDisplayedBooks(uniqueBooks, 1);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check admin status
        const checkAdminStatus = async () => {
            if (user?.email) {
                try {
                    const token = localStorage.getItem('access-token');
                    const response = await axios.get(
                        API_ENDPOINTS.CHECK_ADMIN(user.email),
                        {
                            headers: { Authorization: `Bearer ${token}` },
                            withCredentials: true
                        }
                    );
                    const adminStatus = response.data.data?.admin || false;
                    setIsAdmin(adminStatus);
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    setIsAdmin(false);
                }
            }
        };

        checkAdminStatus();
        fetchAllBooks(); // Fetch all books
    }, [user]);

    const toggleView = () => {
        setView(prevView => prevView === 'card' ? 'table' : 'card');
    };

    const handleSort = () => {
        const sortedBooks = [...allBooks].sort((a, b) => a.quantity - b.quantity);
        setAllBooks(sortedBooks);
        updateDisplayedBooks(sortedBooks, currentPage);
    };

    const handlePageChange = (page) => {
        updateDisplayedBooks(allBooks, page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h3 className="text-3xl text-center py-4 font-bold text-gray-800 dark:text-white">Library Collection</h3>
            <div className="flex justify-end mb-4">
                <button 
                    onClick={toggleView} 
                    className="btn bg-gray-200 dark:bg-slate-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-500 transition ease-in-out duration-200 p-2 rounded-md"
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
            
            {/* Loading State */}
            {loading && (
                <LoadingSpinner text="Loading books..." />
            )}

            {/* Books Display */}
            {!loading && (
                <>
                    {books.length === 0 ? (
                        <div className="flex flex-col justify-center items-center py-12">
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">No books found</p>
                            <p className="text-gray-500 dark:text-gray-500">Please check back later or contact the administrator.</p>
                        </div>
                    ) : (
                        <>
                            {view === 'card' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {books.map(book => (
                                        <BooksCard key={book._id} book={book} isAdmin={isAdmin} />
                                    ))}
                                </div>
                            ) : (
                                <BooksTable books={books} isAdmin={isAdmin} />
                            )}
                        </>
                    )}

                    {/* Pagination */}
                    {allBooks.length > booksPerPage && (
                        <div className="flex justify-center items-center mt-8 space-x-2">
                            {/* Previous Button */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    currentPage > 1
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                Previous
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: Math.ceil(allBooks.length / booksPerPage) }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        pageNum === currentPage
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-500'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            ))}

                            {/* Next Button */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= Math.ceil(allBooks.length / booksPerPage)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    currentPage < Math.ceil(allBooks.length / booksPerPage)
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {/* Pagination Info */}
                    {allBooks.length > 0 && (
                        <div className="text-center mt-4 text-gray-600 dark:text-gray-400">
                            Showing {books.length} of {allBooks.length} books
                            {allBooks.length > booksPerPage && (
                                <span> • Page {currentPage} of {Math.ceil(allBooks.length / booksPerPage)}</span>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllBooks;
