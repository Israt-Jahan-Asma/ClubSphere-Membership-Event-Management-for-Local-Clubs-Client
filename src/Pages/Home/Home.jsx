import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import ContactUs from './ContactUs';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Featured></Featured>
           <ContactUs></ContactUs>
        </div>
    );
};

export default Home;