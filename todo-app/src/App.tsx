import React from 'react';
import Task from './components/Task';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoDetails from './components/TodoDetails';
import ShowAllTask from './components/ShowAllTask';


const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/add-todo' element={<Task />}/>
              <Route path='/all' element={<ShowAllTask />} />
              <Route path='/todo-details/:id' element={<TodoDetails />}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;