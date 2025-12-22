import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import { CheckCircle, ArrowRight, Heart } from 'lucide-react';
import Confetti from 'react-confetti'; // Optional: npm install react-confetti

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosInstance = useAxios();
    const [loading, setLoading] = useState(true);

    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        if (sessionId) {
            axiosInstance.post(`/success-payment?session_id=${sessionId}`)
                .then(res => {
                    setIsProcessing(false); // Only allow moving back NOW
                });
        }
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            {!loading && <Confetti numberOfPieces={150} recycle={false} />}

            <div className="max-w-md w-full bg-white rounded-[3rem] shadow-xl p-10 text-center border border-slate-100">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                </div>

                <h1 className="text-3xl font-black text-slate-900 mb-2">Donation Received!</h1>
                <p className="text-slate-500 mb-8">
                    Your contribution helps us keep the blood donation network running. We've sent a receipt to your email.
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 flex items-center gap-4 text-left border border-slate-100">
                    <div className="bg-[#ea0606] p-3 rounded-xl text-white">
                        <Heart size={20} fill="currentColor" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Transaction ID</p>
                        <p className="text-xs font-mono text-slate-900 truncate w-40">{sessionId?.slice(0, 20)}...</p>
                    </div>
                </div>

                <Link
                    to="/dashboard/funding"
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#ea0606] transition-all"
                >
                    Back to Funding <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;