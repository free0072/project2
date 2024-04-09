import React, { useContext, useEffect, useState } from "react";
import BookingItem from "./BookingItem";
import axios from "axios";
import { GlobalState } from "../../middlewares/global-states";
import Cookies from "js-cookie";

const Bookings = () => {
  const [todaysBooking, setTodaysBooking] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [reRender, setReRender] = useState(false);
  const { data } = useContext(GlobalState);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/booking/${data.loggedUser.role}/${data.loggedUser._id}`,
        { headers }
      )
      .then((response) => setTodaysBooking(response.data))
      .catch((error) => console.error(error));

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/booking/${data.loggedUser.role}/past/${data.loggedUser._id}`,
        { headers }
      )
      .then((response) => setPastBookings(response.data))
      .catch((error) => console.error(error));
  }, [data.loggedUser, reRender]);

  const onDelete = async (id) => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/booking/${id}`, { headers })
      .then((res) => (res.status === 200 ? setReRender(!reRender) : {}))
      .catch((error) => console.error(error));
  };

  const onUpdate = async (id, quantity) => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/booking/${id}`,
        { quantity },
        { headers }
      )
      .then((res) => (res.status === 200 ? setReRender(!reRender) : {}))
      .catch((error) => console.error(error));
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div className="max-w-6xl w-full flex flex-col justify-between py-10 space-y-10 select-none">
        <h1 className="text-4xl font-semibold">Your's Today Booking</h1>
        <div className="py-4 px-8 border-2 border-blackk rounded-[40px] space-y-4 divide-y-2">
          {todaysBooking.map((booking) => {
            return (
              <BookingItem
                key={booking._id}
                booking={booking}
                current={true}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            );
          })}
        </div>
      </div>
      <div className="max-w-6xl w-full flex flex-col justify-between py-10 space-y-10 select-none">
        <h1 className="text-4xl font-semibold">Your's Past Booking</h1>
        <div className="py-4 px-8 border-2 border-blackk rounded-[40px] space-y-4 divide-y-2">
          {pastBookings.map((booking) => {
            return (
              <BookingItem
                key={booking._id}
                booking={booking}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
