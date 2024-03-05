import { DATA_URL } from "../utils/constants";
import React, { useEffect, useState } from 'react'
import { ITask } from "../utils/interface";

const usePost = () => {
    // const [data, setData] = useState<ITask[]>([])
    // useEffect(() =>{
    //     fetchPost
    // } ,[])

    const fetchPost = async (newTask: ITask) => {
        try {
             const response = await fetch(DATA_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask)
            })
            if (!response.ok) {
                throw new Error("some error got")
            }
            const res = await response.json()
            console.log("Data from the post fetch : ", res)
            // setData(res)
            return res
        } catch (err) {
            console.log("some error occured : ", err)
        }
    }

   

    return {
        fetchPost
    }
}

export default usePost

