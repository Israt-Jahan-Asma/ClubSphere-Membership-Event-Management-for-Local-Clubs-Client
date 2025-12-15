import React from 'react';
import useAuth from '../../Hooks/useAuth';

const MainDashboard = () => {
    const { user, logOut } = useAuth();
    return (
        <div>
            {/* Topbar */}
            <div className="p-3">
                <div className="bg-white p-4 rounded-xl shadow mb-6 md:flex justify-between items-center">
                    
                    <div className="text-lg font-bold text-gray-600 flex">
                        <h1 className="text-xl font-semibold"> Welcome back, <span>{user?.displayName} !</span></h1>
                         👋
                    </div>
                </div>
            </div>
            MainDashboard
        </div>
    );
};

export default MainDashboard;