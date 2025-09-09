import React from 'react';
import Banner from '../../Components/Home/Banner';
import Schedule from '../../Components/Home/Schedule';
import useAuth from '../../Components/shared/Hooks/useAuth';
import Budget from '../../Components/Home/Budget';

const Home = () => {
    const {user} = useAuth()
     return (
        <div>
            <Banner />
            {
                user &&  <>
                <Schedule />
                <Budget />
                </> 
            }
        </div>
    );
};

export default Home;