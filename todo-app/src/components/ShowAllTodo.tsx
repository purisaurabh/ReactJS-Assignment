import React, { useEffect, useState } from "react";
import { TodoItem } from "../utils/interface";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";

import useFetch from "../customHooks/useFetch";

const ShowAllTodo = () => {
  const { data, isError, isLoading, error, pageData } = useFetch();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const [page, setPage] = useState(1);
  useEffect(() => {
    setTodos(data);
  }, [data]);

  console.log("Data from page url : ", pageData);
  console.log("data after storting : ", todos);
  const displayTodos = showCompleted
    ? todos.filter((todo: TodoItem) => todo.completed === true)
    : todos;

  const deleteTodo = (id: string): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markedTodoCompleted = (id: string, completed: boolean) => {
    setTodos(
      todos?.map((todo) => {
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
      <TodoFilter
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />
      {error ? (
        <p>{error?.message}</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList
          todos={todos}
          markTodoCompleted={markedTodoCompleted}
          deleteTodo={deleteTodo}
        />
      )}

      {console.log({ data })}
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={!pageData?.pre}
      >
        Previous Page
      </button>
      <span>{page}</span>
      <button
        onClick={() => {
          // if (!isPlaceholderData && data?.next) {
          if (pageData?.next) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        // disabled={isPlaceholderData || !data?.next}
        disabled={!data?.next}
      >
        Next Page
      </button>
    </>
  );
};

export default React.memo(ShowAllTodo);
