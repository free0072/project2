import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import Timing from "../Timing";
import DonateItem from "./DonateItem";

const DonateListing = () => {
  const [allItems, setAllItems] = useState([]);
  const [donatingItem, setDonatingItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [item, setItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submitData(e) {
    e.preventDefault();
    setIsLoading(true);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/ngo/donateFood`, {
        food: item,
        quantity,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          console.log("Success");
        }
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  }

  useEffect(()=> {
    axios
    .get(`${process.env.REACT_APP_API_URL}/ngo/donateList`)
    .then((res) => {
        console.log(res.data);
        setDonatingItem(res.data)
    })
    .catch((err) => console.error(err));
  },[])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/food/all`)
      .then((res) => setAllItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl w-full flex flex-col justify-between py-10 space-y-10 select-none">
      <Timing />
      <form onSubmit={submitData} className="w-96">
        <div className="space-y-3">
          <h3 className="text-4xl text-blackk mb-4">Donate Food</h3>
          <label htmlFor="Food" className="flex flex-col">
            <span className="text-2xl">Food</span>
            <select
              className="input-form"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            >
              {allItems.map((item) => {
                return (
                  <option key={item._id} className="" value={item._id}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="Quantity" className="flex flex-col">
            <span className="text-2xl">Quantity</span>
            <input
              type="number"
              id="Quantity"
              placeholder="Quantity"
              className="input-form"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
        </div>

        <div className="my-6 space-y-3">
          <button
            type="submit"
            className={`w-full py-4 bg-primary rounded-md text-whitee font-bold ${
              isLoading ? "opacity-60" : ""
            }`}
            disabled={isLoading}
          >
            {!isLoading ? "List item" : "Submiting..."}
          </button>
        </div>
      </form>
      <div>
        <h3 className="text-4xl text-blackk mb-4">Today's Donation Listing</h3>
        <div className="py-4 px-8 border-2 border-blackk rounded-[40px] space-y-4 divide-y-2">
            {donatingItem && donatingItem.map((item)=> {
                return <DonateItem key={item._id} item={item}/>
            })

            }
        </div>
      </div>
    </div>
  );
};

export default DonateListing;
