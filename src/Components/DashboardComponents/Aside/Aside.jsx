import { Link, NavLink, useNavigate } from "react-router";
import { LayoutDashboard, Users, Calendar, Settings, LogOut, PlusCircle } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

export default function Aside() {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

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
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr] bg-gray-100">
            {/* Sidebar */}
            <aside className="bg-white shadow-lg p-5 ">
                <div className="py-7">
                    <Link to={'/'} className="text-2xl font-bold ">BloodLink</Link>
                </div>

                <nav className="space-y-2">
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`
                        }
                    >
                        <LayoutDashboard size={18} /> Dashboard
                    </NavLink>

                    <NavLink
                        to="/dashboard/users"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`
                        }
                    >
                        <Users size={18} /> Users
                    </NavLink>

                    <NavLink
                        to="/dashboard/events"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`
                        }
                    >
                        <Calendar size={18} /> Events
                    </NavLink>

                    <NavLink
                        to="/dashboard/create-request"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`
                        }
                    >
                        <PlusCircle size={18} /> Create Request
                    </NavLink>

                    <NavLink
                        to="/dashboard/settings"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`
                        }
                    >
                        <Settings size={18} /> Settings
                    </NavLink>
                </nav>

                <button
                    onClick={handleLogout} 
                    className="mt-10 flex items-center gap-3 text-red-600 hover:bg-red-50 p-3 rounded-lg w-full"
                >
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            
        </div>
    );
}
