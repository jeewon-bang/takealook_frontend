/* global kakao */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CatCare from 'components/CatDetail/CatCare/CatCare';
import CatInfo from 'components/CatDetail/CatInfo/CatInfo';
import './CatDetailPage.scss';
import { Link } from 'react-router-dom';
import axiosInstance from 'api/customAxios';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import CatMatch from 'components/CatRegister/CatMatch/CatMatch';
import CatMoreInfoForm from 'components/CatRegister/CatMoreInfoForm/CatMoreInfoForm';
import CatMarkerMap from 'components/Common/CatMarkerMap';
import Modal from 'components/Common/Modal';

// let catInfoData = {
// 	id: 2,
// 	name: 'buby',
// 	gender: 0,
// 	neutered: 1,
// 	status: 1,
// 	pattern: 1,
// 	createdAt: '2021-12-09T04:05:52.476',
// 	carers: [
// 		{
// 			id: 1,
// 			userName: '배지수',
// 			userImage:
// 				'https://lh3.googleusercontent.com/a-/AOh14GjQQRGi57RYfFWoPin6oxHzW5B58TIrOWjTpBKA3Q=s96-c',
// 			dflag: false,
// 		},
// 		{
// 			id: 2,
// 			userName: '배지수',
// 			userImage:
// 				'http://k.kakaocdn.net/dn/j2aRW/btrgD4GpwF1/jkrVJQvAMj0fUN904D9MlK/img_640x640.jpg',
// 			dflag: true,
// 		},
// 	],
// };

// let catLocData = [
// 	{
// 		latitude: 37.54732777835966,
// 		longitude: 126.8609590137254,
// 	},
// 	{
// 		latitude: 37.54511236317026,
// 		longitude: 126.86184575808647,
// 	},
// ];

// let catImgData = ['url1', 'url2', 'url3'];

// let careHistoryData = [
// 	{
// 		id: 2,
// 		type: 0,
// 		message: '건식사료를 줬어요!',
// 		createdAt: '2021-12-09T05:00:24.619',
// 		modifiedAt: '2021-12-09T05:00:24.619',
// 		carer: {
// 			id: 1,
// 			userName: '배지수',
// 			userImage:
// 				'https://lh3.googleusercontent.com/a-/AOh14GjQQRGi57RYfFWoPin6oxHzW5B58TIrOWjTpBKA3Q=s96-c',
// 			dflag: true,
// 		},
// 	},
// 	{
// 		id: 3,
// 		type: 0,
// 		message: '물을 줬어요!',
// 		createdAt: '2021-12-09T05:00:39.091',
// 		modifiedAt: '2021-12-09T05:00:39.091',
// 		carer: {
// 			id: 2,
// 			userName: '배지수',
// 			userImage:
// 				'http://k.kakaocdn.net/dn/j2aRW/btrgD4GpwF1/jkrVJQvAMj0fUN904D9MlK/img_640x640.jpg',
// 			dflag: true,
// 		},
// 	},
// ];

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

const CatDetailPage = () => {
  const { catId } = useParams();
  const [catInfo, setCatInfo] = useState('');
  const [catLoc, setCatLoc] = useState([]);
  const [catImg, setCatImg] = useState([]);
  const [careHistory, setCareHistory] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  // 새로 등록할 고양이와 매칭될 기존 고양이들 리스트
  const [matchedCatList, setMatchedCatList] = useState(matchedCatData);
  // 동일고양이 추천 모달을 보여줄지 여부
  const [showModal, setShowModal] = useState(false);
  // 일치하는 고양이가 없을때 추가정보 입력창을 보여줄지 여부
  const [moreInfo, setMoreInfo] = useState(false);

  const deleteMyCat = () => {
    alert('삭제한 고양이는 복구할 수 없습니다. 정말 삭제하시겠습니까?');

    axiosInstance
      .patch(`user/1/cat/${catId}/selection/soft-delete`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate('/mycat');
  };

  const findOtherCat = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log('CatDetailPage');
    axios
      .all([
        axiosInstance.get(`/user/1/cat/${catId}`),
        axiosInstance.get(`/user/1/cat/${catId}/images`),
        axiosInstance.get(`/user/1/cat/${catId}/locations`),
        axiosInstance.get(`/user/1/cat/${catId}/48hours-catcares`),
      ])
      .then(
        axios.spread((catInfoRes, catImgRes, catLocRes, careHistoryRes) => {
          setCatInfo(catInfoRes.data);
          setCatImg(catImgRes.data);
          setCatLoc(catLocRes.data);
          setCareHistory(careHistoryRes.data);
          setLoaded(true);
        })
      );
  }, []);

  return loaded ? (
    // 기본적으로 처음에 보여질 화면
    !moreInfo ? (
      <div className='content-container'>
        <CatInfo
          catId={catId}
          catInfo={catInfo}
          setCatInfo={setCatInfo}
          catImg={catImg}
          setCatImg={setCatImg}
        />

        <div className='title'>최근 발견된 위치</div>
        <CatMarkerMap
          mapId={'cat-detail-map'}
          catLoc={catLoc}
          width={'100%'}
          height={'500px'}
        />

        <div>
          <Link to='/mycat/update'>
            <button className='cat-info-update-button'>정보 수정하기</button>
          </Link>
        </div>

        <div className='title'>최근 48시간의 돌봄 기록</div>
        <CatCare
          catId={catId}
          careHistory={careHistory}
          setCareHistory={setCareHistory}
        />

        <div className='button-box'>
          <button className='cat-delete-button' onClick={deleteMyCat}>
            내 도감에서 삭제
          </button>
          <button className='cat-other-button' onClick={findOtherCat}>
            다른 고양이로 등록
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
      // 다른 고양이 버튼 누른 후 해당 고양이를 새로운 고양이로 등록할때 추가정보 입력하는 화면
      <CatMoreInfoForm
        catInfo={catInfo}
        setCatInfo={setCatInfo}
        catImg={catImg}
        catLoc={catLoc}
      />
    )
  ) : (
    <div>로딩중</div>
  );
};

export default CatDetailPage;
