import React, { useEffect, useRef, useState } from 'react';

const ImgUpload = (props) => {
  const { pastImg, img, setImg } = props;
  const [fileUrl, setFileUrl] = useState([]);

  const imgInput = useRef();
  const handleClick = () => {
    imgInput.current.click(); // imgInput이라는 ref가 걸린 대상(= input type='file')이 클릭되도록 한다
  };

  const processImage = (e) => {
    setImg(e.target.files);
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  };

  useEffect(() => {
    setFileUrl(pastImg);
  }, []);

  return (
    <div className='cat-img-upload'>
      <div className='cat-img-upload-box'>
        <input
          ref={imgInput}
          className='img-input'
          type='file'
          multiple
          accept='image/*'
          name='file'
          style={{ display: 'none' }}
          onChange={processImage}
        />
        <button className='oneimg-upload-button' onClick={handleClick}>
          <div
            className='img-preview'
            style={{ backgroundImage: `url(${fileUrl})` }}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default ImgUpload;
