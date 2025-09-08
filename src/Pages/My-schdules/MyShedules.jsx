import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useURL from '../../Components/shared/Hooks/useURL';
import Countdown from 'react-countdown';
import { IoPencilSharp, IoTrashBin } from "react-icons/io5";
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import UpdateModal from './components/UpdateModal';


const MyShedules = () => {

    const { email } = useParams()

    // const [mySchedules, setMySchedules] = useState([])
    const axiosInstance = useURL()

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const { data } = await axiosInstance.get(`/my-schedules/${email}`)
    //         setMySchedules(data)
    //     }
    //     fetchData()
    // }, [email])

    const {
        data: Schedules,
        refetch
    } = useQuery({
        queryKey: ['mySchedules', email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/my-schedules/${email}`)
            return res?.data
        }
    })

    const mySchedules = Schedules || []

    function getNextClassDate(day, timeStr) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = new Date();
        const dayIndex = daysOfWeek.indexOf(day);

        if (dayIndex === -1) return new Date();

        let diff = dayIndex - today.getDay();
        if (diff < 0) diff += 7;

        const targetDate = new Date();
        targetDate.setDate(today.getDate() + diff);

        // Convert 12-hour "HH:MM AM/PM" to 24-hour
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours < 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        targetDate.setHours(hours, minutes, 0, 0);

        return targetDate;
    }

    const handleDelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosInstance.delete(`/deleteschedule/${id}`)
                refetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    const [isEdit, setIsEdit] = useState(null)

    // const handleEdit =(data)=>{
    //     setIsEdit(true)
    //     console.log(data);
    // }
    // console.log(isEdit);

    // console.log(isEdit);
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
                            <th className='border '>Location</th>
                            <th className='border '>Deadline</th>
                            <th className='border '>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mySchedules?.map(schedule =>
                                <tr
                                    key={schedule._id}
                                    className="">
                                    <th className='border '>{schedule?.day}</th>
                                    <td className='border text-white' style={{ backgroundColor: schedule?.color || 'orange' }}>{schedule?.className}</td>
                                    <td className='border '>{schedule?.instructor}</td>
                                    <td className='border '>{schedule?.location}</td>
                                    <td className='border '>
                                        {/* by js function & daisy */}
                                        {/* <CountDown time={schedule?.endTime} day={schedule?.day}/> */}
                                        {/* by npm */}
                                        <Countdown date={getNextClassDate(schedule?.day, schedule?.startTime)}

                                        />
                                    </td>
                                    <td className='border space-x-6'>
                                        <button
                                            onClick={() => handleDelete(schedule?._id)}
                                            className='btn btn-sm  hover:bg-red-500 hover:text-white hover:transition'>
                                            <IoTrashBin size={16} />
                                        </button>
                                        <button
                                            onClick={() => setIsEdit(schedule)}
                                            className='btn btn-sm  hover:bg-green-500 hover:text-white hover:transition'>
                                            <IoPencilSharp size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            {
                isEdit && <UpdateModal 
                    schdule={isEdit}
                    onClose={()=> setIsEdit(null)}
                />
            }
        </div>
    );
};



export default MyShedules;

