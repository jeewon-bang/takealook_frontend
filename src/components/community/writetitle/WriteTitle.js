import React from 'react';
import './WriteTitle.scss';

const WriteTitle = () => {
  return (
    <div className='title'>
      <span>
        <h3>
          제목<font color='#ff0505'>*</font>
        </h3>
        <input
          type='text'
          className='title-input'
          placeholder='제목을 입력해주세요'
        />
        <h3>
          글작성<font color='#ff0505'>*</font>
          <font size='2' color='#deddda'>
            &nbsp;파일첨부 필수
          </font>
        </h3>
      </span>
    </div>
  );
};

export default WriteTitle;
