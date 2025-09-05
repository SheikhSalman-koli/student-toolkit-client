import axios from 'axios';
import React, { useState } from 'react';

const colors = [
    { name: "Blue", hex: "#3B82F6" },
    { name: "Green", hex: "#22C55E" },
    { name: "Orange", hex: "#F97316" },
    { name: "Purple", hex: "#8B5CF6" },
];

const Schedule = () => {
    const [selected, setSelected] = useState('');

    const toggleColor = (hex) => {
        setSelected(hex)
        // setSelected((prev) =>
        //     prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]
        // );
    };

    function formatTimeTo12Hour(time) {
        if (!time) return "";

        let [hour, minute] = time.split(":");
        hour = parseInt(hour);

        const ampm = hour >= 12 ? "PM" : "AM";
        // convert 0 to 12
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    }

    const handleSchedule =async (e) => {
        e.preventDefault()
        const form = e.target
        const className = form.class.value
        const day = form.day.value
        const instructor = form.instructor.value
        const startTime = formatTimeTo12Hour(form.starttime.value)
        const endTime = formatTimeTo12Hour(form.endtime.value)
        const location = form.location.value
        const subject = form.subject.value
        const color = selected
        const scheduleData = { className, day, instructor, startTime, endTime, location, subject, color }

        const {data} =await axios.post('http://localhost:3000/saveClass',scheduleData)
        console.log(data);
    }


    return (
        <div className='max-w-10/12 md:max-w-3/5 mx-auto'>
            <h1 className='text-3xl text-[#10B981] text-center font-bold'>Class Schedule</h1>
            <form onSubmit={handleSchedule}
                className=''
            >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Class Name</legend>
                        <input
                            name='class'
                            type="text"
                            className="input w-full"
                            placeholder="Enter Class Name"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Instructor Name</legend>
                        <input
                            name='instructor'
                            type="text"
                            className="input w-full"
                            placeholder="Enter Instructor Name"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Day</legend>
                        <select name="day" className='select w-full' defaultValue='select a day'>
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
                            name='subject'
                            type="text"
                            className="input w-full"
                            placeholder="Enter Subject Name"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Start Time</legend>
                        <input
                            name='starttime'
                            type="time"
                            className="input w-full"
                            placeholder="When Starts"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">End Time</legend>
                        <input
                            name='endtime'
                            type="time"
                            className="input w-full"
                            placeholder="When Ends"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Location</legend>
                        <input
                            name='location'
                            type="text"
                            className="input w-full"
                            placeholder="Enter Location"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Choose A Color</legend>
                        <div className="flex gap-4 pt-2">
                            {colors.map((color) => (
                                <label key={color.hex} className="relative cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={color.hex}
                                        checked={selected?.includes(color?.hex)}
                                        onChange={() => toggleColor(color?.hex)}
                                        className="hidden"
                                    />
                                    <span
                                        className="w-6 h-6 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: color.hex }}
                                    >
                                        {selected.includes(color.hex) && (
                                            <span className="text-white font-bold">✓</span>
                                        )}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </div>

                <button
                    type='submit'
                    className='btn bg-[#3B82F6] mt-6 text-white'
                >Save</button>

            </form>
        </div>
    );
};

export default Schedule;