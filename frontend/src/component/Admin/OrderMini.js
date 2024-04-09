import React, { useContext, useEffect, useState } from "react";

import OrderItem from "./OrderItem";
import axios from "axios";
import Cookies from "js-cookie";
import { GlobalState } from "../../middlewares/global-states";

const OrderMini = () => {
  const [userBooking, setUserBooking] = useState([]);
  const [ngoBooking, setNgoBooking] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    const role = "User"
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/booking/all/User`,
        { headers }
      )
      .then((response) => setUserBooking(response.data))
      .catch((error) => console.error(error));

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/booking/all/Ngo`,
        { headers }
      )
      .then((response) => setNgoBooking(response.data))
      .catch((error) => console.error(error));
  }, [reRender]);

  return (
    <div className="max-w-6xl w-full flex flex-col justify-between py-10 space-y-10 select-none">
      <h1 className="text-4xl font-semibold">User's Latest Booking</h1>
      <div className="py-4 px-8 border-2 border-blackk rounded-[40px] space-y-4 divide-y-2">
        {userBooking.map((book) => {
          return <OrderItem key={book._id} book={book} />;
        })}
      </div>
      <h1 className="text-4xl font-semibold">Ngo's Latest Booking</h1>
      <div className="py-4 px-8 border-2 border-blackk rounded-[40px] space-y-4 divide-y-2">
        {ngoBooking.map((book) => {
          return <OrderItem key={book._id} book={book} />;
        })}
      </div>
    </div>
  );
};

export default OrderMini;
