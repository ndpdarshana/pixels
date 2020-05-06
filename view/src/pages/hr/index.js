import React, {Component} from 'react'

class HRPage extends Component{
  render(){
    return(
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1>Human Resources</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
              <button className="btn btn-sm btn-outline-secondary">Credentials</button>
              <button className="btn btn-sm btn-outline-secondary">Payrole</button>
              <button className="btn btn-sm btn-outline-secondary">Timesheet</button>
            </div>
            <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
              <span data-feather="calendar"></span>
              Reports
            </button>
          </div>
        </div>
    )
  }
}

export default HRPage;