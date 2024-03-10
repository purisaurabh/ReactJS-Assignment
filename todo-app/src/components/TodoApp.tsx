import React, { useContext, useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import { TodoItem } from "../utils/interface";
import usePost from "../customHooks/usePost";
import { useNavigate } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
// import { DataContext } from "../context/RouterContext";

const TodoApp = () => {
  const { data } = useFetch();
  const navigate = useNavigate();
  const { mutate } = usePost();

  const addTodo = async (title: string) => {
    const newTodo = {
      id: (data.length + 1).toString(),
      title,
      completed: false,
    };
    mutate(newTodo);
    navigate("/show-all");
  };

  return (
    <>
      <AddTodoForm addTodo={addTodo} />
    </>
  );
};

export default React.memo(TodoApp);
