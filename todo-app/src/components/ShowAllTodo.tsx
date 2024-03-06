import React, { useEffect, useState } from "react";
import { TodoItem } from "../utils/interface";
import { DATA_URL } from "../utils/constants";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import useFetch from "../customHooks/useFetch";

const ShowAllTodo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState(false);
  //   useEffect(() => {
  //     fetch(DATA_URL)
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error(`HTTP error! Status: ${res.status}`);
  //         }
  //         return res.json();
  //       })
  //       .then((response) => {
  //         setTodos(response);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         setError("Failed to fetch data");
  //         setLoading(false);
  //       });
  //   }, []);

  const todoData = useFetch();
  useEffect(() => {
    console.log("Data in useeffect : ", todoData);
    setTodos(todoData);
    setLoading(false);
  }, [todoData]);

  const displayTodos = showCompleted
    ? todos.filter((todo) => todo.completed === true)
    : todos;

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markedTodoCompleted = (id: number, completed: boolean) => {
    setTodos(
      todos.map((todo) => {
        if (id === todo.id) {
          return { ...todo, completed: completed };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <>
      <TodoFilter
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />
      {error.length ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <TodoList
          todos={displayTodos}
          markTodoCompleted={markedTodoCompleted}
          deleteTodo={deleteTodo}
        />
      )}
    </>
  );
};

export default ShowAllTodo;
