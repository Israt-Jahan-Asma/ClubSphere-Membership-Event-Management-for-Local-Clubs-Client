import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [requestData, setRequestData] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
        // Fetch existing request data
        console.log('Fetching request for ID:', id);
        axiosSecure.get(`/request-details/${id}`)
            .then(res => setRequestData(res.data))
            .catch(err => console.error(err));

        // Fetch location data for dropdowns
        axios.get('/district.json').then(res => setDistricts(res.data.districts));
        axios.get('/upazila.json').then(res => setUpazilas(res.data.upazilas));
    }, [id, axiosSecure]);
    

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedInfo = {
            recipientName: form.recipientName.value,
            bloodGroup: form.bloodGroup.value,
            district: form.district.value,
            upazila: form.upazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
        };

        try {
            const res = await axiosSecure.put(`/requests/update/${id}`, updatedInfo);
            if (res.data.modifiedCount > 0) {
                toast.success("Request updated successfully!");
                navigate('/dashboard/my-donation-requests');
            }
        } catch (error) {
            toast.error("Failed to update");
        }
    };

    if (!requestData) return <div className="p-10 text-center">Loading Data...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden">
                <div className="bg-[#ea0606] p-8 text-white">
                    <h2 className="text-3xl font-bold">Edit Donation Request</h2>
                    <p className="opacity-80">Modify your request details below</p>
                </div>

                <form onSubmit={handleUpdate} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label font-bold">Recipient Name</label>
                        <input name="recipientName" defaultValue={requestData.recipientName} className="input-field" required />
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">Blood Group</label>
                        <select name="bloodGroup" defaultValue={requestData.bloodGroup} className="input-field">
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg}>{bg}</option>)}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">District</label>
                        <select name="district" defaultValue={requestData.district} className="input-field">
                            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">Upazila</label>
                        <select name="upazila" defaultValue={requestData.upazila} className="input-field">
                            {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                        </select>
                    </div>

                    <div className="form-control md:col-span-2">
                        <label className="label font-bold">Hospital Name</label>
                        <input name="hospitalName" defaultValue={requestData.hospitalName} className="input-field" required />
                    </div>

                    <div className="form-control md:col-span-2">
                        <label className="label font-bold">Full Address</label>
                        <textarea name="fullAddress" defaultValue={requestData.fullAddress} className="input-field h-24" required />
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">Donation Date</label>
                        <input type="date" name="donationDate" defaultValue={requestData.donationDate} className="input-field" required />
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">Donation Time</label>
                        <input type="time" name="donationTime" defaultValue={requestData.donationTime} className="input-field" required />
                    </div>

                    <div className="form-control md:col-span-2">
                        <label className="label font-bold">Request Message</label>
                        <textarea name="requestMessage" defaultValue={requestData.requestMessage} className="input-field h-32" required />
                    </div>

                    <div className="md:col-span-2">
                        <button type="submit" className="btn-primary w-full py-4 text-lg">Update Donation Request</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRequest;