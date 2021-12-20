import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostUpdatePage.scss';
import Writeguide from 'components/Community/Writes/WriteGuide/WriteGuide';
import WriteGuidebtn from 'components/Community/Writes/WriteGuide/WriteGuidebtn';
import WriteThumbnail from 'components/Community/Writes/WriteThumbnail/WriteThumbnail';
import axiosInstance from 'api/customAxios';
import { useNavigate } from 'react-router';
import WritePostForm from 'components/Community/Writes/WritePostForm/WritePostForm';

const PostUpdatePage = () => {
  const { postId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [postImage, setPostImage] = useState([]);
  const [postText, setPostText] = useState({
    writerId: 1,
    boardId: 1,
    title: '',
    content: '',
    imgUrl: '',
  });
  // const [newPostText, setNewPostText] = useState({
  //   writerId: 1,
  //   boardId: 1,
  //   title: '',
  //   content: '',
  //   imgUrl: '',
  // });
  const [updatePage, setUpdatePage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/post/${postId}`)
      .then((res) => {
        // 코드를 수정하니까 input 태그에 title이 뜨넹..
        setPostText({
          ...postText,
          title: res.data.title,
          content: res.data.content,
          imgUrl: res.data.thumbnail,
        });
        setUpdatePage(true);
      })
      .catch((err) => console.log(err));
  }, []);

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
        .post(`/post/${postId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          navigate(`/community/post/${postId}`);
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
          <WritePostForm
            postText={postText}
            setPostText={setPostText}
            updatePage={updatePage}
          />
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
          <WriteThumbnail
            image={postImage}
            setImage={setPostImage}
            postText={postText}
            updatePage={updatePage}
          />
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

export default PostUpdatePage;
