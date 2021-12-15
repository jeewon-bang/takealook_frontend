import React from 'react';
import './WriteCategory.scss';

const WriteCategory = (props) => {
  const { boardId, setBoardId } = props;

  const selectedBoard = (e) => {
    // setBoardId({ ...boardId, boardId: e.target.value }); //깊은복사 해야되나 고민했음
    setBoardId(e.target.value);
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

export default React.memo(WriteCategory);
