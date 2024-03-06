import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DATA_URL } from "../utils/constants";
import { TodoItem } from "../utils/interface";

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState<TodoItem | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`${DATA_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setTodo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTodo();
  }, [id]);

  console.log("id : ", id);

  console.log("Data : ", todo);

  return (
    <div>
      <h1>{todo?.id}</h1>
      <h1>{todo?.title}</h1>
      <h1>
        {todo && todo.completed ? <p>Completed</p> : <p>Not Completed</p>}
      </h1>
    </div>
  );
};

export default TodoDetails;
