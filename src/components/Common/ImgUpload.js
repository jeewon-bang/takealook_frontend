import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ImgUpload = (props) => {
	const { pastImg, img, setImg } = props;
	const [fileUrl, setFileUrl] = useState('');

	const imgInput = useRef();
	const handleClick = () => {
		imgInput.current.click(); // imgInput이라는 ref가 걸린 대상(= input type='file')이 클릭되도록 한다
	};

	const processImage = (e) => {
		setImg(e.target.files);
		const imageFile = e.target.files[0];
		const imageUrl = URL.createObjectURL(imageFile);
		setFileUrl(imageUrl);
	};

	return (
		<div>
			<StyledMainImgBox>
				<input
					ref={imgInput}
					className='img-input'
					type='file'
					multiple
					accept='image/*'
					name='file'
					style={{ display: 'none' }}
					onChange={processImage}
				/>
				{!fileUrl ? (
					<StyledUploadBtn>
						{!pastImg ? (
							<div onClick={handleClick}>
								<FontAwesomeIcon icon={faCamera} />
								<br />0 / 1
							</div>
						) : (
							<div
								onClick={handleClick}
								style={{
									backgroundColor: 'gray',
									borderRadius: '5px',
									backgroundImage: `url(${pastImg})`,
									width: '200px',
									height: '200px',
									backgroundSize: '200px',
									backgroundPosition: 'center center',
									backgroundRepeat: 'no-repeat',
								}}></div>
						)}
					</StyledUploadBtn>
				) : (
					<div
						onClick={handleClick}
						className='mainimg-preview'
						style={{
							backgroundColor: 'gray',
							borderRadius: '5px',
							backgroundImage: `url(${fileUrl})`,
							width: '200px',
							height: '200px',
							backgroundSize: '200px',
							backgroundPosition: 'center center',
							backgroundRepeat: 'no-repeat',
						}}></div>
				)}
			</StyledMainImgBox>
		</div>
	);
};

const StyledMainImgBox = styled.div`
	width: 250px;
	height: 250px;
	background-color: #f9f8f6;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledUploadBtn = styled.button`
	background-color: transparent;
	width: 200px;
	height: 200px;
	color: rgb(180, 180, 180);
	font-size: 24px;
	text-align: center;
	border: 3px solid #deddda;
	border-radius: 10px;
	padding: 0;
`;

export default ImgUpload;
