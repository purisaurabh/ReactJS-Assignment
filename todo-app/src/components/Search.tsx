import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { TodoItem } from "../utils/interface";
import ShowSearchTodo from "./ShowSearchTodo";
import { DataContext } from "../context/RouterContext";

const Search = () => {
  const todoData = useContext(DataContext);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [fileredData, setFilteredData] = useState<TodoItem[]>([]);
  const [searchText, setSearchText] = useState("");

  setTodos(todoData);

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
