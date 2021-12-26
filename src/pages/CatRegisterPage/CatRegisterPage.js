import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';
import CatLocationMap from 'components/CatRegister/CatLocationMap/CatLocationMap';
import CatRegisterForm from 'components/CatRegister/CatRegisterForm/CatRegisterForm';
import React, { useState } from 'react';
import './CatRegisterPage.scss';
import axiosInstance from 'api/customAxios';
import Modal from 'components/Common/Modal';
import CatMatch from 'components/CatRegister/CatMatch/CatMatch';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import CatMoreInfoForm from 'components/CatRegister/CatMoreInfoForm/CatMoreInfoForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImgUpload from 'components/Common/ImgUpload';
import MarkedCatFace from 'components/CatRegister/MarkedCatFace/MarkedCatFace';
import Spinner from 'components/Common/Spinner';

const CatRegisterPage = () => {
	SwiperCore.use([Navigation, Pagination]);

	// 새로 등록할 고양이 정보 - catInfo, catLoc, catImg, mainImg,
	const [catInfo, setCatInfo] = useState({
		name: '',
		gender: '',
		neutered: '',
		status: '',
		pattern: '',
	});
	const [catLoc, setCatLoc] = useState([]);
	const [catImg, setCatImg] = useState([]);
	const [mainImg, setMainImg] = useState([]);

	// AI 추천 이후 받을 점찍힌 이미지 및 랜드마크 좌표
	const [markedImg, setMarkedImg] = useState('');
	const [origImgUrl, setOrigImgUrl] = useState('');
	const [catMark, setCatMark] = useState({
		leftEyeX: 0,
		leftEyeY: 0,
		leftEarX: 0,
		leftEarY: 0,
		rightEyeX: 0,
		rightEyeY: 0,
		rightEarX: 0,
		rightEarY: 0,
	});
	// 추천된 동일고양이 리스트
	const [matchedCatList, setMatchedCatList] = useState([]);
	// 동일고양이 추천 모달을 보여줄지 여부
	const [showModal, setShowModal] = useState(false);
	// ai서버에서 랜드마크 찍혀서 온 이미지를 보여줄지 여부
	const [showMarkedCat, setShowMarkedCat] = useState(false);
	// 추천 중 일치하는 고양이가 없을때 추가정보 입력창을 보여줄지 여부
	const [moreInfo, setMoreInfo] = useState(false);

	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);
	const [loaded, setLoaded] = useState(false);

	const closeModal = () => {
		setShowModal(false);
	};

	// '등록하기' => 사진으로 동일고양이 추천 요청
	const handleSubmit = () => {
		if (mainImg.length === 0) {
			document.getElementById('message').innerText =
				'대표사진은 반드시 1장 업로드해주세요!';
		} else {
			if (!catInfo.neutered || !catInfo.gender || !catInfo.pattern) {
				document.getElementById('message').innerText =
					'모든 항목을 입력해주세요!';
			} else {
				if (catLoc.length === 0) {
					document.getElementById('message').innerText =
						'1곳 이상의 위치를 선택해주세요!';
				} else {
					// 메인이미지 1장 보내기
					const formData = new FormData();
					formData.append('image', mainImg[0]);
					setShowModal(true); // 추천모달 열기

					axiosInstance
						.post(`/user/${user.id}/cat/face-identify`, formData, {
							headers: { 'Content-Type': 'multipart/form-data' },
						})
						.then((res) => {
							// 딥러닝 결과로 랜드마크 점찍힌 이미지가 오면
							setMarkedImg(res.data.dstUrl); // 랜드마크 찍힌 이미지
							setOrigImgUrl(res.data.orgUrl);
							setCatMark(res.data.catPoint); // 랜드마크 좌표
							setShowMarkedCat(true); // 추천모달 내용 셋팅 (마크표시된 이미지 보여주기)
							setLoaded(true);
						});
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
			console.log(mainImg);
			console.log(catImg);
			console.log(catInfo);
			console.log(catLoc);
			console.log(catImg);

			const formData = new FormData();

			// 고양이 대표이미지
			formData.append('catMainImg', mainImg[0]);
			// 고양이 이미지 나머지
			console.log(catImg.length);
			if (catImg.length > 0) {
				for (let i = 0; i < catImg.length; i++) {
					formData.append('catImg', catImg[i]);
				}
			}
			// 고양이 위치
			formData.append(
				'catLoc',
				new Blob([JSON.stringify(catLoc)], { type: 'application/json' }) // 객체 추가하고 싶을때 blob 안에 JSON.stringfy 해서 넣어야 되는듯
			);
			// 고양이 기본정보들
			formData.append(
				'catInfo',
				new Blob([JSON.stringify(catInfo)], { type: 'application/json' })
			);
			// 사용자가 직접 찍은 고양이 랜드마크
			formData.append(
				'catPoints',
				new Blob([JSON.stringify(catMark)], { type: 'application/json' })
			);

			// 콘솔에 찍어보기
			for (let pair of formData.entries()) {
				console.log(pair[0] + ', ' + pair[1]);
			}

			// 새로운 고양이로 등록 요청
			axiosInstance
				.post(`/user/${user.id}/cat/selection/`, formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then((res) => {
					navigate('/mycat');
				});
		}
	};

	return !moreInfo ? (
		/** 처음에 보여지는 고양이 정보 입력 화면 */
		<div className='content-container'>
			<div className='input-label'>고양이 사진</div>
			<div className='cat-image-form'>
				<span className='cat-mainimg'>
					<div>
						<span style={{ color: 'red' }}>* </span>
						얼굴 정면이 잘 나온 대표사진
					</div>
					<ImgUpload img={mainImg} setImg={setMainImg} />
				</span>
				<span className='cat-imgs'>
					<div>추가 사진 (선택)</div>
					<CatImageUpload image={catImg} setImage={setCatImg} />
				</span>
			</div>
			<span className='cat-info-form'>
				<CatRegisterForm catInfo={catInfo} setCatInfo={setCatInfo} />
			</span>
			<span className='cat-map'>
				<CatLocationMap
					catLoc={[]}
					setCatLoc={[]}
					newCatLoc={catLoc}
					setNewCatLoc={setCatLoc}
				/>
			</span>
			<div id='message' className='warning-message'></div>
			<div className='button-box'>
				<button
					className='cancel-button'
					onClick={() => {
						navigate(-1);
					}}>
					취소하기
				</button>
				<button className='submit-button' onClick={handleSubmit}>
					등록하기
				</button>
			</div>

			{/* 동일고양이 추천프로세스 - 모달창 */}
			{showModal && (
				<Modal showModal={showModal} onClose={closeModal} maskClosable={true}>
					<div
						className='cat-register-modal'
						style={{ width: '800px', height: '600px', padding: '30px' }}>
						{loaded ? (
							showMarkedCat ? (
								// 랜드마크 잘찍혔는지 확인 => 이상할 경우 직접 다시 찍기
								<MarkedCatFace
									setShowMarkedCat={setShowMarkedCat}
									markedImg={markedImg}
									origImgUrl={origImgUrl}
									catMark={catMark}
									setCatMark={setCatMark}
									catInfo={catInfo}
									catLoc={catLoc}
									setMatchedCatList={setMatchedCatList}
									setMoreInfo={setMoreInfo}
								/>
							) : (
								// 추천된 동일고양이 리스트
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
							)
						) : (
							<Spinner /> // 로딩중
						)}
					</div>
				</Modal>
			)}
		</div>
	) : (
		/** 추천 중 동일 고양이 없음 - 새로운 고양이로 등록 */
		<div className='content-container'>
			<CatMoreInfoForm
				catInfo={catInfo}
				setCatInfo={setCatInfo}
				mainImg={mainImg}
				catLoc={catLoc}
			/>
			<div id='warning' className='warning-message'></div>
			<div className='button-box'>
				<button
					className='cancel-button'
					onClick={() => {
						navigate(-1);
					}}>
					취소하기
				</button>
				<button className='submit-button' onClick={handleSubmitNewCat}>
					새로운 고양이로 등록
				</button>
			</div>
		</div>
	);
};

export default CatRegisterPage;
