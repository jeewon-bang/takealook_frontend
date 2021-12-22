import React, { useState, useEffect } from 'react';
import CatLocationMap from 'components/CatRegister/CatLocationMap/CatLocationMap';
import axiosInstance from 'api/customAxios';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import CatImgUpdate from 'components/CatRegister/CatImgUpdate/CatImgUpdate';
import { useSelector } from 'react-redux';
import ImgUpload from 'components/Common/ImgUpload';
import CatUpdateForm from 'components/CatUpdate/CatUpdateForm';

const CatUpdatePage = () => {
	const { catId } = useParams();

	const [deleteImgURl, setDeleteImgUrl] = useState([]); // 삭제할 기존 이미지 url

	const [mainImg, setMainImg] = useState(''); // 메인 이미지
	const [newMainImg, setNewMainImg] = useState(''); // 새로운 메인 이미지
	const [catImg, setCatImg] = useState([]); // 기존 이미지
	const [addImg, setAddImg] = useState([]); // 추가된 이미지
	const [catInfo, setCatInfo] = useState([]);
	const [catLoc, setCatLoc] = useState([]); // 기존 고양이 위치
	const [newCatLoc, setNewCatLoc] = useState([]); // 추가된 고양이 위치

	const [loaded, setLoaded] = useState(false);

	const user = useSelector((state) => state.auth.user);

	const navigate = useNavigate();

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

	const handleSubmit = () => {
		console.log(catInfo);
		console.log(newMainImg);
		console.log(addImg);
		console.log(newCatLoc);

		const formData = new FormData();

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
				new Blob([JSON.stringify(deleteImgURl)], { type: 'application/json' })
			);
		}

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
			<span className='cat-mainImg-form'>
				<div style={{ fontWeight: '800' }} className='input-label'>
					고양이 사진
				</div>
				<ImgUpload pastImg={mainImg} img={newMainImg} setImg={setNewMainImg} />
			</span>
			<span className='cat-img-form'>
				<CatImgUpdate
					catImg={catImg}
					setCatImg={setCatImg}
					deleteImgURl={deleteImgURl}
					setDeleteImgUrl={setDeleteImgUrl}
					addImg={addImg}
					setAddImg={setAddImg}
				/>
			</span>
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
				<button className='submit-button' onClick={handleSubmit}>
					수정하기
				</button>
			</div>
		</div>
	) : (
		<div>로딩중</div>
	);
};

export default CatUpdatePage;
