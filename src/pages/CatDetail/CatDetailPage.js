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
import { map } from 'components/common/Map';
import CatMarkerMap from 'components/common/CatMarkerMap';

let catInfoData = {
	id: 2,
	name: 'buby',
	gender: 0,
	neutered: 1,
	status: 1,
	pattern: 1,
	createdAt: '2021-12-09T04:05:52.476',
	carers: [
		{
			id: 1,
			userName: '배지수',
			userImage:
				'https://lh3.googleusercontent.com/a-/AOh14GjQQRGi57RYfFWoPin6oxHzW5B58TIrOWjTpBKA3Q=s96-c',
			dflag: false,
		},
		{
			id: 2,
			userName: '배지수',
			userImage:
				'http://k.kakaocdn.net/dn/j2aRW/btrgD4GpwF1/jkrVJQvAMj0fUN904D9MlK/img_640x640.jpg',
			dflag: true,
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
		createdAt: '2021-12-09T05:00:24.619',
		modifiedAt: '2021-12-09T05:00:24.619',
		carer: {
			id: 1,
			userName: '배지수',
			userImage:
				'https://lh3.googleusercontent.com/a-/AOh14GjQQRGi57RYfFWoPin6oxHzW5B58TIrOWjTpBKA3Q=s96-c',
			dflag: true,
		},
	},
	{
		id: 3,
		type: 0,
		message: '물을 줬어요!',
		createdAt: '2021-12-09T05:00:39.091',
		modifiedAt: '2021-12-09T05:00:39.091',
		carer: {
			id: 2,
			userName: '배지수',
			userImage:
				'http://k.kakaocdn.net/dn/j2aRW/btrgD4GpwF1/jkrVJQvAMj0fUN904D9MlK/img_640x640.jpg',
			dflag: true,
		},
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
				axiosInstance.get(`/user/1/cat/${catId}`),
				axiosInstance.get(`/user/1/cat/${catId}/images`),
				axiosInstance.get(`/user/1/cat/${catId}/locations`),
				axiosInstance.get(`/user/1/cat/${catId}/48hours-catcares`),
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

	return loaded ? (
		<div className='container-wrapper'>
			<div className='container'>
				<CatInfo
					catInfo={catInfo}
					setCatInfo={setCatInfo}
					catImg={catImg}
					setCatImg={setCatImg}
				/>
				<div className='title'>최근 발견된 위치</div>
				<CatMarkerMap
					mapId={'cat-detail-map'}
					catLoc={catLoc}
					width={'100%'}
					height={'500px'}
				/>
				<div class='button-box'>
					<Link to='/mycat/update'>
						<button className='cat-info-update-button'>정보 수정하기</button>
					</Link>
				</div>
				<div className='title'>최근 48시간의 돌봄 기록</div>
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
