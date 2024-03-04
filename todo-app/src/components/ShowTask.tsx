import React from 'react'

interface ShowTaskProps {
  key: string; 
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  deleteTask: (id: number) => void;
  completedTask: (id: number) => void;
}



const ShowTask: React.FC<ShowTaskProps> = ({ key, todo, deleteTask, completedTask }) => {
  return (
    <div className="base-container">
      <div className = 'todo-item' style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => completedTask(todo.id)}
        ></input>
        <p>{key}</p>
        <p>{todo.text}</p>
      </div>
     
      <button onClick={() => deleteTask(todo.id)}>Delete</button>
    </div>
  );
};
export default ShowTask
