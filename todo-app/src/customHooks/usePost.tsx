import { DATA_URL } from "../utils/constants";
import { TodoItem } from "../utils/interface";

import React, { useEffect, useState } from 'react'


const usePost = () => {

    const fetchPost = async (newTask: TodoItem) => {
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
            return true
        } catch (err) {
            console.log("some error occured : ", err)
            return false
        }
    }

    return {
        fetchPost
    }
}

export default usePost