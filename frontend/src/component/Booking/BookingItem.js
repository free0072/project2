import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";

const BookingItem = ({ booking, current, onDelete, onUpdate }) => {
  const [currentQuantity, setCurrentQuantity] = useState(booking.quantity);
  const [update, setUpdate] = useState(false);
  const [currDate, setcurrDate] = useState("");
  const [currentTime, setcurrentTime] = useState("");
  const inputRef = useRef(null); // Create a ref for the input element

  useEffect(() => {
    // When 'update' becomes true, focus and select the input field
    if (update) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [update]);

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

  const updateItem = () => {
    if (update) {
      onUpdate(booking._id, currentQuantity);
    }
    setUpdate(!update);
  };

  return (
    <div className="flex justify-between space-x-4">
      <div className="w-3/4 flex justify-between space-x-3">
        <div className="flex space-x-4">
          <img className="h-24 w-24 " src={booking.food.img} alt="" />
          <div>
            <p className="font-semibold text-blackk">{booking.food.title}</p>

            <p className="text-sm text-slate-500">{booking.food.type}</p>
          </div>
        </div>
        <div className="text-center ">
          <p className="font-semibold">Quantity</p>
          <input
            ref={inputRef} // Assign the ref to the input element
            className={`${
              update ? "border-2 border-primary" : ""
            } text-center w-6`}
            value={currentQuantity}
            onChange={(e) => setCurrentQuantity(e.target.value)}
            disabled={!update}
          />
        </div>
      </div>
      {current ? (
        <div className="flex flex-col text-white text-2xl space-y-2">
          {!update ? (
            <button className="px-2 py-1 rounded-xl bg-primary">
              <AiOutlineEdit onClick={() => updateItem()} />
            </button>
          ) : (
            <button className="px-2 py-1 rounded-xl bg-green-800">
              <AiOutlineSave onClick={() => updateItem()} />
            </button>
          )}

          <button className="px-2 py-1 rounded-xl bg-red-600">
            <AiOutlineDelete onClick={() => onDelete(booking._id)} />
          </button>
        </div>
      ) : (
        <div className="">
          <h1 className="text-sm font-bold text-primary">{currDate}</h1>
        </div>
      )}
    </div>
  );
};

export default BookingItem;
