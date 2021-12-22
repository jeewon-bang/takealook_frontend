import React from 'react';
import axiosInstance from 'api/customAxios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './PostDetail.scss';

const PostDetail = (props) => {
  const user = useSelector((state) => state.auth.user);
  const { postDetails, like } = props;
  const navigate = useNavigate();

  //글 삭제
  const handleDelete = () => {
    axiosInstance
      .delete(`/post/${postDetails.postId}`)
      .then((res) => {
        navigate('/community');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='postdetail'>
      <div className='postdetail-header'>
        <h5>
          <font color='#ffa800'>{postDetails.board.name}</font>
        </h5>
        <div className='postdetail-header-info'>
          <span className='postdetail-header-info-like'>
            {postDetails.checkLike === true ? (
              <img
                class='image'
                src={require('images/heart_like.png').default}
                alt='like'
              />
            ) : (
              <img
                class='image'
                src={require('images/heart.png').default}
                alt='like'
              />
            )}
            {like}
          </span>
          <span className='postdetail-header-info-comment'>
            <img
              class='image'
              src={require('images/chat.png').default}
              alt='cmt'
            />
            {postDetails.commentListCount}
          </span>
          <span className='postdetail-header-info-created_at'>
            {postDetails.modifiedAt.substring(0, 10)}
          </span>
        </div>
        <h1 className='postdetail-title'>{postDetails.title}</h1>
        <div className='postdetail-writer-info'>
          <span className='postdetail-writer-info-leftbox'>
            <img
              src={postDetails.writer.userImage}
              className='postdetail-userimg'
              alt='user'
            />
          </span>
          <span className='postdetail-writer-info-middlebox'>
            {postDetails.writer.dflag === false ? (
              <h5 className='postdetail-writer-info-name'>
                {postDetails.writer.userName}
              </h5>
            ) : (
              <h5>탈퇴회원</h5>
            )}
          </span>
          <span className='postdetail-writer-info-rightbox'>
            {user.id === postDetails.writer.id ? (
              <div>
                <Link to={`/community/update/${postDetails.postId}`}>
                  <button className='postdetail-btn'>글 수정</button>
                </Link>
                <button className='postdetail-btn' onClick={handleDelete}>
                  글 삭제
                </button>
              </div>
            ) : null}
          </span>
        </div>
      </div>
      <hr />
      <div className='postdetail-content'>
        {/* <div>dangerouslySetInnerHTML: 문자열을 html 태그로 인식하게 해주는 역할</div> */}
        <div dangerouslySetInnerHTML={{ __html: postDetails.content }}></div>
      </div>
      <hr />
    </div>
  );
};

export default PostDetail;
