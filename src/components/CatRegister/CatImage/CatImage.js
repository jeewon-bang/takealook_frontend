import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const CatImage = (props) => {
	// const { imgs, setImgs } = props;
	// // const [imgs, setImgs] = useState([]);
	// const imgInput = useRef();

	// const handleClick = () => {
	// 	imgInput.current.click(); // imgInput이라는 ref가 걸린 대상(= input type='file')이 클릭되도록 한다
	// };
	// const handleChange = (e) => {
	// 	const formData = new FormData();
	// 	formData.append('imgs', e.target.files);
	// 	setImgs([...formData]);
	// };

	// return (
	// 	<div>
	// 		<input
	// 			ref={imgInput}
	// 			className='catImg'
	// 			type='file'
	// 			multiple
	// 			accept='image/*'
	// 			name='file'
	// 			style={{ display: 'none' }}
	// 			onChange={handleChange}
	// 		/>
	// 		<div className='img-preview'></div>
	// 		<button className='img-upload-btn' onClick={handleClick}>
	// 			사진 등록
	// 		</button>
	// 	</div>
	// );

	const [img, setImg] = useState([]);
	const [imgBase64, setImgBase64] = useState([]);
	const [imgUrl, setImgUrl] = useState([]);
	const { values, setValues, data, setData } = props;
	const imgInput = useRef();

	const handleClick = () => {
		imgInput.current.click(); // imgInput이라는 ref가 걸린 대상(= input type='file')이 클릭되도록 한다
	};

	const handleChange = (e) => {
		setImg(e.target.files);
		for (let i = 0; i < e.target.files.length; i++) {
			if (e.target.files[i]) {
				let reader = new FileReader();
				reader.readAsDataURL(e.target.files[i]);
				reader.onloadend = () => {
					const base64 = reader.result;
					if (base64) {
						setImgBase64((imgBase64) => [...imgBase64, base64.toString()]);
					}
				};

				const url = URL.createObjectURL(e.target.files[i]); // 미리보기용 url
				setImgUrl((imgUrl) => [...imgUrl, url]);
			}
		}
	};

	useEffect(() => {
		// =============================
		const formData = new FormData();
		formData.append('img', img);
		// formData.append(
		// 	'values',
		// 	new Blob([JSON.stringify(values)], { type: 'application/json' })
		// );
		setData(formData);
	}, [imgBase64]);

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
