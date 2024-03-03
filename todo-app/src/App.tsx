import React from 'react';
import Task from './components/Task';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoDetails from './components/TodoDetails';
import AddTodo from './components/AddTodo';
import ShowAllTask from './components/ShowAllTask';


const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
          <Routes>
              {/* <Route path='/' element={<Task />} /> */}
              <Route path='/' element={<Task />}/>
              <Route path='/all' element={<ShowAllTask />} />
              <Route path='/todo-details/:id' element={<TodoDetails />}/>
              <Route path='protectedroute'/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;