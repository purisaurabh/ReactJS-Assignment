import React, { useEffect, useState } from 'react'
import { ITask } from './interface'

const useFetch = (url : string) => {
  const [task , setTask] = useState<ITask[]>([])

  const fetchData = async () =>{
    try{
      const res = await fetch(url)
      if(!res.ok){
        throw new Error(`Got Error : ${res.status}`)
      }
      const jsonData = await res.json()
      setTask(jsonData)
    }catch(err){
      console.log(err)
    }
  }
  
  useEffect(() =>{
   fetchData()
  } ,[url])
  return task
}

export default useFetch
