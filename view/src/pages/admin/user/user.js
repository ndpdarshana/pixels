import React, {Component} from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';
import baselineEdit from '@iconify/icons-ic/baseline-edit';

import ApolloClient, {gql} from 'apollo-boost';

import {TextField, TextArea} from '../../../components/form_controls/index';
import Spinner from '../../../components/loading_spinner/spinner';

class User extends Component{
  state = {
    username:'',
    password:'',
    users:[],
    isLoading:false
  }
  
  constructor(props){
    super(props);
    this.client = new ApolloClient({
      uri:'http://localhost:8000/gql'
    });
  }

  componentDidMount(){
    this.fetchUsers();
  }

  fetchUsers = () => {
    this.setState({isLoading:true})
    this.client.query({
      query:gql`
        {
          allUsers{
            _id
            email
          }
        }
      `
    }).then(result => {
      this.setState({
        users: result.data.allUsers,
        isLoading:false
      });
    }).catch(error=>{
      console.log(error);
    });

  }

  createHandler = (event) =>{
    event.preventDefault();

    const username = this.usernameEl.value;
    const password = this.passwordEl.value;

    if(username.trim().length===0 || password.trim().length===0){
      return;
    }

    const requestBody = {
      query:`
        mutation{
          createUser(userInput:{
            email:"${username}", 
            password:"${password}"
          }){
            _id
            email
          }  
        }
      `
    }

    fetch('http://localhost:8000/gql', {
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
      console.log(result);
      return this.setState(prevState => {
        const updatedUsers = [...prevState.users];
        updatedUsers.push({
          _id:result.data.createUser._id,
          email:result.data.createUser.email,
        });

        this.usernameEl.value = '';
        this.passwordEl.value = '';
        return {users:updatedUsers};
      });
    }).catch(error => {
      console.log(error);
    });
  }

  render(){
    let count=0;
    return (
      <React.Fragment>
        <div className="row">
          <h1>Create User</h1>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <TextField label="Username" placeholder="username" inputRef={el => (this.usernameEl = el)}/>
            <TextField label="Password" placeholder="password" inputRef={el => (this.passwordEl = el)}/>
            <button className="btn btn-primary" onClick={this.createHandler}>Create</button>
          </div>
        </div>
        {this.state.isLoading ? <Spinner /> : (
          <React.Fragment>
            <div className="row">
              <h1>Users</h1>
            </div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map(user => {
                    count++;
                    return (
                      <tr key={user._id}>
                        <th>{count}</th>
                        <td>{user.email}</td>
                        <td>
                          <a href="#"><Icon icon={baselineEdit}/></a>
                          <a href="#"><Icon icon={baselineDeleteForever}/></a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default User;