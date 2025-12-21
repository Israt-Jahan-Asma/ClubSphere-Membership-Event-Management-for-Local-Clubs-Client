import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../Hooks/useAxios';
import { Search, MapPin, Droplets, User, Phone } from 'lucide-react';

const SearchDonor = () => {
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const axiosInstance = useAxios();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Fetch JSON data for dropdowns
    useEffect(() => {
        axios.get('/district.json')
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : res.data.districts;
                setDistricts(data || []);
            });

        axios.get('/upazila.json')
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : res.data.upazilas;
                setUpazilas(data || []);
            });
    }, []);

    const handleSearch = (data) => {
        const { bloodGroup, district, upazila } = data;
        setLoading(true);
        setSearched(true);

        axiosInstance.get(`/search?bloodGroup=${encodeURIComponent(bloodGroup)}&district=${district}&upazila=${upazila}`)
            .then(res => {
                setDonors(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <div className="section-container min-h-screen pt-10 pb-20">
            {/* Header Section */}
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                    Find a <span className="text-[#ea0606]">Donor</span>
                </h2>
                <p className="text-slate-600">Enter the requirements below to find life-saving donors in your area.</p>
            </div>

            {/* Search Form Card */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-slate-100 max-w-5xl mx-auto">
                <form onSubmit={handleSubmit(handleSearch)} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

                    {/* Blood Group */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Blood Group</label>
                        <select
                            className={`input-field ${errors.bloodGroup ? 'border-red-500' : ''}`}
                            {...register("bloodGroup", { required: true })}
                            defaultValue=""
                        >
                            <option disabled value="">Select Group</option>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </div>

                    {/* District */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-700">District</label>
                        <select
                            className="input-field"
                            {...register("district" )}
                            defaultValue=""
                        >
                            <option value="" disabled>Select District</option>
                            {districts?.map(d => (
                                <option key={d.id} value={d.name}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Upazila */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Upazila</label>
                        <select
                            className="input-field"
                            {...register("upazila")}
                            defaultValue=""
                        >
                            <option value="" disabled>Select Upazila</option>
                            {upazilas.map(u => (
                                <option key={u.id} value={u.name}>{u.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Search Button */}
                    <button type="submit" className="btn-primary py-3 h-[50px] w-full" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : <><Search size={20} /> Search</>}
                    </button>
                </form>
                {errors.bloodGroup && <p className="text-[#ea0606] text-xs mt-2 font-medium">Please select a blood group.</p>}
            </div>

            {/* Results Section */}
            <div className="mt-16">
                {!searched && (
                    <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                        <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Search className="text-slate-300" size={32} />
                        </div>
                        <p className="text-slate-500 font-medium">Search results will appear here</p>
                    </div>
                )}

                {searched && donors.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {donors.map((donor) => (
                            <div key={donor._id} className="stats-card group hover:border-[#ea0606] transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-[#ea0606] font-black text-xl border-2 border-white shadow-sm">
                                        {donor.bloodGroup}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg capitalize">{donor.name}</h3>
                                        <div className="flex items-center gap-1 text-slate-500 text-sm">
                                            <MapPin size={14} /> {donor.upazila}, {donor.district}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 border-t pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Status</span>
                                        <span className="text-green-600 font-bold px-2 py-0.5 bg-green-50 rounded-full text-xs">Available</span>
                                    </div>
                                    <button className="btn-secondary w-full py-2 mt-2 text-sm">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {searched && !loading && donors.length === 0 && (
                    <div className="text-center py-20">
                        <Droplets className="mx-auto text-slate-300 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-slate-900">No Donors Found</h3>
                        <p className="text-slate-500">Try changing your location or blood group.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchDonor;