import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../Components/DashboardComponents/Aside/Aside.jsx'

const DashLayout = () => {
    return (
        <div className='flex'>
            <Aside></Aside>
            <div className='flex-1 p-5'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashLayout;