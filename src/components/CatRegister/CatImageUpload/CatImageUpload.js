import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './CatImageUpload.scss';

const CatImage = (props) => {
	const { catImg, setCatImg } = props;
	const imgInput = useRef();
	const [prevImgUrl, setPrevImgUrl] = useState([]);

	const handleClick = () => {
		imgInput.current.click(); // imgInput이라는 ref가 걸린 대상(= input type='file')이 클릭되도록 한다
	};
	const handleChange = (e) => {
		setCatImg(e.target.files); // 업로드한 이미지들을 catImg에 저장
	};
	const preview = () => {
		if (catImg.length === 0) {
			return false;
		}
		const imgEl = document.querySelector('.img-preview');
		// const reader = new FileReader();
		// reader.onload = () => {
		// 	setPrevImgUrl(reader.result);
		// };
		for (let i = 0; i < catImg.length; i++) {
			// reader.readAsDataURL(catImg[i]);
			const nowImgUrl = URL.createObjectURL(catImg[i]);
			// prevImgUrl.push(nowImgUrl);
			let prevImg = document.createElement('img');
			prevImg.classList.add('img-preview');
			prevImg.src = nowImgUrl;

			document.querySelector('.cat-img-upload-box').appendChild(prevImg);
		}
	};

	useEffect(() => {
		preview();
		return () => preview();
	});

	return (
		<div className='cat-img-upload-box'>
			{/* {prevImgUrl.map((v) => (
				<img
					src={v}
					style={{ width: '200px', height: '200px' }}
					alt='preview'
				/>
			))} */}
			<input
				ref={imgInput}
				className='catImg'
				type='file'
				multiple
				accept='image/*'
				name='file'
				style={{ display: 'none' }}
				onChange={handleChange}
			/>
			<button className='img-upload-button' onClick={handleClick}>
				사진 등록
			</button>
			{/* <div className='img-preview' ref={preview}></div> */}
		</div>
	);
};

export default CatImage;
