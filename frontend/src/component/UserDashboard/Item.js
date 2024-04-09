import React from "react";
import { useNavigate } from "react-router-dom";

const Item = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="w-52 relative cursor-pointer" onClick={()=> navigate(`/food/${item._id}/0`)}>
      <img className="w-full h-36 " src={item?.img} alt="" />
      {/* <div className="absolute bottom-[] w-full text-center">
        <button className="text-lg px-4 py-1 bg-white text-primary rounded-full border-[1px]">
          Add
        </button>
      </div> */}
      <div className="flex justify-between my-2 space-x-4 mt-4">
        <div>
          <p className="font-semibold text-blackk">{item.title}</p>

          <p className="text-sm text-slate-500">{item.type}</p>
        </div>
        <p className="text-center font-semibold text-primary">${item.price}</p>
      </div>
    </div>
  );
};

export default Item;
