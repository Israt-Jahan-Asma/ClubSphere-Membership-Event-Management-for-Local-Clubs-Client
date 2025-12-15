import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 py-20"> 
                <Outlet></Outlet>
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;