import React, { useEffect, useRef } from 'react';
import './WriteThumbnail.scss';

const WriteThumbnail = (props) => {
  const { image, setImage } = props;

  const imgInput = useRef();

  const handleClick = () => {
    imgInput.current.click(); // imgInput이라는 ref가 걸린 대상(= input type='file')이 클릭되도록 한다
  };
  const handleChange = (e) => {
    setImage(e.target.files); // 업로드한 이미지들을 catImg에 저장
  };
  const preview = () => {
    if (image.length === 0) {
      // useEffect에서 실행되기 때문에 사용자가 이미지 업로드 하기 전에 바로 오류 뜨는거 방지
      return false;
    }
    for (let i = 0; i < image.length; i++) {
      const nowImgUrl = URL.createObjectURL(image[i]); // 사용자가 등록한 catImg for문돌면서 url 생성
      let prevImg = document.createElement('img'); // img 요소 생성
      prevImg.classList.add('img-preview'); // 클래스이름 주기
      prevImg.src = nowImgUrl; // img src 에 아까 만든 url 붙이기

      document.querySelector('.cat-img-upload-box').appendChild(prevImg); // 미리보기 박스에 img 요소 넣기
    }
  };

  useEffect(() => {
    preview();
  }, []);

  return (
    <div className='cat-img-upload'>
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
        <div ref={preview}>
          <button className='img-upload-button' onClick={handleClick}>
            사진 등록
          </button>
          {/* <img
          className='img-preview'
          ref={preview}
          alt='고양이 이미지를 등록해주세요!'
        ></img> */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(WriteThumbnail);
