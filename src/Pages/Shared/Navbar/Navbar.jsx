import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDarkMode } from "react-icons/md";
import { HashLink } from "react-router-hash-link";

const Navbar = ({ handleTheme, theme }) => {

    const { user, logOut } = useContext(AuthContext);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const navItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/all">All Books</Link></li>
        <li><Link to="/add">Add Books</Link></li>
        <li><Link to="/added">All Added Books</Link></li>
        <li><Link to="/borrow">Borrowed Books</Link></li>
        <li><Link to="/login">Login</Link></li>
    </>

    return (
        <div>
            <div className="navbar bg-base-100 p-2">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    <a className="font-bold text-lg md:text-xl lg:text-2xl">LibraGenius</a><img className="w-8 lg:ml-2" src="https://i.ibb.co/K5wQ7fD/download-26.jpg" alt="" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex justify-end mr-4">
                        <button onClick={handleTheme} className="btn bg-red-100 hover:bg-red-200">
                            <MdOutlineDarkMode />
                        </button>
                    </div>
                    {user?.email ? <>
                        <div className="tooltip relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
                            <button className="w-10 mr-3">
                                <img className="rounded-full lg:w-10 lg:h-10" src={user.photoURL} alt="" />
                            </button>
                            {showTooltip &&
                                <div className="tooltip-text absolute bg-base-200 text-base-content p-2 rounded-md shadow-md mt-2 w-auto">
                                    {user?.email}
                                </div>
                            }
                        </div>
                        <button onClick={handleLogOut} className='btn bg-sky-400 hover:bg-sky-600 hover:text-white'>Log Out</button>
                    </>
                        : <li><button className="btn bg-sky-400 hover:bg-sky-600 hover:text-white"><Link to="/login">Login</Link></button></li>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;