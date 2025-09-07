import React, { useEffect, useState } from 'react';
import useAuth from '../../Components/shared/Hooks/useAuth';
import { useParams } from 'react-router';
import useURL from '../../Components/shared/Hooks/useURL';

const MyShedules = () => {

    const {email} = useParams()
    // const {user} = useAuth()
    const [mySchedules,setMySchedules] = useState([])
    const axiosInstance = useURL()

    useEffect(()=>{
        const fetchData =async ()=>{
            const {data} =await axiosInstance(`/my-schedules/${email}`)
            setMySchedules(data)
        }
        fetchData()
    },[email])
   
    console.log(mySchedules);

    return (
        <div>
            
        </div>
    );
};

export default MyShedules;