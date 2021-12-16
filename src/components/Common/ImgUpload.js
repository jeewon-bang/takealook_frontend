import React, { useState } from 'react';

const ImgUpload = (props) => {
  const { fileUrl, setFileUrl } = props;

  const processImage = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  };

  return (
    <div className='cat-img-upload'>
      <div className='cat-img-upload-box'>
        <span
          className='img-preview'
          style={{ backgroundImage: `url(${fileUrl})` }}
        ></span>
        <input
          className='img-input'
          type='file'
          accept='image/*'
          onChange={processImage}
        ></input>
      </div>
    </div>
  );
};

export default ImgUpload;
