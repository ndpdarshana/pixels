import React from 'react';

const TextField = props => {
    return (
    <div className="form-group">
        <label>{props.label}</label>
        <input type="text" className="form-control" placeholder={props.placeholder} ref={props.inputRef}/>
     </div>
    )
}

export default TextField;