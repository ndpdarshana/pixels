import React, {Component} from 'react';

import './auth.css';
import AppContext from '../../context/app-context'

class Auth extends Component{

  static contextType = AppContext;

  constructor(props){
    super(props);
    this.usernameEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  componentDidMount(){
   
  }

  submitHandler = (event) => {
    event.preventDefault();

    const username = this.usernameEl.current.value;
    const password = this.passwordEl.current.value;

    if(username.trim().length === 0 || password.trim().length === 0){
      return;
    }

    const requestBody = {
      query:`
        query{
          login(email:"${username}", password:"${password}"){
            userId
            token
            tokenExpiration
          }
        }
      `
    }
    
    fetch(this.context.url, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res => {
      if(res.status !== 200 && res.status !==201){
        throw new Error('Failed status:' + res.status)
      }
      return res.json();
    }).then(result => {
      console.log(result.data);
      this.context.login(
        result.data.login.token,
        result.data.login.userId,
        result.data.login.tokenExpiration
      );
    }).catch(error => {
      console.error(error);
    });
  }

  render() {
    return(
      <React.Fragment>
        <div className="sidenav bg-dark">
           <div className="login-main-text">
              <h2>Pixels<br/> Login Page</h2>
              <p>Login from here to access.</p>
           </div>
        </div>
        <div className="main">
           <div className="col-md-6 col-sm-12">
              <div className="login-form">
                 <form>
                    <div className="form-group">
                       <label>User Name</label>
                       <input type="text" className="form-control" placeholder="User Name" ref={this.usernameEl}/>
                    </div>
                    <div className="form-group">
                       <label>Password</label>
                       <input type="password" className="form-control" placeholder="Password" ref={this.passwordEl}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.submitHandler}>Login</button>
                 </form>
              </div>
           </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Auth;
