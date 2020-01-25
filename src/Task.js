import React from 'react'
import EditableLabel from 'react-inline-edition'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Tasks({ task, toggleTask, handleTaskNameChange }) {

    // Handle the click of the task checkbox
    function handleTaskClick() {
        toggleTask(task.id)
    }

    // Pass the task to handle name change
    function passTextToTask(text)
    {
        handleTaskNameChange(task.id, text)
    }
    
    return (
        <li className="list-group-item">
            <div className="form-check">
                <input 
                    type="checkbox" 
                    checked={task.complete} 
                    onChange={handleTaskClick}
                    className="form-check-input"
                />
                <EditableLabel 
                    text={task.name}
                    inputWidth='auto'
                    inputHeight='25px'
                    inputFontWeight='bold'
                    labelPlaceHolder='You left this task empty :('
                    onFocusOut={passTextToTask}
                />
            </div>
        </li>
    )
}

