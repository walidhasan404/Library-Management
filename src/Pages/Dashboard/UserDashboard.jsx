import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { FaBook, FaBookReader, FaSignOutAlt, FaPlus, FaBars, FaTimes, FaHome } from 'react-icons/fa';

const UserDashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
            title: 'Suggest Books',
            icon: <FaPlus className="text-xl" />,
            link: '/add'
        },
        {
            title: 'My Borrowed Books',
            icon: <FaBookReader className="text-xl" />,
            link: '/borrow'
        }
    ];

    const isActiveLink = (link, exact = false) => {
        if (exact) {
            return location.pathname === link;
        }
        return location.pathname.startsWith(link);
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 flex">
            {/* Sidebar - Fixed on large screens */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 bg-gradient-to-b from-blue-700 to-blue-800 dark:from-slate-900 dark:to-slate-800
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                shadow-2xl lg:shadow-none
            `}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-blue-600 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <FaBook className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-white font-bold text-lg">User Panel</h2>
                                    <p className="text-blue-200 text-xs">Library Management</p>
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
                            <p className="text-blue-200 text-sm truncate">{user?.displayName || user?.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold">
                                Member
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
                                                    ? 'bg-white text-blue-700 shadow-lg font-semibold' 
                                                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                                                }
                                            `}
                                        >
                                            <span className={isActive ? 'text-blue-700' : 'text-blue-200'}>
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
                    <div className="p-4 border-t border-blue-600 dark:border-slate-700">
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
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User Dashboard</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {user?.displayName || user?.email}</p>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Browse Books</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">View all available books</p>
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
                                to="/borrow"
                                className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl transition-colors"
                            >
                                <FaBookReader className="text-2xl text-purple-600 dark:text-purple-400" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">My Books</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">View borrowed books</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Library Member</h3>
                                <p className="text-sm opacity-90">
                                    Explore our collection, borrow books, and suggest new additions to our library.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;

