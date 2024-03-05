import React, { ChangeEvent, useEffect, useState } from 'react'

import useFetch from '../customHooks/useFetch';
import { DATA_URL } from '../utils/constants';
import { ITask } from '../utils/interface';

const ShowAllTask: React.FC = () => {
    const res = useFetch()
    const [taskList, setTaskList] = useState<ITask[]>([]);
    const [showChecked, setShowChecked] = useState<boolean>(false)


    useEffect(() => {
        setTaskList(res)
    }, [res])
    const getAllMarkedTodo = (): ITask[] => {
        if (showChecked) {
            return taskList.filter(todo => todo.completed);
        } else {
            return []
        }
    }
    return (
        <>
            <label>
                <input
                    type="checkbox"
                    checked={showChecked}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setShowChecked(e.target.checked)}
                />
                Show All Checked Todo
            </label>


            {
                <ul>
                    {getAllMarkedTodo().map(todo => (
                        <li key={todo.id}>{todo.text}</li>
                    ))}

                </ul>

            }
        </>
    )
}

export default ShowAllTask
