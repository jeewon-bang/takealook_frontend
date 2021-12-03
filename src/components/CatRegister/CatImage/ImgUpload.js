import axios from 'axios';
import React, { useState } from 'react';

const ImgUpload = () => {
  const [imgs, setImgs] = useState([]);
  const [imgBuffer, setImgBuffer] = useState([]);
  const handleChange = (e) => {
    setImgs(e.target.files);
    // for (let i = 0; i < e.target.files.length; i++) {
    // 	if (e.target.files[i]) {
    // 		let reader = new FileReader();
    // 		reader.readAsArrayBuffer(e.target.files[i]);
    // 		reader.onloadend = () => {
    // 			const buffer = reader.result;
    // 			if (buffer) {
    // 				setImgBuffer((imgBuffer) => [...imgBuffer, buffer]);
    // 			}
    // 		};
    // 	}
    // }
  };
  const handleSubmit = (e) => {
    //const blob = new Blob(imgs, { type: 'image' });
    const formData = new FormData();
    formData.append('imgs', imgs);
    // formData.append('dto', {id:1, name:'ss'});
    for (let keyvalue of formData.entries()) {
      console.log(keyvalue);
    }
    axios({
      method: 'post',
      url: 'http://localhost/test',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <input type='file' onChange={handleChange} />
      <button onClick={handleSubmit}>등록</button>
    </div>
  );
};

export default ImgUpload;
