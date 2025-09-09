import React from 'react';
import Countdown from 'react-countdown';

const CountDownContainer = ({ deadline }) => {

    const target = new Date(deadline)
    return (
        <div>
            <Countdown
                date={target}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) return <span className="text-sm">Class Over</span>;

                    const pad = (n) => String(n).padStart(2, "0");
                    return (
                        // <div className="font-mono text-lg">
                        //     {/* Countdown numbers */}
                        //     <div className='mx-2'>
                        //         {pad(days)}:{pad(hours)}:{pad(minutes)}:{pad(seconds)}
                        //     </div>
                        //     {/* Labels */}
                        //     <div className="text-xs text-gray-500">
                        //         Days:Hours:Minutes:Seconds
                        //     </div>
                        // </div>
                        <div className="font-mono text-center">
                            {/* Numbers */}
                            <div className="flex justify-between text-lg">
                                <span className="min-w-[2rem]">{pad(days)}</span>
                                <span className="min-w-[2rem]">{pad(hours)}</span>
                                <span className="min-w-[2rem]">{pad(minutes)}</span>
                                <span className="min-w-[2rem]">{pad(seconds)}</span>
                            </div>
                            {/* Labels */}
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span className="min-w-[2rem]">Days</span>
                                <span className="min-w-[2rem]">Hours</span>
                                <span className="min-w-[2rem]">Min</span>
                                <span className="min-w-[2rem]">Sec</span>
                            </div>
                        </div>
                    );
                }}
            />
        </div>
    );
};

export default CountDownContainer;