import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const CatImage = (props) => {
	const { catImg, setCatImg } = props;
	const imgInput = useRef();

	const handleClick = () => {
		imgInput.current.click(); // imgInput이라는 ref가 걸린 대상(= input type='file')이 클릭되도록 한다
	};

	const handleChange = (e) => {
		setCatImg(e.target.files);
	};

	return (
		<div>
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
			<div className='img-preview'></div>
			<button className='img-upload-btn' onClick={handleClick}>
				사진 등록
			</button>
		</div>
	);
};

export default CatImage;
