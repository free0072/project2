import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Cookies from "js-cookie";
import { GlobalState } from "../middlewares/global-states";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, dispatch } = useContext(GlobalState);

  useEffect(() => {
    setCurrentUser(data.loggedUser);
  }, [data.loggedUser]);

  const Logout = () => {
    Cookies.remove("authToken");
    dispatch({ type: "SET_USER", payload: {} });
    dispatch({ type: "IS_LOGGED", payload: false });
    dispatch({ type: "SET_ROLE", payload: "" });
    navigate(`/`);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="w-full flex flex-col items-center px-4 bg-blackk select-none">
      <div className="max-w-6xl w-full p-2 flex justify-between items-center my-2">
        <img src={logo} alt="logo" className="cursor-pointer w-12 h-12" />
        {currentUser?.role === "User" ? (
          <div className="flex space-x-16 text-blackk font-sans text-lg ">
            <p className="navbarMenu" onClick={() => navigate("/user")}>
              Home
            </p>
            <p className="navbarMenu" onClick={() => navigate("/user/booking")}>
              Your Bookings
            </p>
            <div onClick={() => toggleModal()} className="relative z-50">
              <p className="navbarMenu">{currentUser.name?.toUpperCase()}</p>
              {isModalOpen ? (
                <div className="absolute bg-blackk px-2 py-2 w-28">
                  <p className="navbarMenu">Profile</p>
                  <p className="navbarMenu" onClick={() => Logout()}>
                    Logout
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : currentUser?.role === "Admin" ? (
          <div className="flex space-x-16 text-blackk font-sans text-lg ">
            <p className="navbarMenu" onClick={() => navigate("/admin")}>
              Home
            </p>
            <p className="navbarMenu" onClick={() => navigate("admin/addFood")}>
              Add Food Item
            </p>
            <p
              className="navbarMenu"
              onClick={() => navigate("/admin/donateFood")}
            >
              Donate Food
            </p>
            <div onClick={() => toggleModal()} className="relative z-50">
              <p className="navbarMenu">{currentUser.name?.toUpperCase()}</p>
              {isModalOpen ? (
                <div className="absolute bg-blackk px-2 py-2 w-28">
                  <p className="navbarMenu">Profile</p>
                  <p className="navbarMenu" onClick={() => Logout()}>
                    Logout
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : currentUser?.role === "Ngo" ? (
          <div className="flex space-x-16 text-blackk font-sans text-lg ">
            <p className="navbarMenu" onClick={() => navigate("/ngo")}>
              Home
            </p>
            <p className="navbarMenu" onClick={() => navigate("/ngo/booking")}>
              Your Bookings
            </p>
            <div onClick={() => toggleModal()} className="relative z-50">
              <p className="navbarMenu">{currentUser.name?.toUpperCase()}</p>
              {isModalOpen ? (
                <div className="absolute bg-blackk px-2 py-2 w-28">
                  <p className="navbarMenu">Profile</p>
                  <p className="navbarMenu" onClick={() => Logout()}>
                    Logout
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div className="flex space-x-16 text-blackk font-sans text-lg ">
            <p className="navbarMenu" onClick={() => navigate("/")}>
              Home
            </p>
            <p className="navbarMenu">About Us</p>
            <p className="navbarMenu" onClick={() => navigate("/user/signup")}>
              Signup
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
