import React from 'react';
import { Link } from 'react-router';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
            <div className="max-w-lg w-full text-center">
                {/* Large 404 Display */}
                <div className="relative mb-8">
                    <h1 className="text-[12rem] font-black text-slate-200 leading-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ShieldAlert size={80} className="text-[#ea0606] opacity-90" />
                    </div>
                </div>

                <h2 className="text-3xl font-black text-slate-900 mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-slate-500 mb-10 text-lg">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#ea0606] transition-all shadow-lg"
                    >
                        <ArrowLeft size={18} /> Go Back Home
                    </Link>

                    <Link
                        to="/donation-requests"
                        className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                    >
                        View Requests
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;