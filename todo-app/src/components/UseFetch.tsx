

import React, { useEffect, useState } from 'react';
import { TodoItem } from '../types/todo';
import { DATA_URL } from '../utils/constants';


const useFetch = () => {
  const [data, setData] = useState<TodoItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(DATA_URL);
        if (!res.ok) {
          throw new Error(`Got Error: ${res.status}`);
        }
        const jsonData = await res.json();
        setData(jsonData)
      } catch (err) {
        console.log("Error Occured : ", err)
      }
    };

    fetchData();
  }, [DATA_URL]);

  return data;
};

export default useFetch;