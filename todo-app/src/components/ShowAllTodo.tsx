import React, { useContext, useEffect, useState } from "react";
import { TodoItem } from "../utils/interface";
import { DATA_URL } from "../utils/constants";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";

import { DataContext } from "../context/RouterContext";

const ShowAllTodo = () => {
  const data = useContext(DataContext);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState(false);

  setTodos(data);
  setLoading(false);

  const displayTodos = showCompleted
    ? todos.filter((todo) => todo.completed === true)
    : todos;

  const deleteTodo = (id: string): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markedTodoCompleted = (id: string, completed: boolean) => {
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

export default React.memo(ShowAllTodo);
