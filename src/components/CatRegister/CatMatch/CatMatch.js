import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/swiper-react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import './CatMatch.scss';

const CatMatch = (props) => {
	const { catInfo, setCatInfo, onClose } = props;

	const [showInput, setShowInput] = useState(false);
	const matchCat = () => {};
	const handleChange = (e) => {
		setCatInfo({ ...catInfo, [e.target.name]: e.target.value });
	};
	const handleSubmit = () => {
		console.log(catInfo);
		// 비동기 보내기
		alert('완료되었습니다');
		// window.location.replace('/mycat');
	};

	const matchedCat = [
		{
			id: 1,
			name: '보리',
		},
		{
			id: 2,
			name: '율무',
		},
	];

	return (
		<div className='cat-match-modal'>
			<div>
				비슷한 고양이가 이미 등록되어 있어요! 혹시 이 고양이를 발견하셨나요?
			</div>
			<img
				className='cat-image'
				src={require('images/bori2.jpg').default}
				alt='img'
			/>
			<div className='cat-name'>보리</div>
			<button onClick={matchCat}>네, 이 고양이를 내 도감에 추가할래요.</button>
			<button onClick={() => setShowInput(true)}>
				아니오, 새로운 고양이로 등록할래요.
			</button>
			{showInput && (
				<Swiper
					spaceBetween={50}
					slidesPerView={1}
					navigation
					pagination={{ clickable: true }}>
					{matchedCat.map((cat) => {
						<SwiperSlide>
							<div className='input-label'>이름</div>
							<input
								className='input-text'
								type='text'
								name='name'
								onBlur={handleChange}
							/>
							<br />
							<div className='input-label'>상태</div>
							<label className='input-radio'>
								<input
									type='radio'
									name='status'
									value='0'
									onChange={handleChange}
									required
								/>
								<span className='status'>건강함</span>
							</label>
							<label className='input-radio'>
								<input
									type='radio'
									name='status'
									value='1'
									onChange={handleChange}
								/>
								<span className='status'>치료 필요</span>
							</label>
							<button onClick={handleSubmit}>새로운 고양이 등록</button>
						</SwiperSlide>;
					})}
				</Swiper>
			)}
		</div>
	);
};

export default CatMatch;
