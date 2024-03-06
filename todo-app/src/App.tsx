import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoDetails from "./components/TodoDetails";
import Header from "./components/Header";
import TodoApp from "./components/TodoApp";
import ShowAllTodo from "./components/ShowAllTodo";
import Search from "./components/Search";
import SortTodos from "./components/SortTodos";
import ShowCompletedData from "./components/ShowCompletedData";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/show-all" element={<ShowAllTodo />} />
          <Route path="/search" element={<Search />} />
          <Route path="/sort" element={<SortTodos />} />
          <Route path="/filter" element={<ShowCompletedData />} />
          <Route path="/todo-details/:id" element={<TodoDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
