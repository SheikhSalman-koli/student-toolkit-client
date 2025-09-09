import React from 'react';
import { FaTimes } from 'react-icons/fa';
import useURL from '../../../Components/shared/Hooks/useURL';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UpdateModal = ({ schdule, onClose }) => {

    const { className, instructor, day, subject, startTime, endTime, location, color, _id } = schdule || {}

    const formatDateTimeLocal = (isoString) => {
        const date = new Date(isoString);
        return date.toISOString().slice(0, 16); 
    };

    const axiosInstance = useURL()
    const queryClient = useQueryClient()

    // function formatTimeTo12Hour(time) {
    //     if (!time) return "";

    //     let [hour, minute] = time.split(":");
    //     hour = parseInt(hour);

    //     const ampm = hour >= 12 ? "PM" : "AM";
    //     // convert 0 to 12
    //     hour = hour % 12 || 12;
    //     return `${hour}:${minute} ${ampm}`;
    // }

   const {
    mutateAsync,
    isPending
} = useMutation({
        mutationFn: async(updatedSchedule)=>{
             const res = await axiosInstance.patch(`/update-schedule/${_id}`,updatedSchedule)
             return res?.data
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["mySchedules"])
            onClose()
        }
   })

    const handleUpdate =async (e, ) => {
        e.preventDefault()
        const form = e.target
        const className = form.class.value
        const day = form.day.value
        const instructor = form.instructor.value
        const startTime = new Date(form.starttime.value).toISOString()   //new Date(form.starttime.value).toISOString()    // formatTimeTo12Hour(form.starttime.value)
        const endTime = form.endtime.value
        const location = form.location.value
        const subject = form.subject.value
        const color = form.color.value
        // const email = user?.email

        const scheduleData = { className, day, instructor, startTime, endTime, location, subject, color }

        await mutateAsync(scheduleData);
        // try{
        //     const res = await axiosInstance.patch(`/update-schedule/${_id}`,scheduleData)
        //     console.log(res?.data);
        //     if(res.data){
        //         onClose
        //     }
        // }catch(err){
        //     console.log(err);
        // }
       
    }

    return (
        <div className="fixed inset-0 z-50  bg-black/30 overflow-y-auto  p-6 md:p-10 transition-all duration-300">
            <div className="bg-white w-full max-w-2xl mx-auto rounded shadow-lg p-6 relative transform transition-all duration-300 scale-100 animate-fadeIn">

                <div className='flex justify-between items-center'>
                    <h3 className='text-2xl text-orange-400'>Update Schedule</h3>
                    <button
                        className="text-gray-500 hover:text-red-500"
                        onClick={onClose}
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleUpdate}
                    className=''
                >
                    <div className='grid grid-cols-1 md:grid-cols-2  gap-x-6'>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Class Name</legend>
                            <input
                                defaultValue={className}
                                name='class'
                                type="text"
                                className="input w-full"
                                placeholder="Enter Class Name"

                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Instructor/Teacher Name</legend>
                            <input
                                defaultValue={instructor}
                                name='instructor'
                                type="text"
                                className="input w-full"
                                placeholder="Enter Instructor Name"

                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Day</legend>
                            <select name="day" defaultValue={day} className='select w-full' >
                                <option disabled={true}>select a day</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Subject</legend>
                            <input
                                defaultValue={subject}
                                name='subject'
                                type="text"
                                className="input w-full"
                                placeholder="Enter Subject Name"


                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Start Time</legend>
                            <input
                                defaultValue={formatDateTimeLocal(startTime)}
                                name='starttime'
                                type="datetime-local"
                                className="input w-full"
                                placeholder="When Starts"

                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">End Time</legend>
                            <input
                                defaultValue={endTime}
                                name='endtime'
                                type="time"
                                className="input w-full"
                                placeholder="When Ends"

                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Location (place name/ Online)</legend>
                            <input
                                defaultValue={location}
                                name='location'
                                type="text"
                                className="input w-full"
                                placeholder="Enter Location"

                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Choose A Color</legend>
                            <select name="color" defaultValue={color} className='select w-full' >
                                <option disabled={true}>select a Color</option>
                                <option value="#22C55E" className='text-white bg-[#22C55E]'>Green</option>
                                <option value="#3B82F6" className='text-white bg-[#3B82F6]'>Blue</option>
                                <option value="#F97316" className='text-white bg-[#F97316]'>Orange</option>
                                <option value="#8B5CF6" className='text-white bg-[#8B5CF6]'>Purple</option>
                            </select>
                        </fieldset>
                    </div>

                    <button
                        type='submit'
                        className='btn bg-blue-600 hover:bg-blue-700 transition mt-6 text-white'
                    >
                       {isPending ? "Updating...":"Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;