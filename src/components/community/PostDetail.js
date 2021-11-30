import React, { useEffect, useState } from 'react';
import './PostDetail.scss';

const PostDetail = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    // setData(getPostByNo(no));
  });
  return (
    <div className='postdetail'>
      {/* <div className='wrapper'> */}
      <div>
        <h5>게시판종류</h5>
        <div className='info'>
          <h6>여기는좋아요댓글날짜</h6>
        </div>
        <h1>제목</h1>
        <h5>글쓴이</h5>
        <hr />
      </div>
      <div>
        <div>여기는내용</div>
        <hr />
      </div>
      <div>
        <input
          type='submit'
          placeholder='댓글을 작성하려면 takealook에 로그인 해주세요.'
        />
      </div>
    </div>
  );
};

export default PostDetail;
