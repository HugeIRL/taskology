import React from 'react'
import EditableLabel from 'react-inline-edition'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Tasks({ task, toggleTask, handleTaskNameChange }) {
    function handleTaskClick() {
        toggleTask(task.id)
    }
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

