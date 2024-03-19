import React, { useContext, useEffect, useState } from "react";
import { Filter, Order, TodoItem } from "../utils/interface";

import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";

import { DataContext } from "../context/RouterContext";
import useDelete from "../customHooks/useDelete";
import useUpdate from "../customHooks/useUpdate";

const ShowAllTodo = () => {
  const data = useContext(DataContext);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [displayTodos, setDisplayTodos] = useState<TodoItem[]>([]);
  const [showCompletedData, setShowCompletedData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { deleteData } = useDelete();
  const { updateData } = useUpdate();

  useEffect(() => {
    setTodos(data);
    setDisplayTodos(data);
    setLoading(false);
    console.log("In UseEffect");
  }, [data]);

  const getShowCompletedData = showCompletedData
    ? todos.filter((todo) => todo.completed === true)
    : todos;

  const sortByName = (order: string) => {
    console.log("In sort function");
    const todoCopy = [...displayTodos];
    const sortedData = todoCopy.sort((a, b) => {
      const firstName = a.title.toLowerCase();
      const secondName = b.title.toLowerCase();

      if (order === Order.asc) {
        return firstName.localeCompare(secondName);
      } else if (order === Order.desc) {
        return secondName.localeCompare(firstName);
      }
      return 0;
    });

    setDisplayTodos(sortedData);
    console.log("Sorted data inside: ", sortedData);
  };

  console.log("sorted data outside :", displayTodos);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    console.log(searchTerm);

    if (todos) {
      console.log("handlesearch");
      const filteredCompletedTodo = todos.filter(
        (todo) => todo.completed && todo.title.includes(searchTerm)
      );
      setDisplayTodos(filteredCompletedTodo);
    }
  };

  const getCompletedData = (value: string) => {
    let filteredTodos = [];

    if (value === Filter.complete) {
      filteredTodos = todos.filter((todo) => todo.completed === true);
    } else if (value === Filter.incomplete) {
      filteredTodos = todos.filter((todo) => todo.completed === false);
    } else {
      filteredTodos = todos;
    }

    setDisplayTodos(filteredTodos);
  };

  return (
    <>
      <TodoFilter
        getCompletedData={getCompletedData}
        sortByName={sortByName}
        handleSearch={handleSearchChange}
        showCompleted={showCompletedData}
        setShowCompleted={setShowCompletedData}
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
