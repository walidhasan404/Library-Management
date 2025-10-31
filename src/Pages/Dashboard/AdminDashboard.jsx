import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { FaBook, FaUsers, FaBookReader, FaSignOutAlt, FaPlus, FaEdit, FaClock, FaBars, FaTimes, FaHome } from 'react-icons/fa';
import axios from 'axios';
import { API_ENDPOINTS, dataTransformers } from '../../config/api';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../Components/LoadingSpinner';

const AdminDashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const [pendingReturns, setPendingReturns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    const sidebarMenuItems = [
        {
            title: 'Dashboard',
            icon: <FaHome className="text-xl" />,
            link: '/dashboard',
            exact: true
        },
        {
            title: 'All Books',
            icon: <FaBook className="text-xl" />,
            link: '/all'
        },
        {
            title: 'Added Books',
            icon: <FaBook className="text-xl" />,
            link: '/added'
        },
        {
            title: 'Borrowed Books',
            icon: <FaBookReader className="text-xl" />,
            link: '/borrow'
        },
        {
            title: 'Users',
            icon: <FaUsers className="text-xl" />,
            link: '/users'
        }
    ];

    const dashboardCards = [
        {
            title: 'Added Books',
            description: 'Manage books added by users',
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

    const isActiveLink = (link, exact = false) => {
        if (exact) {
            return location.pathname === link;
        }
        return location.pathname.startsWith(link);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 flex">
            {/* Sidebar - Fixed on large screens */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 bg-gradient-to-b from-purple-700 to-purple-800 dark:from-slate-900 dark:to-slate-800
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                shadow-2xl lg:shadow-none
            `}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-purple-600 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <FaUsers className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-white font-bold text-lg">Admin Panel</h2>
                                    <p className="text-purple-200 text-xs">Library Management</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                        <div className="mt-4">
                            <p className="text-purple-200 text-sm truncate">{user?.displayName || user?.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold">
                                Administrator
                            </span>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            {sidebarMenuItems.map((item, index) => {
                                const isActive = isActiveLink(item.link, item.exact);
                                return (
                                    <li key={index}>
                                        <Link
                                            to={item.link}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`
                                                flex items-center gap-3 px-4 py-3 rounded-lg
                                                transition-all duration-200
                                                ${isActive 
                                                    ? 'bg-white text-purple-700 shadow-lg font-semibold' 
                                                    : 'text-purple-100 hover:bg-white/10 hover:text-white'
                                                }
                                            `}
                                        >
                                            <span className={isActive ? 'text-purple-700' : 'text-purple-200'}>
                                                {item.icon}
                                            </span>
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-purple-600 dark:border-slate-700">
                        <button
                            onClick={handleLogOut}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-semibold"
                        >
                            <FaSignOutAlt className="text-xl" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700 sticky top-0 z-30">
                    <div className="px-4 py-4 flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors"
                        >
                            <FaBars className="text-xl" />
                        </button>
                        <div className="flex-1 lg:ml-0 ml-4">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {user?.displayName || user?.email}</p>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Admin Notice</h3>
                                <p className="text-sm opacity-90">
                                    As an administrator, you have full access to manage the library system. 
                                    Note: Admins cannot borrow books.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;

