import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './CatImageUpload.scss';

const CatImage = (props) => {
	const { catImg, setCatImg } = props;
	const imgInput = useRef();

	const handleClick = () => {
		imgInput.current.click(); // imgInput이라는 ref가 걸린 대상(= input type='file')이 클릭되도록 한다
	};

	const preview = useRef();

	//   const [imgBase64, setImgBase64] = useState('');
	const handleChange = (e) => {
		console.log(e);
		console.log(e.target.files[0]);

		let reader = new FileReader();

		reader.onloadend = () => {
			// 읽기가 완료되면 이 코드가 실행
			const base64 = reader.result; //reader.result는 이미지를 인코딩(base64->이미지를 text인코딩)한 결과값이 나옴
			if (base64) {
				setCatImg(base64.toString()); //파일 base64 상태 없데이트
			}
			//   const imgEL = document.getElementById('img-preview');
			//   imgEL.style.backgroundImage = `url(${imgBase64})`;

			preview.current.style.backgroundImage = `url(${catImg})`;
			console.log(preview.current);
		};

		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]); //파일을 읽어 버퍼에 저장. 저장후 onloadend트리거
			setCatImg(e.target.files); //파일 상태 업데이트 업로드하는 것은 파일이기 때문에 관리가 필요

			console.log('여기까지 왔니');
		}
	};

	return (
		<div className='cat-img-upload-box'>
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
			<div className='img-preview' ref={preview}></div>
		</div>
	);
};

export default CatImage;
