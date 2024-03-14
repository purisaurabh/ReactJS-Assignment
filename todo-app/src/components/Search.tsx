import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { TodoItem } from "../utils/interface";
import ShowSearchTodo from "./ShowSearchTodo";
import { DataContext } from "../context/RouterContext";
import useFetch from "../customHooks/useFetch";

// this is for the state
interface StateType {
  todos: TodoItem[];
  filterTodo: TodoItem[];
  searchText: string;
}

const initialValue: StateType = {
  todos: [],
  filterTodo: [],
  searchText: "",
};

// this is for the actions
type Action =
  | { type: "SET_TODOS"; payload: TodoItem[] }
  | { type: "SET_FILTER_DATA"; payload: TodoItem[] }
  | { type: "SET_SEARCH_TEXT"; payload: string };

const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "SET_FILTER_DATA":
      return { ...state, filterTodo: action.payload };
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.payload };
    default:
      return state;
  }
};

const Search = () => {
  const todoData = useFetch();
  // const [todos, setTodos] = useState<TodoItem[]>([]);
  // const [fileredData, setFilteredData] = useState<TodoItem[]>([]);
  // const [searchText, setSearchText] = useState("");

  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    dispatch({ type: "SET_TODOS", payload: todoData });
    // setTodos(todoData);
  }, [todoData]);

  return (
    <>
      <input
        value={state.searchText}
        placeholder="enter value to search.."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          // setSearchText(e.target.value)
          dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value })
        }
      />

      <button
        onClick={() => {
          if (state.todos) {
            const searchedText = state.todos.filter(
              (res) =>
                res.title &&
                res.title.toLowerCase().includes(state.searchText.toLowerCase())
            );
            // setFilteredData(searchedText);
            dispatch({ type: "SET_FILTER_DATA", payload: searchedText });
          }
        }}
      >
        Search
      </button>

      {state.searchText && state.filterTodo.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {state.filterTodo.map((todo) => (
            <li key={todo.id}>
              <ShowSearchTodo
                id={todo.id.toString()}
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

export default React.memo(Search);
