import React from "react";
import Timing from "../Timing";

const Search = () => {
  return (
    <div className="max-w-6xl w-full flex flex-col justify-between py-10 space-y-10 select-none">
      <Timing />
      <input
        className="border-[1px] rounded-md px-4 py-4 border-blackk text-lg"
        type="search"
        placeholder="Search foods"
      />
    </div>
  );
};

export default Search;
