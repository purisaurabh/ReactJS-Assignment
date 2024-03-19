import { DeleteIcon } from "lucide-react";
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
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 my-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => markTodoCompleted(id, e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-lg">{title}</span>
        </div>
        <button
          onClick={() => deleteTodo(id)}
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <DeleteIcon className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
