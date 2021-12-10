import axios from 'axios';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';
import CatLocationMap from 'components/CatRegister/CatLocationMap/CatLocationMap';
import CatRegisterForm from 'components/CatRegister/CatRegisterForm/CatRegisterForm';
import catApi from 'api/catApi';
import React, { useState } from 'react';
import './CatRegisterPage.scss';
import axiosInstance from 'api/customAxios';
import Modal from 'components/common/Modal';
import CatMatch from 'components/CatRegister/CatMatch/CatMatch';

const CatRegisterPage = () => {
	const [catInfo, setCatInfo] = useState({
		name: '',
		gender: '',
		neutered: '',
		status: '',
		pattern: '',
	});
	const [catLoc, setCatLoc] = useState([]);
	const [catImg, setCatImg] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const closeModal = () => {
		setShowModal(false);
	};

	const handleSubmit = () => {
		console.log('부모컴포넌트로 데이터 잘 전달됐는지 확인');
		console.log(catImg); // fileList 객체타입
		console.log(catInfo);
		console.log(catLoc); // 기본 array 타입
		console.log(catImg.constructor);
		console.log(catLoc.constructor);

		if (!catInfo.neutered || !catInfo.gender || !catInfo.pattern) {
			document.getElementById('message').innerText =
				'모든 항목을 입력해주세요!';
		} else {
			if (catLoc.length === 0) {
				document.getElementById('message').innerText =
					'1곳 이상의 위치를 선택해주세요!';
			} else {
				// 	const formData = new FormData();
				// 	for (let i = 0; i < catImg.length; i++) {
				// 		formData.append('catImg', catImg[i]);
				// 	}
				// 	formData.append(
				// 		'catLoc',
				// 		new Blob([JSON.stringify(catLoc)], { type: 'application/json' }) // 객체 추가하고 싶을때 blob 안에 JSON.stringfy 해서 넣어야 되는듯
				// 	);
				// 	formData.append(
				// 		'catInfo',
				// 		new Blob([JSON.stringify(catInfo)], { type: 'application/json' })
				// 	);
				// 	formData.append(
				// 		'catStatus',
				// 		new Blob([JSON.stringify(catStatus)], { type: 'application/json' })
				// 	);
				// 	// 콘솔에 찍어보기
				// 	for (let pair of formData.entries()) {
				// 		console.log(pair[0] + ', ' + pair[1]);
				// 	}
				// 	axiosInstance.post('/user/1/cat', formData, {
				// 		headers: { 'Content-Type': 'multipart/form-data' },
				// 	});

				document.getElementById('message').innerText = '';
				// 동일 추정 고양이 모달 팝업
				setShowModal(true);
			}
		}
	};

	return (
		<div className='content-container'>
			<span className='cat-img-form'>
				<CatImageUpload catImg={catImg} setCatImg={setCatImg} />
			</span>
			<span className='cat-info-form'>
				<CatRegisterForm catInfo={catInfo} setCatInfo={setCatInfo} />
			</span>
			<span className='cat-map'>
				<CatLocationMap catLoc={catLoc} setCatLoc={setCatLoc} />
			</span>

			<div id='message' className='warning-message'></div>
			<div className='button-box'>
				<button className='cancel-button'>취소하기</button>
				<button className='submit-button' onClick={handleSubmit}>
					등록하기
				</button>
			</div>
			{showModal && (
				<Modal showModal={showModal} onClose={closeModal} maskClosable={true}>
					<CatMatch
						catInfo={catInfo}
						setCatInfo={setCatInfo}
						onClose={closeModal}
					/>
				</Modal>
			)}
		</div>
	);
};

export default CatRegisterPage;
