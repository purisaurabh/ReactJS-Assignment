import React, { useState } from 'react'
import AddTodoForm from './AddTodoForm'
import TodoFilter from './TodoFilter'
import { data } from '../data/data'
import TodoList from './TodoList'

const TodoApp = () => {

    const [todos, setTodos] = useState(data)
    const [showCompleted, setShowCompleted] = useState(false)

    const addTodo = (title: string) => {
        setTodos([...todos, { id: todos.length + 1, title, completed: false }])
    }

    const displayTodos = showCompleted ? todos.filter((todo) => todo.completed === true) : todos

    const deleteTodo = (id: number): void => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const markedTodoCompleted = (id: number, completed: boolean) => {
        setTodos(
            todos.map((todo) => {
                if (id === todo.id) {
                    return { ...todo, completed: completed }
                } else {
                    return todo
                }
            })
        )
    }

    return (
        <>
            <AddTodoForm addTodo={addTodo} />
            <TodoFilter showCompleted={showCompleted} setShowCompleted={setShowCompleted} />
            <TodoList todos={displayTodos} markTodoCompleted={markedTodoCompleted} deleteTodo={deleteTodo} />
        </>
    )
}

export default TodoApp
