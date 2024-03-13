import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { TodoItem } from "../utils/interface";
import ShowSearchTodo from "./ShowSearchTodo";
import { DataContext } from "../context/RouterContext";
import { SearchIcon } from "lucide-react";

const Search = () => {
  const todoData = useContext(DataContext);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [fileredData, setFilteredData] = useState<TodoItem[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setTodos(todoData);
    console.log({ todoData });
  }, [todoData]);

  return (
    <>
      {/* <input
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
      </button> */}

      <div className=" mx-auto mt-10 max-w-md">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            placeholder="Search..."
            className="w-full p-4 rounded-lg text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-200 ease-in-out transform focus:scale-105"
            style={{ borderColor: "#ddd", borderWidth: "1px" }}
          />

          {/* Search Button */}
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
            className="p-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-110"
          >
            <SearchIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

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
