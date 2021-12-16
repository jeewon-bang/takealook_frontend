import axios from 'axios';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';
import CatLocationMap from 'components/CatRegister/CatLocationMap/CatLocationMap';
import CatRegisterForm from 'components/CatRegister/CatRegisterForm/CatRegisterForm';
import catApi from 'api/catApi';
import React, { useState } from 'react';
import './CatRegisterPage.scss';
import axiosInstance from 'api/customAxios';
import Modal from 'components/Common/Modal';
import CatMatch from 'components/CatRegister/CatMatch/CatMatch';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import CatMoreInfoForm from 'components/CatRegister/CatMoreInfoForm/CatMoreInfoForm';

let matchedCatData = [
  {
    id: 1,
    name: '보리',
    gender: 0,
    neutered: 1,
    pattern: 1,
    locations: [
      {
        latitude: 37.54511236317026,
        longitude: 126.86184575808647,
      },
    ],
  },
  {
    id: 2,
    name: '부비',
    gender: 0,
    neutered: 1,
    pattern: 1,
    locations: [
      {
        latitude: 37.54732777835966,
        longitude: 126.8609590137254,
      },
    ],
  },
];

const CatRegisterPage = () => {
  // 새로 등록할 고양이 정보
  const [catInfo, setCatInfo] = useState({
    name: '',
    gender: '',
    neutered: '',
    status: '',
    pattern: '',
  });
  const [catLoc, setCatLoc] = useState([]);
  const [catImg, setCatImg] = useState([]);

  // 새로 등록할 고양이와 매칭될 기존 고양이들 리스트
  const [matchedCatList, setMatchedCatList] = useState(matchedCatData);
  // 동일고양이 추천 모달을 보여줄지 여부
  const [showModal, setShowModal] = useState(false);
  // 일치하는 고양이가 없을때 추가정보 입력창을 보여줄지 여부
  const [moreInfo, setMoreInfo] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    console.log(catImg); // fileList 객체타입
    console.log(catInfo);
    console.log(catLoc); // 기본 array 타입

    if (!catInfo.neutered || !catInfo.gender || !catInfo.pattern) {
      document.getElementById('message').innerText =
        '모든 항목을 입력해주세요!';
    } else {
      if (catLoc.length === 0) {
        document.getElementById('message').innerText =
          '1곳 이상의 위치를 선택해주세요!';
      } else {
        document.getElementById('message').innerText = '';
        // 동일 추정 고양이 모달 팝업
        setShowModal(true);
      }
    }
  };

  return !moreInfo ? (
    <div className='content-container'>
      <span className='cat-img-form'>
        <CatImageUpload image={catImg} setImage={setCatImg} />
      </span>
      <span className='cat-info-form'>
        <CatRegisterForm catInfo={catInfo} setCatInfo={setCatInfo} />
      </span>
      <span className='cat-map'>
        <CatLocationMap catLoc={catLoc} setCatLoc={setCatLoc} />
      </span>
      <div id='message' className='warning-message'></div>
      <div className='button-box'>
        <button className='cancel-button'>취소하기</button>
        <button className='submit-button' onClick={handleSubmit}>
          등록하기
        </button>
      </div>

      {showModal && (
        <Modal showModal={showModal} onClose={closeModal} maskClosable={true}>
          <div style={{ width: '800px' }}>
            <Swiper
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {matchedCatList.map((matchedCat) => (
                <SwiperSlide>
                  <CatMatch
                    moreInfo={moreInfo}
                    setMoreInfo={setMoreInfo}
                    matchedCat={matchedCat}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Modal>
      )}
    </div>
  ) : (
    <CatMoreInfoForm
      catInfo={catInfo}
      setCatInfo={setCatInfo}
      catImg={catImg}
      catLoc={catLoc}
    />
  );
};

export default CatRegisterPage;
