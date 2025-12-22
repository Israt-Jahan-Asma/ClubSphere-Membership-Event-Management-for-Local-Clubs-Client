import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { Edit, Eye, Trash2, MapPin, Calendar, Clock } from 'lucide-react';
import Swal from 'sweetalert2';

const MyDonationRequests = () => {
    const [myRequests, setMyRequests] = useState([])
    const [totalRequest, setTotalRequest] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState('')
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(`/my-donation-requests?size=${itemsPerPage}&page=${currentPage - 1}&status=${filter}`)
            .then(res => {
                setMyRequests(res.data.request);
                setTotalRequest(res.data.totalRequest)
            })
    }, [axiosSecure, currentPage, itemsPerPage, filter])

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };

    const numberOfPages = Math.ceil(totalRequest / itemsPerPage)
    const pages = [...Array(numberOfPages).keys().map(e => e + 1)]

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }
    const handleNext = () => {
        if (currentPage < pages.length) setCurrentPage(currentPage + 1)
    }

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/requests/status-update/${id}`, { status: newStatus });
            toast.success(`Request marked as ${newStatus}`);
            setMyRequests(prev => prev.map(r => r._id === id ? { ...r, status: newStatus } : r));
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ea0606",
            cancelButtonColor: "#0f172a",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/requests/${id}`);
                    if (res.data.deletedCount > 0) {
                        setMyRequests(prev => prev.filter(r => r._id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "The request has been removed.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        });
                    }
                } catch (err) {
                    Swal.fire("Error", "Failed to delete request.", "error");
                }
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Filter Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm gap-4">
                <h2 className="text-xl font-black text-slate-900">My Requests</h2>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider ">Filter By:</span>
                    <select
                        value={filter}
                        onChange={handleFilterChange}
                        className="select select-bordered rounded-xl border-slate-200 focus:outline-none focus:border-[#ea0606] font-bold text-slate-700"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-slate-900 text-white">
                            <tr>
                                <th className="py-5 pl-8 rounded-tl-[2rem]">#</th>
                                <th>Recipient</th>
                                <th>Location</th>
                                <th>Date & Time</th>
                                <th>Blood Group</th>
                                <th>Status</th>
                                <th className="text-center rounded-tr-[2rem] pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {myRequests.map((request, index) => (
                                <tr key={request._id} className="hover:bg-slate-50/50 transition-colors">
                                    <th className="pl-8 text-slate-400 font-medium">
                                        {(currentPage - 1) * itemsPerPage + (index + 1)}
                                    </th>
                                    <td>
                                        <p className="font-bold text-slate-900">{request.recipientName}</p>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <MapPin size={14} className="text-[#ea0606]" />
                                            <span>{request.district}, {request.upazila}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <Calendar size={12} /> {request.donationDate}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <Clock size={12} /> {request.donationTime}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className='bg-red-50 text-[#ea0606] font-bold px-3 py-1 rounded-full text-xs border border-red-100'>
                                            {request.bloodGroup}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex flex-col gap-2">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase w-fit ${request.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                                                    request.status === 'inprogress' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                                }`}>
                                                {request.status}
                                            </span>
                                            {request.status === 'inprogress' && (
                                                <div className="flex gap-1">
                                                    <button onClick={() => handleStatusUpdate(request._id, 'done')} className="btn btn-success btn-xs rounded-lg px-3">Done</button>
                                                    <button onClick={() => handleStatusUpdate(request._id, 'canceled')} className="btn btn-error btn-xs rounded-lg px-3">Cancel</button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="pr-8">
                                        <div className="flex justify-center gap-2">
                                            <Link title="Edit" to={`/dashboard/edit-request/${request._id}`} className="p-2 hover:bg-blue-50 rounded-xl text-blue-600 transition-all">
                                                <Edit size={18} />
                                            </Link>
                                            <button title="Delete" onClick={() => handleDelete(request._id)} className="p-2 hover:bg-red-50 rounded-xl text-[#ea0606] transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                            <Link title="View Details" to={`/request-details/${request._id}`} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-all">
                                                <Eye size={18} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalRequest > itemsPerPage && (
                <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500 font-medium mb-4 md:mb-0">
                        Showing <span className="text-slate-900">{myRequests.length}</span> of <span className="text-slate-900">{totalRequest}</span> requests
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors"
                        >
                            Prev
                        </button>
                        <div className="flex gap-1">
                            {pages.map(page => (
                                <button
                                    key={page}
                                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${page === currentPage
                                            ? "bg-[#ea0606] text-white shadow-lg shadow-red-200"
                                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                        }`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === pages.length}
                            className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyDonationRequests;