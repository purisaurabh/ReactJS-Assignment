import React from 'react'

const ShowTask = (props) => {
    const {key , todo , deleteTask , completedTask} = props
  return (
    <div div style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <input type='checkbox' 
        checked={todo.completed}
        onChange={() => completedTask(todo.id)}
      ></input>
      <p>{key}</p>
      <p>{todo.text}</p>
      <button onClick={() => deleteTask(todo.id)}>Delete</button>
    </div>
  )
}

export default ShowTask
