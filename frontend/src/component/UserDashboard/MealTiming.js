import React from "react";
import meal1 from "../../assets/meals1.jpg";
import meal2 from "../../assets/meals2.jpg";
import { useNavigate } from "react-router-dom";

const MealTiming = () => {
    const navigate = useNavigate();


  return (
    <div className="max-w-6xl w-full flex flex-col justify-between py-10 space-y-10 select-none">
      <h1 className="text-4xl font-semibold">
        Let us book Your Breakfast and Lunch
      </h1>
      <div className="w-full flex justify-center space-x-10">
        <div className="meal-timing-header" onClick={() => navigate("/user/breakfast")}>
          <div className="w-full h-full bg-black bg-opacity-40 text-white absolute">
            <p className="absolute text-4xl  right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2">
              Breakfast
            </p>
          </div>

          <img className="w-full h-full" src={meal1} alt="breakfast" />
        </div>
        <div className="meal-timing-header" onClick={() => navigate("/user/lunch")}>
          <div className="w-full h-full bg-black bg-opacity-40 text-white absolute">
            <p className="absolute text-4xl  right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2">
              Lunch
            </p>
          </div>
          <img className="h-full" src={meal2} alt="breakfast" />
        </div>
      </div>
    </div>
  );
};

export default MealTiming;
