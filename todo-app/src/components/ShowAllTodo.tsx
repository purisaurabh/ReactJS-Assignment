import React, { useContext, useEffect, useReducer, useState } from "react";
import { TodoItem } from "../utils/interface";
import { DATA_URL } from "../utils/constants";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import { DataContext } from "../context/RouterContext";
import useDelete from "../customHooks/useDelete";
import useUpdate from "../customHooks/useUpdate";

const initialValue = {
  id: "",
  title: "",
  completed: false,
};

const reducerAction = {
  CALL_API: "call-api",
};

const reducer = (state: TodoItem, action: any) => {
  switch (action.type) {
    case reducerAction.CALL_API:
      return { ...state };
  }
};

const ShowAllTodo = () => {
  const data = useContext(DataContext);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState(false);
  const { deleteData } = useDelete();
  const { updateData } = useUpdate();

  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    dispatch({ type: reducerAction.CALL_API });
    setTodos(data);
    setLoading(false);
  }, [data]);

  const displayTodos = showCompleted
    ? todos.filter((todo) => todo.completed === true)
    : todos;

  const deleteTodo = async (id: string) => {
    const flagValue = await deleteData(id);
    if (flagValue) {
      alert("Delete Successfully");
    }
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markedTodoCompleted = async (id: string, completed: boolean) => {
    try {
      const flagValue = await updateData(id, completed);
      if (flagValue) {
        alert("Mark as completed");
      }
      setTodos(
        todos.map((todo) => {
          if (id === todo.id) {
            updateData(id, completed);
            return { ...todo, completed: completed };
          } else {
            return todo;
          }
        })
      );
    } catch (error) {
      console.log("Error occured");
    }
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
