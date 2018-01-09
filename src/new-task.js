import React from 'react';

class NewTask extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      description: "",
      due_on: ""
    };

    const date_today = new Date();
    this.date = date_today.getFullYear() + '-' +
    ("0" + (date_today.getMonth() + 1)).slice(-2) + '-' +
    ("0" + date_today.getDate()).slice(-2);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange({ target }) {
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.props.onTaskSubmit(this.state);
    this.setState({name:"", description: "", due_on:  ""});
    event.preventDefault();
  }

  render() {

    return (
      <div id='newTaskDiv'>
        <button type="button" id="createTask" className="btn btn-primary" data-toggle="modal" data-target="#newTask">
          Create Task
        </button>
        <button type="button" id="logOut" className="btn btn-danger" onClick={this.props.signOut}>
          Log Out
        </button>
        <div id="newTask" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Task</h5>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type='text'
                      name='name'
                      value={this.state.name}
                      onChange={this.handleChange}
                      className='form-control'
                      placeholder='Type in a title for your task'
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name='description'
                      value={this.state.description}
                      onChange={this.handleChange}
                      className='form-control'
                      placeholder="Type in a description for your task"
                      rows='4'
                    />
                  </div>
                  <div className="form-group">
                    <label>Due Date</label>
                    <input
                      type='date'
                      name='due_on'
                      value={this.state.due_on}
                      onChange={this.handleChange}
                      className='form-control'
                      min={this.date}
                    />
                  </div>
                  <br />
                  <button className='btn btn-primary' id="submitTask" type="submit">Submit Task</button>
                  <button type="button" id="closeTask" className="btn btn-default" data-dismiss="modal">Close</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewTask;
