import React from "react";
import { TodoItem } from "../utils/interface";
import TodoListItem from "./TodoListItem";

const TodoList = (props: {
  todos: any;
  markTodoCompleted: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}) => {
  const { todos } = props;
  // console.log({ todos });
  return (
    <div>
      <h3>Todo List</h3>
      <ul>
        {props?.todos?.data?.map((todo: any) => (
          <li key={todo.id}>
            <TodoListItem
              id={todo.id}
              completed={todo.completed}
              title={todo.title}
              markTodoCompleted={props.markTodoCompleted}
              deleteTodo={props.deleteTodo}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(TodoList);
