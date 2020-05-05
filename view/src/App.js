import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Topnavbar from './components/navigation/top-navbar';
import SideNav from './components/navigation/side-navbar'
import AuthPage from './pages/auth/auth';
import HomePage from './pages/home/home';
import User from './pages/admin/user/user';
import ProjectPage from './pages/project/project';
import AppContext from './context/app-context';

class App extends Component {
  state = {
    token:null,
    userId:null
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({token:token, userId:userId});
  };

  logout = () => {
    this.setState({token:null, userId:null});
  };

  render(){
    return (
      <BrowserRouter>
        <React.Fragment>          
          <AppContext.Provider
            value={{
              url:'http://localhost:8000/gql',
              token:this.state.token,
              userId:this.state.userId,
              login:this.login,
              logout:this.logout
            }}>
            {this.state.token && <Topnavbar/>}
            <div className="container-fluid">
              <div className="row">
                {this.state.token && <SideNav/>}
                <main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                  <Switch>
                    {!this.state.token &&  <Route path="/auth" component={AuthPage}/>}
                    {this.state.token && <Redirect from="/auth" to="/home" exact/>}
                    {this.state.token && <Redirect from="/" to="/home" exact/>}
                    {!this.state.token ? <Redirect to="/auth"/> : (
                      <React.Fragment>
                        <Route path="/home" component={HomePage}/>
                        <Route path="/project" component={ProjectPage}/>
                        <Route path="/user" component={User}/>
                        {/* <Route path="/hr" component={Hr}/> */}
                      </React.Fragment>
                    )}
                  </Switch>
                </main>
              </div>
            </div>
          </AppContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
