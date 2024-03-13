import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import TodoDetails from "./components/TodoDetails";
import Header from "./components/Header";
import TodoApp from "./components/TodoApp";
import ShowAllTodo from "./components/ShowAllTodo";
import Search from "./components/Search";
import SortTodos from "./components/SortTodos";
import ShowCompletedData from "./components/ShowCompletedData";

import { DataProvider } from "./context/RouterContext";

const App: React.FC = () => {
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<TodoApp />} />
            <Route path="/show-all" element={<ShowAllTodo />} />
            <Route path="/todo-details/:id" element={<TodoDetails />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
};

export default App;
