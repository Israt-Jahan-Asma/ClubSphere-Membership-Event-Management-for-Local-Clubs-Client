import React from 'react';
import { Droplets } from 'lucide-react';

const Loading = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
            <div className="relative flex items-center justify-center">
                {/* Outer Ring Animation */}
                <div className="w-20 h-20 border-4 border-slate-100 border-t-[#ea0606] rounded-full animate-spin"></div>

                {/* Pulsing Icon */}
                <div className="absolute">
                    <Droplets className="text-[#ea0606] animate-pulse" size={32} />
                </div>
            </div>

            <div className="text-center">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Loading Data</h2>
                <p className="text-slate-400 text-sm font-medium">Please wait a moment...</p>
            </div>
        </div>
    );
};

export default Loading;