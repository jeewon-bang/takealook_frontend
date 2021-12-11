/* global kakao */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CatCare from 'components/CatDetail/CatCare/CatCare';
import CatInfo from 'components/CatDetail/CatInfo/CatInfo';
import CatMap from 'components/CatDetail/CatMap/CatMap';
import './CatDetailPage.scss';
import { Link } from 'react-router-dom';
import axiosInstance from 'api/customAxios';
import axios from 'axios';
import { map } from 'components/Common/Map';

let catInfoData = {
  id: 1,
  name: '보리',
  gender: 1,
  neutered: 0,
  status: 0,
  patter: 1,
  createdAt: '2021-12-09T04:23:05.279',
  carers: [
    {
      id: 1,
      userName: '혜민',
      userImage: 'url~~',
    },
    {
      id: 2,
      userName: '지수',
      userImage: 'url~~',
    },
  ],
};

let catLocData = [
  {
    latitude: 37.54732777835966,
    longitude: 126.8609590137254,
  },
  {
    latitude: 37.54511236317026,
    longitude: 126.86184575808647,
  },
];

let catImgData = ['url1', 'url2', 'url3'];

let careHistoryData = [
  {
    id: 2,
    type: 0,
    message: '건식사료를 줬어요!',
    userId: 1,
    userName: '배지수',
    userImage: 'url',
    createdAt: '2021-12-09T04:05:52.476',
    modifiedAt: '2021-12-09T04:05:52.476',
  },
  {
    id: 3,
    type: 0,
    message: '물을 줬어요!',
    userId: 2,
    userName: '신지혜',
    userImage: 'url',
    createdAt: '2021-12-09T04:05:52.476',
    modifiedAt: '2021-12-09T04:05:52.476',
  },
];

const CatDetailPage = () => {
  const { catId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [catInfo, setCatInfo] = useState('');
  const [catLoc, setCatLoc] = useState([]);
  const [catImg, setCatImg] = useState([]);
  const [careHistory, setCareHistory] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('CatDetailPage');

    axios
      .all([
        axiosInstance.get(`/user/1/cat/1`),
        axiosInstance.get(`/user/1/cat/1/images`),
        axiosInstance.get(`/user/1/cat/1/locations`),
        axiosInstance.get(`/user/1/cat/1/48hours-catcares`),
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

  // map.setCenter(new kakao.maps.LatLng(catLoc[0].latitude, catLoc[0].longitude));

  return loaded ? (
    <div className='container-wrapper'>
      <div className='container'>
        <CatInfo
          catInfo={catInfo}
          setCatInfo={setCatInfo}
          catImg={catImg}
          setCatImg={setCatImg}
        />
        <CatMap catLoc={catLoc} setCatLoc={setCatLoc} />
        <div class='button-box'>
          <Link to='/mycat/update'>
            <button className='cat-info-update-button'>정보 수정하기</button>
          </Link>
        </div>
        <CatCare
          catId={catId}
          showModal={showModal}
          setShowModal={setShowModal}
          careHistory={careHistory}
          setCareHistory={setCareHistory}
        />
        <div class='button-box'>
          <Link to='/mycat/update'>
            <button className='cat-info-update-button'>돌봄 기록 추가</button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div>로딩중</div>
  );
};

export default CatDetailPage;
