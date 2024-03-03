import React, { useState, ChangeEvent, useEffect } from 'react';
import ShowTask from './ShowTask';
import useFetch from '../utils/useFetch';
import usePost from '../utils/usePost';
import { ITask } from '../utils/interface';
import { DATA_URL } from '../utils/constants';


const Task: React.FC = () =>{
  const res = useFetch()
  const [task, setTask] = useState<ITask[]>([]);
  const [text, setText] = useState<string>('');
  const {fetchPost} = usePost();

  useEffect(() => {
    setTask(res)
  }, [res])

  const addTask = async (text: string) => {
    const newTask: ITask = {
      id: Date.now().toString(),
      text,
      completed: false,
    };

    try{
      const data = await fetchPost(newTask);
      setTask([...task , data]);
      setText('');
    }catch(err){
      console.log("Err : "  , err)
    }
  };

  const deleteTask = async (id: string) => {
    try{
      const response = await fetch(`${DATA_URL}/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(!response.ok){
        console.log(`Error code : ${response.status}`)
        return
      }

      const data = await response.json()
      // return data
      setTask([...task , data])
      setTask(task.filter((ele) => (
        ele.id !== id
      )));
    }catch(err){
      console.log("Some Error : " , err)
    }
  };

  const completedTask = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${DATA_URL}/${id}` , {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
      })

      if(!response.ok){
        console.log(`Error code : ${response.status}`)
        return
      }

      const data = await response.json()
    } catch (error) {
      console.log("some error occured : " , error)    
    }
    setTask((prevTask) =>
      prevTask.map((ele) =>
        ele.id === id ? { ...ele, completed: !ele.completed } : ele
      )
    );
  };


  return (
    <>
      <input
        value={text}
        placeholder="enter your task.."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
      /> 
      
      <button 
        onClick={() => addTask(text)}>
        Add
      </button>

      {task.map((ele) => (
          <ShowTask
            key={ele.id.toString()}
            todo={ele}
            deleteTask={deleteTask}
            completedTask={completedTask}
        />
      ))}
    </>
  );
};

export default Task;