/* global kakao */

import React, { useEffect, useState } from 'react';
// import Map, { map } from 'components/common/Map';
import './CatLocationMap.scss';
import { ImageResize } from 'quill-image-resize';

const CatLocation = (props) => {
  const { catLoc, setCatLoc, newCatLoc, setNewCatLoc } = props;
  const [markers, setMarkers] = useState([]);
  const [newMarkers, setNewMarkers] = useState([]);

  useEffect(() => {
    /** 지도 생성하기 */
    let mapContainer = document.getElementById('register-map'); // 지도를 표시할 div
    let mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };
    let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 표시할 div와 지도 옵션으로 지도를 생성

    /** GeoLocation을 이용해서 현 접속 위치 가져오기 */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude; // 위도
        var lon = position.coords.longitude; // 경도
        var locPosition = new kakao.maps.LatLng(lat, lon);

        map.setCenter(locPosition); // 지도 중심위치를 현 접속위치로 변경
      });
    }

    /** 고양이 기존 위치 마커 찍기 */
    if (catLoc.length > 0) {
      let imgSrc = 'https://cdn-icons-png.flaticon.com/512/2865/2865755.png';
      let imgSize = new kakao.maps.Size(64, 69);
      let imgOption = { offset: new kakao.maps.Point(27, 69) };
      let markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption);
      catLoc.forEach((v) => {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(v.latitude, v.longitude),
          image: markerImage,
        });
      });
    }

    /** 새로운 위치 마커 생성하기 */
    kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
      let imgSrc = 'https://cdn-icons-png.flaticon.com/512/1581/1581645.png';
      let imgSize = new kakao.maps.Size(64, 69);
      let imgOption = { offset: new kakao.maps.Point(27, 69) };
      let markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption);

      let latlng = mouseEvent.latLng; // 클릭한 위치의 위도경도
      // setMarkerPositions([...markerPositions, latlng]); 이건 왜안되지
      // 클릭한 모든 곳에 마커 생성
      let newMarker = new kakao.maps.Marker({
        map: map,
        position: latlng,
        image: markerImage,
      });
      newMarker.setDraggable(true);
      // setNewMarkers([...newMarkers, newMarker]);  도대체 이렇게하면 왜안되는건지 누가 설명좀!!!
      newMarkers.push(newMarker);
    });
  }, []);

  // 마커 초기화
  const deleteMarker = () => {
    newMarkers.forEach((v) => {
      v.setMap(null); // 지도에서 지우기
      console.log(newMarkers);
    });
    newMarkers.length = 0; // 배열에서도 삭제
    handleClick(); // 초기화된 데이터 다시 부모 페이지로 보내기
  };

  // 마커 클릭할때마다 부모 페이지로 데이터 보내기
  const handleClick = (e) => {
    setCatLoc([
      ...catLoc,
      ...newMarkers.map((v) => ({
        latitude: v.getPosition().getLat(),
        longitude: v.getPosition().getLng(),
      })),
    ]);

    setNewCatLoc([
      ...newCatLoc,
      ...newMarkers.map((v) => ({
        latitude: v.getPosition().getLat(),
        longitude: v.getPosition().getLng(),
      })),
    ]);
  };

  return (
    <div className='map-container'>
      <div className='input-label'>최근 발견된 위치</div>
      <div className='map-box'>
        <div
          id='register-map'
          style={{ width: '100%', height: '500px' }}
          onClick={handleClick}
        ></div>
        <button className='reset-button' onClick={deleteMarker}>
          마커 <br />
          초기화
        </button>
      </div>
    </div>
  );
};

export default CatLocation;
