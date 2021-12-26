import React, { useState, useEffect } from 'react';
import CatLocationMap from 'components/CatRegister/CatLocationMap/CatLocationMap';
import axiosInstance from 'api/customAxios';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import CatImgUpdate from 'components/CatRegister/CatImgUpdate/CatImgUpdate';
import { useSelector } from 'react-redux';
import ImgUpload from 'components/Common/ImgUpload';
import CatUpdateForm from 'components/CatUpdate/CatUpdateForm';
import Modal from 'components/Common/Modal';
import CatFace from 'components/CatRegister/CatFace/CatFace';
import './CatUpdatePage.scss';
import Spinner from 'components/Common/Spinner';

const CatUpdatePage = () => {
	const { catId } = useParams();

	const [mainImg, setMainImg] = useState(''); // 메인 이미지
	const [newMainImg, setNewMainImg] = useState(''); // 새로운 메인 이미지
	const [catImg, setCatImg] = useState([]); // 기존 이미지
	const [addImg, setAddImg] = useState([]); // 추가된 이미지
	const [deleteImgURl, setDeleteImgUrl] = useState([]); // 삭제할 기존 이미지 url
	const [catInfo, setCatInfo] = useState([]);
	const [catLoc, setCatLoc] = useState([]); // 기존 고양이 위치
	const [newCatLoc, setNewCatLoc] = useState([]); // 추가된 고양이 위치

	const [showModal, setShowModal] = useState(false);
	const [markedImg, setMarkedImg] = useState([]);
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

	const [loaded, setLoaded] = useState(false);
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const [checkMark, setCheckMark] = useState(false);

	const closeModal = () => {
		setShowModal(false);
	};

	// 기존 정보 불러오기
	useEffect(() => {
		axiosInstance.get(`/user/${user.id}/cat/${catId}/past-info`).then((res) => {
			setCatInfo(res.data);
			setMainImg(res.data.mainImage);
			setCatImg(res.data.userUploadImages);
			setCatLoc(res.data.catLocations);

			setLoaded(true);
		});
	}, []);

	const handleChange = (e) => {
		setCatInfo({ ...catInfo, [e.target.name]: e.target.value });
	};

	const submitCatInfo = () => {
		if (newMainImg.length > 0 && !checkMark) {
			// 메인이미지를 수정했다면
			setShowModal(true);
			setMarkedImg(URL.createObjectURL(newMainImg[0]));
		} else {
			handleSubmit();
		}
	};
	const submitMark = () => {
		if (
			document.getElementById('catface-description').innerText !== '완성!😻'
		) {
			document.getElementById('warning-message').innerText =
				'안내에 따라 마크 4개를 모두 찍어주세요!';
		} else {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		console.log(catInfo);
		console.log(newCatLoc);
		console.log(newMainImg);
		console.log(addImg);
		console.log(deleteImgURl);
		console.log(catMark);

		const formData = new FormData();

		// 고양이 정보들
		formData.append(
			'catInfo',
			new Blob([JSON.stringify(catInfo)], { type: 'application/json' })
		);
		// 고양이 추가된 위치
		formData.append(
			'catLoc',
			new Blob([JSON.stringify(newCatLoc)], { type: 'application/json' }) // 객체 추가하고 싶을때 blob 안에 JSON.stringfy 해서 넣어야 되는듯
		);
		//메인이미지
		if (newMainImg[0]) {
			formData.append('catMainImg', newMainImg[0]);
		}
		// 추가한 이미지
		for (let i = 0; i < addImg.length; i++) {
			formData.append('catImg', addImg[i]);
		}
		//삭제된 이미지 url 더하기
		for (let i = 0; i < deleteImgURl.length; i++) {
			formData.append(
				'deletedImgUrl',
				new Blob([JSON.stringify(deleteImgURl)], {
					type: 'application/json',
				})
			);
		}
		// 고양이 얼굴 랜드마크 좌표
		formData.append(
			'catPoints',
			new Blob([JSON.stringify(catMark)], { type: 'application/json' }) // 객체 추가하고 싶을때 blob 안에 JSON.stringfy 해서 넣어야 되는듯
		);

		// 콘솔에 찍어보기
		for (let pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}

		axiosInstance
			.post(`/user/${user.id}/cat/${catId}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((res) => {
				navigate(`/mycat/${catId}`);
			});
	};

	return loaded ? (
		<div className='content-container'>
			<div className='input-label'>고양이 사진</div>
			<div className='cat-image-form'>
				<span className='cat-mainimg'>
					<div>
						<span style={{ color: 'red' }}>* </span>
						얼굴 정면이 잘 나온 대표사진
					</div>
					<ImgUpload
						pastImg={mainImg}
						img={newMainImg}
						setImg={setNewMainImg}
					/>
				</span>
				<span className='cat-imgs'>
					<div>추가 사진 (선택)</div>
					<CatImgUpdate
						catImg={catImg}
						setCatImg={setCatImg}
						deleteImgURl={deleteImgURl}
						setDeleteImgUrl={setDeleteImgUrl}
						addImg={addImg}
						setAddImg={setAddImg}
					/>
				</span>
			</div>
			<span className='cat-name-form'>
				<div className='cat-info-form-inner'>
					<div className='input-label'>이름</div>
					<input
						className='input-text'
						type='text'
						placeholder={catInfo.name}
						name='name'
						onBlur={handleChange}
					/>
				</div>
			</span>
			<span className='cat-info-form'>
				<CatUpdateForm
					catInfo={catInfo}
					setCatInfo={setCatInfo}
					gender={catInfo.gender}
					neutered={catInfo.neutered}
				/>
			</span>
			<span className='cat-map'>
				<CatLocationMap
					catLoc={catLoc}
					setCatLoc={setCatLoc}
					newCatLoc={newCatLoc}
					setNewCatLoc={setNewCatLoc}
				/>
			</span>
			<div id='message' className='warning-message'></div>
			<div className='button-box'>
				<button className='cancel-button' onClick={() => navigate(-1)}>
					취소하기
				</button>
				<button className='submit-button' onClick={submitCatInfo}>
					수정하기
				</button>
			</div>

			{showModal && (
				<Modal showModal={showModal} onClose={closeModal} maskClosable={true}>
					<div
						style={{
							width: '800px',
							height: '650px',
							padding: '30px',
							textAlign: 'center',
						}}>
						<div>
							<div className='mark-request-message'>
								새로 업로드한 얼굴 사진에 마커를 등록해주세요! <br />
								사진 유사도를 기준으로 [{catInfo.name}]을(를) 함께 돌보는 이웃을
								찾아드려요.
							</div>
							<CatFace
								markedImg={markedImg}
								catMark={catMark}
								setCatMark={setCatMark}
							/>
						</div>
						<button className='mark-submit-button' onClick={submitMark}>
							마커 등록 완료
						</button>
					</div>
				</Modal>
			)}
		</div>
	) : (
		<Spinner />
	);
};

export default CatUpdatePage;
