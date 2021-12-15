/* global kakao */

import React, { useEffect, useState } from 'react';
// import Map, { map } from 'components/common/Map';
import './CatLocationMap.scss';

const CatLocation = (props) => {
	const { catLoc, setCatLoc } = props;
	// const [map, setMap] = useState('');
	const [markers, setMarkers] = useState([]);

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
		/** 마커 생성하기 */
		kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
			let latlng = mouseEvent.latLng; // 클릭한 위치의 위도경도
			// setMarkerPositions([...markerPositions, latlng]); 이건 왜안되지
			// 클릭한 모든 곳에 마커 생성
			let marker = new kakao.maps.Marker({
				map: map,
				position: latlng,
				// image: 설정가능
			});
			marker.setDraggable(true);
			setMarkers([...markers, marker]);
		});
	}, []);

	// 마커 초기화
	const deleteMarker = () => {
		markers.forEach((v) => {
			v.setMap(null); // 지도에서 지우기
		});
		markers.length = 0; // 배열에서도 삭제
		handleClick(); // 초기화된 데이터 다시 부모 페이지로 보내기
	};

	// 부모 페이지로 데이터 보내기
	const handleClick = (e) => {
		setCatLoc([
			...markers.map((v) => ({
				latitude: v.getPosition().getLat(),
				longitude: v.getPosition().getLng(),
			})),
		]);
	};

	return (
		<div className='map-container'>
			<div className='input-label'>최근 발견된 위치</div>
			{/* <Map handleClick={handleClick} /> */}
			<div
				id='register-map'
				style={{ width: '100%', height: '500px' }}
				onClick={handleClick}></div>
			<button onClick={deleteMarker}>초기화</button>
		</div>
	);
};

export default CatLocation;
