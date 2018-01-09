import React from 'react';

import NewTask from './new-task';
import TaskList from './task-list';
import LogInPage from './login-page';

import { DB_CONFIG } from './config';

import Firebase from 'firebase';

import 'firebase/database';

class ToDo extends React.Component {
  constructor(props){
    super(props);

    this.app = Firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('tasks');
    this.auth = Firebase.auth();

    this.state = {
      tasks: [],
      logged_in: false
    };
  }

  componentDidUpdate(){
    const { hash } = this.props.location;
    if(hash !== ''){
      const selected_node = document.getElementById(hash.substring(1));
      if(selected_node !== null){
        selected_node.scrollIntoView(selected_node);
      }
    }
  }

  componentDidMount(){
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.db.on('child_added', snap => {
          this.setState({
            tasks: this.state.tasks.concat({
              id: snap.key,
              name: snap.val().name,
              description: snap.val().description,
              due_on: snap.val().due_on,
              completed_on: snap.val().completed_on
            })
          });
        });
        this.setState({
          logged_in: true
        });
      }
    });
  }

  createUser(cred){
    this.auth.createUserWithEmailAndPassword(cred.email, cred.password)
    .catch(error => {
      alert(error.code);
    });
  }

  logInUser(cred){
    this.auth.signInWithEmailAndPassword(cred.email, cred.password)
    .catch(error => {
      alert(error.code);
    });
  }

  signOutUser(){
    this.auth.signOut();
    this.setState({
      tasks: [],
      logged_in: false
    });
  }

  newTask(task){
    if(task.name.length === 0 | task.due_on.length === 0){return;};
    document.getElementById('closeTask').click();
    const new_task = {
      name: task.name,
      description: task.description,
      due_on: task.due_on,
      completed_on: null
    };
    this.db.push().set(new_task);
  }

  taskCompleted(id){

    const tasks = this.state.tasks.filter(t => t.id !== id);
    const mod_task = this.state.tasks.find(t => t.id === id);

    const date = new Date();
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const date_formatted = year + '-' + month + '-' + day;

    mod_task.completed_on = date_formatted;
    this.setState({
      tasks: tasks.concat(mod_task)
    });
    this.db.child(id).update({completed_on: date_formatted});
  }

  taskDeleted(id){
    const tasks = this.state.tasks.filter(t => t.id !== id);
    this.setState({
      tasks: tasks
    });
    this.db.child(id).remove();
  }

  render(){
    return (
      this.state.logged_in ?
      <div className="container">
        <header className="page-header">
          <h1 className='display-4'>To-Do List</h1>
        </header>
        <NewTask signOut={() => this.signOutUser()} onTaskSubmit={task => this.newTask(task)}/>
        <TaskList
          tasks={this.state.tasks}
          filter={this.props.match.params.filter}
          hash={this.props.location.hash}
          onTaskCompleted={id => this.taskCompleted(id)}
          onTaskDeleted={id => this.taskDeleted(id)}/>
      </div>
      : <LogInPage
          createUser={cred => this.createUser(cred)}
          logInUser={cred => this.logInUser(cred)}
      />
    );
  }
}

export default ToDo;
