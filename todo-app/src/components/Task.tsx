import React, { useState, ChangeEvent } from 'react';
import ShowTask from './ShowTask';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Task: React.FC = () =>{

  const initialTodos: Task[] = [
    { id: 1, text: 'this is the first task', completed: false },
    { id: 2, text: 'this is the second task', completed: true },
  ];


  const [task, setTask] = useState<Task[]>(initialTodos);
  const [text, setText] = useState<string>('');
  const [showChecked , setShowChecked] = useState<boolean>(false)

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };

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


  const getAllMarkedTodo = ():Task[] =>{
    if (showChecked) {
      return task.filter(todo => todo.completed);
    } else {
      // If you don't want to show all tasks globally, return an empty array
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