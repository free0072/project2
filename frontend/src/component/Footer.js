import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 bg-secondary">
      <div className="max-w-6xl min-h-[300px] w-full p-2 flex justify-between items-center my-2">
        <div className="h-full flex flex-col justify-between"> 
          <div className="flex flex-col items-center">
            <img src={logo} alt="logo" className="cursor-pointer w-12 h-12" />
            <span>savoursustain.com</span>
          </div>
          <button className="btn bg-blackk text-whitee">Chat with us</button>
        </div>
        <div>
          <h1 className="font-bold text-3xl mb-10">SERVICES</h1>
          <p className="footermenu">Book Your Food</p>
          <p className="footermenu">Admin Panel</p>
          <p className="footermenu">NGO Dashboard</p>
        </div>
        <div>
          <h1 className="font-bold text-3xl  mb-10">CONTACT US</h1>
          <p className="footermenu">Email Address</p>
          <p className="footermenu">savoursustain.com</p>
          <p className="footermenu">India OFfice</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
