import React from 'react';
import './SelectCategory.scss';

const SelectCategory = () => {
  return (
    <div className='top'>
      <select name='selects' id='selects' className='selects'>
        <option value='' selected disabled hidden>
          -카테고리 선택-
        </option>
        <option value='best' selected='selected' className='option'>
          전국고양이자랑
        </option>
        <option value='find' selected='selected' className='option'>
          가출냥 찾기
        </option>
        <option value='help' selected='selected' className='option'>
          도와주세요
        </option>
      </select>
    </div>
  );
};

export default SelectCategory;
