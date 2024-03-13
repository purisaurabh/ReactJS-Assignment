import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomeIcon, List, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="mx-auto w-full">
        <div className="flex justify-between items-center p-3 bg-blue-500 text-white">
          <Link to={"/"}>
            <HomeIcon className=" text-black cursor-pointer" />
          </Link>
          <div className="flex space-x-2">
            <Link to={"/"}>
              <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <Plus className="mr-2" /> Add
              </button>
            </Link>
            <Link to={"/show-all"}>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow inline-flex items-center">
                Show All
              </button>
            </Link>
            <Link to={"/search"}>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow inline-flex items-center">
                <Search className="mr-2" /> Search
              </button>
            </Link>
            <Link to={"/sort"}>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow inline-flex items-center">
                Sort
              </button>
            </Link>
            <Link to={"filter"}>
              <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <List className="mr-2" />
                Filter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Header);
