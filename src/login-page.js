import React from 'react';

class LogInPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.submit = this.submit.bind(this);
  }

  submit({ target }){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cred = {email: email, password: password};
    if(target.id === 'createUser'){
      this.props.createUser(cred);
    } else{
      this.props.logInUser(cred);
    }
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
              className="form-control"
              placeholder="Enter email"/>
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input
                type="password"
                id="password"
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
