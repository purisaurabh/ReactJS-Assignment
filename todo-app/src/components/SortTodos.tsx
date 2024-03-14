import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import useFetch from "../customHooks/useFetch";
import { TodoItem } from "../utils/interface";
import ShowSearchTodo from "./ShowSearchTodo";
import { DataContext } from "../context/RouterContext";

interface StateType {
  todos: TodoItem[];
  sortData: TodoItem[];
  sortText: string;
}

const initialValue: StateType = {
  todos: [],
  sortData: [],
  sortText: "",
};

// this is for the actions
type Action =
  | { type: "SET_TODOS"; payload: TodoItem[] }
  | { type: "SET_SORT_DATA"; payload: TodoItem[] }
  | { type: "SET_SORT_TEXT"; payload: string };

const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "SET_SORT_DATA":
      return { ...state, sortData: action.payload };
    case "SET_SORT_TEXT":
      return { ...state, sortText: action.payload };
    default:
      return state;
  }
};

const SortTodos = () => {
  const todoData = useFetch();
  // const [todos, setTodos] = useState<TodoItem[]>([]);
  // const [sortData, setSortData] = useState<TodoItem[]>([]);
  // const [sortText, setSortText] = useState("");

  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    // setTodos(todoData);
    dispatch({ type: "SET_TODOS", payload: todoData });
    console.log({ todoData });
  }, [todoData]);

  const sortByName = (order: string) => {
    // sort are modify the original array have to create the copt
    const todoCopy = [...state.todos];
    const sortedData = todoCopy.sort((a, b) => {
      const firstName = a.title.toLowerCase();
      const secondName = b.title.toLowerCase();

      if (order === "asc") {
        return firstName.localeCompare(secondName);
      } else if (order === "desc") {
        return secondName.localeCompare(firstName);
      }
      return 0;
    });

    // setSortData(sortedData);
    dispatch({ type: "SET_SORT_DATA", payload: sortedData });
  };

  return (
    <>
      <input
        type="text"
        value={state.sortText}
        placeholder="Enter 'asc' or 'desc'"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          // setSortText(e.target.value)
          dispatch({ type: "SET_SORT_TEXT", payload: e.target.value })
        }
      />

      <button onClick={() => sortByName(state.sortText)}>Sort</button>

      {state.sortText && state.sortData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {state.sortData.map((todo) => (
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

export default React.memo(SortTodos);
