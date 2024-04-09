import React from "react";

import Gallary from "../component/Home/Gallary";
import { Outlet } from "react-router-dom";

const Home = () => {


  return (
    <div className="w-full flex flex-col items-center select-none">
      <Outlet />
      <div className="w-full flex flex-col items-center px-4 bg-blackk">
        <Gallary />
      </div>
    </div>
  );
};

export default Home;
