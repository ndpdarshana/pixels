import React from 'react';

export const TextField = props => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input type="text" className="form-control" placeholder={props.placeholder} ref={props.inputRef}/>
    </div>
  )
}

export const TextArea = props => {
  return(
    <div className="form-group">
      <label>{props.label}</label>
      <textarea cols={props.cols} rows={props.rows} className="form-control" ref={props.inputRef}/>
    </div>
  )
}

export const CheckBox = props => {
  return(
    <div className="form-group">
      <label>{props.label}</label>
      <input type="checkbox" className="form-control" ref={props.inputRef}/>
    </div>
  )
}

// export TextField;
// export TextArea;
