import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = (props) => {

  const due_date = new Date(props.due_on);
  const date = new Date(props.date);
  const timeinmilisec = due_date.getTime() - date.getTime();
  const days_to_due_date = Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24));

  const hideClass = props.completed_on == null ? '' : 'd-none';
  const completeClass = props.completed_on == null ? 'incomplete' : 'complete';
  const filter = props.filter == null ? 'incomplete' : props.filter;

  const priority = days_to_due_date < 3 && days_to_due_date >= 0 && completeClass === 'incomplete' ? true : false;

  let filterClass = 'd-none';
  if(priority && filter === 'priority'){
    filterClass = 'priority';
  } else if(completeClass === 'complete' && completeClass === filter){
    filterClass = '';
  } else if(completeClass === 'incomplete' && completeClass === filter){
    filterClass = '';
  }

  let date_formatted = ''
  switch (days_to_due_date) {
    case 0:
      date_formatted = 'Today';
      break;
    case 1:
      date_formatted = 'Tomorrow';
      break;
    default:
      date_formatted = `${days_to_due_date} days`;
      break;
  }
  if(days_to_due_date < 0){date_formatted = 'Expired';}

  const hash_id = props.hash.substring(1);
  const selectedClass = hash_id === props.id ? 'active' : '';

  let closeLinkPath = props.filter == null ? '/' : '/' + props.filter;

  return (
    <li className={`nav-item ${completeClass} ${filterClass}`} id={props.id}>
        <Link to={closeLinkPath}
          type="button"
          className="close"
          aria-label="Close"
          onClick={()=>props.onTaskDeleted(props.id)}>
            <span aria-hidden="true">&times;</span>
        </Link>
        <Link to={`#${props.id}`} className={`nav-link ${selectedClass}`}>
          <h3 id='taskName'>{props.name}</h3>
          <p>{props.description}</p>
          <p className={hideClass}>
            <strong>Due on</strong> {props.due_on}
            <span id='dueDate' className={date_formatted === 'Expired' ? 'lateTask' : ''}>
            {date_formatted === 'Expired' ? '' : `Due ${days_to_due_date < 2 && days_to_due_date >=0 ? '' : 'in '}`}<br />
            {date_formatted}</span>
          </p>
          <p className={hideClass === '' ? 'd-none' : ''}><strong>Completed on</strong> {props.completed_on}</p>
        </Link>
        <Link
          to={`/${priority && filter === 'priority' ? '/priority' : '' }`}
          id='markAsComplete'
          className={`btn btn-secondary ${hideClass}`}
          onClick={()=>props.onTaskCompleted(props.id)}>
            Mark as Complete
        </Link>
    </li>
	);
};

export default TaskItem;
