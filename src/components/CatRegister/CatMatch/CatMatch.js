import CatMarkerMap from 'components/Common/CatMarkerMap';
import React, { useEffect, useState } from 'react';

import './CatMatch.scss';
import axiosInstance from 'api/customAxios';
import { useNavigate } from 'react-router';

const CatMatch = (props) => {
	const { catId, moreInfo, setMoreInfo, matchedCat } = props;
	const navigate = useNavigate();

	// 추천받은 고양이를 내도감에 추가
	const selectMatchedCat = () => {
		axiosInstance.post(`/user/1/cat/${matchedCat.id}/selection`).then((res) => {
			navigate('/mycat');
		});
	};

	return (
		<div className='cat-match-modal'>
			<div className='message'>비슷한 고양이가 이미 등록되어 있어요!</div>
			<div>혹시 이 고양이를 발견하셨나요?</div>
			<img
				className='cat-image'
				src={require('images/bori2.jpg').default}
				alt='img'
			/>
			<div className='cat-name'>{matchedCat.name}</div>
			<div className='cat-info'>
				{matchedCat.gender === 0 ? '♂' : 1 ? '♀' : '성별 모름'}&nbsp;·&nbsp;
				{matchedCat.pattern === 0
					? '고등어태비'
					: 1
					? '치즈 / 치즈태비'
					: 2
					? '실버 / 실버태비'
					: 3
					? '삼색이'
					: 4
					? '카오스'
					: 5
					? '턱시도'
					: 6
					? '젖소'
					: 7
					? '블랙'
					: 8
					? '화이트'
					: '기타'}
				&nbsp;·&nbsp;중성화
				{matchedCat.neutered === 0 ? '미완료' : 1 ? '완료' : '모름'}
			</div>

			<div className='cat-location-map'>
				<div className='title'>최근 발견 위치</div>
				<CatMarkerMap
					mapId={`${matchedCat.id}-map`}
					catLoc={matchedCat.locations}
					width={'100%'}
					height={'90%'}
				/>
			</div>

			<button className='yes-button' onClick={selectMatchedCat}>
				이 고양이를 내 도감에 추가
			</button>
			<br />
			{/* 일치하는 고양이 없는경우 추가정보 받아서 새 고양이 등록하기위해 부모컴포넌트(CatDetailPage)에 있는 MoreInfoForm을 연다 */}
			<button className='no-button' onClick={() => setMoreInfo(true)}>
				일치하는 고양이 없음
			</button>
		</div>
	);
};

export default CatMatch;
