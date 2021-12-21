import React from 'react';
import './Spinner.scss';

const Spinner = () => {
  return (
    <div className='content-container'>
      <img
        className='spinner-img'
        src={require('images/loading.gif').default}
        alt='loading'
      ></img>
    </div>
  );
};

export default Spinner;
