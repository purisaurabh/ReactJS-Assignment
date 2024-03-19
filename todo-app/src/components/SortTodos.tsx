import React, { ChangeEvent, useState } from "react";

const SortTodos = (props: { sortByName: Function }) => {
  const [sortText, setSortText] = useState("");

  return (
    <>
      <input
        type="text"
        value={sortText}
        placeholder="Enter 'asc' or 'desc'"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSortText(e.target.value)
        }
      />

      <button onClick={() => props.sortByName(sortText)}>Sort</button>
    </>
  );
};

export default React.memo(SortTodos);
