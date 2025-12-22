import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { LogIn, LogOut, LayoutDashboard, Search, HeartHandshake, Home, HandCoins } from "lucide-react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success('Logged out successfully');
            navigate("/login");
        } catch (err) {
            console.error(err);
            toast.error('Logout failed');
        }
    };

    // Shared links for both Guest and User
    const commonLinks = (
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/donation-requests'>Donation Requests</NavLink></li>
            {/* Show Funding links only if logged in */}
            {user && <li><NavLink to='/donate'>Donate</NavLink></li>}
           
        </>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className="glass mx-4 mt-4 rounded-2xl border border-white/20 shadow-lg bg-white/10 backdrop-blur-md">
                <div className="container mx-auto px-2">
                    <div className="navbar">
                        {/* Navbar Start: Logo & Mobile Menu */}
                        <div className="navbar-start">
                            <div className="dropdown">
                                <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium">
                                    {commonLinks}
                                </ul>
                            </div>
                            <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold gap-1 text-primary">
                                <span className="text-red-600">Blood</span>Link
                            </Link>
                        </div>

                        {/* Navbar Center: Desktop Menu */}
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1 gap-2 font-medium">
                                {commonLinks}
                            </ul>
                        </div>

                        {/* Navbar End: Auth Buttons / Avatar */}
                        <div className="navbar-end gap-2">
                            {user ? (
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary">
                                        <div className="w-10 rounded-full">
                                            <img 
                                                src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                                                alt="User Profile" 
                                            />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
                                        <li className="px-4 py-2 font-bold text-primary border-b border-base-200 mb-2">
                                            {user?.displayName || "User"}
                                        </li>
                                        <li>
                                            <Link to="/dashboard" className="flex items-center gap-2">
                                                <LayoutDashboard size={16} /> Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <Link to="/login" className="btn btn-primary btn-sm md:btn-md rounded-xl flex items-center gap-2">
                                        <LogIn size={18} /> Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;