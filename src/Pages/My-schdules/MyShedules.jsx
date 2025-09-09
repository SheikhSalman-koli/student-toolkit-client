import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useURL from '../../Components/shared/Hooks/useURL';
import { IoPencilSharp, IoTrashBin } from "react-icons/io5";
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import UpdateModal from './components/UpdateModal';
import CountDownContainer from './components/CountDownContainer';
import Spinner from '../../Components/shared/Loader/Spinner'


const MyShedules = () => {

    const { email } = useParams()

    const axiosInstance = useURL()

    const {
        data: Schedules,
        refetch,
        isPending
    } = useQuery({
        queryKey: ['mySchedules', email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/my-schedules/${email}`)
            return res?.data
        }
    })

    const mySchedules = Schedules || []

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

    if(isPending) return <Spinner />

    return (
        <div className='py-8 px-4'>
            <h2 className='text-4xl font-bold text-[#F97316] text-center mb-4'>My Schedules</h2>
            <div className="overflow-x-auto">
                <table className="table border-collapse">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='border '>#</th>
                            <th className='border '>Day</th>
                            <th className='border '>Class Name</th>
                            <th className='border '>Instructore Name</th>
                            <th className='border '>Location</th>
                            <th className='border '>Deadline</th>
                            <th className='border '>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mySchedules?.map((schedule,index) =>
                                <tr
                                    key={schedule?._id}
                                    className="">
                                    <th className='border '>{index + 1}</th>
                                    <th className='border '>{schedule?.day}</th>
                                    <td className='border text-white' style={{ backgroundColor: schedule?.color || 'orange' }}>{schedule?.className}</td>
                                    <td className='border '>{schedule?.instructor}</td>
                                    <td className='border '>{schedule?.location}</td>
                                    <td className='border my-0 py-0'>
                                        {/* by js function & daisy */}
                                        {/* <CountDown time={schedule?.endTime} day={schedule?.day}/> */}
                                        {/* by npm */}
                                        <CountDownContainer 
                                        deadline={schedule?.startTime}
                                        />

                                       
                                    </td>
                                    <td className='border'>
                                       <div className='flex flex-col md:flex-row gap-1 md:gap-2'>
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
                                       </div>
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
                    refetch={refetch}
                />
            }
        </div>
    );
};



export default MyShedules;

