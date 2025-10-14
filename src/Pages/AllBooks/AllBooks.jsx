import { useEffect, useState, useContext } from "react";
import BooksCard from "./BooksCard";
import BooksTable from "./BooksTable";
import { FaTableList } from "react-icons/fa6";
import { IoIosCard } from "react-icons/io";
import { API_ENDPOINTS, dataTransformers } from "../../config/api";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";

const AllBooks = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [view, setView] = useState('card');
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);

    // Function to fetch books with pagination
    const fetchBooks = async (page = 1) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_ENDPOINTS.BOOKS}?page=${page}&limit=9`);
            const data = await response.json();
            
            if (data.success) {
                const booksData = data.data.books || [];
                const transformedBooks = booksData.map(book => dataTransformers.transformBook(book));
                setBooks(transformedBooks);
                setPagination(data.data.pagination);
                setCurrentPage(page);
            }
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
        fetchBooks(1); // Fetch first page
    }, [user]);

    const toggleView = () => {
        setView(prevView => prevView === 'card' ? 'table' : 'card');
    };

    const handleSort = () => {
        const sortedBooks = [...books].sort((a, b) => a.quantity - b.quantity);
        setBooks(sortedBooks);
    };

    const handlePageChange = (page) => {
        fetchBooks(page);
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
                <div className="flex justify-center items-center py-12">
                    <div className="loading loading-spinner loading-lg text-blue-600"></div>
                </div>
            )}

            {/* Books Display */}
            {!loading && (
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

                    {/* Pagination */}
                    {pagination?.totalPages > 1 && (
                        <div className="flex justify-center items-center mt-8 space-x-2">
                            {/* Previous Button */}
                            <button
                                onClick={() => handlePageChange(pagination.prevPage)}
                                disabled={!pagination.hasPrevPage}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    pagination.hasPrevPage
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                Previous
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        pageNum === pagination.currentPage
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-500'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            ))}

                            {/* Next Button */}
                            <button
                                onClick={() => handlePageChange(pagination.nextPage)}
                                disabled={!pagination.hasNextPage}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    pagination.hasNextPage
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {/* Pagination Info */}
                    {pagination?.totalBooks && (
                        <div className="text-center mt-4 text-gray-600 dark:text-gray-400">
                            Showing {books.length} of {pagination.totalBooks} books
                            {pagination?.totalPages > 1 && (
                                <span> • Page {pagination.currentPage} of {pagination.totalPages}</span>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllBooks;
