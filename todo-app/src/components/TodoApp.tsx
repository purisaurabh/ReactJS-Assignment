import React, { createContext, useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import { TodoItem } from "../utils/interface";

import { DATA_URL } from "../utils/constants";
import usePost from "../utils/usePost";
import useFetch from "../utils/useFetch";

type TodoContext = {
  markedTodoCompleted: (id: number, completed: boolean) => void;
  deleteTodo: (id: number) => void;
};
export const FunctionComponentContext = createContext<TodoContext | null>(null);

const TodoApp = () => {
  const todoItems = useFetch();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { fetchPost } = usePost();

  console.log({ todoItems });

  // we should have this is in another component
  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((response) => {
        setTodos(response);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const addTodo = async (title: string) => {
    const newTodo = { id: todos.length + 1, title, completed: false };
    const flagValue = await fetchPost(newTodo);
    if (flagValue) {
      alert("Add Todo Successfully");
    }
    setTodos([...todos, newTodo]);
  };

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
      <FunctionComponentContext.Provider
        value={{ markedTodoCompleted, deleteTodo }}
      >
        <AddTodoForm addTodo={addTodo} />
        <TodoFilter
          showCompleted={showCompleted}
          setShowCompleted={setShowCompleted}
        />
        {error.length ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <TodoList todos={displayTodos} />
        )}
      </FunctionComponentContext.Provider>
    </>
  );
};

export default TodoApp;
