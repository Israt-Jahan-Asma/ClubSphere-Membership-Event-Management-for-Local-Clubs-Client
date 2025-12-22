import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { MoreVertical, UserCheck, ShieldAlert, UserPlus, ShieldCheck, Filter } from 'lucide-react';
import { toast } from 'react-toastify';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState(''); // '' (all), 'active', 'blocked'

    const fetchUsers = () => {
        const query = filter ? `?status=${filter}` : '';
        axiosSecure.get(`/users${query}`)
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchUsers();
    }, [axiosSecure, filter]);

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(() => {
                toast.success(`User is now ${status}`);
                fetchUsers();
            });
    };

    const handleRoleChange = (email, role) => {
        axiosSecure.patch(`/update/user/role?email=${email}&role=${role}`)
            .then(() => {
                toast.success(`User promoted to ${role}`);
                fetchUsers();
            });
    };

    return (
        <div className="space-y-6 p-2">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 gap-4">
                <h2 className="text-2xl font-black text-slate-900">User Management</h2>

                {/* <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                    <Filter size={18} className="ml-2 text-slate-400" />
                    <select
                        className="bg-transparent font-bold text-sm text-slate-600 outline-none pr-4"
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                    >
                        <option value="">All Statuses</option>
                        <option value="active">Active Members</option>
                        <option value="blocked">Blocked Members</option>
                    </select>
                </div> */}
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead className="bg-slate-900 text-white">
                            <tr>
                                <th className="py-6 pl-8 rounded-tl-[2.5rem] text-[10px] uppercase tracking-widest font-bold">User Details</th>
                                <th className="text-[10px] uppercase tracking-widest font-bold">Role</th>
                                <th className="text-[10px] uppercase tracking-widest font-bold">Status</th>
                                <th className="py-6 pr-8 rounded-tr-[2.5rem] text-right text-[10px] uppercase tracking-widest font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users?.map(user => (
                                <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-5 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-2xl ring-2 ring-slate-50">
                                                    <img src={user?.photoURL} alt={user?.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{user?.name}</div>
                                                <div className="text-xs text-slate-400">{user?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${user?.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                                                user?.role === 'volunteer' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {user?.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`flex items-center gap-1.5 text-xs font-bold ${user?.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${user?.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            {user?.status}
                                        </span>
                                    </td>
                                    <td className="py-5 pr-8 text-right">
                                        <div className="dropdown dropdown-left">
                                            <label tabIndex={0} className="btn btn-ghost btn-sm rounded-xl p-0 hover:bg-slate-100">
                                                <MoreVertical size={20} className="text-slate-400" />
                                            </label>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-white rounded-2xl w-52 border border-slate-100 mt-2">
                                                {/* Block/Unblock */}
                                                <li>
                                                    {user?.status === 'active' ? (
                                                        <button onClick={() => handleStatusChange(user?.email, 'blocked')} className="text-red-600 flex items-center gap-2">
                                                            <ShieldAlert size={16} /> Block User
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => handleStatusChange(user?.email, 'active')} className="text-green-600 flex items-center gap-2">
                                                            <UserCheck size={16} /> Activate User
                                                        </button>
                                                    )}
                                                </li>
                                                <div className="divider my-0"></div>
                                                {/* Role Management */}
                                                <li>
                                                    <button onClick={() => handleRoleChange(user?.email, 'volunteer')} className="flex items-center gap-2">
                                                        <UserPlus size={16} /> Make Volunteer
                                                    </button>
                                                </li>
                                                <li>
                                                    <button onClick={() => handleRoleChange(user?.email, 'admin')} className="flex items-center gap-2 font-bold text-purple-600">
                                                        <ShieldCheck size={16} /> Make Admin
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;