import React, { useState } from 'react';
import Category from 'components/Community/Category/Category';
import './PostWritePage.scss';
import WriteCategory from 'components/Community/Writes/WriteCategory/WriteCategory';
import Editor from 'components/Community/Writes/WriteEditor/Editor';
import Writeguide from 'components/Community/Writes/WriteGuide/WriteGuide';
import WriteGuidebtn from 'components/Community/Writes/WriteGuide/WriteGuidebtn';
import WriteThumbnail from 'components/Community/Writes/WriteThumbnail/WriteThumbnail';
import WriteTitle from 'components/Community/Writes/WriteTitle/WriteTitle';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';
import axiosInstance from 'api/customAxios';
import { useNavigate } from 'react-router';

const PostWritePage = () => {
  const [showModal, setShowModal] = useState(false);

  const [boardId, setBoardId] = useState(0);
  console.log(boardId); //카테고리값 변경시마다 state 변경
  const [title, setTitle] = useState('');
  console.log(title);
  const [content, setContent] = useState('');
  console.log(content);
  const [postImage, setPostImage] = useState([]);
  console.log(postImage);
  console.log(typeof postImage);

  const [postText, setPostText] = useState({
    writerId: 1,
    boardId: 1,
    title: '제목',
    content: '내용',
  });

  const handleCategory = (e) => {
    setPostText({
      ...postText,
      [e.target.name]: boardId,
    });
  };

  const handleTitle = (e) => {
    setPostText({
      ...postText,
      [e.target.name]: title,
    });
  };

  const handleSubmit = () => {
    if (!boardId || !title || !content || !postImage) {
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

      axiosInstance.post('/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        // headers: { 'Content-Type': 'application/json' },
      });
    }
  };

  const navigate = useNavigate();

  return (
    <div className='content-container'>
      <Category />
      <hr />
      <div className='write-wrapper'>
        <div className='header'>
          <WriteCategory
            setBoardId={setBoardId}
            name='boardId'
            onChange={handleCategory}
          />
          <WriteGuidebtn setShowModal={setShowModal} />
          {showModal && <Writeguide setShowModal={setShowModal} />}
        </div>
        <div className='body'>
          <WriteTitle title={title} setTitle={setTitle} />
          <Editor content={content} setContent={setContent} />
        </div>
        <div className='footer'>
          <WriteThumbnail />
          <CatImageUpload postImage={postImage} setPostImage={setPostImage} />
        </div>
        <button className='write-btn' onClick={handleSubmit}>
          글쓰기 완료 백으로 보내줘~~
        </button>
        <button className='cancel-btn' onClick={() => navigate(-1)}>
          취소
        </button>
      </div>
    </div>
  );
};

export default PostWritePage;
