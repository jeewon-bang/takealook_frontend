import React from 'react';
import { Link } from 'react-router-dom';
import './Writebtn.scss';

const Writebtn = () => {
  return (
    <div>
      <Link to='/community/write'>
        <img
          className='cwrite'
          src={require('images/cwrite.png').default}
          alt='cwrite'
        />
      </Link>
    </div>
  );
};

export default Writebtn;
