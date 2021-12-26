/* global kakao */
import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { Link } from 'react-router-dom';
import axiosInstance from 'api/customAxios';
import { useSelector } from 'react-redux';

const HomePage = () => {
	const imageSrc = 'https://cdn-icons-png.flaticon.com/512/2865/2865755.png', // 마커이미지의 주소
		imageSize = new kakao.maps.Size(45, 45), // 마커이미지의 크기
		imageOption = { offset: new kakao.maps.Point(27, 69) }; //마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정

	const [myCats, setMyCats] = useState([]);
	const [error, setError] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const { user, loginDone, logoutDone } = useSelector(({ auth }) => ({
		user: auth.user,
		loginDone: auth.loginDone,
		logoutDone: auth.logoutDone,
	}));

	useEffect(() => {
		if (user) {
			axiosInstance.get(`/user/${user.id}/cats/recent-location`).then((res) => {
				setMyCats(res.data);
				setLoaded(true);
			});
		}
	}, []);

	useEffect(() => {
		const markerImg = new kakao.maps.MarkerImage(
			imageSrc,
			imageSize,
			imageOption
		);

		// /*** 지도 생성하기 ***/
		let mapContainer = document.getElementById('home-map'); // 지도를 표시할 div
		let mapOption = {
			center: new kakao.maps.LatLng(37.61501807386411, 127.0805784348522), // 지도의 중심좌표
			level: 4, // 지도의 확대 레벨
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

			// 결과값으로 받은 위치를 마커로 표시
			let marker = new kakao.maps.Marker({
				map: map,
				image: markerImg,
				position: markerPosition,
			});
			marker.setMap(map);

			// 인포윈도우에 표시할 내용 정의
			let iwContent = `
							<div style="padding:10px; width:150px; height:180px; padding:10px; text-align:center;">
								<img src="${cat.mainImage}" style="width:100%; height:150px;">
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
				loaded ? (
					<div className='message-box'>
						<span className='message'>
							아직 등록한 고양이가 없으신가요? <br />
							도감에 고양이를 등록해서 관리하고 이웃들과도 공유해보세요!
							<br />
							<Link to='/mycat/new'>
								<button className='message-button'>고양이 등록하기</button>
							</Link>
						</span>
					</div>
				) : (
					<span></span>
				)
			) : (
				<Link to='/mycat/new'>
					<button className='cat-add-button'>고양이 등록</button>
				</Link>
			)}
		</div>
	);
};

export default HomePage;
