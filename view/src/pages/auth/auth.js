import React, {Component} from 'react';
import ApolloClient, {gql} from 'apollo-boost';

import './auth.css';
import AuthContext from '../../context/auth-context'

class Auth extends Component{

  static contextType = AuthContext;

  constructor(props){
    super(props);
    this.usernameEl = React.createRef();
    this.passwordEl = React.createRef();
    this.client = new ApolloClient({
      uri:'http://localhost:8000/gql'
    });
  }

  submitHandler = (event) => {
    event.preventDefault();

    const username = this.usernameEl.current.value;
    const password = this.passwordEl.current.value;

    if(username.trim().length === 0 || password.trim().length === 0){
      return;
    }

    this.client
    .query({
      query:gql`
        {
          login(email:"${username}", password:"${password}"){
            userId
            token
            tokenExpiration
          }

        }
      `
    }).then(result => {
      console.log(result);
      this.context.login(
        result.data.login.token,
        result.data.login.userId,
        result.data.login.tokenExpiration
      )
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
