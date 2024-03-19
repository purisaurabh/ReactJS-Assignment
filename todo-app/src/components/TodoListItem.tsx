import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FunctionComponentContext } from "./TodoApp";

const TodoListItem = ({
  completed,
  title,
  id,
}: {
  completed: boolean;
  title: string;
  id: number;
}) => {
  const todoContext = useContext(FunctionComponentContext);

  const navigate = useNavigate();
  const handleTitleClick = () => {
    navigate(`/todo-details/${id}`);
  };
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => todoContext?.markedTodoCompleted(id, e.target.checked)}
      ></input>
      <label onClick={handleTitleClick}>{title}</label>
      <button onClick={() => todoContext?.deleteTodo(id)}>Delete</button>
    </div>
  );
};

export default TodoListItem;
