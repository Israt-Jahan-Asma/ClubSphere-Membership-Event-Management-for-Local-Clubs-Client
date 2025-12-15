import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";

const CreateRequest = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const axiosInstance = useAxios()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.target;

        const requestData = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recipientName: form.recipientName.value,
            bloodGroup: form.bloodGroup.value,
            district: form.district.value,
            upazila: form.upazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
            status: "pending",
            createdAt: new Date().toISOString(),
        };


        try {
            const res = await axiosInstance.post(
              "/products", requestData
            );
            console.log(res.data);
            toast.success("Request Created Successfully!");
          } catch (error) {
            console.error(error);
            toast.error("Failed to create request");
          } finally {
            setIsLoading(false);
          }
        }
          

    return (
        <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-2xl shadow">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Create Donation Request</h1>
                <p className="text-base-content/60">
                    Fill in the details to request blood donation
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Requester Info */}
                <div className="grid md:grid-cols-2 gap-4 p-4 rounded-xl bg-base-200">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Requester Name</span>
                        </label>
                        <input
                            value={user?.displayName || ""}
                            disabled
                            className="input input-bordered w-full h-12"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Requester Email</span>
                        </label>
                        <input
                            value={user?.email || ""}
                            disabled
                            className="input input-bordered w-full h-12"
                        />
                    </div>
                </div>

                {/* Recipient Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Recipient Name *</span>
                    </label>
                    <input
                        name="recipientName"
                        required
                        placeholder="Enter recipient's name"
                        className="input input-bordered w-full h-12"
                    />
                </div>

                {/* Blood Group */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Blood Group Required *</span>
                    </label>
                    <select
                        name="bloodGroup"
                        required
                        className="select select-bordered w-full h-12"
                    >
                        <option value="">Select blood group</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>O+</option>
                        <option>O-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                    </select>
                </div>

                {/* District & Upazila */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipient District *</span>
                        </label>
                        <select
                            name="district"
                            required
                            className="select select-bordered w-full h-12"
                        >
                            <option value="">Select district</option>
                            <option>Dhaka</option>
                            <option>Chattogram</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipient Upazila *</span>
                        </label>
                        <select
                            name="upazila"
                            required
                            className="select select-bordered w-full h-12"
                        >
                            <option value="">Select upazila</option>
                            <option>Dhanmondi</option>
                            <option>Mirpur</option>
                        </select>
                    </div>
                </div>

                {/* Hospital */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Hospital Name *</span>
                    </label>
                    <input
                        name="hospitalName"
                        required
                        placeholder="e.g., Dhaka Medical College Hospital"
                        className="input input-bordered w-full h-12"
                    />
                </div>

                {/* Address */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Full Address *</span>
                    </label>
                    <textarea
                        name="fullAddress"
                        required
                        placeholder="e.g., Zahir Raihan Rd, Dhaka"
                        className="textarea textarea-bordered w-full min-h-[100px]"
                    />
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Donation Date *</span>
                        </label>
                        <input
                            type="date"
                            name="donationDate"
                            required
                            className="input input-bordered w-full h-12"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Donation Time *</span>
                        </label>
                        <input
                            type="time"
                            name="donationTime"
                            required
                            className="input input-bordered w-full h-12"
                        />
                    </div>
                </div>

                {/* Message */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Request Message *</span>
                    </label>
                    <textarea
                        name="requestMessage"
                        required
                        placeholder="Explain why you need blood..."
                        className="textarea textarea-bordered w-full min-h-[120px]"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-error w-full h-12 text-base font-semibold"
                >
                    {isLoading ? "Creating Request..." : "Create Donation Request"}
                </button>
            </form>
        </div>
    );
};

export default CreateRequest;
