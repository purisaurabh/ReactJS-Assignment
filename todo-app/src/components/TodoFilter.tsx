import React, { useState } from "react";
import { Filter, Order } from "../utils/interface";

const TodoFilter = ({
  getCompletedData,
  sortByName,
  handleSearch,
  showCompleted,
  setShowCompleted,
}: {
  getCompletedData: Function;
  sortByName: Function;
  handleSearch: Function;
  showCompleted: boolean;
  setShowCompleted: (showCompleted: boolean) => void;
}) => {
  const [selectOption, setSelectOption] = useState("default");
  const [selectFilterOption, setSelectFilterOption] = useState("default");

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectOption(e.target.value);
  };

  const handleSort = () => {
    sortByName(selectOption);
  };

  const handleFilterOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFilterOption(e.target.value);
  };

  const handleFilter = () => {
    getCompletedData(selectFilterOption);
  };

  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <input
        type="search"
        placeholder="Search by todo title"
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 mr-2 focus:outline-none focus:bg-white focus:border-purple-500"
        onChange={(e) => {
          handleSearch(e, false);
        }}
      />
      <div className="ml-2 w-5">
        <select onChange={handleSelectOption} value={selectOption}>
          <option value="default">Sort By</option>
          <option value="Ascending">{Order.asc}</option>
          <option value="Descending">{Order.desc}</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSort}
      >
        Sort
      </button>

      <div className="ml-2 w-5">
        <select onChange={handleFilterOption} value={selectFilterOption}>
          <option value="default">Filter By </option>
          <option value="Completed">{Filter.complete}</option>
          <option value="InCompleted">{Filter.incomplete}</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
  );
};

export default React.memo(TodoFilter);
