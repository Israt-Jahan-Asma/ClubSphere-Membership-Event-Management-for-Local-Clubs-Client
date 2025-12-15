import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Menu, X, Users, LogIn, UserPlus, LogOut } from "lucide-react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate();
    const links = (
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/clubs'>Donation Requests</NavLink></li>
            <li><NavLink to='/events'>Search Donors</NavLink></li>

        </>
    );
    const handleLogout = async () => {
        try {
            await logOut();
            toast.success('Logged out successfully')
            navigate("/login");
        } catch (err) {
            console.error(err);
            toast.warning('Logout failed')
        }
    };
    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className="glass mx-4 mt-4 rounded-2xl">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="navbar">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    {links}
                                </ul>
                            </div>
                            <a className="btn btn-ghost text-xl">BloodLink</a>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {links}
                            </ul>
                        </div>
                        <div className="navbar-end">
                            <Link to={'/dashboard'} className="btn mr-3"> Dashboard</Link>
                            {
                                user ? <button onClick={handleLogout} className=" flex items-center justify-center" >
                                    <LogOut size={18} /> 
                                    Logout
                                </button >
                                    : <Link className=" flex items-center justify-center" to={'/login'}> 
                                        <UserPlus className="h-4 w-4 mr-2" /> Login
                                    </Link>
                            }
                        </div>

                    </div>

                </div>
            </nav>
        </header>
    );
};

export default Navbar;
