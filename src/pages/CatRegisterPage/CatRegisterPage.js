import axios from 'axios';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';
import CatLocationMap from 'components/CatRegister/CatLocationMap/CatLocationMap';
import CatRegisterForm from 'components/CatRegister/CatRegisterForm/CatRegisterForm';
import catApi from 'api/catApi';
import React, { useState } from 'react';
import './CatRegisterPage.scss';
import axiosInstance from 'api/customAxios';

const CatRegisterPage = () => {
	const [catInfo, setCatInfo] = useState({
		name: '',
		status: '',
		neutered: '',
		location: [],
	});
	const [catImg, setCatImg] = useState([]);

	const handleSubmit = () => {
		if (!catInfo.name || !catInfo.status || !catInfo.neutered) {
			document.getElementById('message').innerText =
				'모든 항목을 입력해주세요!';
		} else {
			if (catInfo.location.length === 0) {
				document.getElementById('message').innerText =
					'1곳 이상의 위치를 선택해주세요!';
			} else {
				const formData = new FormData();

				for (let i = 0; i < catImg.length; i++) {
					formData.append('catImg', catImg[i]);
				}
				formData.append(
					'catInfo',
					new Blob([JSON.stringify(catInfo)], { type: 'application/json' }) // 객체 추가하고 싶을때 걍 넣으면 안되고 굳이 blob 안에 JSON.stringfy 해서 넣어야 되는듯.. 왤까
				);

				for (let pair of formData.entries()) {
					console.log(pair[0] + ', ' + pair[1]);
				}

				// // 일반 axios
				// axios
				// 	.post('http://localhost/test', formData, {
				// 		headers: { 'Content-Type': 'multipart/form-data' },
				// 	})
				// 	.then((res) => {
				// 		console.log(res);
				// 	});

				// // custom axios만 사용 - 난 이게 나은거같음 ㅠㅠ
				axiosInstance.post('/test', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});

				// custom axios로 만든 api 모듈 사용
				// catApi.catRegister(formData);
			}
		}
	};

	return (
		<div className='content-container'>
			<div className='content-top'>
				<CatImageUpload catImg={catImg} setCatImg={setCatImg} />
				<CatRegisterForm catInfo={catInfo} setCatInfo={setCatInfo} />
			</div>
			<CatLocationMap catInfo={catInfo} setCatInfo={setCatInfo} />
			<div id='message'></div>
			<button onClick={handleSubmit}>등록하기</button>
		</div>
	);
};

export default CatRegisterPage;
