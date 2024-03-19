import React, { useEffect, useState } from 'react'
import { DATA_URL } from './constants'
import { TodoItem } from './interface'


const useFetch = () => {
    const [task, setTask] = useState<TodoItem[]>([])

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

    console.log({ task })
    return task
}

export default useFetch