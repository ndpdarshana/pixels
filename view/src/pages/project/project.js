import React, {Component} from 'react';

class Project extends Component{
    render(){
      let elmnt = [];
      for(let i=0; i<30; i++){
        elmnt.push(<h1>Project-Project</h1>);
      }
      return(
        <div className="row">
          {elmnt.map(el => (el))}
        </div>
      );
    }
  }

export default Project;
