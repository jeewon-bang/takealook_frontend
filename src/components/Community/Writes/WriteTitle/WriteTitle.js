import React from 'react';
import './WriteTitle.scss';

const WriteTitle = (props) => {
  const { postText, setPostText } = props;

  const writeTitle = (e) => {
    // const title = document.getElementById('title').value; //content id에서 받아온 value값
    // setTitle({ ...title, [e.target.name]: title }); //깊은복사 해야되나 고민했음
    setPostText({ ...postText, title: e.target.value });
  };

  return (
    <div className='title'>
      <span>
        <h3 className='write-title'>
          제목<font color='#ff0505'>*</font>
        </h3>
        <input
          id='title'
          name='title'
          type='text'
          className='title-input'
          placeholder='제목을 입력해주세요'
          onChange={writeTitle}
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

export default React.memo(WriteTitle);
