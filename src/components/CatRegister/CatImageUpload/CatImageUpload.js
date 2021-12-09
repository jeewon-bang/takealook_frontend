import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './CatImageUpload.scss';

const CatImageUpload = (props) => {
  const { postImage, setPostImage } = props;
  const imgInput = useRef();

  const handleClick = () => {
    imgInput.current.click(); // imgInput이라는 ref가 걸린 대상(= input type='file')이 클릭되도록 한다
  };
  const handleChange = (e) => {
    setPostImage(e.target.files);
  };

  const preview = () => {
    if (postImage.length === 0) {
      // useEffect에서 실행되기 때문에 사용자가 이미지 업로드 하기 전에 바로 오류 뜨는거 방지
      return false;
    }
    for (let i = 0; i < postImage.length; i++) {
      const nowImgUrl = URL.createObjectURL(postImage[i]); // 사용자가 등록한 catImg for문돌면서 url 생성
      let prevImg = document.createElement('img'); // img 요소 생성
      prevImg.classList.add('img-preview'); // 클래스이름 주기
      prevImg.src = nowImgUrl; // img src 에 아까 만든 url 붙이기

      document.querySelector('.cat-img-upload-box').appendChild(prevImg); // 미리보기 박스에 img 요소 넣기
    }
    // console.log(catImg); //0: File {name: 's.jpg', lastModified: 1636706961304, lastModifiedDate: Fri Nov 12 2021 17:49:21 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 246808, …}length: 1
  };

  //   const memoizedValue = useMemo(() => preview(), []);

  useEffect(() => {
    preview();
  }, []);

  return (
    <div className='cat-img-upload-box'>
      <input
        ref={imgInput}
        className='catImg'
        type='file'
        multiple
        accept='image/*'
        name='file'
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <div>
        <button className='img-upload-button' onClick={handleClick}>
          사진 등록
          <div className='img-preview' ref={preview}></div>
        </button>
      </div>
    </div>
  );
};

export default CatImageUpload;
