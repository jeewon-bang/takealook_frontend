import React from 'react';
import { Link } from 'react-router-dom';
import './MyLeftCat.scss';

const MyLeftCat = (props) => {
  const { catId, catName, catImg } = props;
  return (
    <div>
      <Link class='cat-detail' to={`/mycat/${catId}`}>
        <div class='catCard'>
          <img class='catimg' src={catImg.default} alt='cat' />
          <p class='cat-name'>{catName}</p>
        </div>
      </Link>
    </div>
  );
};

export default MyLeftCat;
