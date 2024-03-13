import React, { useState } from "react";

const TodoFilter = ({
  setShowCompleted,
  showCompleted,
}: {
  showCompleted: boolean;
  setShowCompleted: (showCompleted: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <input
        type="checkbox"
        id="filter"
        checked={showCompleted}
        onChange={(e) => setShowCompleted(e.target.checked)}
        className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
      />
      <label htmlFor="filter">Show Completed</label>
    </div>
  );
};

export default React.memo(TodoFilter);
