import React, { useState } from 'react'
import ShowTask from './ShowTask'

const Task = () => {

  // store the task
  const [task , setTask] = useState([])

  // get the entered value of the input 
  const[text , setText] = useState('')

  const addTask = (text) =>{
    const newTask = {
        id : Date.now(),
        text,
        completed : false
    }

    setTask([...task , newTask])
    setText('')
  }

  const deleteTask= (id) =>{
    setTask(task.filter((ele) => ele.id !== id))
  }

  const completedTask = (id) =>{
    setTask(task.map((ele) =>{
        if(ele.id === id){
            return {...ele , completed : !task.completed}
        }else{
            return ele
        }
    }))
  }

  return (
    <>
        
       <input value={text} placeholder='enter your task..' onChange={(e) => setText(e.target.value)}/>
       <button onClick={() => addTask(text)}>Add</button>

       {
            task.map((ele) =>(
                <ShowTask key={ele.id} todo={ele} deleteTask={deleteTask} completedTask = {completedTask}/>
            ))
        }
    </>
  )
}

export default Task
