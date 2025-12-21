import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { Heart, Hospital, MapPin, Calendar, Clock, User, Phone } from "lucide-react";

const RequestDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [request, setRequest] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/request-details/${id}`)
        .then(res => setRequest(res.data));
    }, [id, axiosSecure]);

    const handleConfirmDonation = async (e) => {
        e.preventDefault();
        const donorInfo = {
            name: user?.displayName,
            email: user?.email
        };

        try {
            await axiosSecure.patch(`/requests/confirm/${id}`, donorInfo);
            toast.success("Thank you for choosing to donate!");
            document.getElementById('donation_modal').close();
            navigate('/donation-requests');
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    if (!request) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="section-container pt-10 pb-20">
            <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
                <div className="bg-[#ea0606] p-8 text-white text-center">
                    <Heart className="mx-auto mb-4" size={48} />
                    <h2 className="text-3xl font-bold">Donation Details</h2>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-8">
                    {/* Information List */}
                    <div className="space-y-4">
                        <DetailItem icon={<User />} label="Recipient" value={request.recipientName} />
                        <DetailItem icon={<Heart />} label="Blood Group" value={request.bloodGroup} color="text-red-600" />
                        <DetailItem icon={<Hospital />} label="Hospital" value={request.hospitalName} />
                        <DetailItem icon={<MapPin />} label="Address" value={request.fullAddress} />
                    </div>
                    <div className="space-y-4">
                        <DetailItem icon={<Calendar />} label="Date" value={request.donationDate} />
                        <DetailItem icon={<Clock />} label="Time" value={request.donationTime} />
                        <DetailItem icon={<MapPin />} label="Area" value={`${request.upazila}, ${request.district}`} />
                    </div>
                </div>

                <div className="px-8 pb-8 text-center">
                    <div className="bg-slate-50 p-6 rounded-2xl mb-8 text-left">
                        <h4 className="font-bold text-slate-900 mb-2">Message from Requester:</h4>
                        <p className="text-slate-600 italic">"{request.requestMessage}"</p>
                    </div>

                    <button
                        onClick={() => document.getElementById('donation_modal').showModal()}
                        className="btn-primary w-full md:w-auto px-12 py-4 text-lg"
                    >
                        Donate Now
                    </button>
                </div>
            </div>

            {/* Donation Modal */}
            <dialog id="donation_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-[2rem] p-8">
                    <h3 className="font-black text-2xl text-slate-900 mb-6">Confirm Donation</h3>
                    <form onSubmit={handleConfirmDonation} className="space-y-4">
                        <div>
                            <label className="label font-bold">Donor Name</label>
                            <input type="text" readOnly className="input-field bg-slate-100" value={user?.displayName} />
                        </div>
                        <div>
                            <label className="label font-bold">Donor Email</label>
                            <input type="text" readOnly className="input-field bg-slate-100" value={user?.email} />
                        </div>
                        <div className="modal-action">
                            <button type="button" onClick={() => document.getElementById('donation_modal').close()} className="btn btn-ghost">Cancel</button>
                            <button type="submit" className="btn-primary px-8">Confirm</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

// Small Helper Component
const DetailItem = ({ icon, label, value, color = "text-slate-900" }) => (
    <div className="flex items-start gap-3">
        <div className="text-[#ea0606] mt-1">{icon}</div>
        <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <p className={`font-bold ${color}`}>{value}</p>
        </div>
    </div>
);

export default RequestDetails;