import React, { useContext } from "react";
import heroImg from "../../assets/heroImg.svg";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../middlewares/global-states";

const Hero = () => {

  const {data} = useContext(GlobalState);
  const navigate = useNavigate()

  const handleNavigation = () => {
    if(data.loggedIn) {
      navigate('/user');
    } else {
      navigate('/user/verify')
    }
  }

  return (
    <div className="w-full flex flex-col items-center px-4 bg-secondary">
      <div className="max-w-6xl w-full flex justify-between ">
        <div className="w-1/2 flex flex-col justify-center">
          <div className="text-blackk space-y-2">
            <h1 className="font-bold text-4xl">
              Effortless <span className="text-primary">Food Management</span>
            </h1>
            <p className="text-2xl">
              Ordering, Sharing, and Sustaining Delights
            </p>
          </div>
          <div className="my-8">
            <p className="">
              Welcome to a seamless food management experience that caters to
              both your cravings and compassion. Our platform simplifies the
              process – company members can easily place orders for their
              favorite dishes, while NGOs can effortlessly connect to book any
              surplus food.
            </p>
          </div>
          <div className="space-x-4">

            <button className="btn bg-primary text-white" onClick={handleNavigation}>
              Book Your Food
            </button>
            <button className="btn bg-primary text-white" onClick={()=>navigate("/ngo/verify")}>
              Donation
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <img className="-top-10 w-full" src={heroImg} alt="heroImg" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
