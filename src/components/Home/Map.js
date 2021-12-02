/* global kakao */
import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledMapDiv = styled.div`
  width: 100%;
  height: 91vh;
`;

const Map = () => {
  const [map, setMap] = useState('');

  useEffect(() => {
    /*** 지도 생성하기 ***/
    let mapContainer = document.getElementById('map'); // 지도를 표시할 div
    let mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };
    let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 표시할 div와 지도 옵션으로 지도를 생성

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // GeoLocation을 이용해서 현 접속 위치 가져오기
        var lat = position.coords.latitude; // 위도
        var lon = position.coords.longitude; // 경도
        var locPosition = new kakao.maps.LatLng(lat, lon);

        map.setCenter(locPosition); // 지도 중심위치를 현 접속위치로 변경
      });
    }
  }, []);

  return <StyledMapDiv id='map'></StyledMapDiv>;
};

export default Map;
