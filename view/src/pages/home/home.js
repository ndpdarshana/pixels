import React, {Component} from 'react';

class Home extends Component{
  render(){
    let elmnt = [];
    for(let i=0; i<30; i++){
      elmnt.push(<h1>Hello, React Home</h1>);
    }
    return(
      <div className="row">
        {elmnt.map(el => (el))}
      </div>
    );
  }
}

export default Home;