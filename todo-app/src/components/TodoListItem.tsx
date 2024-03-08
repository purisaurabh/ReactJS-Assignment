import React from "react";
import { useNavigate } from "react-router-dom";

const TodoListItem = ({
  completed,
  title,
  id,
  markTodoCompleted,
  deleteTodo,
}: {
  completed: boolean;
  title: string;
  id: string;
  markTodoCompleted: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}) => {
  const navigate = useNavigate();
  const handleTitleClick = () => {
    navigate(`/todo-details/${id}`);
  };
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => markTodoCompleted(id, e.target.checked)}
      ></input>
      <label onClick={handleTitleClick}>{title}</label>
      <button onClick={() => deleteTodo(id)}>Delete</button>
    </div>
  );
};

export default React.memo(TodoListItem);
