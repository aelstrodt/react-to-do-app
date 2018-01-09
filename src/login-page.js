import React from 'react';

class LogInPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange({ target }){
    this.setState({
      [target.id]: target.value
    });
  }

  submit({ target }){
    if(target.id === 'createUser'){
      this.props.createUser(this.state);
    } else{
      this.props.logInUser(this.state);
    }
    this.setState({
      email: '',
      password: ''
    });
  }

  render() {
    return (
      <div>
        <header className="page-header">
          <h1 className='display-4'>Log-In Page</h1>
        </header>
        <div id='logIn'>
          <div className='form-group'>
            <label>Email</label>
            <input
              type="text"
              id="email"
              value={this.state.email}
              onChange={this.onChange}
              className="form-control"
              placeholder="Enter email"/>
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.onChange}
                className="form-control"
                placeholder="Enter password"/>
              </div>
              <div id="auth-btns">
                <button className="btn btn-primary" type="submit" id="logUserIn" onClick={this.submit}>Login</button>
                <button className="btn btn-secondary" type="submit" id="createUser" onClick={this.submit}>Create User</button>
              </div>
            </div>
          </div>
        );
      }
    }

export default LogInPage;
