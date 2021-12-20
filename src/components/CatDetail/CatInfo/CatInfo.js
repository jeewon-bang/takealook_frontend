import axiosInstance from 'api/customAxios';
import React, { useState, useEffect } from 'react';
import ToolTip from 'react-power-tooltip';
import './CatInfo.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { useSelector } from 'react-redux';

const CatInfo = (props) => {
	const { catId, catInfo, setCatInfo, catImg, setCatImg } = props;
	const [showTooltip, setShowTooltip] = useState(false);
	const user = useSelector((state) => state.auth.user);

	// 고양이 상태만 바로 바꾸는 함수
	const changeCatStatus = (e) => {
		let newStatus;
		switch (e.target.innerText) {
			case '건강함':
				newStatus = '0';
				break;
			case '치료 필요':
				newStatus = '1';
				break;
			case '입양됨':
				newStatus = '2';
				break;
			default:
				newStatus = '3';
		}
		axiosInstance
			.patch(`/user/${user.id}/cat/${catId}?status=${newStatus}`)
			.then((res) => {
				axiosInstance.get(`user/${user.id}/cat/${catId}`).then((res) => {
					setCatInfo(res.data);
				});
			});
	};

	return (
		<div className='info-container'>
			<div className='info-content'>
				<span className='cat-img-box'>
					<Swiper slidesPerView={1} navigation pagination={{ clickable: true }}>
						<SwiperSlide>
							<img src={catInfo.mainImage} alt='img' className='cat-img' />
						</SwiperSlide>
						{catImg.map((img) => (
							<SwiperSlide>
								<img src={img.path} alt='img' className='cat-img' />
							</SwiperSlide>
						))}
					</Swiper>
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
								: catInfo.status === 1
								? '치료 필요'
								: catInfo.status === 2
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
							{catInfo.gender === 0
								? '♂'
								: catInfo.gender === 1
								? '♀'
								: '성별 모름'}
						</div>
						<div className='cat-info-body-text'>
							{catInfo.pattern === 0
								? '고등어태비'
								: catInfo.pattern === 1
								? '치즈 / 치즈태비'
								: catInfo.pattern === 2
								? '실버 / 실버태비'
								: catInfo.pattern === 3
								? '삼색이'
								: catInfo.pattern === 4
								? '카오스'
								: catInfo.pattern === 5
								? '턱시도'
								: catInfo.pattern === 6
								? '젖소'
								: catInfo.pattern === 7
								? '블랙'
								: catInfo.pattern === 8
								? '화이트'
								: '생김새 기타'}
						</div>
						<div className='cat-info-body-text'>
							중성화{' '}
							{catInfo.neutered === 0
								? '미완료'
								: catInfo.neutered === 1
								? '완료'
								: '모름'}
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
