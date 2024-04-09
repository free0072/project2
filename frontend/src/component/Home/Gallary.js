import React from "react";
import Item1 from "../../assets/gallaryItem1.svg"
import Item2 from "../../assets/gallaryItem2.svg"
import Item3 from "../../assets/gallaryItem3.svg"

const Gallary = () => {
  return (
    <div className="max-w-6xl w-full flex flex-col justify-between py-10 space-y-10">
      <div className="w-full text-center text-whitee text-4xl space-y-2">
        <h1 className="font-bold">Book your Lunch, Dinner or Breakfast</h1>
        <p className="">"Empowering Healthier Employees."</p>
      </div>
      <div className="flex justify-between">
        <img className="" src={Item1} alt="item1"/>
        <img className="" src={Item2} alt="item2"/>
        <img className="" src={Item3} alt="item3"/>

      </div>
    </div>
  );
};

export default Gallary;
