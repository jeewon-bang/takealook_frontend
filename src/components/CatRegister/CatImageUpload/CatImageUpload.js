import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CatImageUpload.scss';

const CatImageUpload = (props) => {
	const { image, setImage } = props;
	const [imgList, setImgList] = useState([]);
	const [imgUrlList, setImgUrlList] = useState([]);

	const imgInput = useRef();

	const handleClick = () => {
		imgInput.current.click(); // imgInput이라는 ref가 걸린 대상(= input type='file')이 클릭되도록 한다
	};

	// input 태그에 변화가 생기면(이미지가 업로드되면) image 배열에 업로드된 파일들 추가
	const handleChange = (e) => {
		setImage([...image, ...e.target.files]);
	};

	// 업로드한 이미지 삭제
	const deleteImg = (e) => {
		let index = e.target.parentNode.id;

		image.splice(index, 1);
		imgUrlList.splice(index, 1);
		setImage([...image]);
		setImgUrlList([...imgUrlList]);
	};

	// const handleOnDragEnd = (result) => {
	// 	const currentList = Array.from(image);
	// 	const draggingItemIndex = result.source.index; // 드래그하는 요소의 인덱스
	// 	const afterDragItemIndex = result.destination.index; // 옮겨갈 곳의 인덱스

	// 	const removeTag = currentList.splice(draggingItemIndex, 1); // 배열에서 드래그하는 요소를 잘라냄
	// 	currentList.splice(afterDragItemIndex, 0, removeTag[0]); // 옮겨갈 곳의 인덱스에, 아무것도 잘라내지 않고 추가(0), 잘라냈던 드래그하는 요소를 집어넣는다

	// 	setImage(currentList);
	// };

	// 화면에 그릴 이미지 주소값 = imgUrlList 생성 : useEffect로 image 배열이 변경됐을때마다 실행
	useEffect(() => {
		if (image.length === 0) {
			// useEffect에서 실행되기 때문에 렌더링직후 사용자가 이미지 업로드 하기 전에 바로 오류 뜨는거 방지
			return false;
		} else if (image.length > 10) {
			alert('최대 10개까지만 선택할 수 있습니다.');
			setImage([]); // 초기화
			setImgUrlList([]);
		} else {
			let urls = [];
			for (let i = 0; i < image.length; i++) {
				let nowImgUrl = URL.createObjectURL(image[i]); // 사용자가 등록한 이미지들 for문돌면서 url 생성
				urls.push({ id: i, url: nowImgUrl });
			}
			setImgUrlList([...urls]);
		}
	}, [image]);

	return (
		<div className='cat-img-upload'>
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
				<div>
					<button className='img-upload-button' onClick={handleClick}>
						<FontAwesomeIcon icon={faCamera} />
						<br />
						{imgUrlList.length} / 10
					</button>
					{imgUrlList.map((v) => (
						<span
							id={v.id}
							className='img-preview'
							style={{ backgroundImage: `url(${v.url})` }}>
							<button className='img-delete-button' onClick={deleteImg}>
								X
							</button>
						</span>
					))}
					<br />
				</div>
			</div>
		</div>
	);
};

export default React.memo(CatImageUpload);
