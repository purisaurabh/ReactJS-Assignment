import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";
import { TodoItem } from "../utils/interface";
import ShowSearchTodo from "./ShowSearchTodo";
import { DataContext } from "../context/RouterContext";

const SortTodos = () => {
  const todoData = useContext(DataContext);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [sortData, setSortData] = useState<TodoItem[]>([]);
  const [sortText, setSortText] = useState("");

  useEffect(() => {
    setTodos(todoData);
    console.log({ todoData });
  }, [todoData]);

  const sortByName = (order: string) => {
    // sort are modify the original array have to create the copt
    const todoCopy = [...todos];
    const sortedData = todoCopy.sort((a, b) => {
      const firstName = a.title.toLowerCase();
      const secondName = b.title.toLowerCase();

      if (order === "asc") {
        return firstName.localeCompare(secondName);
      } else if (order === "desc") {
        return secondName.localeCompare(firstName);
      }
      return 0;
    });

    setSortData(sortedData);
  };

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

      <button onClick={() => sortByName(sortText)}>Sort</button>

      {sortText && sortData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {sortData.map((todo) => (
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

export default React.memo(SortTodos);
