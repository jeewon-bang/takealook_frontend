/* global kakao */
import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { Link } from 'react-router-dom';
import axiosInstance from 'api/customAxios';

// let data = [
// 	{
// 		id: 1,
// 		name: 'yulmu',
// 		status: 3,
// 		recentCares: null,
// 		recentLocation: {
// 			id: 3,
// 			latitude: 37.49531,
// 			longitude: 126.54879,
// 			createdAt: '2021-12-09T16:52:32.457',
// 		},
// 	},
// 	{
// 		id: 2,
// 		name: 'buby',
// 		status: 1,
// 		recentCares: null,
// 		recentLocation: {
// 			id: 5,
// 			latitude: 37.491797,
// 			longitude: 126.563679,
// 			createdAt: '2021-12-09T16:52:58.607',
// 		},
// 	},
// ];

const HomePage = () => {
  // https://cdn-icons-png.flaticon.com/512/3712/3712529.png
  // 'https://cdn-icons.flaticon.com/png/512/207/premium/207929.png?token=exp=1639591002~hmac=1439f1e120d8862a656c56e1fbd3d924
  const imageSrc = 'https://cdn-icons-png.flaticon.com/512/3712/3712529.png', // 마커이미지의 주소
    imageSize = new kakao.maps.Size(45, 45), // 마커이미지의 크기
    imageOption = { offset: new kakao.maps.Point(27, 69) }; //마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
  const [myCats, setMyCats] = useState([]);
  const [error, setError] = useState(null);
  // let map = null;

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get(`/user/1/cats/recent-location`);
        console.log(res);

        setMyCats(res.data);
      } catch (err) {
        setError(err);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const markerImg = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    console.log(myCats);
    // 아래를 주석처리하면 myCats 잘 찍힌다. 아래에서 지도생성 안되는 이유가 뭘까????

    // /*** 지도 생성하기 ***/
    let mapContainer = document.getElementById('home-map'); // 지도를 표시할 div
    let mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 표시할 div와 지도 옵션으로 지도를 생성

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // GeoLocation을 이용해서 현 접속 위치 가져오기
        let lat = position.coords.latitude; // 위도
        let lon = position.coords.longitude; // 경도
        let locPosition = new kakao.maps.LatLng(lat, lon);

        map.setCenter(locPosition); // 지도 중심위치를 현 접속위치로 변경
      });
    }

    // /*** 지도에 마커 표시 ***/
    myCats.forEach((cat) => {
      let markerPosition = new kakao.maps.LatLng(
        cat.recentLocation.latitude,
        cat.recentLocation.longitude
      );
      console.log(markerPosition);

      // 결과값으로 받은 위치를 마커로 표시
      let marker = new kakao.maps.Marker({
        map: map,
        image: markerImg,
        position: markerPosition,
      });
      console.log(marker);
      marker.setMap(map);

      // 인포윈도우에 표시할 내용 정의
      let iwContent = `
							<div style="padding:10px; width:300px;">
								<b style="font-size:20px;">${cat.name}</b><br>
							</div>
						`;

      // 인포윈도우 생성
      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
      });

      // 마커에 이벤트 등록
      kakao.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
      });
      kakao.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close();
      });
      kakao.maps.event.addListener(marker, 'click', function () {
        document.location.href = `http://localhost:3000/mycat/${cat.id}`;
      });
    });
  }, [myCats]);

  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <div className='main-container'>
      <div id='home-map' style={{ width: '100%', height: '100%' }}></div>
      {myCats.length === 0 ? (
        <div className='message-box'>
          <div className='message'>
            아직 등록한 고양이가 없으신가요?
            <br />
            도감에 고양이를 등록해서 관리하고 이웃들과도 공유해보세요!
            <br />
            <Link to='/mycat/new'>
              <button className='message-button'>고양이 등록하기</button>
            </Link>
          </div>
        </div>
      ) : (
        <Link to='/mycat/new'>
          <button className='cat-add-button'>고양이 등록</button>
        </Link>
      )}
    </div>
  );
};

export default HomePage;
