import React, { useState } from 'react';
import './Category.scss';

const Category = (props) => {
  const { boardId, setBoardId } = props;

  const handleBoardId = (e) => {
    setBoardId(e.target.value);
  };

  return (
    <div className='category'>
      <ul className='category-ul' onClick={handleBoardId}>
        <li className='category-li' value='0' name='모두보기'>
          모두보기
        </li>
        <li className='category-li' value='1' name='전국고양이자랑'>
          전국고양이자랑
        </li>
        <li className='category-li' value='2' name='가출냥찾기'>
          가출냥찾기
        </li>
        <li className='category-li' value='3' name='도와주세요'>
          도와주세요
        </li>
      </ul>
    </div>
  );
};

export default Category;
