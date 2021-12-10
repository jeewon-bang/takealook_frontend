import axios from 'axios';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';
import CatLocationMap from 'components/CatRegister/CatLocationMap/CatLocationMap';
import CatRegisterForm from 'components/CatRegister/CatRegisterForm/CatRegisterForm';
import catApi from 'api/catApi';
import React, { useState } from 'react';
import './CatRegisterPage.scss';
import axiosInstance from 'api/customAxios';

const CatRegisterPage = () => {
  const [catInfo, setCatInfo] = useState({
    name: '',
    neutered: '',
    gender: '',
    info: '테스트입니당',
  });
  const [catStatus, setCatStatus] = useState({ status: '' });
  const [catLoc, setCatLoc] = useState([]); // 여러개
  const [catImg, setCatImg] = useState([]); // 여러개

  const handleSubmit = () => {
    if (
      !catInfo.name ||
      !catInfo.neutered ||
      !catInfo.gender ||
      !catStatus.status
    ) {
      document.getElementById('message').innerText =
        '모든 항목을 입력해주세요!';
    } else {
      if (catLoc.length === 0) {
        document.getElementById('message').innerText =
          '1곳 이상의 위치를 선택해주세요!';
      } else {
        console.log(catImg); // fileList 객체타입
        console.log(catInfo);
        console.log(catStatus);
        console.log(catLoc); // 기본 array 타입
        console.log(catImg.constructor);
        console.log(catLoc.constructor);

        const formData = new FormData();

        for (let i = 0; i < catImg.length; i++) {
          formData.append('catImg', catImg[i]);
        }
        formData.append(
          'catLoc',
          new Blob([JSON.stringify(catLoc)], { type: 'application/json' }) // 객체 추가하고 싶을때 blob 안에 JSON.stringfy 해서 넣어야 되는듯
        );
        formData.append(
          'catInfo',
          new Blob([JSON.stringify(catInfo)], { type: 'application/json' })
        );
        formData.append(
          'catStatus',
          new Blob([JSON.stringify(catStatus)], { type: 'application/json' })
        );

        // 콘솔에 찍어보기
        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }

        axiosInstance.post('/user/1/cat', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
    }
  };

  return (
    <div className='content-container'>
      <span className='cat-img-form'>
        <CatImageUpload image={catImg} setImage={setCatImg} />
      </span>
      <div className='info-map-box'>
        <span className='cat-info-form'>
          <CatRegisterForm
            catInfo={catInfo}
            setCatInfo={setCatInfo}
            catStatus={catStatus}
            setCatStatus={setCatStatus}
          />
        </span>
        <span className='cat-map'>
          <CatLocationMap catLoc={catLoc} setCatLoc={setCatLoc} />
        </span>
      </div>
      {catLoc.length}

      <div id='message'></div>
      <button onClick={handleSubmit}>등록하기</button>
    </div>
  );
};

export default CatRegisterPage;
