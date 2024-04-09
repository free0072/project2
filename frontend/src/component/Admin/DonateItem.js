import React from "react";

const DonateItem = ({item}) => {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-3">
        <img className="h-24 w-24 " src={item.food.img} alt="" />
        <div>
          <p className="font-semibold text-blackk">
            {item.food.title}
          </p>
        </div>
      </div>
      <div className="">
        <p className="text-center font-semibold">Quantity</p>
        <p className="text-center">{item.quantity}</p>
      </div>
    </div>
  );
};

export default DonateItem;
