import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { TodoItem } from "../utils/interface";
import ShowSearchTodo from "./ShowSearchTodo";
import useFetch from "../customHooks/useFetch";

const SortTodos = () => {
  const { data, isError, isLoading, error } = useFetch();
  const [sortData, setSortData] = useState<TodoItem[]>([]);
  const [sortText, setSortText] = useState("");

  const sortByName = (order: string) => {
    const todoCopy = [...data];
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
      {console.log(sortText)}

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
