/* global kakao */
import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export let map = null;

const Map = () => {
	useEffect(() => {
		/*** 지도 생성하기 ***/
		const mapContainer = document.getElementById('map'); // 지도를 표시할 div
		const mapOption = {
			center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
			level: 2, // 지도의 확대 레벨
		};
		map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 표시할 div와 지도 옵션으로 지도를 생성

		// if (navigator.geolocation) {
		// 	navigator.geolocation.getCurrentPosition((position) => {
		// 		// GeoLocation을 이용해서 현 접속 위치 가져오기
		// 		const lat = position.coords.latitude; // 위도
		// 		const lon = position.coords.longitude; // 경도
		// 		const locPosition = new kakao.maps.LatLng(lat, lon);
		// 		console.log('원래 지도의 중심위치');
		// 		map.setCenter(locPosition); // 지도 중심위치를 현 접속위치로 변경
		// 	});
		// }
	}, []);

	return <div id='map' style={{ width: '100%', height: '100%' }}></div>;
};

export default Map;
