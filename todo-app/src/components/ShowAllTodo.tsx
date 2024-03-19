import React, { useContext, useEffect, useReducer, useState } from "react";
import { TodoItem } from "../utils/interface";
import { DATA_URL } from "../utils/constants";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import { DataContext } from "../context/RouterContext";
import useDelete from "../customHooks/useDelete";
import useUpdate from "../customHooks/useUpdate";
import useFetch from "../customHooks/useFetch";

interface StateType {
  todos: TodoItem[];
  loading: boolean;
  error: string;
  showComplete: boolean;
}

const initialValue: StateType = {
  todos: [],
  loading: true,
  error: "",
  showComplete: false,
};

type ActionType =
  | { type: "SET_TODOS"; payload: TodoItem[] }
  | { type: "SET_LAODING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SHOW_COMPLETED"; payload: boolean };

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "SET_LAODING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SHOW_COMPLETED":
      return { ...state, showComplete: action.payload };
    default:
      return state;
  }
};

const ShowAllTodo = () => {
  const data = useFetch();
  // const [todos, setTodos] = useState<TodoItem[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string>("");
  // const [showCompleted, setShowCompleted] = useState(false);
  const { deleteData } = useDelete();
  const { updateData } = useUpdate();

  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    dispatch({ type: "SET_TODOS", payload: data });
    dispatch({ type: "SET_LAODING", payload: false });
    // setTodos(data);
    // setLoading(false);
  }, [data]);

  const displayTodos = state.showComplete
    ? state.todos.filter((todo: TodoItem) => todo.completed === true)
    : state.todos;

  const deleteTodo = async (id: string) => {
    const flagValue = await deleteData(id);
    if (flagValue) {
      alert("Delete Successfully");
    }
    // setTodos(todos.filter((todo) => todo.id !== id));
    dispatch({
      type: "SET_TODOS",
      payload: state.todos.filter((todo: TodoItem) => todo.completed === true),
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
        type: "SET_TODOS",
        payload: state.todos.map((todo: TodoItem) => {
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
        showCompleted={state.showComplete}
        setShowCompleted={(value: boolean) =>
          dispatch({ type: "SHOW_COMPLETED", payload: value })
        }
      />
      {state.error.length ? (
        <p>{state.error}</p>
      ) : state.loading ? (
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
