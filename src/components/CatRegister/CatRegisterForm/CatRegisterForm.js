import React, { useState } from 'react';
import './CatRegisterForm.scss';

const CatRegisterForm = (props) => {
	const { catInfo, setCatInfo } = props;

	const handleChange = (e) => {
		setCatInfo({ ...catInfo, [e.target.name]: e.target.value });
	};

	// 성별 0 수컷 1 암컷 2 모름
	// 0 건강 1 치료필요 2 입양 3 사망

	// 0 거절 1 수락 2 대기중
	return (
		<div>
			<div id='message'></div>
			<div>이름</div>
			<input
				className='input-text'
				type='text'
				name='name'
				onBlur={handleChange}
			/>
			<br />

			<div>상태</div>
			<label className='input-radio'>
				<input
					type='radio'
					name='status'
					value='0'
					onChange={handleChange}
					required
				/>
				<span>건강함</span>
			</label>
			<label className='input-radio'>
				<input type='radio' name='status' value='1' onChange={handleChange} />
				<span>치료 필요</span>
			</label>

			<div>중성화</div>
			<label className='input-radio'>
				<input
					type='radio'
					name='neutered'
					value='1'
					onChange={handleChange}
					required
				/>
				<span>완료</span>
			</label>
			<label className='input-radio'>
				<input type='radio' name='neutered' value='0' onChange={handleChange} />
				<span>미완료</span>
			</label>
			<label className='input-radio'>
				<input type='radio' name='neutered' value='2' onChange={handleChange} />
				<span>모름</span>
			</label>
		</div>
	);
};

export default CatRegisterForm;
