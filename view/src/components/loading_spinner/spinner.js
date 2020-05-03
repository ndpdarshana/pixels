import React from 'react';

import './spinner.css';

const Spinner = props => {
  return (
    <div className="spinner">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
  )
}

export default Spinner;