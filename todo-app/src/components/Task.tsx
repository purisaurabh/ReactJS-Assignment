import React, { useState, ChangeEvent, useEffect } from 'react';
import ShowTask from './ShowTask';
import { ITask } from './interface';
import useFetch from './UseFetch';
import { DATA_URL } from '../utils/constants';


const Task: React.FC = () =>{

  // const initialTodos: ITask[] = [
  //   { id: 1, text: 'this is the first task', completed: false },
  //   { id: 2, text: 'this is the second task', completed: true },
  // ];

  const res = useFetch(DATA_URL)
  const [task, setTask] = useState<ITask[]>([]);
  
  useEffect(() => {
    setTask(res)
  }, [res])

  // setTask(res)

  console.log(task)
  const [text, setText] = useState<string>('');
  const [showChecked , setShowChecked] = useState<boolean>(false)
  const [isLoading , setIsLoading] = useState<boolean>(false)

  const addTask = (text: string) => {
    const newTask: ITask = {
      id: Date.now(),
      text,
      completed: false,
    };


    fetch(DATA_URL, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask)
  }).then(response => response.json())
 

    setTask([...task, newTask]);
    setText('');
  };

  const deleteTask = (id: number): void => {
    setTask(task.filter((ele) => ele.id !== id));
  };

  const completedTask = (id: number): void => {
    setTask((prevTask) =>
      prevTask.map((ele) =>
        ele.id === id ? { ...ele, completed: !ele.completed } : ele
      )
    );
  };


  const getAllMarkedTodo = ():ITask[] =>{
    if (showChecked) {
      return task.filter(todo => todo.completed);
    } else {
      return [] 
    }

  }  


  return (
    <>
      <input
        value={text}
        placeholder="enter your task.."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
      /> <button onClick={() => addTask(text)}>Add</button>
      <br></br>
      
      <label>
        <input 
          type="checkbox"  
          checked={showChecked}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setShowChecked(e.target.checked)}
        />
        Show All Checked Todo
      </label>
        
      {
        <ul>
          {getAllMarkedTodo().map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
         
        </ul>

      }
         
        {task.map((ele) => (
          <ShowTask
          key={ele.id.toString()}
          todo={ele}
          deleteTask={deleteTask}
          completedTask={completedTask}
        />
      ))}
    </>
  );
};

export default Task;