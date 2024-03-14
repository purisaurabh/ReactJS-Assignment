import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { TodoItem } from "../utils/interface";
import useFetch from "../customHooks/useFetch";
import ShowSearchTodo from "./ShowSearchTodo";

interface StateType {
  todos: TodoItem[];
  completedData: TodoItem[];
  inputText: string;
}

const initialValue: StateType = {
  todos: [],
  completedData: [],
  inputText: "",
};

// this is for the actions
type Action =
  | { type: "SET_TODOS"; payload: TodoItem[] }
  | { type: "SET_COMPLETED_DATA"; payload: TodoItem[] }
  | { type: "SET_SEARCH_TEXT"; payload: string };

const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "SET_COMPLETED_DATA":
      return { ...state, filterTodo: action.payload };
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.payload };
    default:
      return state;
  }
};

const ShowCompletedData = () => {
  const todoData = useFetch();
  // const [todos, setTodos] = useState<TodoItem[]>([]);
  // const [completedData, setCompletedData] = useState<TodoItem[]>([]);
  // const [inputText, setInputText] = useState("");
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    // setTodos(todoData);
    dispatch({ type: "SET_TODOS", payload: todoData });
    console.log({ todoData });
  });

  const getCompletedData = (value: string) => {
    let flagValue: boolean;
    if (value === "complete") {
      flagValue = true;
    } else if (value === "incomplete") {
      flagValue = false;
    }
    const completedValue = state.todos.filter(
      (todo) => todo.completed === flagValue
    );
    // setCompletedData(completedValue);
    dispatch({ type: "SET_COMPLETED_DATA", payload: completedValue });
  };
  return (
    <>
      <input
        type="text"
        value={state.inputText}
        placeholder="enter the flag value"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          // setInputText(e.target.value)
          dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value })
        }
      />

      <button
        onClick={() => {
          getCompletedData(state.inputText);
        }}
      >
        Filter
      </button>

      {state.inputText && state.completedData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {state.completedData.map((todo) => (
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

export default React.memo(ShowCompletedData);
