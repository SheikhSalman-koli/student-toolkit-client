import React from 'react';
import { FaTimes } from 'react-icons/fa';

const UpdateModal = ({ schdule, onClose }) => {

    const {className, instructor, day, subject, startTime, endTime, location} = schdule || {}

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
              
            <form //onSubmit={handleSchedule}
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
                        defaultValue={startTime}
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

                    {/* <fieldset className="fieldset">
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
                    </fieldset> */}
                </div>

                <button
                    type='submit'
                    className='btn bg-blue-600 hover:bg-blue-700 transition mt-6 text-white'
                >
                  Update
                </button>
               

            </form>




            </div>
        </div>
    );
};

export default UpdateModal;