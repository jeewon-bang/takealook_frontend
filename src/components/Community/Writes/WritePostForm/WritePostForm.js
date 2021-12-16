import React, { useEffect, useMemo, useRef, useState } from 'react';
import './WritePostForm.scss';
import ReactQuill, { Quill } from 'react-quill';
import '../../../../../node_modules/react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
import axiosInstance from 'api/customAxios';
Quill.register('modules/ImageResize', ImageResize);

const WritePostForm = (props) => {
  const { postText, setPostText } = props;

  const [value, setValue] = useState(postText.content);

  const handleChange = (e) => {
    setPostText({ ...postText, [e.target.name]: e.target.value });
  };

  const handleContent = (e) => {
    setValue(e);
    setPostText({ ...postText, content: value });
  };

  // const handleContent = async () => {
  //   const description = quillRef.current.getEditor().getText();
  //   if(description.trim() === ''){
  //     alert('내용을 입력해주세요');
  //     return;
  //   }
  //   // if(postText.postId) {
  //   //   //기존 게시글 업데이트
  //   //   await axiosInstance.update({})
  //   // } else {
  //   //   //새로운 게시글 생성
  //   //   await axiosInstance.post({})
  //   // }
  // }

  // useEffect(() => {
  //   if(!postText.postId){
  //     return;
  //   }
  //   const fetchData = async () => {
  //     await axiosInstance
  //     .get(`/post/${postText.postId}`)
  //     .then((res) => setPostText({ ...postText, content: res.data[postText.postId].content }));
  //   };
  //   fetchData();
  // }, [postText.postId])

  // useMemo를 사용한 이유는 modules가 렌더링마다 변하면 에디터에서 입력이 끊기는 버그가 발생
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [
            { header: '1' },
            { header: '2' },
            { header: [3, 4, 5, 6] },
            { font: [] },
          ],
          [{ size: [] }, { color: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],

          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image', 'video'],
          ['clean'],
          ['code-block'],
        ],
        // handlers: {
        //   image: imageHandler,
        // },
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
      },
    }),
    []
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
  ];

  const quillRef = useRef();

  return (
    <div>
      <div className='top'>
        <select
          name='boardId'
          id='boardId'
          className='selects'
          onChange={handleChange}
        >
          <option value='' selected disabled hidden>
            -카테고리 선택-
          </option>
          <option value='1' selected='selected' className='option'>
            전국고양이자랑
          </option>
          <option value='2' selected='selected' className='option'>
            가출냥찾기
          </option>
          <option value='3' selected='selected' className='option'>
            도와주세요
          </option>
        </select>
      </div>
      <div className='title'>
        <span>
          <h3 className='write-title'>
            제목<font color='#ff0505'>*</font>
          </h3>
          <input
            id='title'
            name='title'
            type='text'
            className='title-input'
            placeholder='제목을 입력해주세요'
            onChange={handleChange}
          />
          <h3>
            글작성<font color='#ff0505'>*</font>
            <font size='2' color='#deddda'>
              &nbsp;파일첨부 필수
            </font>
          </h3>
        </span>
      </div>
      <ReactQuill
        placeholder='내용을 입력해주세요😸'
        modules={modules}
        formats={formats}
        onChange={handleContent} //quill 에디터는 깊은복사 필요없는듯 ??
        value={value}
        ref={quillRef}
      />
    </div>
  );
};

export default WritePostForm;
