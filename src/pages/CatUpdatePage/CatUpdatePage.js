import React, { useState, useEffect } from 'react';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';
import CatRegisterForm from 'components/CatRegister/CatRegisterForm/CatRegisterForm';
import CatLocationMap from 'components/CatRegister/CatLocationMap/CatLocationMap';
import axios from 'axios';
import axiosInstance from 'api/customAxios';
import { useParams } from 'react-router';

const CatUpdatePage = () => {
	const { catId } = useParams();
	// 기존 정보들
	const [catInfo, setCatInfo] = useState('');
	const [catLoc, setCatLoc] = useState([]);
	const [catImg, setCatImg] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const handleSubmit = () => {
		console.log(catImg);
		console.log(catLoc);
	};

	useEffect(() => {
		axios
			.all([
				axiosInstance.get(`/user/1/cat/${catId}`),
				axiosInstance.get(`/user/1/cat/${catId}/images`),
				axiosInstance.get(`/user/1/cat/${catId}/locations`),
			])
			.then(
				axios.spread((catInfoRes, catImgRes, catLocRes) => {
					console.log(catInfoRes.data);
					console.log(catImgRes.data);
					setCatInfo(catInfoRes.data);
					setCatImg(catImgRes.data);
					setCatLoc(catLocRes.data);
					setLoaded(true);
				})
			);
	}, []);

	return loaded ? (
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
		</div>
	) : (
		<div>로딩중</div>
	);
};

export default CatUpdatePage;
