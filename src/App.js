import React, { useState, useRef, useEffect } from 'react';
import TaskList from './TaskList';
import uuidv4 from 'uuid/v4';

import 'bootstrap/dist/css/bootstrap.min.css';

// Local storage name for keeping track of tasks
const LOCAL_STORAGE_KEY = 'TaskologyApp.tasks';

function App() {

  const [tasks, setTasks] = useState([]);
  const taskNameRef = useRef();

  // Pass an empty array so it only calls this function once on load because
  // the array never changes
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTasks) setTasks(storedTasks)
  }, []);

  // Store the tasks to local storage as a JSON string
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks]);

  // Toggle the checkmark with a copy of the task array
  function toggleTask(id) {
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.complete = !task.complete
    setTasks(newTasks);
  }

  // Clear out all the tasks that are checked off
  function handleClearTasks() {
    const newTasks = tasks.filter(task => !task.complete)
    setTasks(newTasks)
  };

  // DEPRECIATED IN FAVOUR OF HIDING TODAY VIEW
  // Hide the clear button until tasks are added
  function toggleClearButton() {
    if (tasks.length === 0) {
      return "d-none"
    } else {
      return "btn btn-success btn-block text-capitalize mt-3"
    }
  };

  // Hide the today view until tasks are added
  function toggleTodayView() {
    if (tasks.length === 0) {
      return "d-none"
    } else {
      return "col-12 col-md-6"
    }
  };

  // Check for empty string, then allow entry of a new task
  // Also stopping the form from refreshing the page
  function handleAddTask(e) {
    const taskName = taskNameRef.current.value
    if (taskName === '') return e.preventDefault()
    setTasks(prevTask => {
      return [...prevTask, { 
                              id: uuidv4(), 
                              name: taskName, 
                              complete: false
                  }]
    })
    taskNameRef.current.value = null

    e.preventDefault()
  };

  // Handle the changing of a task name by using FocusOut from EditableLabel
  function handleTaskNameChange(id, text) {
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.name = text;
    setTasks(newTasks)
  };
  
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-md-auto">
          <h3 className="text-capitalize text-center mt-5">
              Taskology
            </h3>
            <p className="text-center">
              It starts with just one
            </p>
            <div className="card card-body my-3">
              <form onSubmit={handleAddTask} className="form">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-primary text-white">
                      <i className="fas fa-book"></i>
                  </div>
                </div>
                <input 
                  ref={taskNameRef} 
                  className="form-control"
                  type="text" 
                  placeholder="Add a new task" 
                />
              </div> 
              </form>
              <button 
                className="btn btn-block btn-primary mt-3"
                onClick={handleAddTask}
                type="submit">
                  Add Task
              </button>
              </div>
            </div>
            <div className={toggleTodayView()}>
            <h3 className="text-capitalize text-center mt-5">Today</h3>
                <p className="text-capitalize text-center">
                    <span className="text-success font-weight-bold">{tasks.filter(task => !task.complete).length}</span> remaining
                </p>
            <TaskList 
              tasks={tasks} 
              toggleTask={toggleTask} 
              handleTaskNameChange={handleTaskNameChange} 
            />
            <button 
              type="button" 
              className={toggleClearButton()}
              onClick={handleClearTasks}>
                Complete Tasks
            </button>
          </div>
        </div>
      </div>
      <p className="small text-center mt-5">
          Made with &#10084; from Canada
          <br />
          Version 0.1.4 BETA
      </p>
    </>
  );
}

export default App;
