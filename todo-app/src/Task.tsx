import React, { useState, ChangeEvent } from 'react';
import ShowTask from './ShowTask';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Task: React.FC = () => {
  const [task, setTask] = useState<Task[]>([]);
  const [text, setText] = useState<string>('');

  const addTask = (text: string): void => {
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

  return (
    <>
      <input
        value={text}
        placeholder="enter your task.."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
      />
      <button onClick={() => addTask(text)}>Add</button>

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