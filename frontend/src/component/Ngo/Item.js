import React from "react";
import { useNavigate } from "react-router-dom";

const Item = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-52 text-center relative cursor-pointer"
      onClick={() => navigate(`/food/${item.food._id}/${item.quantity}`)}
    >
      <div className="mb-4">
        <p className="font-semibold text-xl text-blackk">{item.food.title}</p>
      </div>
      <img className="w-full h-36 " src={item?.food.img} alt="" />
      {/* <div className="absolute bottom-[] w-full text-center">
        <button className="text-lg px-4 py-1 bg-white text-primary rounded-full border-[1px]">
          Add
        </button>
      </div> */}
      <div className="flex justify-between my-2 space-x-4 mt-4">
          <p className="text-center font-semibold">Quantity</p>
          <p className="text-center">{item.quantity}</p>
      </div>
    </div>
  );
};

export default Item;
