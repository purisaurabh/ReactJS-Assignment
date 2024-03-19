import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TodoApp from "./components/TodoApp";
import TodoDetails from "./components/TodoDetails";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/todo-details/:id" element={<TodoDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
