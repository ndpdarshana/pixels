import React, {Component} from 'react';

import TextField from '../../../components/form_controls/index';

class User extends Component{
  state = {
    username:''
  }
  
  constructor(props){
    super(props);
  }



  Handler = (event) =>{
    event.preventDefault();

    console.log(this.usernameEl.value);
  }

  render(){
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <TextField label="Username" placeholder="username" inputRef={el => (this.usernameEl = el)}/>
          </div>
          <button className="btn btn-primary" onClick={this.Handler}>click</button>
        </div>
      </React.Fragment>
    );
  }
}

export default User;