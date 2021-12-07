import React from 'react';
import './WriteGuidebtn.scss';

const WriteGuidebtn = (props) => {
  const { setShowModal } = props;

  return (
    <div className='top'>
      <button className='btn' onClick={() => setShowModal(true)}>
        게시글 작성 가이드
      </button>
    </div>
  );
};

export default WriteGuidebtn;
