import { Link, NavLink, useNavigate } from "react-router";
import { LayoutDashboard, Users, User, LogOut, PlusCircle, Heart, ClipboardList, Settings, DollarSign } from "lucide-react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

export default function Aside() {
    const { logOut, role } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success('Logged out successfully');
            navigate("/login");
        } catch (err) {
            console.error(err);
            toast.warning('Logout failed');
        }
    };

    // Style helper for NavLinks
    const navLinkStyles = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive
            ? "bg-[#ea0606] text-white shadow-lg shadow-red-200"
            : "text-slate-600 hover:bg-red-50 hover:text-[#ea0606]"
        }`;

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-slate-100 flex flex-col p-6 sticky top-0">
            {/* Logo Section */}
            <div className="mb-10 flex items-center gap-2">
                <div className="bg-[#ea0606] p-2 rounded-lg">
                    <Heart className="text-white" size={24} fill="currentColor" />
                </div>
                <Link to="/" className="text-2xl font-black text-slate-900 tracking-tight">
                    Blood<span className="text-[#ea0606]">Link</span>
                </Link>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">General</p>

                <NavLink to="/dashboard" end className={navLinkStyles}>
                    <LayoutDashboard size={20} /> Dashboard
                </NavLink>

                <NavLink to="/dashboard/profile" className={navLinkStyles}>
                    <User size={20} /> Profile
                </NavLink>

                {/* --- ADMIN & VOLUNTEER SECTION --- */}
                {(role === 'admin' || role === 'volunteer') && (
                    <>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-6 mb-4 px-2">Management</p>

                        <NavLink to="/dashboard/all-blood-donation-request" className={navLinkStyles}>
                            <ClipboardList size={20} /> All Requests
                        </NavLink>

                        {role === 'admin' && (
                            <NavLink to="/dashboard/all-users" className={navLinkStyles}>
                                <Users size={20} /> All Users
                            </NavLink>
                        )}
 
                    </>
                )}
               

                {/* --- DONOR SECTION --- */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-6 mb-4 px-2">Donations</p>

                <NavLink to="/dashboard/my-donation-requests" className={navLinkStyles}>
                    <Settings size={20} /> My Requests
                </NavLink>

                <NavLink to="/dashboard/create-donation-request" className={navLinkStyles}>
                    <PlusCircle size={20} /> Create Request
                </NavLink>

                <NavLink to="/dashboard/funding" className={navLinkStyles}>
                    <DollarSign size={20} /> Funding
                </NavLink>
            </nav>

            

            {/* Bottom Section */}
            <div className="mt-auto pt-6 border-t border-slate-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 font-bold hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </aside>
    );
}