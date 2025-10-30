import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { FaBook, FaUsers, FaBookReader, FaSignOutAlt, FaPlus, FaEdit, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { API_ENDPOINTS, dataTransformers } from '../../config/api';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../Components/LoadingSpinner';

const AdminDashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [pendingReturns, setPendingReturns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
        fetchPendingReturns();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.BOOKS);
            const booksData = response.data.data || response.data;
            const transformedBooks = booksData.map(book => dataTransformers.transformBook(book));
            setBooks(transformedBooks);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingReturns = async () => {
        try {
            const token = localStorage.getItem('access-token');
            const response = await axios.get(API_ENDPOINTS.PENDING_RETURNS, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            const returnsData = response.data.data || [];
            setPendingReturns(returnsData);
        } catch (error) {
            console.error('Error fetching pending returns:', error);
        }
    };

    const handleConfirmReturn = async (borrowId) => {
        try {
            const token = localStorage.getItem('access-token');
            await axios.patch(
                API_ENDPOINTS.CONFIRM_RETURN(borrowId),
                { status: 'returned' },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                }
            );
            Swal.fire('Success!', 'Book return confirmed successfully.', 'success');
            // Refresh pending returns
            fetchPendingReturns();
        } catch (error) {
            console.error('Error confirming return:', error);
            Swal.fire('Error!', 'Failed to confirm return.', 'error');
        }
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {})
            .catch(error => console.log(error));
    };

    const dashboardCards = [
        {
            title: 'Suggested Books',
            description: 'View all book suggestions from users',
            icon: <FaPlus className="text-5xl" />,
            link: '/add',
            color: 'from-blue-500 to-blue-600',
            hoverColor: 'hover:from-blue-600 hover:to-blue-700'
        },
        {
            title: 'Added Books',
            description: 'Manage books you have added',
            icon: <FaBook className="text-5xl" />,
            link: '/added',
            color: 'from-green-500 to-green-600',
            hoverColor: 'hover:from-green-600 hover:to-green-700'
        },
        {
            title: 'All Borrowed Books',
            description: 'View all borrowed books by users',
            icon: <FaBookReader className="text-5xl" />,
            link: '/borrow',
            color: 'from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-600 hover:to-purple-700'
        },
        {
            title: 'Users Management',
            description: 'Manage all registered users',
            icon: <FaUsers className="text-5xl" />,
            link: '/users',
            color: 'from-orange-500 to-orange-600',
            hoverColor: 'hover:from-orange-600 hover:to-orange-700'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 py-12 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                        <FaUsers className="text-3xl text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">Welcome back, {user?.displayName || user?.email}</p>
                    <div className="mt-2">
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full text-sm font-semibold shadow-md">
                            Administrator
                        </span>
                    </div>
                </div>

                {/* Pending Returns Section */}
                {pendingReturns.length > 0 && (
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-xl p-6 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FaClock className="text-3xl text-white" />
                            <div>
                                <h2 className="text-2xl font-bold text-white">Pending Return Requests</h2>
                                <p className="text-white/90 text-sm">{pendingReturns.length} request{pendingReturns.length > 1 ? 's' : ''} awaiting confirmation</p>
                            </div>
                        </div>
                        <div className="bg-white/90 dark:bg-slate-800/90 rounded-xl p-4 mb-2">
                            <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold mb-2">
                                {pendingReturns[0]?.bookName || 'Book'} - Return Request from {pendingReturns[0]?.user?.name || pendingReturns[0]?.email}
                            </p>
                            <button
                                onClick={() => handleConfirmReturn(pendingReturns[0]._id)}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105"
                            >
                                Confirm Return
                            </button>
                        </div>
                        {pendingReturns.length > 1 && (
                            <p className="text-white text-sm text-center mt-2">
                                + {pendingReturns.length - 1} more request{pendingReturns.length > 2 ? 's' : ''}
                            </p>
                        )}
                    </div>
                )}

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {dashboardCards.map((card, index) => (
                        <Link
                            key={index}
                            to={card.link}
                            className={`bg-gradient-to-br ${card.color} ${card.hoverColor} text-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 opacity-90">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                                <p className="text-sm opacity-90">{card.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            to="/all"
                            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-colors"
                        >
                            <FaBook className="text-2xl text-blue-600 dark:text-blue-400" />
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200">View All Books</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Browse the library</p>
                            </div>
                        </Link>
                        <Link
                            to="/add"
                            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-xl transition-colors"
                        >
                            <FaPlus className="text-2xl text-green-600 dark:text-green-400" />
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Suggest Books</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Add new suggestions</p>
                            </div>
                        </Link>
                        <Link
                            to="/users"
                            className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-xl transition-colors"
                        >
                            <FaUsers className="text-2xl text-orange-600 dark:text-orange-400" />
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Manage Users</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">User administration</p>
                            </div>
                        </Link>
                    </div>
                </div>
                

                {/* Admin Info */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Admin Notice</h3>
                            <p className="text-sm opacity-90">
                                As an administrator, you have full access to manage the library system. 
                                Note: Admins cannot borrow books.
                            </p>
                        </div>
                        <button
                            onClick={handleLogOut}
                            className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors shadow-md"
                        >
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

