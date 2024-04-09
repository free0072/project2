import React from "react";
import AllItems from "../component/UserDashboard/AllItems";
import { Outlet } from "react-router-dom";
import Search from "../component/UserDashboard/Search";

const UserDashboard = () => {
  return (
    <div className="w-full flex flex-col items-center ">
      
      <Search />
      <AllItems />
      <Outlet />
    </div>
  );
};
export default UserDashboard;
