import React, { useEffect, useState } from 'react';
import useAuth from '../../Components/shared/Hooks/useAuth';
import { useParams } from 'react-router';
import useURL from '../../Components/shared/Hooks/useURL';
import CountDown from './components/CountDown';

const MyShedules = () => {

    const { email } = useParams()
    // const {user} = useAuth()
    const [mySchedules, setMySchedules] = useState([])
    const axiosInstance = useURL()

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axiosInstance(`/my-schedules/${email}`)
            setMySchedules(data)
        }
        fetchData()
    }, [email])

    console.log(mySchedules);

    return (
        <div className='py-8 px-4'>
            <h2 className='text-4xl font-bold text-[#F97316] text-center mb-4'>My Schedules</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='border '>Day</th>
                            <th className='border '>Class Name</th>
                            <th className='border '>Instructore Name</th>
                            <th className='border '>Deadline</th>
                            <th className='border '>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mySchedules.map(schedule =>
                                <tr
                                    key={schedule._id}
                                    className="hover:bg-base-300">
                                    <th className='border '>{schedule?.day}</th>
                                    <td className='border text-white' style={{ backgroundColor: schedule?.color }}>{schedule?.className}</td>
                                    <td className='border '>{schedule?.instructor}</td>
                                    <td className='border '>
                                       <CountDown time={schedule?.endTime} day={schedule?.day}/>
                                    </td>
                                    <td className='border '>Purple</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyShedules;