import React, { useEffect, useState } from "react";
import Item from "./Item";
import axios from "axios";

const AllItems = () => {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/food/lunch`)
      .then((res) => setAllItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl w-full flex flex-col justify-between py-10 space-y-10 select-none">
      <h1 className="text-4xl font-semibold">Lunch Items</h1>
      <div className="w-full grid grid-cols-4 gap-10">
        {allItems.length > 0 &&
          allItems.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
};

export default AllItems;
