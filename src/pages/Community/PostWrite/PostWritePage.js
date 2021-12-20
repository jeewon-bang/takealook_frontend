import React, { useEffect, useState } from 'react';
import Category from 'components/Community/Category/Category';
import './PostWritePage.scss';
import WriteCategory from 'components/Community/Writes/WriteCategory/WriteCategory';
import Editor from 'components/Community/Writes/WriteEditor/Editor';
import Writeguide from 'components/Community/Writes/WriteGuide/WriteGuide';
import WriteGuidebtn from 'components/Community/Writes/WriteGuide/WriteGuidebtn';
import WriteThumbnail from 'components/Community/Writes/WriteThumbnail/WriteThumbnail';
import WriteTitle from 'components/Community/Writes/WriteTitle/WriteTitle';
import axiosInstance from 'api/customAxios';
import { useNavigate } from 'react-router';
import WritePostForm from 'components/Community/Writes/WritePostForm/WritePostForm';

const PostWritePage = () => {
  const [showModal, setShowModal] = useState(false);

  //과연 이렇게 useState를 남용해도 되는 것인가.. 리액트 고수 구합니다
  const [postImage, setPostImage] = useState([]);

  const [postText, setPostText] = useState({
    writerId: 1,
    boardId: 1,
    title: '',
    content: '',
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(postText);

    if (!postText.title || !postText.content || !postImage) {
      alert('모든 항목을 입력해주세요!');
    } else {
      const formData = new FormData();

      formData.append(
        'postText',
        new Blob([JSON.stringify(postText)], { type: 'application/json' })
      );
      for (let i = 0; i < postImage.length; i++) {
        formData.append('postImage', postImage[i]);
      }
      // formData.append('catImg', catImg);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]); //commentInfo, [object File]
      }

      axiosInstance
        .post('/post', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          // headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => {
          console.log(res);
          navigate('/community');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className='content-container'>
      <div className='write-wrapper'>
        <div className='header'>
          <WriteGuidebtn setShowModal={setShowModal} />
          {showModal && <Writeguide setShowModal={setShowModal} />}
          <WritePostForm postText={postText} setPostText={setPostText} />
        </div>
        <div className='footer'>
          <h3>
            썸네일 선택하기<font color='#ff0505'>*</font>
            <font size='2' color='#deddda'>
              &nbsp;파일첨부 필수
            </font>
          </h3>
          <WriteThumbnail image={postImage} setImage={setPostImage} />
        </div>
        <div className='register'>
          <button className='write-btn' onClick={handleSubmit}>
            등록하기
          </button>
          <button className='cancel-btn' onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostWritePage;
