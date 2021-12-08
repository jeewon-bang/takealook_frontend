import React from 'react';
import './WriteCategory.scss';

const WriteCategory = (props) => {
  const { setCategory } = props;

  const selectedCategory = (e) => {
    const value = e.target.value;
    console.log(value);
    setCategory(value);
  };

  return (
    <div className='top'>
      <select
        name='selects'
        id='selects'
        className='selects'
        onChange={selectedCategory}
      >
        <option value='' selected disabled hidden>
          -카테고리 선택-
        </option>
        <option value='전국고양이자랑' selected='selected' className='option'>
          전국고양이자랑
        </option>
        <option value='가출냥찾기' selected='selected' className='option'>
          가출냥찾기
        </option>
        <option value='도와주세요' selected='selected' className='option'>
          도와주세요
        </option>
      </select>
    </div>
  );
};

export default WriteCategory;
