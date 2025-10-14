import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { FaBook, FaBookReader, FaSignOutAlt, FaPlus } from 'react-icons/fa';

const UserDashboard = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {})
            .catch(error => console.log(error));
    };

    const dashboardCards = [
        {
            title: 'Suggest Books',
            description: 'Suggest new books to the library',
            icon: <FaPlus className="text-5xl" />,
            link: '/add',
            color: 'from-blue-500 to-blue-600',
            hoverColor: 'hover:from-blue-600 hover:to-blue-700'
        },
        {
            title: 'My Borrowed Books',
            description: 'View and manage your borrowed books',
            icon: <FaBookReader className="text-5xl" />,
            link: '/borrow',
            color: 'from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-600 hover:to-purple-700'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 py-12 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                        <FaBook className="text-3xl text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">User Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">Welcome back, {user?.displayName || user?.email}</p>
                    <div className="mt-2">
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full text-sm font-semibold shadow-md">
                            Member
                        </span>
                    </div>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
                    {dashboardCards.map((card, index) => (
                        <Link
                            key={index}
                            to={card.link}
                            className={`bg-gradient-to-br ${card.color} ${card.hoverColor} text-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 opacity-90">
                                    {card.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                                <p className="text-base opacity-90">{card.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8 mb-8 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            to="/all"
                            className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                        >
                            <FaBook className="text-2xl text-blue-600" />
                            <div>
                                <h3 className="font-semibold text-gray-800">Browse Books</h3>
                                <p className="text-sm text-gray-600">View all available books</p>
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
                            to="/borrow"
                            className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
                        >
                            <FaBookReader className="text-2xl text-purple-600" />
                            <div>
                                <h3 className="font-semibold text-gray-800">My Books</h3>
                                <p className="text-sm text-gray-600">View borrowed books</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* User Info */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Library Member</h3>
                            <p className="text-sm opacity-90">
                                Explore our collection, borrow books, and suggest new additions to our library.
                            </p>
                        </div>
                        <button
                            onClick={handleLogOut}
                            className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-md"
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

export default UserDashboard;

