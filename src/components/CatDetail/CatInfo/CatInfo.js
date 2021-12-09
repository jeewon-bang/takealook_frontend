import axiosInstance from 'api/customAxios';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ToolTip from 'react-power-tooltip';
import './CatInfo.scss';

const CatInfo = (props) => {
	const { catImg, setCatImg, catInfo, setCatInfo } = props;

	const [loading, setLoading] = useState(false); // axios로 데이터 받아서 화면그릴때 사용할 변수
	const [showTooltip, setShowTooltip] = useState(false);

	// 고양이 상태만 수정하기
	const changeCatStatus = (e) => {
		// (axios로 변경 요청 전송)
		console.log(e.target.innerText);
	};

	useEffect(() => {
		console.log('CatInfo');
	}, []);

	return (
		<div className='info-container'>
			<div className='info-content'>
				<span className='cat-img-box'>
					<img src={catImg[0]} alt='img' className='cat-img' />
					{/* <img
						src={require('images/bori2.jpg').default}
						alt='img'
						className='cat-img'
					/> */}
				</span>

				<span className='cat-info-box'>
					<div className='cat-info-head'>
						<span className='cat-name'>{catInfo.name}</span>
						<button
							className='cat-status'
							onMouseOver={() => setShowTooltip(true)}
							onMouseLeave={() => setShowTooltip(false)}>
							{catInfo.status === 0
								? '건강함'
								: 1
								? '치료 필요'
								: 2
								? '입양됨'
								: '고양이별'}
							<ToolTip
								className='cat-status-tooltip'
								show={showTooltip}
								fontSize='16px'>
								<span onClick={changeCatStatus}>건강함</span>
								<span onClick={changeCatStatus}>치료 필요</span>
								<span onClick={changeCatStatus}>입양됨</span>
								<span onClick={changeCatStatus}>고양이별</span>
							</ToolTip>
						</button>
					</div>

					<div className='cat-info-body'>
						<div className='cat-info-body-text'>
							{catInfo.gender === 0 ? '♂' : 1 ? '♀' : '모름'}
						</div>
						<div className='cat-info-body-text'>
							중성화 {catInfo.neutered === 0 ? '미완료' : 1 ? '완료' : '모름'}
						</div>
					</div>

					<div className='carer-box'>
						<div className='cat-info-title-text'>돌보는 사람들</div>
						<div className='carer-wrapper'>
							{catInfo.carers.map((v) => (
								<span className='carer'>
									<img src={v.userImage} className='carer-img' alt='user' />
									<div className='carer-name'>{v.userName}</div>
								</span>
							))}
						</div>
					</div>
				</span>
			</div>
		</div>
	);
};

export default CatInfo;
