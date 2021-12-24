import axiosInstance from 'api/customAxios';
import React, { useState } from 'react';
import CatFace from '../CatFace/CatFace';
import './MarkedCatFace.scss';
import { useSelector } from 'react-redux';

const MarkedCatImage = (props) => {
	const {
		setShowMarkedCat,
		markedImg,
		origImgUrl,
		catMark,
		setCatMark,
		catInfo,
		catLoc,
		setMatchedCatList,
		setMoreInfo,
	} = props;
	const user = useSelector((state) => state.auth.user);
	const [showNewMark, setShowNewMark] = useState(false);

	const sendThisMark = () => {
		const formData = new FormData();
		// 사용자가 다시 직접 찍은 랜드마크 좌표
		formData.append(
			'catPoints',
			new Blob([JSON.stringify(catMark)], { type: 'application/json' })
		);
		// 고양이 최근발견위치
		formData.append(
			'catLoc',
			new Blob([JSON.stringify(catLoc[0])], { type: 'application/json' })
		);
		// 고양이 패턴
		formData.append(
			'catPattern',
			new Blob([JSON.stringify(catInfo.pattern)], { type: 'text/plain' })
		);
		formData.append(
			'catImgUrl',
			new Blob([JSON.stringify(origImgUrl)], { type: 'text/plain' })
		); // 원본이미지 url도 다시 보내준다

		// 콘솔에 찍어보기
		for (let pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}

		axiosInstance
			.post(`/user/${user.id}/cat/recommendation`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((res) => {
				// 추천고양이 리스트 받기
				setMatchedCatList(res.data);
				if (res.data.length > 0) {
					// 랜드마크 찍는 화면 종료 ( -> 매칭된 고양이 보여주기)
					setShowMarkedCat(false);
				} else {
					// 추천된 고양이가 하나도 없으면 바로 새로운 고양이 등록 화면
					setMoreInfo(true);
				}
			});
	};

	return !showNewMark ? (
		<div className='marked-cat-modal'>
			<div className='sample'>
				<img
					src={require('images/catface_sample.png').default}
					alt='sample'
					className='catface-sample'
				/>
				<span className='message'>
					예시와 같이 &nbsp;
					<span className='message-highlight'>양쪽 귀 앞머리, 눈 앞머리</span>에
					<br /> 마크가 잘 표시되어 있나요?
				</span>
			</div>
			<div className='marked-cat-img-box'>
				<img src={markedImg} className='marked-cat-img' alt='marked-face'></img>
			</div>
			<br />
			<button className='yes-button' onClick={sendThisMark}>
				네, 그대로 사용할래요
			</button>
			<button
				className='no-button'
				onClick={() => {
					setShowNewMark(true);
				}}>
				아니오, 수정할래요
			</button>
		</div>
	) : (
		<div>
			<CatFace
				markedImg={markedImg}
				catMark={catMark}
				setCatMark={setCatMark}
				sendThisMark={sendThisMark}
			/>
		</div>
	);
};

export default MarkedCatImage;
