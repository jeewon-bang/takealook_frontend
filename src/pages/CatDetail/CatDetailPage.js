/* global kakao */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CatCare from 'components/CatDetail/CatCare/CatCare';
import CatInfo from 'components/CatDetail/CatInfo/CatInfo';
import './CatDetailPage.scss';
import { Link } from 'react-router-dom';
import axiosInstance from 'api/customAxios';
import axios from 'axios';
import CatMarkerMap from 'components/Common/CatMarkerMap';
import { useNavigate } from 'react-router';
import Modal from 'components/Common/Modal';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import CatMatch from 'components/CatRegister/CatMatch/CatMatch';
import CatMoreInfoForm from 'components/CatRegister/CatMoreInfoForm/CatMoreInfoForm';
import { useSelector } from 'react-redux';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';
import ImgUpload from 'components/Common/ImgUpload';
import CatLocationMap from 'components/CatRegister/CatLocationMap/CatLocationMap';
import MarkedCatFace from 'components/CatRegister/MarkedCatFace/MarkedCatFace';
import Spinner from 'components/Common/Spinner';
import CatRegisterForm from 'components/CatRegister/CatRegisterForm/CatRegisterForm';

const CatDetailPage = () => {
	const { catId } = useParams();
	const [catInfo, setCatInfo] = useState(''); // 상세조회할 고양이 정보
	const [catLoc, setCatLoc] = useState([]); // 상세조회할 고양이 최근위치
	const [catImg, setCatImg] = useState([]); // 상세조회할 고양이 이미지들
	const [careHistory, setCareHistory] = useState([]); // 상세조회할 고양이 돌봄이력들
	const [loaded, setLoaded] = useState(false); // 상세조회할 고양이 정보들이 다 받아졌는지 여부

	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();

	// 다른고양이로 등록하려고 할때 보여줄 화면
	const [showAnotherCatPage, setShowAnotherCatPage] = useState(false);
	// 다른고양이로 등록할때 새로 입력할 정보
	const [newCatInfo, setNewCatInfo] = useState({
		name: '',
		gender: '',
		neutered: '',
		status: '',
		pattern: '',
	});
	const [newCatLoc, setNewCatLoc] = useState([]);
	const [newCatMainImg, setNewCatMainImg] = useState('');
	const [newCatImg, setNewCatImg] = useState([]);

	// 동일고양이 추천 모달을 보여줄지 여부
	const [showModal, setShowModal] = useState(false);

	// AI 추천 로딩 완료여부
	const [AILoaded, setAILoaded] = useState(false);
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

	// ai서버에서 랜드마크 찍혀서 온 이미지를 보여줄지 여부
	const [showMarkedCat, setShowMarkedCat] = useState(false);
	// 추천된 동일고양이 리스트
	const [matchedCatList, setMatchedCatList] = useState([]);
	// 추천 중 일치하는 고양이가 없을때 추가정보 입력창을 보여줄지 여부
	const [moreInfo, setMoreInfo] = useState(false);

	useEffect(() => {
		console.log('CatDetailPage');
		axios
			.all([
				axiosInstance.get(`/user/${user.id}/cat/${catId}`),
				axiosInstance.get(`/user/${user.id}/cat/${catId}/images`),
				axiosInstance.get(`/user/${user.id}/cat/${catId}/locations`),
				axiosInstance.get(`/user/${user.id}/cat/${catId}/48hours-catcares`),
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

	// 내 도감에서 삭제
	const deleteMyCat = () => {
		alert('삭제한 고양이는 복구할 수 없습니다. 정말 삭제하시겠습니까?');
		axiosInstance
			.patch(`user/${user.id}/cat/${catId}/selection/soft-delete`)
			.then((res) => {
				navigate('/mycat');
			});
	};

	// 다른고양이로 등록 - 사진입력후 동일고양이 재추천하는 모달 열기
	// '등록하기' => 사진으로 동일고양이 추천 요청
	const requestCatMatch = () => {
		console.log(newCatInfo);
		console.log(newCatMainImg);
		console.log(newCatImg);
		console.log(newCatLoc);
		if (newCatMainImg.length === 0) {
			document.getElementById('message').innerText =
				'대표사진은 반드시 1장 업로드해주세요!';
		} else {
			if (!newCatInfo.neutered || !newCatInfo.gender || !newCatInfo.pattern) {
				document.getElementById('message').innerText =
					'모든 항목을 입력해주세요!';
			} else {
				if (newCatLoc.length === 0) {
					document.getElementById('message').innerText =
						'1곳 이상의 위치를 선택해주세요!';
				} else {
					// 메인이미지 1장 보내기
					const formData = new FormData();
					formData.append('image', newCatMainImg[0]);
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
	const closeModal = () => {
		setShowModal(false);
	};

	// 새로운 고양이로 등록 - 추천중에 동일고양이 없어서 새로운 고양이로 등록
	const handleSubmitNewCat = () => {
		console.log(newCatInfo);
		console.log(newCatMainImg);
		console.log(newCatImg);
		console.log(newCatLoc);
		console.log(catMark);

		if (!newCatInfo.name || !newCatInfo.status) {
			document.getElementById('warning').innerText =
				'모든 항목을 입력해주세요!';
		} else {
			document.getElementById('warning').innerText = '';
			const formData = new FormData();

			// 고양이 대표이미지
			formData.append('catMainImg', newCatMainImg[0]);
			// 고양이 이미지 나머지
			if (newCatImg.length > 0) {
				for (let i = 0; i < newCatImg.length; i++) {
					formData.append('catImg', newCatImg[i]);
				}
			}
			// 고양이 위치
			formData.append(
				'catLoc',
				new Blob([JSON.stringify(newCatLoc)], { type: 'application/json' }) // 객체 추가하고 싶을때 blob 안에 JSON.stringfy 해서 넣어야 되는듯
			);
			// 고양이 기본정보들
			formData.append(
				'catInfo',
				new Blob([JSON.stringify(newCatInfo)], { type: 'application/json' })
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

			axiosInstance
				.post(`/user/${user.id}/cat/${catId}/selection/new`, formData, {
					headers: { 'Content-Type': 'application/json' },
				})
				.then((res) => {
					navigate('/mycat');
				});
		}
	};

	return loaded ? (
		/** 기본적으로 처음에 보여지는 고양이 상세페이지 화면 */
		!showAnotherCatPage ? (
			<div className='content-container'>
				<CatInfo
					catId={catId}
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

				<div className='title'>최근 48시간의 돌봄 기록</div>
				<CatCare
					catId={catId}
					careHistory={careHistory}
					setCareHistory={setCareHistory}
				/>

				<div className='cat-info-button-box'>
					<Link to={`/mycat/${catId}/update`}>
						<button className='cat-update-button'>고양이 정보 수정</button>
					</Link>
					<button className='cat-delete-button' onClick={deleteMyCat}>
						내 도감에서 삭제
					</button>
				</div>
				<div className='cat-other-button-box'>
					<span>돌보는 고양이가 [{catInfo.name}] 이(가) 아닌 것 같으세요?</span>
					<br />
					<button
						className='cat-other-button'
						onClick={() => {
							setShowAnotherCatPage(true);
							window.scrollTo({
								top: 0,
								left: 0,
							});
						}}>
						다른 고양이로 등록
					</button>
				</div>
			</div>
		) : /** 다른 고양이 버튼 누르면 바뀔 화면 - 고양이 정보 재입력 */
		!moreInfo ? (
			<div className='content-container'>
				{/* 고양이 성별, 패턴, 중성화여부 수정받기 */}
				<div className='cat-info-form-inner'>
					<div className='new-cat-message'>
						돌보던 고양이가 [{catInfo.name}] 이(가) 아닌 것 같다면 새로운
						고양이로 등록해주세요!{' '}
					</div>
					<div className='input-label'>고양이 사진</div>
					<div className='cat-image-form'>
						<span className='cat-mainimg'>
							<div>
								<span style={{ color: 'red' }}>* </span>
								얼굴 정면이 잘 나온 대표사진
							</div>
							<ImgUpload img={newCatMainImg} setImg={setNewCatMainImg} />
						</span>
						<span className='cat-imgs'>
							<div>추가 사진 (선택)</div>
							<CatImageUpload image={newCatImg} setImage={setNewCatImg} />
						</span>
					</div>
					<CatRegisterForm catInfo={newCatInfo} setCatInfo={setNewCatInfo} />
					<CatLocationMap
						catLoc={[]}
						setCatLoc={[]}
						newCatLoc={newCatLoc}
						setNewCatLoc={setNewCatLoc}
					/>
					<div id='message'></div>
					<div className='othercat-submit-button-box'>
						<button
							className='othercat-cancel-button'
							onClick={() => {
								navigate(`/mycat/${catInfo.id}`);
							}}>
							취소하기
						</button>
						<button
							className='othercat-submit-button'
							onClick={requestCatMatch}>
							등록하기
						</button>
					</div>
				</div>
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
										catInfo={newCatInfo}
										catLoc={newCatLoc}
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
			// 추천 중 동일고양이 없음 - 새로운 고양이로 등록시 추가정보 입력
			<div className='content-container'>
				<CatMoreInfoForm
					catInfo={newCatInfo}
					setCatInfo={setNewCatInfo}
					mainImg={newCatMainImg}
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
		)
	) : (
		<Spinner />
	);
};

export default CatDetailPage;
