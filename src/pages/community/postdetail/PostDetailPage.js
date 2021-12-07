import PostComment from 'components/Community/Post/PostComment/PostComment';
import WritePostComment from 'components/Community/Post/PostComment/WritePostComment';
import PostDetail from 'components/Community/Post/PostDetail/PostDetail';
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
