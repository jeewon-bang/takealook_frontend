/* global kakao */

import React, { useEffect, useState } from 'react';
import Map, { map } from 'components/common/Map';

const CatLocation = (props) => {
	const { catInfo, setCatInfo } = props;
	// const [map, setMap] = useState('');
	const [markers, setMarkers] = useState([]);

	useEffect(() => {
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
			markers.push(marker);
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
		console.log(markers);
		setCatInfo({
			...catInfo,
			location: [
				...markers.map((v) => ({
					latitude: v.getPosition().getLat(),
					longtitude: v.getPosition().getLng(),
				})),
			],
		});
	};

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<span className='cat-info-form-inner input-label'>최근 발견된 위치</span>
			<Map onClick={handleClick} />
			<button onClick={deleteMarker}>초기화</button>
		</div>
	);
};

export default CatLocation;
