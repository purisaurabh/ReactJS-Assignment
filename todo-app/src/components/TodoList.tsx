import React from 'react'
import { TodoItem } from '../utils/interface'
import TodoListItem from './TodoListItem'

const TodoList = (props: { todos: TodoItem[], markTodoCompleted: (id: number, completed: boolean) => void, deleteTodo: (id: number) => void }) => {
    return (
        <div>
            <h3>Todo List</h3>
            <ul>
                {
                    props.todos.map((todo) =>
                        <li key={todo.id}>
                            <TodoListItem id={todo.id} completed={todo.completed} title={todo.title} markTodoCompleted={props.markTodoCompleted} deleteTodo={props.deleteTodo} />
                        </li>)
                }
            </ul>
        </div>
    )
}

export default TodoList