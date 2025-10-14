import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { FaBook, FaUsers, FaBookReader, FaSignOutAlt, FaPlus, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { API_ENDPOINTS, dataTransformers } from '../../config/api';

const AdminDashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                        <FaUsers className="text-3xl text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600 text-lg">Welcome back, {user?.displayName || user?.email}</p>
                    <div className="mt-2">
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full text-sm font-semibold shadow-md">
                            Administrator
                        </span>
                    </div>
                </div>

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
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            to="/all"
                            className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                        >
                            <FaBook className="text-2xl text-blue-600" />
                            <div>
                                <h3 className="font-semibold text-gray-800">View All Books</h3>
                                <p className="text-sm text-gray-600">Browse the library</p>
                            </div>
                        </Link>
                        <Link
                            to="/add"
                            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
                        >
                            <FaPlus className="text-2xl text-green-600" />
                            <div>
                                <h3 className="font-semibold text-gray-800">Suggest Books</h3>
                                <p className="text-sm text-gray-600">Add new suggestions</p>
                            </div>
                        </Link>
                        <Link
                            to="/users"
                            className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
                        >
                            <FaUsers className="text-2xl text-orange-600" />
                            <div>
                                <h3 className="font-semibold text-gray-800">Manage Users</h3>
                                <p className="text-sm text-gray-600">User administration</p>
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

