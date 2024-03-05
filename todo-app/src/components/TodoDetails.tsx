import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DATA_URL } from '../utils/constants';

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState<{id:string}|null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`${DATA_URL}/4`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setTodo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTodo();
  }, [id]);

  console.log(todo)

  return (
    <div>
      <h1>{todo?.id}</h1>
    </div>
  );
};

export default TodoDetails;


// {/* {todo ? (
//         <div>
//           {/* <h2>{todo.title}</h2> */}
//           {/* <p>Completed: {todo.completed ? 'Yes' : 'No'}</p> */}
//           </div>
//           ) : (
//             <p>Loading...</p>
//           )
//           } */}