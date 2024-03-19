import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { TodoItem } from "../utils/interface";
import ShowSearchTodo from "./ShowSearchTodo";
import useFetch from "../customHooks/useFetch";
// import { DataContext } from "../context/RouterContext";

const ShowCompletedData = () => {
  const { data } = useFetch();

  const [inputText, setInputText] = useState("");
  const [completedData, setCompletedData] = useState<TodoItem[]>([]);

  const getCompletedData = (value: string) => {
    let flagValue: boolean;
    if (value === "complete") {
      flagValue = true;
    } else if (value === "incomplete") {
      flagValue = false;
    }
    const completedValue = data.filter(
      (todo: TodoItem) => todo.completed === flagValue
    );
    setCompletedData(completedValue);
  };
  return (
    <>
      <input
        type="text"
        value={inputText}
        placeholder="enter the flag value"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInputText(e.target.value)
        }
      />

      <button
        onClick={() => {
          getCompletedData(inputText);
        }}
      >
        Filter
      </button>

      {inputText && completedData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {completedData.map((todo) => (
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

export default React.memo(ShowCompletedData);
