import React from 'react'

const TodoListItem = ({ completed, title, id, markTodoCompleted, deleteTodo }: { completed: boolean, title: string, id: number, markTodoCompleted: (id: number, completed: boolean) => void, deleteTodo: (id: number) => void }) => {
    return (
        <div>
            <input type='checkbox' checked={completed} onChange={(e) => markTodoCompleted(id, e.target.checked)}></input>
            <label>{title}</label>
            <button onClick={() => deleteTodo(id)}>Delete</button>
        </div>
    )
}

export default TodoListItem
