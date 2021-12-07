/* global kakao */
import Map from 'components/Home/Map';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { map } from 'components/Home/Map';
import './CatMap.scss';

const CatMap = () => {
	let data = [
		{
			latitude: 37.54732777835966,
			longtitude: 126.8609590137254,
		},
		{
			latitude: 37.54511236317026,
			longtitude: 126.86184575808647,
		},
	];

	const [location, setLocation] = useState(data);

	useEffect(() => {
		location.forEach((v) => {
			let marker = new kakao.maps.Marker({
				map: map,
				position: new kakao.maps.LatLng(v.latitude, v.longtitude),
			});
		});

		map.setCenter(
			new kakao.maps.LatLng(location[0].latitude, location[0].longtitude)
		);
	}, []);

	return (
		<div className='map-container'>
			<div className='cat-info-title-text'>최근 발견된 위치</div>
			<Map />
		</div>
	);
};

export default CatMap;
