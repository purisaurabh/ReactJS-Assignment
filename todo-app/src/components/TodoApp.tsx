import React, { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import { TodoItem } from "../utils/interface";

import { DATA_URL } from "../utils/constants";
import usePost from "../customHooks/usePost";
import useFetch from "../customHooks/useFetch";

const TodoApp = () => {
  const todoItems = useFetch();
  const [todos, setTodos] = useState<TodoItem[]>([]);

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

  return (
    <>
      <AddTodoForm addTodo={addTodo} />
    </>
  );
};

export default TodoApp;
