import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { MdOutlineDarkMode } from "react-icons/md";
import { API_ENDPOINTS } from "../../../config/api";
import axios from "axios";

const Navbar = ({ handleTheme, theme }) => {

    const { user, logOut } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
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
    }, [user]);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
        setDropdownOpen(false);
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const closeDropdown = () => {
        setDropdownOpen(false);
    }

    // Nav items for non-admin users
    const userNavItems = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/all">All Books</Link></li>
            <li><Link to="/add">Suggest Books</Link></li>
        </>
    );

    // Nav items for admin users (no suggest books)
    const adminNavItems = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/all">All Books</Link></li>
        </>
    );


    return (
        <div className="navbar bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost dark:text-white lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {!user?.email
                            ? userNavItems
                            : (isAdmin === true
                                ? adminNavItems
                                : (isAdmin === false ? userNavItems : adminNavItems))}
                    </ul>
                </div>
                <div className="flex items-center">
                    <a className="font-bold dark:text-white text-lg md:text-xl lg:text-2xl">TechVerse</a>
                    <img className="w-8 lg:ml-2" src="https://i.ibb.co/K5wQ7fD/download-26.jpg" alt="" />
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal dark:text-white px-1">
                    {!user?.email
                        ? userNavItems
                        : (isAdmin === true
                            ? adminNavItems
                            : (isAdmin === false ? userNavItems : adminNavItems))}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex items-center gap-2">
                    <button onClick={handleTheme} className="btn btn-ghost btn-sm hover:bg-gray-200 dark:hover:bg-gray-700">
                        <MdOutlineDarkMode className="text-2xl text-gray-700 dark:text-yellow-400" />
                    </button>
                    {user?.email ? (
                        <div className="dropdown dropdown-end">
                            <div 
                                tabIndex={0} 
                                role="button" 
                                className="btn btn-ghost btn-circle avatar"
                                onClick={toggleDropdown}
                            >
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img 
                                        src={user.photoURL || "https://via.placeholder.com/150"} 
                                        alt="User Avatar" 
                                    />
                                </div>
                            </div>
                            {dropdownOpen && (
                                <ul 
                                    tabIndex={0} 
                                    className="menu menu-sm dropdown-content mt-3 z-[9999] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-gray-200"
                                >
                                    <li className="menu-title">
                                        <span className="text-xs font-semibold">{user?.email}</span>
                                    </li>
                                    <li onClick={closeDropdown}>
                                        <Link to="/dashboard" className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li onClick={handleLogOut}>
                                        <a className="flex items-center gap-2 text-red-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="btn bg-sky-400 hover:bg-sky-600 hover:text-white">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;