import React, { useState } from 'react'

const TodoFilter = ({ setShowCompleted, showCompleted }: { showCompleted: boolean, setShowCompleted: (showCompleted: boolean) => void }) => {
    return (
        <div>
            <input type="checkbox" id='filter' checked={showCompleted} onChange={(e) => setShowCompleted(e.target.checked)} />
            <label htmlFor='filter'>Show Completed</label>
        </div>
    )
}

export default TodoFilter