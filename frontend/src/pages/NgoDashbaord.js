import React from "react";

import { Outlet } from "react-router-dom";
import Search from "../component/UserDashboard/Search";
import AllItems from "../component/Ngo/AllItems";

const NgoDashboard = () => {
  return (
    <div className="w-full flex flex-col items-center ">
      
      <AllItems />
      <Outlet />
    </div>
  );
};
export default NgoDashboard;
