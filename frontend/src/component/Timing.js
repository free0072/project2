import React, { useEffect, useState } from "react";

const Timing = () => {
  const [currDate, setcurrDate] = useState("");
  const [currentTime, setcurrentTime] = useState("");

  useEffect(() => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0"); // Get hours and ensure 2-digit format
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and ensure 2-digit format
    setcurrentTime(`${hours}:${minutes}`);
    setcurrDate(date.toLocaleDateString("en-US", options));
  }, []);

  return (
    <div className="max-w-6xl w-full flex flex-col justify-between py-10 space-y-10 select-none">
      <div className="w-full flex justify-between">
        <h1 className="text-sm font-bold text-primary">{currDate}</h1>
        <p className="text-sm font-bold ">{currentTime}</p>
      </div>
    </div>
  );
};

export default Timing;
