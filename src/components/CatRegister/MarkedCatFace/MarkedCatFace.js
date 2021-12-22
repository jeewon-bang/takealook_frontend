import axiosInstance from 'api/customAxios';
import React, { useState } from 'react';
import './MarkedCatFace.scss';

const MarkedCatImage = (props) => {
	const { setShowMarkedCat, markedImg, catInfo, catLoc, setMatchedCatList } =
		props;
	const [showNewMark, setShowNewMark] = useState(false);
	const [newMark, setNewMark] = useState([]);

	const useThisMark = () => {
		// 사진 외 정보(위치, 패턴? 보내기)
		// console.log(catInfo);
		console.log(catLoc);

		// axiosInstance.post(`주소알려줘`, catLoc).then((res) => {
		// 	// 추천고양이를 드디어 받아온다
		// 	setMatchedCatList(res.data);
		// 	setShowMarkedCat(false);
		// });
		// setShowMarkedCat(false);
	};
	const modifyMark = () => {
		// 새로찍은 랜드마크 좌표 보내기
		// axiosInstance.post(`주소`, newMark)
		// .then(res => {
		// });
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
			{/* 지원이가 만들어준 컴포넌트 */}
			<button onClick={modifyMark}>마크 수정하기</button>
		</div>
	);
};

export default MarkedCatImage;
