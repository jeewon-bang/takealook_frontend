import React, { useState } from 'react';
import './Category.scss';

const Category = (props) => {
  const { boardId, setBoardId } = props;

  const handleBoardId = (e) => {
    setBoardId(e.target.value);
  };

  return (
    <div className='category'>
      <label className='category-radio'>
        <input type='radio' value='0' onChange={handleBoardId} />
        <span>모두보기</span>
      </label>
      <label className='category-radio'>
        <input type='radio' value='1' onChange={handleBoardId} />
        <span>전국고양이자랑</span>
      </label>
      <label className='category-radio'>
        <input type='radio' value='2' onChange={handleBoardId} />
        <span>가출냥찾기</span>
      </label>
      <label className='category-radio'>
        <input type='radio' value='3' onChange={handleBoardId} />
        <span>도와주세요</span>
      </label>

      {/* <ul className='category-ul' onClick={handleBoardId}>
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
      </ul> */}
    </div>
  );
};

export default Category;
