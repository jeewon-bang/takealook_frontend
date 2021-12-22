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
		catLoc,
		setMatchedCatList,
		setMoreInfo,
	} = props;
	const user = useSelector((state) => state.auth.user);
	const [showNewMark, setShowNewMark] = useState(false);

	const useThisMark = () => {
		const formData = new FormData();
		formData.append(
			'catPoints',
			new Blob([JSON.stringify(catMark)], { type: 'application/json' })
		);
		formData.append(
			'catLoc',
			new Blob([JSON.stringify(catLoc[0])], { type: 'application/json' })
		);
		formData.append(
			'catImgUrl',
			new Blob([JSON.stringify(origImgUrl)], { type: 'text/plain' })
		); // 원본이미지 url도 다시 보내준다

		axiosInstance
			.post(`/user/${user.id}/test2`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((res) => {
				// 추천고양이 리스트 받기
				console.log(res.data);
				setMatchedCatList(res.data);
				if (res.data.length > 0) {
					// 랜드마크 찍는 화면 꺼버리기 (매칭된 고양이 보여주기)
					setShowMarkedCat(false);
				} else {
					setMoreInfo(true);
				}
			});
	};
	const modifyMark = () => {
		// 새로찍은 랜드마크 좌표 + 고양이 위치 좌표 보내기
		console.log(catMark);
		console.log(catLoc[0]);
		console.log(origImgUrl);

		const formData = new FormData();
		formData.append(
			'catPoints',
			new Blob([JSON.stringify(catMark)], { type: 'application/json' })
		);
		formData.append(
			'catLoc',
			new Blob([JSON.stringify(catLoc[0])], { type: 'application/json' })
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
			.post(`/user/${user.id}/test2`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((res) => {
				// 추천고양이 리스트 받기
				console.log(res.data);
				setMatchedCatList(res.data);
				if (res.data.length > 0) {
					// 랜드마크 찍는 화면 꺼버리기 (매칭된 고양이 보여주기)
					setShowMarkedCat(false);
				} else {
					setMoreInfo(true);
				}
			});
	};

	return !showNewMark ? (
		<div className='marked-cat-modal'>
			<div>예시와 같이 마크가 잘 찍혔나요?</div>
			<img src={markedImg} className='marked-cat-img' alt='marked-face'></img>
			<br />
			<button onClick={useThisMark}>네, 그대로 사용할래요</button>
			<button
				onClick={() => {
					setShowNewMark(true);
				}}>
				아니오, 그지같이 찍혔어요
			</button>
		</div>
	) : (
		<div>
			새로찍자
			<CatFace
				markedImg={markedImg}
				catMark={catMark}
				setCatMark={setCatMark}
			/>
			<button onClick={modifyMark}>마크 수정하기</button>
		</div>
	);
};

export default MarkedCatImage;
