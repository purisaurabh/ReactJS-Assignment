import React, { useState, ChangeEvent, useEffect } from 'react';
import ShowTask from './ShowTask';
import useFetch from '../customHooks/useFetch';
import usePost from '../customHooks/usePost';
import { ITask } from '../utils/interface';
import { DATA_URL } from '../utils/constants';
import "bootstrap/dist/css/bootstrap.min.css"


const Task: React.FC = () => {
  const res = useFetch()
  const [task, setTask] = useState<ITask[]>([]);
  const [filerTodo, setFilterTodo] = useState<ITask[]>([]);
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState("")
  const { fetchPost } = usePost();

  useEffect(() => {
    setFilterTodo(res)
  }, [res])

  useEffect(() => {
    setTask(res)
  }, [res])


  const addTask = async (text: string) => {
    const newTask: ITask = {
      id: Date.now().toString(),
      text,
      completed: false,
    };

    try {
      const data = await fetchPost(newTask);
      setTask([...task, data]);
      setText('');
    } catch (err) {
      console.log("Err : ", err)
    }
  };


  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`${DATA_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        console.log(`Error code : ${response.status}`)
        return
      }

      const data = await response.json()
      // return data
      setTask([...task, data])
      setTask(task.filter((ele) => (
        ele.id !== id
      )));
    } catch (err) {
      console.log("Some Error : ", err)
    }
  };

  const completedTask = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${DATA_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
      })

      if (!response.ok) {
        console.log(`Error code : ${response.status}`)
        return
      }

      const data = await response.json()
    } catch (error) {
      console.log("some error occured : ", error)
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

      <input
        value={searchText}
        placeholder="enter value to search.."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
      />

      <button
        onClick={() => {
          if (task) {
            const searchedText = task.filter((res) =>
              res.text && res.text.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilterTodo(searchedText);
          }
        }}>
        Search
      </button>
        <button >Sort</button>
      {filerTodo.length === 0 ? <p>No data available</p> : filerTodo.map((ele) => (
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