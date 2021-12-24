import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

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
			<div className='cat-mainimg-upload-box'>
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
					<button
						className='oneimg-upload-button'
						onClick={handleClick}
						style={{
							backgroundColor: 'transparent',
							padding: '0',
						}}>
						{!pastImg ? (
							<div>
								<FontAwesomeIcon icon={faCamera} />
								<br />0 / 1
							</div>
						) : (
							<div
								style={{
									backgroundImage: `url(${pastImg})`,
									width: '200px',
									height: '200px',
									backgroundSize: '200px',
									backgroundPosition: 'center center',
									borderRadius: '5px',
								}}></div>
						)}
					</button>
				) : (
					<div
						className='mainimg-preview'
						style={{
							backgroundImage: `url(${fileUrl})`,
							width: '200px',
							height: '200px',
							backgroundSize: '200px',
							backgroundPosition: 'center',
						}}></div>
				)}
			</div>
		</div>
	);
};

export default ImgUpload;
