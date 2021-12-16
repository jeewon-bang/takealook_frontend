import axios from 'axios';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';
import CatLocationMap from 'components/CatRegister/CatLocationMap/CatLocationMap';
import CatRegisterForm from 'components/CatRegister/CatRegisterForm/CatRegisterForm';
import React, { useState } from 'react';
import './CatRegisterPage.scss';
import axiosInstance from 'api/customAxios';
import Modal from 'components/Common/Modal';
import CatMatch from 'components/CatRegister/CatMatch/CatMatch';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import CatMoreInfoForm from 'components/CatRegister/CatMoreInfoForm/CatMoreInfoForm';
import { useNavigate } from 'react-router-dom';
import { setDefaultLocale } from 'react-datepicker';

let matchedCatData = [
	{
		id: 1,
		name: '보리',
		gender: 0,
		neutered: 1,
		pattern: 1,
		locations: [
			{
				latitude: 37.54511236317026,
				longitude: 126.86184575808647,
			},
		],
	},
	{
		id: 2,
		name: '부비',
		gender: 0,
		neutered: 1,
		pattern: 1,
		locations: [
			{
				latitude: 37.54732777835966,
				longitude: 126.8609590137254,
			},
		],
	},
];

const CatRegisterPage = () => {
	// 새로 등록할 고양이 정보
	const [catInfo, setCatInfo] = useState({
		name: '',
		gender: '',
		neutered: '',
		status: '',
		pattern: '',
	});
	const [catLoc, setCatLoc] = useState([]);
	const [catImg, setCatImg] = useState([]);

	// 새로 등록할 고양이와 매칭될 기존 고양이들 리스트
	const [matchedCatList, setMatchedCatList] = useState(matchedCatData);
	// 동일고양이 추천 모달을 보여줄지 여부
	const [showModal, setShowModal] = useState(false);
	// 일치하는 고양이가 없을때 추가정보 입력창을 보여줄지 여부
	const [moreInfo, setMoreInfo] = useState(false);

	const navigate = useNavigate();

	const closeModal = () => {
		setShowModal(false);
	};

	const handleSubmit = () => {
		console.log(catImg); // fileList 객체타입
		console.log(catInfo);
		console.log(catLoc); // 기본 array 타입

		if (catImg.length === 0) {
			document.getElementById('message').innerText =
				'최소 1장 이상의 사진을 업로드해 주세요!';
		} else {
			if (!catInfo.neutered || !catInfo.gender || !catInfo.pattern) {
				document.getElementById('message').innerText =
					'모든 항목을 입력해주세요!';
			} else {
				if (catLoc.length === 0) {
					document.getElementById('message').innerText =
						'1곳 이상의 위치를 선택해주세요!';
				} else {
					document.getElementById('message').innerText = '';
					// 동일 추정 고양이 모달 팝업
					setShowModal(true);
				}
			}
		}
	};

	// 다른고양이로 등록 - 추천중에 동일고양이 없어서 새로운 고양이로 등록
	const handleSubmitNewCat = () => {
		if (!catInfo.name || !catInfo.status) {
			document.getElementById('warning').innerText =
				'모든 항목을 입력해주세요!';
		} else {
			document.getElementById('warning').innerText = '';

			console.log(catInfo);
			console.log(catImg);

			const formData = new FormData();

			// 고양이 대표이미지
			formData.append('catMainImg', catImg[0]);
			// 고양이 이미지 나머지
			if (catImg.length > 1) {
				for (let i = 1; i < catImg.length; i++) {
					formData.append('catImg', catImg[i]);
				}
			}
			// 고양이 위치
			formData.append(
				'catLoc',
				new Blob([JSON.stringify(catLoc)], { type: 'application/json' }) // 객체 추가하고 싶을때 blob 안에 JSON.stringfy 해서 넣어야 되는듯
			);
			// 고양이 정보들
			formData.append(
				'catInfo',
				new Blob([JSON.stringify(catInfo)], { type: 'application/json' })
			);

			// 콘솔에 찍어보기
			for (let pair of formData.entries()) {
				console.log(pair[0] + ', ' + pair[1]);
			}

			const response = axiosInstance.post(`/user/1/cat/selection/`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			navigate('/mycat'); // ?????? 되나?
		}
	};

	return !moreInfo ? (
		<div className='content-container'>
			<span className='cat-img-form'>
				<CatImageUpload image={catImg} setImage={setCatImg} />
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
					<div style={{ width: '800px' }}>
						<Swiper
							slidesPerView={1}
							navigation
							pagination={{ clickable: true }}>
							{matchedCatList.map((matchedCat) => (
								<SwiperSlide>
									<CatMatch
										catId={matchedCat.id}
										moreInfo={moreInfo}
										setMoreInfo={setMoreInfo}
										matchedCat={matchedCat}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</Modal>
			)}
		</div>
	) : (
		<div className='content-container'>
			<CatMoreInfoForm
				catInfo={catInfo}
				setCatInfo={setCatInfo}
				catImg={catImg}
				catLoc={catLoc}
			/>
			<div id='warning'></div>
			<button className='submit-button' onClick={handleSubmitNewCat}>
				새로운 고양이로 등록
			</button>
		</div>
	);
};

export default CatRegisterPage;
