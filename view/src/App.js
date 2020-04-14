import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Topnavbar from './components/navigation/top-navbar/top-navbar';
import AuthPage from './pages/auth/auth';
import HomePage from './pages/home/home';
import AuthContext from './context/auth-context';

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
          <AuthContext.Provider
            value={{
              token:this.state.token,
              userId:this.state.userId,
              login:this.login,
              logout:this.logout
            }}>
            {this.state.token && <Topnavbar/>}
            <main className="container">
              <Switch>
                {!this.state.token && <Redirect from="/" to="/auth" exact/>}
                {/* {!this.state.token && <Redirect from="/home" to="/auth"/>} */}
                {!this.state.token && <Route path="/auth" component={AuthPage}/>}
                {this.state.token && <Redirect from="/" to="/home" exact/>}
                {this.state.token && <Redirect from="/auth" to="/home" exact/>}
                {this.state.token && <Route path="/home" component={HomePage}/>}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
