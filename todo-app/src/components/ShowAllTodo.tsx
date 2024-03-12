import React, { useContext, useEffect, useReducer, useState } from "react";
import { TodoItem } from "../utils/interface";
import { DATA_URL } from "../utils/constants";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import { DataContext } from "../context/RouterContext";
import useDelete from "../customHooks/useDelete";
import useUpdate from "../customHooks/useUpdate";

const initialValue = {
  todos: [],
  loading: true,
  error: null,
};

const reducerAction = {
  setTodo: "setTodo",
  setLoading: "setLoading",
  setError: "setError",
};

const payloadTypes = {};

const actions = {
  type: reducerAction,
  payload: payloadTypes,
};

interface TodoAction {
  type: "setTodo";
  payload: TodoItem[];
}
interface LoadingAction {
  type: "setLoading";
  payload: boolean;
}

interface ApiDataAction {
  type: "apiData";
  payload: TodoItem[];
}

function setTodo(data: TodoItem[]): TodoAction {
  return {
    type: "setTodo",
    payload: data,
  };
}

function apiData(data: TodoItem[]): ApiDataAction {
  return {
    type: "apiData",
    payload: data,
  };
}

type Action = TodoAction | LoadingAction | ApiDataAction;

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "apiData":
      ///
      return { ...state, todos: action.payload, loading: false };
    case "setTodo":
      return { ...state, todos: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
  }
};

const ShowAllTodo = () => {
  const data = useContext(DataContext);
  // const [todos, setTodos] = useState<TodoItem[]>([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState(false);
  const { deleteData } = useDelete();
  const { updateData } = useUpdate();

  const [state, dispatch] = useReducer(reducer, initialValue);
  const { todos, loading } = state;

  useEffect(() => {
    dispatch(apiData(data));
    // dispatch({ type: "setTodo", payload: data });
    // dispatch({ type: "setLoading", payload: false });

    // setTodos(data);
    // setLoading(false);
  }, [data]);

  const displayTodos = showCompleted
    ? todos.filter((todo: any) => todo.completed === true)
    : todos;

  const deleteTodo = async (id: string) => {
    const flagValue = await deleteData(id);
    if (flagValue) {
      alert("Delete Successfully");
    }
    // setTodos(todos.filter((todo) => todo.id !== id));
    dispatch({
      type: "setTodo",
      payload: todos.filter((todo: any) => todo.completed === true),
    });
  };

  const markedTodoCompleted = async (id: string, completed: boolean) => {
    try {
      const flagValue = await updateData(id, completed);
      if (flagValue) {
        alert("Mark as completed");
      }
      // setTodos(
      //   todos.map((todo: any) => {
      //     if (id === todo.id) {
      //       updateData(id, completed);
      //       return { ...todo, completed: completed };
      //     } else {
      //       return todo;
      //     }
      //   })
      // );
      dispatch({
        type: "setTodo",
        payload: todos.map((todo: any) => {
          if (id === todo.id) {
            updateData(id, completed);
            return { ...todo, completed: completed };
          } else {
            return todo;
          }
        }),
      });
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
