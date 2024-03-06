import React, { ChangeEvent, useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";
import { TodoItem } from "../utils/interface";
import ShowSearchTodo from "./ShowSearchTodo";

const Search = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [fileredData, setFilteredData] = useState<TodoItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const todoData = useFetch();
  useEffect(() => {
    console.log("Data in useffect : ", todoData);
    setTodos(todoData);
  }, [todoData]);
  return (
    <>
      <input
        value={searchText}
        placeholder="enter value to search.."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
      />

      <button
        onClick={() => {
          if (todos) {
            const searchedText = todos.filter(
              (res) =>
                res.title &&
                res.title.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredData(searchedText);
          }
        }}
      >
        Search
      </button>

      {searchText && fileredData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {fileredData.map((todo) => (
            <li key={todo.id}>
              <ShowSearchTodo
                id={todo.id}
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

export default Search;
