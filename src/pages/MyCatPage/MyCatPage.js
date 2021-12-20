import axiosInstance from 'api/customAxios';
import axios from 'axios';
import MyCat from 'components/MyCat/MyCat/MyCat';
import MyLeftCat from 'components/MyCat/MyLeftCat/MyLeftCat';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyCatPage.scss';

// let myCatData = [
// 	{
// 		id: 1,
// 		image: require('images/bori2.jpg'),
// 		name: '보리',
// 		catStatus: '건강함',
// 		catCare: [
// 			{
// 				id: 1,
// 				user: '혜민',
// 				userImg: '',
// 				time: '2021-11-10 12:40:33',
// 				type: 0,
// 				message: '츄르줬어요!!',
// 			},

// 			{
// 				id: 2,
// 				user: '지원',
// 				userImg: '',
// 				time: '2021-11-29 22:24:10',
// 				type: 1,
// 				message: '사료 바꿨어요!',
// 			},
// 			{
// 				id: 3,
// 				user: '세은',
// 				userImg: '',
// 				time: '2021-11-30 10:55:00',
// 				type: 2,
// 				message: '심장사상충약 급여했어요',
// 			},
// 		],
// 	},
// 	{
// 		id: 2,
// 		image: require('images/ritae1.jpg'),
// 		name: '리태',
// 		catStatus: '치료필요',
// 		catCare: [
// 			{
// 				id: 1,
// 				user: '지혜',
// 				userImg: '',
// 				time: '2021-11-10 12:40:33',
// 				type: 1,
// 				message: '사료 바꿨어요!',
// 			},

// 			{
// 				id: 2,
// 				user: '형림',
// 				userImg: '',
// 				time: '2021-11-29 22:24:10',
// 				type: 2,
// 				message: '심장사상충약 급여했어요',
// 			},
// 			{
// 				id: 3,
// 				user: '세은',
// 				userImg: '',
// 				time: '2021-11-30 10:55:00',
// 				type: 3,
// 				message: '구내염 처방받으러 병원갔다왔어요ㅠㅠ',
// 			},
// 		],
// 	},
// 	{
// 		id: 3,
// 		image: require('images/yulmu2.jpg'),
// 		name: '율무',
// 		catStatus: '건강함',
// 		catCare: [
// 			{
// 				id: 1,
// 				user: '지수',
// 				userImg: '',
// 				time: '2021-11-10 12:40:33',
// 				type: 4,
// 				message: '물급여했어요',
// 			},

// 			{
// 				id: 2,
// 				user: '지원',
// 				userImg: '',
// 				time: '2021-11-29 22:24:10',
// 				type: 2,
// 				message: '심장사상충약 급여했어요',
// 			},
// 			{
// 				id: 3,
// 				user: '지혜',
// 				userImg: '',
// 				time: '2021-11-30 10:55:00',
// 				type: 3,
// 				message: '구내염 처방받으러 병원갔다왔어요ㅠㅠ',
// 			},
// 		],
// 	},
// ];

// let adoptedCatData = [
// 	{
// 		id: 1,
// 		image: require('images/bori2.jpg'),
// 		name: '보리',
// 	},
// 	{
// 		id: 2,
// 		image: require('images/ritae1.jpg'),
// 		name: '리태',
// 	},
// 	{
// 		id: 3,
// 		image: require('images/yulmu2.jpg'),
// 		name: '율무',
// 	},
// ];

// let catStarData = [
// 	{
// 		id: 1,
// 		image: require('images/bori2.jpg'),
// 		name: '보리보리',
// 	},
// 	{
// 		id: 2,
// 		image: require('images/ritae1.jpg'),
// 		name: '리태',
// 	},
// 	{
// 		id: 3,
// 		image: require('images/yulmu2.jpg'),
// 		name: '율무',
// 	},
// ];

const MyCatPage = () => {
	const [myCats, setMyCats] = useState([]);
	const [adoptedCats, setAdoptedCats] = useState([]);
	const [catStar, setCatStar] = useState([]);
	const [selectType, setSelectType] = useState('mycat');
	const [loaded, setLoaded] = useState(false);

	const sortHandler = (e) => {
		console.log(e.target.value);

		const value = e.target.value;
		switch (value) {
			case 'mycat':
				moveToMycat();
				break;
			case 'adopted':
				moveToAdopted();
				break;
			case 'cat-star':
				moveToCatstar();
				break;
			default:
				break;
		}
	};

	const moveToMycat = () => {
		setSelectType('mycat');
	};

	const moveToAdopted = () => {
		setSelectType('adopted');
	};

	const moveToCatstar = () => {
		setSelectType('cat-star');
	};

	useEffect(() => {
		axios
			.all([
				axiosInstance.get(`/user/1/cats`),
				axiosInstance.get(`/user/1/cat-stars`),
				axiosInstance.get(`/user/1/adopted`),
			])
			.then(
				axios.spread((myCatsRes, adoptedCatsRes, catStarRes) => {
					setMyCats(myCatsRes.data);
					setAdoptedCats(adoptedCatsRes.data);
					setCatStar(catStarRes.data);
					setLoaded(true);
				})
			);
	}, []);

	return (
		<div className='mycat-container'>
			<div className='mycat-sorting'>
				<select name='choice' className='sorting' onChange={sortHandler}>
					<option value='mycat' className='option'>
						내 고양이
					</option>
					<option value='adopted' className='option'>
						입양된 고양이
					</option>
					<option value='cat-star' className='option'>
						고양이 별
					</option>
				</select>
			</div>
			<Link to='/mycat/new'>
				<button className='new-cat-button'>새 고양이 등록</button>
			</Link>
			{(() => {
				switch (selectType) {
					case 'mycat':
						return <MyCat cats={myCats} />;
					case 'adopted':
						return (
							<div className='catCard-container'>
								{adoptedCats.map((cat) => (
									<MyLeftCat
										catId={cat.id}
										catName={cat.name}
										catImg={cat.image}
									/>
								))}
							</div>
						);
					case 'cat-star':
						return (
							<div className='catCard-container'>
								{catStar.map((cat) => (
									<MyLeftCat
										catId={cat.id}
										catName={cat.name}
										catImg={cat.image}
									/>
								))}
							</div>
						);

					default:
						return '잘못된 접근입니다.';
				}
			})()}
		</div>
	);
};

export default MyCatPage;
