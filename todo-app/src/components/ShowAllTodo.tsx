import React, { useEffect, useState } from "react";
import { TodoItem } from "../utils/interface";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";

// import useFetch from "../customHooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../pagination/fetchPost";

const ShowAllTodo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", { page }],
    queryFn: () => fetchPosts(page),
  });

  console.log({ data });

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);
  console.log("data after storing : ", todos);
  const displayTodos = showCompleted
    ? todos?.filter((todo: TodoItem) => todo.completed === true)
    : todos;

  const deleteTodo = (id: string): void => {
    setTodos(todos?.filter((todo) => todo.id !== id));
  };

  const markedTodoCompleted = (id: string, completed: boolean) => {
    setTodos(
      todos?.map((todo: TodoItem) => {
        if (id === todo.id) {
          return { ...todo, completed: completed };
        } else {
          return todo;
        }
      })
    );
  };

  console.log("for pagination : ", todos);
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
        <div>
          <div>
            <TodoList
              todos={todos}
              markTodoCompleted={markedTodoCompleted}
              deleteTodo={deleteTodo}
            />
          </div>
          <div className="pages">
            <button
              onClick={() => setPage((oldPage) => Math.max(oldPage - 1, 0))}
              disabled={!data?.prev}
            >
              Previous
            </button>
            <span>{page}/{data?.pages}</span>
            <button
              onClick={() => {
                setPage((newPage) => newPage + 1);
              }}
              disabled={!data?.next}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ShowAllTodo);
