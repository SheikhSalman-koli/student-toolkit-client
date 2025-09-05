import React from 'react';
import Navber from '../../Components/Nav/Navber';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';

const Rootlayout = () => {
    return (
        <div>
            <Navber />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Rootlayout;