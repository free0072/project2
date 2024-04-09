import React from "react";


const OrderItem = ({book}) => {
  console.log(book)

  return (
    <div className="flex justify-between space-x-4">
      <div className="flex w-3/4 justify-between">
        <div className="flex space-x-3">
          <img className="h-24 w-24 " src={book.food.img} alt="" />
          <div>
            <p className="font-semibold text-blackk">
              {book.food.title}
            </p>

            <p className="text-sm text-slate-500">{book.food.type}</p>
          </div>
        </div>
        <div className="">
          <p className="text-center font-semibold">Quantity</p>
          <p className="text-center">{book.quantity}</p>
        </div>
      </div>
      <div>
        <p className="text-center font-semibold">{book.user.name}</p>
      </div>
    </div>
  );
};

export default OrderItem;
