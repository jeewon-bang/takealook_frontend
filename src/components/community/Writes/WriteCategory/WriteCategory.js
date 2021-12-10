import React from 'react';
import './WriteCategory.scss';

const WriteCategory = (props) => {
  const { setBoardId } = props;

  const selectedBoard = (e) => {
    const value = e.target.value;
    // console.log(value);
    setBoardId(value);
  };

  return (
    <div className='top'>
      <select
        name='selects'
        id='selects'
        className='selects'
        onChange={selectedBoard}
      >
        <option value='' selected disabled hidden>
          -카테고리 선택-
        </option>
        <option value='1' selected='selected' className='option'>
          전국고양이자랑
        </option>
        <option value='2' selected='selected' className='option'>
          가출냥찾기
        </option>
        <option value='3' selected='selected' className='option'>
          도와주세요
        </option>
      </select>
    </div>
  );
};

export default WriteCategory;
