import React from 'react';
import './WriteGuidebtn.scss';

const WriteGuidebtn = (props) => {
  const { setShowModal } = props;

  return (
    <div className='top'>
      <button className='guide-btn' onClick={() => setShowModal(true)}>
        게시글 작성 가이드
      </button>
      <img
        class='guide-img'
        src={require('images/note.png').default}
        alt='like'
      />
    </div>
  );
};

export default WriteGuidebtn;
