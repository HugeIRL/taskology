import React from 'react'
import Task from './Task'

export default function TaskList({ tasks, toggleTask, handleTaskNameChange }) {

    // Return the list of tasks
    return (
        <ul className="list-group">
            {
                tasks.map(task => {
                    return <Task 
                                key={task.id} 
                                toggleTask={toggleTask} 
                                task={task} 
                                handleTaskNameChange = {handleTaskNameChange}
                            />
                })
            }
        </ul>
    )
}
