import React from 'react';
import Banner from '../../Components/Home/Banner';
import Schedule from '../../Components/Home/Schedule';
import useAuth from '../../Components/shared/Hooks/useAuth';
import Budget from '../../Components/Home/Budget';
import OpenAi from '../../Components/Home/OpenAi';

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
            <OpenAi />
        </div>
    );
};

export default Home;