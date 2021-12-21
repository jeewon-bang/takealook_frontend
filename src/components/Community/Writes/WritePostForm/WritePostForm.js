import React, { useMemo, useRef } from 'react';
import './WritePostForm.scss';
import ReactQuill, { Quill } from 'react-quill';
import '../../../../../node_modules/react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
import axiosInstance from 'api/customAxios';
Quill.register('modules/ImageResize', ImageResize);

const WritePostForm = (props) => {
  const { postText, setPostText } = props;
  const quillRef = useRef('');

  const imageHandler = () => {
    const input = document.createElement('input'); // input 태그를 동적으로 생성하기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*'); // 이미지 파일만 선택가능하도록 제한
    input.setAttribute('name', 'image');
    input.click();

    // 파일 선택창에서 이미지를 선택하면 실행될 콜백 함수 등록
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      //url받아오는
      axiosInstance
        .post('/post/photo', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          //에디터 정보를 가져올 수 있다.
          const quill = quillRef.current.getEditor();
          //현재 에디터 커서 위치를 알려준다.
          const range = quill.getSelection();
          //에디터의 특정 위치에 원하는 요소를 넣어 준다.
          quill.insertEmbed(range, 'image', res.data);
        })
        .catch((err) => console.log(err));
    };
  };

  //카테고리 & 제목
  const handleChange = (e) => {
    setPostText({ ...postText, [e.target.name]: e.target.value });
  };

  //내용 - quill
  const handleContent = (e) => {
    // setValue(e);
    setPostText({ ...postText, content: e });
  };

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
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
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

  return (
    <div>
      <div className='top'>
        <select
          name='boardId'
          id='boardId'
          className='selects'
          onChange={handleChange}
        >
          <option defaultValue='' className='option' selected disabled hidden>
            -카테고리 선택-
          </option>
          <option value='1' className='option'>
            전국고양이자랑
          </option>
          <option value='2' className='option'>
            가출냥찾기
          </option>
          <option value='3' className='option'>
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
            value={postText.title}
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
        onChange={handleContent}
        value={postText.content}
        ref={quillRef}
      />
    </div>
  );
};

export default WritePostForm;
