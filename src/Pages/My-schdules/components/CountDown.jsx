import React, { useState, useEffect } from "react";

const CountDown = ({ day, time }) => {

  function hasTimePassed(timeStr) {
    const now = new Date();
    const [t, modifier] = timeStr.split(" ");
    let [hours, minutes] = t.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return now.getHours() > hours || (now.getHours() === hours && now.getMinutes() > minutes);
  }

  function getNextClassDate(day, timeStr) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayIndex = daysOfWeek.indexOf(day);

    if (dayIndex === -1) return new Date();

    let diff = dayIndex - today.getDay();
    if (diff < 0 || (diff === 0 && hasTimePassed(timeStr))) diff += 7;

    const nextClass = new Date();
    nextClass.setDate(today.getDate() + diff);

    // Convert 12-hour time to 24-hour
    const [t, modifier] = timeStr.split(" ");
    let [hours, minutes] = t.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    nextClass.setHours(hours, minutes, 0, 0);
    return nextClass;
  }

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = getNextClassDate(day, time); // pass both day + time
      const diff = end - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [day, time]);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      {["days","hours","minutes","seconds"].map((unit, idx) => {
        const val = timeLeft[unit === "minutes" ? "minutes" : unit === "seconds" ? "seconds" : unit];
        return (
          <div className="flex flex-col" key={idx}>
            <span className="countdown font-mono">
              <span style={{ "--value": val } } aria-live="polite">{val}</span>
            </span>
            {unit}
          </div>
        );
      })}
    </div>
  );
};

export default CountDown;
