import axios from 'axios';
import MyCat from 'components/MyCat/MyCat';
import React, { useState, useEffect } from 'react';

let myCatData = {
	id: 1,
	name: '보리',
	status: 0,
	care: [
		{
			userName: '',
			userImage: '',
			type: '',
			message: '',
		},
	],
};

let catData = [
	{
		id: 1,
		image: require('images/bori2.jpg'),
		name: '보리',
		catCare: [
			{
				id: 1,
				user: '혜민',
				userImg: '',
				time: '2021-11-10 12:40:33',
				type: '사료 급여',
				message: '사료 바꿨어요!',
			},

			{
				id: 2,
				user: '지원',
				userImg: '',
				time: '2021-11-29 22:24:10',
				type: '약 급여',
				message: '',
			},
			{
				id: 3,
				user: '세은',
				userImg: '',
				time: '2021-11-30 10:55:00',
				type: '치료',
				message: '구내염 처방받으러 병원갔다왔어요ㅠㅠ',
			},
		],
	},
	{
		id: 2,
		image: require('images/ritae1.jpg'),
		name: '리태',
		catCare: [
			{
				id: 1,
				user: '지혜',
				userImg: '',
				time: '2021-11-10 12:40:33',
				type: '사료 급여',
				message: '사료 바꿨어요!',
			},

			{
				id: 2,
				user: '형림',
				userImg: '',
				time: '2021-11-29 22:24:10',
				type: '약 급여',
				message: '',
			},
			{
				id: 3,
				user: '세은',
				userImg: '',
				time: '2021-11-30 10:55:00',
				type: '치료',
				message: '구내염 처방받으러 병원갔다왔어요ㅠㅠ',
			},
		],
	},
	{
		id: 3,
		image: require('images/yulmu2.jpg'),
		name: '율무',
		catCare: [
			{
				id: 1,
				user: '지수',
				userImg: '',
				time: '2021-11-10 12:40:33',
				type: '사료 급여',
				message: '사료 바꿨어요!',
			},

			{
				id: 2,
				user: '지원',
				userImg: '',
				time: '2021-11-29 22:24:10',
				type: '약 급여',
				message: '',
			},
			{
				id: 3,
				user: '지혜',
				userImg: '',
				time: '2021-11-30 10:55:00',
				type: '치료',
				message: '구내염 처방받으러 병원갔다왔어요ㅠㅠ',
			},
		],
	},
];

const MyCatPage = () => {
	// useEffect(() => {
	//   // data : {status: true, cats: sadklfjaskldf}
	//   const { data } = axios.post('http://192.168.0.10:5414/list');
	//   if (data.status) {
	//     setCats(data);
	//   } else {
	//     // 에러 처리하는곳
	//   }
	// }, []);

	const [cats, setCats] = useState(catData);

	return (
		<div className='content-container'>
			<MyCat cats={cats} setCats={setCats} />
		</div>
	);
};

export default MyCatPage;
