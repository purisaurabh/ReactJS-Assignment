import React, { useContext, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import { TodoItem } from "../utils/interface";
import usePost from "../customHooks/usePost";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/RouterContext";

const TodoApp = () => {
  const todoItems = useContext(DataContext);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const navigate = useNavigate();
  const { fetchPost } = usePost();

  setTodos(todoItems);
  console.log({ todoItems });

  const addTodo = async (title: string) => {
    const newTodo = {
      id: (todos.length + 1).toString(),
      title,
      completed: false,
    };
    const flagValue = await fetchPost(newTodo);
    if (flagValue) {
      alert("Add Todo Successfully");
      navigate("/show-all");
    }
    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <AddTodoForm addTodo={addTodo} />
    </>
  );
};

export default React.memo(TodoApp);
