import React, { useContext } from 'react';
import useAxios from '../../Hooks/useAxios';
import { Heart, DollarSign } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
const Donate = () => {
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);

    const handleCheckout = (e) => {

        e.preventDefault()
        const donateAmount = e.target.donateAmount.value
        const donorEmail = user?.email
        const donorName = user?.displayName
        const formData = {
            donateAmount,
            donorEmail,
            donorName
        }

        axiosInstance.post('/create-payment-checkout', formData)

            .then(res => {
                console.log(res.data);
                window.location.href = res.data.url
            })
        }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white rounded-[3rem] shadow-xl p-10 border border-slate-100 text-center">
                <div className="bg-red-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#ea0606]">
                    <Heart size={40} fill="currentColor" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Save a Life</h2>
                <p className="text-slate-500 mb-8">Your contribution helps us manage blood logistics and emergency requests.</p>

                <form onSubmit={handleCheckout} className="space-y-4">
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            name="donateAmount"
                            type="number"
                            placeholder="Enter Amount"
                            required
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#ea0606] font-bold text-slate-900"
                        />
                    </div>
                    <button type="submit" className="w-full bg-[#ea0606] text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-200 hover:bg-slate-900 transition-all">
                        Donate Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Donate;