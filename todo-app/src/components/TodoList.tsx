import React from "react";
import { TodoItem } from "../utils/interface";
import TodoListItem from "./TodoListItem";

const TodoList = (props: { todos: TodoItem[] }) => {
  return (
    <div>
      <h3>Todo List</h3>
      <ul>
        {props.todos.map((todo) => (
          <li key={todo.id}>
            <TodoListItem
              id={todo.id}
              completed={todo.completed}
              title={todo.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
