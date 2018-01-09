import React from 'react';
import { Link } from 'react-router-dom';
import TaskItem from './task-item';

const date = new Date();
const day = ("0" + date.getDate()).slice(-2);
const month = ("0" + (date.getMonth() + 1)).slice(-2);
const year = date.getFullYear();
const date_formatted = year + '-' + month + '-' + day

const TaskList = (props) => {
  const TaskComponents = props.tasks.map((task) => {
    return (
      <TaskItem
        key={task.id}
        id={task.id}
        hash={props.hash}
        name={task.name}
        description={task.description}
        date={date_formatted}
        due_on={task.due_on}
        completed_on={task.completed_on}
        filter={props.filter}
        onTaskCompleted={props.onTaskCompleted}
        onTaskDeleted={props.onTaskDeleted}
      />
    );
  });
  return (
    <div className="container" id="taskList">
      <ul className='nav nav-tabs nav-fill'>
        <li className='nav-item'>
          <Link to='/' id="incomplete" className={`nav-link ${props.filter == null ? 'active' : ''}`}>
            To-Do
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/complete' id="complete" className={`nav-link ${props.filter === 'complete' ? 'active' : ''}`}>
            Complete
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/priority' id="priority" className={`nav-link ${props.filter === 'priority' ? 'active' : ''}`}>
            High Priority
          </Link>
        </li>
      </ul>
      <ul className='nav nav-pills flex-column'>
        {TaskComponents.reverse()}
      </ul>
    </div>
  );
};

export default TaskList;
