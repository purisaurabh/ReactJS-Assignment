import React, { ChangeEvent, useEffect, useState } from "react";
import { TodoItem } from "../utils/interface";
import useFetch from "../customHooks/useFetch";
import ShowSearchTodo from "./ShowSearchTodo";

const ShowCompletedData = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [completedData, setCompletedData] = useState<TodoItem[]>([]);
  const todoData = useFetch();

  useEffect(() => {
    console.log("Data in useffect : ", todoData);
    setTodos(todoData);
  }, [todoData]);

  const getCompletedData = (value: string) => {
    let flagValue: boolean;
    if (value === "complete") {
      flagValue = true;
    } else if (value === "incomplete") {
      flagValue = false;
    }
    const completedValue = todos.filter((todo) => todo.completed === flagValue);
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

export default ShowCompletedData;
