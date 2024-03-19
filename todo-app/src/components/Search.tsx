import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { TodoItem } from "../utils/interface";
import ShowSearchTodo from "./ShowSearchTodo";
import useFetch from "../customHooks/useFetch";

const Search = () => {
  const { data } = useFetch();
  // const [todos, setTodos] = useState<TodoItem[]>([]);
  const [fileredData, setFilteredData] = useState<TodoItem[]>([]);
  const [searchText, setSearchText] = useState("");

  console.log("Data is search : ", data);

  const handleSearch = () => {
    const searchedText = data.filter((res: TodoItem) => {
      return (
        res.title && res.title.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredData(searchedText);
  };

  return (
    <>
      <input
        value={searchText}
        placeholder="search todo by title..."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
      />

      <button onClick={handleSearch} disabled={!searchText}>
        Search
      </button>

      {console.log("filtered data :  ", fileredData)}

      {searchText && fileredData.length === 0 ? (
        <pre>No data available</pre>
      ) : (
        <ul>
          {fileredData.map((todo) => (
            <li key={todo.id}>
              <ShowSearchTodo
                id={todo.id.toString()}
                title={todo.title}
                completed={todo.completed}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default React.memo(Search);
