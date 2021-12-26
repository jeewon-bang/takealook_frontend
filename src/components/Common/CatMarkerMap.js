/* global kakao */
import React from 'react';
import { useEffect } from 'react';

const CatMarkerMap = (props) => {
	const { mapId, catLoc, width, height } = props;

	useEffect(() => {
		console.log('CatMarkerMap 렌더링');

		/*** 지도 생성하기 ***/
		const mapContainer = document.getElementById(mapId); // 지도를 표시할 div
		const mapOption = {
			center: new kakao.maps.LatLng(37.61501807386411, 127.0805784348522), // 지도의 중심좌표
			level: 2, // 지도의 확대 레벨
		};
		let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 표시할 div와 지도 옵션으로 지도를 생성

		let imgSrc = 'https://cdn-icons-png.flaticon.com/512/2865/2865755.png';
		let imgSize = new kakao.maps.Size(64, 69);
		let imgOption = { offset: new kakao.maps.Point(27, 69) };
		let markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption);

		// 고양이 마커 찍기
		if (catLoc.length > 0) {
			catLoc.forEach((v) => {
				let marker = new kakao.maps.Marker({
					map: map,
					position: new kakao.maps.LatLng(v.latitude, v.longitude),
					image: markerImage,
				});
			});
			map.setCenter(
				new kakao.maps.LatLng(catLoc[0].latitude, catLoc[0].longitude)
			);
		} else {
			/** GeoLocation을 이용해서 현 접속 위치 가져오기 */
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					let lat = position.coords.latitude; // 위도
					let lon = position.coords.longitude; // 경도
					let locPosition = new kakao.maps.LatLng(lat, lon);

					map.setCenter(locPosition); // 지도 중심위치를 현 접속위치로 변경
				});
			}
		}
	}, []);

	return <div id={mapId} style={{ width: width, height: height }}></div>;
};

export default CatMarkerMap;
