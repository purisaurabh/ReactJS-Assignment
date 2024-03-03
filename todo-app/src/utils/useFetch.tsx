import React, { useEffect, useState } from 'react'
import { ITask } from './interface'
import { DATA_URL } from './constants'


const useFetch = () => {
    const [task, setTask] = useState<ITask[]>([])
    const fetchData = async () => {
        try {
            const res = await fetch(DATA_URL)
            if (!res.ok) {
                throw new Error(`Got Error : ${res.status}`)
            }
            const jsonData = await res.json()
            setTask(jsonData)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [DATA_URL])
    
    return task
}

export default useFetch