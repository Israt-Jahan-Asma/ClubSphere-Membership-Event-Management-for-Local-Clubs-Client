import React, { useEffect, useState, useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { Link } from 'react-router';
import { Users, Heart, DollarSign, Activity, Eye, Edit, Trash2, MapPin, Calendar, Clock } from 'lucide-react';

const MainDashboard = () => {
    const { user, role } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalDonors: 0, totalRequests: 0, totalFunding: 0 });
    const [recentRequests, setRecentRequests] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            if (role === 'admin' || role === 'volunteer') {
                axiosSecure.get('/admin-stats')
                    .then(res => setStats(res.data))
                    .catch(err => console.error("Stats error:", err));
            }

            axiosSecure.get(`/my-requests-recent?email=${user.email}&role=${role}`)
                .then(res => setRecentRequests(res.data))
                .catch(err => console.error("Recent requests error:", err));
        }
    }, [user, role, axiosSecure]);

    return (
        <div className="space-y-8 p-2 md:p-6">
            {/* Welcome Section */}
            <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden text-white border border-slate-800">
                <div className="relative z-10">
                    <span className="px-4 py-1 bg-[#ea0606] text-xs font-black uppercase rounded-full tracking-widest mb-4 inline-block">
                        {role} Dashboard
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black">
                        Welcome, <span className="text-[#ea0606]">{user?.displayName}</span>! 👋
                    </h1>
                    <p className="text-slate-400 mt-3 text-lg max-w-xl">
                        Monitor platform health, manage requests, and save lives today.
                    </p>
                </div>
                <Activity className="absolute -right-16 -bottom-16 text-white/5 w-80 h-80" />
            </div>

            {/* Statistics Cards */}
            {(role === 'admin' || role === 'volunteer') && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard icon={<Users size={28} />} title="Total Donors" value={stats.totalDonors} color="bg-red-50 text-[#ea0606]" />
                    <StatCard icon={<DollarSign size={28} />} title="Total Funding" value={`$${stats.totalFunding}`} color="bg-green-50 text-green-600" />
                    <StatCard icon={<Heart size={28} />} title="Total Requests" value={stats.totalRequests} color="bg-blue-50 text-blue-600" />
                </div>
            )}

            {/* Recent Requests Table - Synchronized Design */}
            {recentRequests.length > 0 ? (
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-2xl font-black text-slate-900">
                            {role === 'donor' ? "My Recent Requests" : "Recent Platform Activity"}
                        </h2>
                        <Link
                            to={role === 'donor' ? "/dashboard/my-donation-requests" : "/dashboard/all-blood-donation-request"}
                            className="text-[#ea0606] font-bold text-sm hover:underline flex items-center gap-2"
                        >
                            View All Data ➔
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Matching Black Header */}
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="py-5 pl-8 text-[10px] uppercase tracking-widest font-bold">Recipient</th>
                                    <th className="text-[10px] uppercase tracking-widest font-bold">Location</th>
                                    <th className="text-[10px] uppercase tracking-widest font-bold">Date & Time</th>
                                    <th className="text-[10px] uppercase tracking-widest font-bold">Blood Group</th>
                                    <th className="text-[10px] uppercase tracking-widest font-bold">Status</th>
                                    <th className="pr-8 text-right text-[10px] uppercase tracking-widest font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentRequests.map((req) => (
                                    <tr key={req._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 pl-8">
                                            <p className="font-bold text-slate-900">{req.recipientName}</p>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2 text-slate-600 text-xs">
                                                <MapPin size={14} className="text-[#ea0606]" />
                                                {req.district}, {req.upazila}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="space-y-1 text-xs text-slate-500">
                                                <div className="flex items-center gap-1 font-medium text-slate-700">
                                                    <Calendar size={12} /> {req.donationDate}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={12} /> {req.donationTime}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className='bg-red-50 text-[#ea0606] font-bold px-3 py-1 rounded-full text-xs border border-red-100'>
                                                {req.bloodGroup}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${req.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                                                    req.status === 'inprogress' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="pr-8 text-right">
                                            <div className="flex justify-end gap-1">
                                                <Link title="View" to={`/request-details/${req._id}`} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all"><Eye size={18} /></Link>
                                                {(role === 'admin' || role === 'donor') && (
                                                    <>
                                                        <Link title="Edit" to={`/dashboard/edit-request/${req._id}`} className="p-2 hover:bg-blue-50 rounded-xl text-blue-600 transition-all"><Edit size={18} /></Link>
                                                        <button title="Delete" className="p-2 hover:bg-red-50 rounded-xl text-[#ea0606] transition-all"><Trash2 size={18} /></button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
                    <Heart className="mx-auto text-slate-100 w-16 h-16 mb-4" />
                    <p className="text-slate-400 font-medium">No recent requests found.</p>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md transition-all group">
        <div className={`${color} p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">{title}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">{value}</h3>
        </div>
    </div>
);

export default MainDashboard;