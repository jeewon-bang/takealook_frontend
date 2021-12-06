import PostComment from 'components/community/postcomment/PostComment';
import WritePostComment from 'components/community/postcomment/WritePostComment';
import PostDetail from 'components/community/postdetail/PostDetail';
import React from 'react';

const PostDetailPage = () => {
  return (
    <div>
      <div className='post-detail'>
        <PostDetail />
      </div>
      <div className='post-write'>
        <WritePostComment />
      </div>
      <div className='post-list'>
        <PostComment />
      </div>
    </div>
  );
};

export default PostDetailPage;
