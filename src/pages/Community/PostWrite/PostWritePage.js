import React, { useEffect, useState } from 'react';
import './PostWritePage.scss';
import Writeguide from 'components/Community/Writes/WriteGuide/WriteGuide';
import WriteGuidebtn from 'components/Community/Writes/WriteGuide/WriteGuidebtn';
import WriteThumbnail from 'components/Community/Writes/WriteThumbnail/WriteThumbnail';
import axiosInstance from 'api/customAxios';
import { useNavigate } from 'react-router';
import WritePostForm from 'components/Community/Writes/WritePostForm/WritePostForm';
import { useSelector } from 'react-redux';
import ImgUpload from 'components/Common/ImgUpload';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';

const PostWritePage = () => {
  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [postImage, setPostImage] = useState([]);
  const [postText, setPostText] = useState({
    writerId: user.id,
    boardId: 1,
    title: '',
    content: '',
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
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

      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      axiosInstance
        .post('/post', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
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
        <div className='write-title-content'>
          <WriteGuidebtn setShowModal={setShowModal} />
          {showModal && <Writeguide setShowModal={setShowModal} />}
          <WritePostForm postText={postText} setPostText={setPostText} />
        </div>
        <div className='write-thumbnail'>
          <h3>
            <font size='5' weight='bold'>
              썸네일 선택하기<font color='#ff0505'>*</font>
            </font>
            <font size='2' color='#deddda'>
              &nbsp;파일첨부 필수
            </font>
          </h3>
          <div className='write-thumbnail-upload'>
            {/* <CatImageUpload image={postImage} setImage={setPostImage} /> */}
            <ImgUpload img={postImage} setImg={setPostImage} />
          </div>
        </div>
        <div className='write-footer'>
          <button className='register-btn' onClick={handleSubmit}>
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
