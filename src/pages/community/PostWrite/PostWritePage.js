import React, { useEffect, useState } from 'react';
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

  //과연 이렇게 useState를 남용해도 되는 것인가.. 리액트 고수 구합니다
  const [boardId, setBoardId] = useState(1);
  // console.log(boardId);
  const [title, setTitle] = useState('');
  // console.log(title);
  const [content, setContent] = useState('');
  // console.log(content);
  const [postImage, setPostImage] = useState([]);
  // console.log(postImage);

  const [postText, setPostText] = useState({
    writerId: 2,
    boardId: 1,
    title: '',
    content: '',
  });
  console.log(postText);

  // useEffect(() => {
  //   console.log('백만번 실행되고 있니?');
  // }, []);

  const handleSubmit = () => {
    setPostText({
      ...postText,
      boardId: boardId,
      title: title,
      content: content,
    });

    if (!boardId || !title || !content || !postImage) {
      alert('모든 항목을 입력해주세요!');
    } else {
      console.log(postText);

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
          <WriteCategory boardId={boardId} setBoardId={setBoardId} />
          <WriteGuidebtn setShowModal={setShowModal} />
          {showModal && <Writeguide setShowModal={setShowModal} />}
        </div>
        <div className='body'>
          <WriteTitle title={title} setTitle={setTitle} />
          <Editor content={content} setContent={setContent} />
        </div>
        <div className='footer'>
          <WriteThumbnail />
          <CatImageUpload image={postImage} setImage={setPostImage} />
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
